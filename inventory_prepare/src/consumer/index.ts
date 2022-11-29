import Kafka from 'node-rdkafka';
import { EventEmitter } from 'stream';
import { getEnv } from '../utils';
import { runWorker } from './worker';

function getConfig(groupId: string): Kafka.ConsumerGlobalConfig {
  return {
    'group.id': groupId,
    'bootstrap.servers': `${getEnv('BROKER_HOST')}:${getEnv('BROKER_PORT')}`,
    'sasl.username': getEnv('SASL_USERNAME'),
    'sasl.password': getEnv('SASL_PASSWORD'),
    'sasl.mechanisms': getEnv('SASL_MECHANISM'),
    'security.protocol': <Kafka.ConsumerGlobalConfig['security.protocol']>getEnv('SEC_PROTOCOL'),
    'enable.ssl.certificate.verification': false,
  };
}

function createConsumer(params: { groupId: string }): { consumer: Kafka.KafkaConsumer } {
  return { consumer: new Kafka.KafkaConsumer(getConfig(params.groupId), {}) };
}

interface StartConsumerParams {
  consumer: Kafka.KafkaConsumer;
  topic: string;
  eventEmitter: EventEmitter;
}

async function startConsumer(params: StartConsumerParams): Promise<void> {
  const { consumer, topic, eventEmitter } = params;

  consumer.on('ready', () => {
    console.log('Consumer ready');

    consumer.subscribe([topic]);

    consumer.consume();
  });

  consumer.on('subscribed', (topics) => {
    // List all topic that this consumer is subscribed to
    topics.forEach((t) => {
      console.log('Consumer is listening to', t);
    });
  });
  
  consumer.on('data', async ({ value }) => {    
    // Logic run in worker_thread
    const data = await runWorker(value);
    
    if (data) eventEmitter.emit('inventory_request', data);
  });

  consumer.on('event.error', (error) => {
    console.error(error);
  });
  consumer.on('connection.failure', (error) => {
    console.error(error);
  });

  consumer.connect();
}


export { createConsumer, startConsumer };