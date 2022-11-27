import avro from 'avsc';

export type Genre =
  'request_item'
  | 'ask'
  | 'privacy'
  | 'report';

export type ItemRequest = {
  genre: Genre;
  isAnonymous: boolean;
  customer_id: string;
  message: string;
};

export const eventType: avro.Type = avro.Type.forSchema({
  type: 'record',
  name: 'Request_In',
  fields: [
    {
      name: 'genre',
      type: {
        type: 'enum',
        name: 'genreCall',
        symbols: [
          'request_item',
          'ask',
          'privacy',
          'report',
        ],
      },
    },
    { name: 'isAnonymous', type: 'boolean' },
    { name: 'customer_id', type: 'string' },
    { name: 'message', type: 'string' },
  ],
});

// Destination
export type InventoryRequest = {
  request_id: string;
  customer_id: string;
  item_id: string;
  message: string;
  created_dt: string;
};
