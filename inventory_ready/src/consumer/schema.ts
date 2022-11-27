import avro from 'avsc';

export type InventoryRequest = {
  request_id: string;
  customer_id: string;
  item_id: string;
  message: string;
  created_dt: string;
};

export const eventType: avro.Type = avro.Type.forSchema({
  type: 'record',
  name: 'inventory_request',
  fields: [
    { name: 'request_id', type: 'string' },
    { name: 'customer_id', type: 'string' },
    { name: 'item_id', type: 'string' },
    { name: 'message', type: 'string' },
    {
      name: 'created_dt',
      type: 'string',
    },
  ],
});

// Destination
export type InventoryReady = {
  inventory_request_id: string;
  customer_id: string;
  item_id: string;
  item_name: string; 
  item_price: number;
  item_amount: number;
  total_payment: number,
  created_dt: string
};
