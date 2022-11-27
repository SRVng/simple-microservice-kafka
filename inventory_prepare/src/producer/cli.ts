import { randomUUID } from 'crypto';
import { createInterface } from 'readline';
import { eventType, type InventoryRequest } from './schema';

async function startCommandLine(): Promise<Buffer> {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    readline.question('Input customer_id \n', (customerId) => {
      readline.question('Input item_id \n', (itemId) => {
        readline.question('Input customer message \n', (message) => {
          const input: InventoryRequest = {
            request_id: randomUUID(),
            customer_id: customerId,
            item_id: itemId,
            message,
            created_dt: new Date().toLocaleDateString('en-GB'),
          };

          console.log(`Sending message:: ${input.request_id}`);

          const encode = eventType.toBuffer(input);
          readline.close();
          resolve(encode);
        });
      });
    });
  });
}

export { startCommandLine };