import { workerData, parentPort, isMainThread } from 'worker_threads';
import { transformRequest, validateRequest } from '.';
import { eventType as producerEventType } from '../../producer/schema';
import { eventType as consumerEventType, type InventoryRequest, type ItemRequest } from '../schema';

if (!isMainThread) {
  if (!workerData) {
    throw new Error();
  }

  const parsedData: string = consumerEventType.fromBuffer(Buffer.from(workerData.buffer));

  const data: ItemRequest = JSON.parse(parsedData);

  console.log('Received message: ', data);

  const isValid = validateRequest(data);

  if (isValid) {
    const validData: InventoryRequest = transformRequest(data);

    console.log(`Sending message to producer: ${validData.request_id}`);
    
    const producerData = producerEventType.toBuffer(validData);

    parentPort?.postMessage(producerData);
  }
}

