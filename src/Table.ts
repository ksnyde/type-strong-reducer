import * as t from "io-ts";

export interface ITableDefinition<T extends object> {
  name: Readonly<string>;

  is: t.Mixed["is"];
  encode: t.Mixed["encode"];
  decode: t.Mixed["decode"];

  select: (cols: keyof T) => string;
  update: (record: Partial<T>) => string;
}

export const Table = <T extends object>(model: t.Type<T>): ITableDefinition<T> => {
  const name: Readonly<string> = model.name;
  // const name: Readonly<string> = model.name as const;

  return {
    // basics
    name,
    // io-ts
    is: model.is,
    encode: model.encode,
    decode: model.decode,
    // CRUD
    select: (cols) => `this is just a test`,
    update: (record) => `this is just a test`,
  };
};
