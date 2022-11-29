import { isMainThread, Worker as WorkerThread } from 'worker_threads';

async function runWorker<T>(workerData: T): Promise<unknown> {
  if (!isMainThread) {
    return;
  }

  return new Promise((resolve, reject) => {
    const worker = new WorkerThread('./dist/src/consumer/worker/worker.js', { workerData });

    worker.on('message', (value) => {
      resolve(value);
    });

    worker.on('error', (err) => {
      console.error(err);
      reject(err);
    });
  });
}

export { runWorker };