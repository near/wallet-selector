export interface JsonStorageService {
    getItem<Value>(key: string): Promise<Value | null>;
    setItem<Value>(key: string, value: Value): Promise<void>;
    removeItem(key: string): Promise<void>;
}
//# sourceMappingURL=json-storage.service.types.d.ts.map