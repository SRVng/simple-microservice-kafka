// eslint-disable-next-line import/no-extraneous-dependencies
import Kafka from 'node-rdkafka';
import { getEnv } from '../utils';

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

function createProducerStream(topic: string): { producer: Kafka.ProducerStream } {
  return { producer: Kafka.Producer.createWriteStream(getConfig(), {}, { topic }) };
}

export { createProducerStream };