import { StoreSchema } from "crudodb";

export const posSchema: StoreSchema = {
  dbName: '1less',
  dbVersion: 1,
  store: 'pos',
  indices: [
    {
      name: 'id',
      unique: true,
    },
    {
      name: 'name',
    }
  ],
  keyPath: 'id'
};
