import { workerData, parentPort, isMainThread } from 'worker_threads';
import { transformRequest } from '.';
import { eventType as producerEventType } from '../../producer/schema';
import { eventType as consumerEventType, type InventoryRequest, type InventoryReady } from '../schema';

if (!isMainThread) {
  if (!workerData) {
    throw new Error();
  }

  const parsedData: string = consumerEventType.fromBuffer(Buffer.from(workerData.buffer));

  const data: InventoryRequest = JSON.parse(parsedData);

  console.log('Received message: ', data);

  const validData: InventoryReady = transformRequest(data);

  console.log(`Sending message to producer: ${validData.inventory_request_id}`);

  const producerData = producerEventType.toBuffer(validData);

  parentPort?.postMessage(producerData);
}

