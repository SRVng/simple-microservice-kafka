import EventEmitter from 'stream';
import { createConsumer, startConsumer } from './src/consumer';
import { createProducer, createProducerStream, startProducer } from './src/producer';

async function main(arg: string): Promise<void> {
  if (arg === 'consumer') {
    const { consumer } = createConsumer({ groupId: '5017' });
    const eventEmitter = new EventEmitter();
    
    await startConsumer({ consumer, topic: 'inventory_request.in', eventEmitter });

    const { producer: stream } = createProducerStream('inventory_request.ready');
    
    eventEmitter.on('inventory_ready', (data) => {
      stream.write(data);
    });

  } 
  if (arg === 'producer') {
    const { producer } = createProducer();
    startProducer({ producer, topic: 'inventory_request.ready' });
  }

}

await main(process.argv[2]);
