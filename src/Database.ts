import { arrayToObject } from "./arrayToObject";
import { ITableDefinition } from "./Table";

export type IDatabase<T extends object> = {
  tableNames: string[];
  tables: T;
};

export function Database<T extends ITableDefinition<any, S>, S extends PropertyKey>(
  tbls: readonly T[]
) {
  return {
    tables: arrayToObject(tbls),
    tableNames: tbls.map((table) => table.name),
  };
}
