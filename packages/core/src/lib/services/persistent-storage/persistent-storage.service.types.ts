export interface StorageService {
  getItem<Value>(key: string): Value | null;
  setItem(key: string, value: unknown): void;
  removeItem(key: string): void;
  clear(): void;
  key(index: number): string | null;
  length: number;
}
