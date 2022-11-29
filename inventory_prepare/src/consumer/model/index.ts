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

export { transformRequest, validateRequest };