import type { StorageService } from "./storage.service.types";
import type { JsonStorageService } from "./json-storage.service.types";
export declare class JsonStorage implements JsonStorageService {
    storage: StorageService;
    namespace: string;
    constructor(storage: StorageService, namespace: string | Array<string>);
    private resolveKey;
    getItem<Value>(key: string): Promise<Value | null>;
    setItem<Value>(key: string, value: Value): Promise<void>;
    removeItem(key: string): Promise<void>;
}
