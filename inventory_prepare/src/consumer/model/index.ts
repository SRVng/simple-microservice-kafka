import { isMainThread, Worker as WorkerThread } from 'worker_threads';
import { randomUUID } from 'crypto';
import type { ItemRequest, InventoryRequest } from '../schema';

function validateRequest(data: ItemRequest): boolean {
  const { genre, isAnonymous } = data;

  if (genre !== 'request_item') {
    return false;
  }

  if (isAnonymous) {
    return false;
  }

  return true;
}

function transformRequest(data: ItemRequest): InventoryRequest {
  const { customer_id: customerId, message } = data;

  const itemId: string = message.includes('ยา') ? 'MEDICSUP'.concat(randomUUID().slice(9)) : 'FOODSUPP'.concat(randomUUID().slice(9));

  return { request_id: randomUUID(), customer_id: customerId, message, item_id: itemId, created_dt: new Date().toLocaleDateString('en-GB') };
}

async function runWorker<T>(workerData: T): Promise<T | void> {
  if (!isMainThread) {
    return;
  }

  return new Promise((resolve, reject) => {
    const worker = new WorkerThread('./dist/inventory_prepare/src/consumer/model/worker.js', { workerData });

    worker.on('message', (value) => {
      resolve(value);
    });

    worker.on('error', (err) => {
      console.error(err);
      reject(err);
    });
  });
}

export { transformRequest, validateRequest, runWorker };