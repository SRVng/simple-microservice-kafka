import EventEmitter from 'stream';
import { createConsumer, startConsumer } from './src/consumer';
import { createProducerStream } from './src/producer';

async function main(): Promise<void> {
  const { consumer } = createConsumer({ groupId: '5017' });
  const eventEmitter = new EventEmitter();
    
  await startConsumer({ consumer, topic: 'inventory_request.in', eventEmitter });

  const { producer: stream } = createProducerStream('inventory_request.ready');
    
  eventEmitter.on('inventory_ready', (data) => {
    stream.write(data);
  });

}

await main();
