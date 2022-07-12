const isArrayLike = <T>(item: unknown | null | undefined): item is Array<T> => {
  return (
    Array.isArray(item) ||
    (!!item &&
      typeof item === "object" &&
      "length" in item &&
      typeof (item as Array<T>).length === "number" &&
      ((item as Array<T>).length === 0 ||
        ((item as Array<T>).length > 0 &&
          (item as Array<T>).length - 1 in item)))
  );
};

export const notNullEmptyArray = <T>(
  array: Array<T> | undefined | null
): array is Array<T> => {
  return array != null && isArrayLike(array) && array.length > 0;
};
