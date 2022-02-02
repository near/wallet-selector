import { Promisify } from "../utils/types";
import { defer } from "../utils/HelperFunctions";

export class StorageService implements Promisify<Storage> {
  static instances = new Map<string, StorageService>();

  private readonly map = new Map<string, string>();

  constructor(private readonly prefix: string) {
    if(StorageService.instances.has(prefix)) {
      return StorageService.instances.get(prefix)!;
    }

    StorageService.instances.set(prefix, this);
    this.init();
  }

  private init() {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(this.prefix)) {
        this.map.set(key.slice(this.prefix.length), localStorage.getItem(key)!);
      }
    });
  }

  async clear(): Promise<void> {
    this.map.clear();
    defer(() => {
      localStorage.clear();
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
      localStorage.setItem(`${this.prefix}${key}`, value);
    });
  }

  async removeItem(key: string): Promise<void> {
    this.map.delete(key);
    defer(() => {
      localStorage.removeItem(`${this.prefix}${key}`);
    });
  }

  get length(): number {
    return this.map.size;
  }
}
