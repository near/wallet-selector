export const notNullEmpty = (str: string | null | undefined): str is string => {
  return str != null && str.length > 0;
};

export const nullEmpty = (
  str: string | null | undefined
): str is null | undefined | "" => {
  return !notNullEmpty(str);
};

export const firstNotNullEmpty = (
  ...strItems: Array<string | null | undefined>
): string | undefined => {
  for (const item of strItems) {
    if (notNullEmpty(item)) {
      return item;
    }
  }

  return undefined;
};
