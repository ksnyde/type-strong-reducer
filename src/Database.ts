import { ITableDefinition } from "./Table";

type IDatabase<T extends { [P in keyof T]: T[P] } = any> = {
  [P in keyof T]: T[P];
};

export function Database(...tables: ITableDefinition<any>[]) {
  const tableNames = tables.map((table) => table.name);

  return {
    tables: tables.reduce((acc, table) => ({ ...acc, [table.name]: table })),
    tables2: tables.reduce(
      (acc, table) => ({
        ...(acc ? acc : {}),
        [table.name]: table,
      }),
      {} as Record<string, ITableDefinition<any>>
    ),
    tables3: tables.reduce(
      (acc, table) => ({
        ...(acc ? acc : {}),
        [table.name]: table,
      }),
      {} as { [key: string]: ITableDefinition<any> }
    ),
    tables4: tables.reduce<{ [key: string]: ITableDefinition<any> }>(
      (acc, table) => ({
        ...acc,
        [table.name]: table,
      }),
      {}
    ),
    tables5: tables.reduce<IDatabase>(
      (acc, table) => ({
        ...acc,
        [table.name]: table,
      }),
      {}
    ),
    tableNames,
  };
}
