import EventEmitter from 'stream';
import { createConsumer, startConsumer } from './src/consumer';
import { createProducer, createProducerStream, startProducer } from './src/producer';
import { startCommandLine } from './src/producer/cli';

async function main(arg: string): Promise<void> {
  if (arg === 'consumer') {
    const { consumer } = createConsumer({ groupId: '5017' });
    const eventEmitter = new EventEmitter();
    
    await startConsumer({ consumer, topic: 'topic.1', eventEmitter });

    const { producer: stream } = createProducerStream('inventory_request.in');

    eventEmitter.on('inventory_request', (data) => {
      stream.write(data);
    });

  } 
  if (arg === 'producer') {
    const { producer } = createProducer();
    startProducer({ producer, topic: 'inventory_request.in' });
  }

  if (arg === 'producer-input') {
    const input = await startCommandLine();
    const { producer: stream } = createProducerStream('inventory_request.in');

    stream.write(input);

    process.exit();
  }

}

await main(process.argv[2]);
