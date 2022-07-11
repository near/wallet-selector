const isArrayLike = <T extends any>(item: any | null | undefined): item is T[] => {
  return (
    Array.isArray(item) ||
    (!!item &&
      typeof item === "object" &&
      "length" in item &&
      typeof item.length === "number" &&
      (item.length === 0 || (item.length > 0 && item.length - 1 in item)))
  );
};

export const notNullEmptyArray = <T>(array: T[] | undefined | null): array is T[] => {
  return array != null && isArrayLike(array) && array.length > 0;
};
