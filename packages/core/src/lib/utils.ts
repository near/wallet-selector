export const omit = <Value extends object, Key extends keyof Value>(
  obj: Value,
  keys: Array<Key>
): Omit<Value, Key> => {
  const result = { ...obj };

  keys.forEach((key) => delete result[key]);

  return result;
};
