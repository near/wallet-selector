import type { StorageService } from "./storage.service.types";
export declare class WebStorageService implements StorageService {
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
}
