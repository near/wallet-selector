import type { StorageService } from "./storage.service.types";
import type { JsonStorageService } from "./json-storage.service.types";

const KEY_DELIMITER = ":";

export class JsonStorage implements JsonStorageService {
  storage: StorageService;
  namespace: string;

  constructor(storage: StorageService, namespace: string | Array<string>) {
    this.storage = storage;
    this.namespace = Array.isArray(namespace)
      ? namespace.join(KEY_DELIMITER)
      : namespace;
  }

  private resolveKey(key: string) {
    return [this.namespace, key].join(KEY_DELIMITER);
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
