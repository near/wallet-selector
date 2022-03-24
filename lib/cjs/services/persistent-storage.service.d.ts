export declare class PersistentStorage {
    private prefix;
    private storage;
    private static instances;
    private readonly map;
    constructor(prefix?: string, storage?: Storage);
    private init;
    clear(): void;
    getItem<Value>(key: string): Value | null;
    key(index: number): string | null;
    setItem(key: string, value: unknown): void;
    removeItem(key: string): void;
    get length(): number;
}
export declare const storage: PersistentStorage;
