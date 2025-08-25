export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Modify<T, R> = Omit<T, keyof R> & R;
