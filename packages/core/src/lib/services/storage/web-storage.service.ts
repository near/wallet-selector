import type { StorageService } from "./storage.service.types";

export class WebStorageService implements StorageService {
  getItem(key: string): Promise<string | null> {
    if (typeof localStorage === "undefined") {
      return Promise.resolve(null);
    }

    return new Promise((resolve) => {
      const value = localStorage.getItem(key);

      resolve(value);
    });
  }

  setItem(key: string, value: string): Promise<void> {
    if (typeof localStorage === "undefined") {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      localStorage.setItem(key, value);

      resolve();
    });
  }

  removeItem(key: string): Promise<void> {
    if (typeof localStorage === "undefined") {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      localStorage.removeItem(key);

      resolve();
    });
  }
}
