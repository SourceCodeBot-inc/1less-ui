import { StoreSchema } from "crudodb";

export const binSchema: StoreSchema = {
  dbName: '1less',
  dbVersion: 1,
  store: 'bins',
  indices: [
    {
      name: 'id',
      unique: true,
    }
  ],
  keyPath: 'id'
};
