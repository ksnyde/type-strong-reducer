import * as t from "io-ts";

export interface ITableDefinition<T extends object, S> {
  name: S;

  is: t.Mixed["is"];
  encode: t.Mixed["encode"];
  decode: t.Mixed["decode"];

  select: (cols: keyof T) => string;
  update: (record: Partial<T>) => string;
}

export const Table = <
  T extends { name: Readonly<string> },
  S extends T["name"] = T["name"]
>(
  model: t.Type<T>
): ITableDefinition<T, S> => {
  return {
    // basics
    name: model.name as S,
    // io-ts
    is: model.is,
    encode: model.encode,
    decode: model.decode,
    // CRUD
    select: (cols) => `this is just a test`,
    update: (record) => `this is just a test`,
  };
};
