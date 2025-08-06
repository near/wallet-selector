import type { StorageService } from "./storage.service.types";

export class WebStorageService implements StorageService {
  getItem(key: string): Promise<string | null> {
    return new Promise((resolve) => {
      const value = localStorage.getItem(key);

      resolve(value);
    });
  }

  setItem(key: string, value: string): Promise<void> {
    return new Promise((resolve) => {
      localStorage.setItem(key, value);

      resolve();
    });
  }

  removeItem(key: string): Promise<void> {
    return new Promise((resolve) => {
      localStorage.removeItem(key);

      resolve();
    });
  }
}
