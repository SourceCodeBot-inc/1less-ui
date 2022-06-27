import { StoreSchema } from "crudodb";

export const eventSchema: StoreSchema = {
  dbName: '1less',
  dbVersion: 1,
  store: 'events',
  indices: [
    {
      name: 'id',
      unique: true,
    },
    {
      name: 'dishId',
    },
    {
      name: 'posId',
    },
    {
      name: 'binId',
    },
    {
      name: 'timestamp',
    }
  ],
  keyPath: 'id'
};
