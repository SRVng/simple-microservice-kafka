import { randomInt, randomUUID } from 'crypto';
import { InventoryRequest, InventoryReady } from '../schema';

function transformRequest(data: InventoryRequest): InventoryReady {
  const { customer_id: customerId, item_id: itemId } = data;

  const amount = randomInt(10);
  const price = randomInt(1000);

  const itemList: InventoryReady = {
    inventory_request_id: randomUUID(),
    customer_id: customerId,
    item_id: itemId,
    item_name: itemId.slice(0, 8) === 'FOODSUPP' ? `รายการอาหาร #${randomInt(100)}` : `รายการยา #${randomInt(100)}`,
    item_amount: randomInt(10),
    item_price: randomInt(1000),
    total_payment: Math.round(amount * price),
    created_dt: new Date().toLocaleString('en-GB'),
  };

  return itemList;
}

export { transformRequest };