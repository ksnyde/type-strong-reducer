/**
 * Takes a strongly typed array of objects and converts it into a dictionary
 * of objects while preserving the strong typing in the original objects.
 */
export function arrayToObject<T extends { name: S }, S extends PropertyKey>(
  /** an array of objects */
  arr: readonly T[]
) {
  return arr.reduce(
    (acc, v) => ({ ...acc, [v.name]: v }),
    {} as { [V in T as V["name"]]: V }
  );
}
