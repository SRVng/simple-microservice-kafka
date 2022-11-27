import avro from 'avsc';

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

export const eventType: avro.Type = avro.Type.forSchema({
  type: 'record',
  name: 'inventory_ready',
  fields: [
    // Request id of inventory management service
    { name: 'inventory_request_id', type: 'string' },
    { name: 'customer_id', type: 'string' },
    { name: 'item_id', type: 'string' },
    // Finance will react to this topic
    // Other services doesn't have item_id to refer to, item_name will be provide
    { name: 'item_name', type: 'string' },
    { name: 'item_price', type: 'int' },
    { name: 'item_amount', type: 'int' },
    { name: 'total_payment', type: 'int' },
    {
      name: 'created_dt',
      type: 'string',
    },
  ],
});
