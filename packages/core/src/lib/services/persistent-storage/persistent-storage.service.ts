import { PACKAGE_NAME } from "../../constants";

export class PersistentStorage {
  private static instances = new Map<string, PersistentStorage>();

  private readonly map = new Map<string, string>();

  constructor(
    private prefix: string = PACKAGE_NAME,
    private storage: Storage = window?.localStorage
  ) {
    if (!storage) {
      throw new Error("No storage available");
    }

    if (PersistentStorage.instances.has(prefix)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return PersistentStorage.instances.get(prefix)!;
    }
    PersistentStorage.instances.set(prefix, this);
    this.init();
  }

  private init() {
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (key?.startsWith(`${this.prefix}:`)) {
        const value = this.storage.getItem(key);
        if (value) {
          this.map.set(key.replace(`${this.prefix}:`, ""), value);
        }
      }
    }
  }

  clear(): void {
    this.map.clear();
    this.storage.clear();
  }

  getItem<Value>(key: string): Value | null {
    const value = this.map.get(key);

    return typeof value !== "undefined" ? JSON.parse(value) : null;
  }

  key(index: number): string | null {
    return Object.keys(Object.fromEntries(this.map))[index] || null;
  }

  setItem(key: string, value: unknown): void {
    const valueToString = JSON.stringify(value);
    this.map.set(key, valueToString);
    this.storage.setItem(`${this.prefix}:${key}`, valueToString);
  }

  removeItem(key: string): void {
    this.map.delete(key);
    this.storage.removeItem(`${this.prefix}:${key}`);
  }

  get length(): number {
    return this.map.size;
  }
}

export const storage = new PersistentStorage();
