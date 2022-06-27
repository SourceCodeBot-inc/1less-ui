import { StoreSchema } from "crudodb";

export const dishSchema: StoreSchema = {
  dbName: '1less',
  dbVersion: 1,
  store: 'dishes',
  indices: [
    {
      name: 'id',
      unique: true,
    },
    {
      name: 'type'
    }
  ],
  keyPath: 'id'
};
