import { Promisify } from "../utils/types";
import { defer } from "../utils/HelperFunctions";

export class PersistentStorage implements Promisify<Storage> {
  static instances = new Map<string, PersistentStorage>();

  private readonly map = new Map<string, string>();

  constructor(private readonly prefix: string, private readonly storage: Storage = window?.localStorage) {
    if(!storage) {
      throw new Error("No storage available");
    }

    if(PersistentStorage.instances.has(prefix)) {
      return PersistentStorage.instances.get(prefix)!;
    }
    PersistentStorage.instances.set(prefix, this);
    this.init();
  }

  private init() {
    Object.keys(this.storage).forEach((key) => {
      if (key.startsWith(this.prefix)) {
        this.map.set(key.slice(this.prefix.length), this.storage.getItem(key)!);
      }
    });
  }

  async clear(): Promise<void> {
    this.map.clear();
    defer(() => {
      this.storage.clear();
    });
  }
  async getItem(key: string): Promise<string | null> {
    return this.map.get(key) || null;
  }

  async key(index: number): Promise<string | null> {
    return Object.keys(Object.fromEntries(this.map))[index] || null;
  }

  async setItem(key: string, value: string): Promise<void> {
    this.map.set(key, value);
    defer(() => {
      this.storage.setItem(`${this.prefix}${key}`, value);
    });
  }

  async removeItem(key: string): Promise<void> {
    this.map.delete(key);
    defer(() => {
      this.storage.removeItem(`${this.prefix}${key}`);
    });
  }

  get length(): number {
    return this.map.size;
  }
}
