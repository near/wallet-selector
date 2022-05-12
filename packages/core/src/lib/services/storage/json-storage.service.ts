import { StorageService } from "./storage.service.types";
import { JSONStorageService } from "./json-storage.service.types";

export class JSONStorage implements JSONStorageService {
  storage: StorageService;
  namespace?: string;

  constructor(storage: StorageService, namespace?: string) {
    this.storage = storage;
    this.namespace = namespace;
  }

  private resolveKey(key: string) {
    if (!this.namespace) {
      return key;
    }

    return [this.namespace, key].join(":");
  }

  getItem<Value>(key: string): Promise<Value | null> {
    return this.storage.getItem(this.resolveKey(key)).then((item) => {
      return typeof item === "string" ? (JSON.parse(item) as Value) : null;
    });
  }

  setItem<Value>(key: string, value: Value): Promise<void> {
    return this.storage.setItem(this.resolveKey(key), JSON.stringify(value));
  }

  removeItem(key: string): Promise<void> {
    return this.storage.removeItem(this.resolveKey(key));
  }
}
