// eslint-disable-next-line import/no-extraneous-dependencies
import Kafka from 'node-rdkafka';
import { getEnv } from '../../../utility/env';

function getConfig(): Kafka.ProducerGlobalConfig {
  return {
    'bootstrap.servers': `${getEnv('BROKER_HOST')}:${getEnv('BROKER_PORT')}`,
    'sasl.username': getEnv('SASL_USERNAME'),
    'sasl.password': getEnv('SASL_PASSWORD'),
    'sasl.mechanisms': getEnv('SASL_MECHANISM'),
    'security.protocol': <Kafka.ConsumerGlobalConfig['security.protocol']>getEnv('SEC_PROTOCOL'),
    'enable.ssl.certificate.verification': false,
  };
}
function createProducer():{ producer: Kafka.Producer } {
  return { producer: new Kafka.Producer(getConfig(), {}) };
}

function createProducerStream(topic: string): { producer: Kafka.ProducerStream } {
  return { producer: Kafka.Producer.createWriteStream(getConfig(), {}, { topic }) };
}

interface StartProducerParams {
  producer: Kafka.Producer;
  topic: string;
}

function startProducer(params: StartProducerParams): void {
  const { producer, topic } = params;

  producer.on('ready', () => {
    console.log('Producer ready to produce for', topic);
  });
  
  // TODO: Error handling
  producer.on('connection.failure', (error) => {
    console.error('Connection failed' + error.message);
  });

  producer.on('event.error', (error) => {
    console.error('Producer event error from topic: ', topic, error.message);
  });

  producer.connect();
}

export { createProducer, startProducer, createProducerStream };