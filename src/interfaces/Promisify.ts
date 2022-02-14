export type UnpackedPromise<T> = T extends Promise<infer U> ? U : T;
export type GenericFunction<TS extends unknown[], R> = (...args: TS) => R;

export type Promisify<T> = {
  [K in keyof T]: T[K] extends GenericFunction<infer TS, infer R>
    ? (...args: TS) => Promise<UnpackedPromise<R>>
    : T[K];
};
