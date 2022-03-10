export class PersistentStorage {
  private static instances = new Map<string, PersistentStorage>();

  private readonly map = new Map<string, string>();

  constructor(
    public readonly prefix: string,
    private readonly storage: Storage = window?.localStorage
  ) {
    if (!storage) {
      throw new Error("No storage available");
    }

    if (PersistentStorage.instances.has(prefix)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return PersistentStorage.instances.get(prefix)!;
    }
    PersistentStorage.instances.set(prefix, this);
    this.init();
  }

  private init() {
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (key?.startsWith(`${this.prefix}-`)) {
        const value = this.storage.getItem(key);
        if (value) {
          this.map.set(key.replace(`${this.prefix}-`, ""), value);
        }
      }
    }
  }

  clear(): void {
    this.map.clear();
  }
  getItem(key: string): string | null {
    return this.map.get(key) || null;
  }

  key(index: number): string | null {
    return Object.keys(Object.fromEntries(this.map))[index] || null;
  }

  setItem(key: string, value: string): void {
    this.map.set(key, value);
    this.storage.setItem(`${this.prefix}-${key}`, value);
  }

  removeItem(key: string): void {
    this.map.delete(key);
  }

  get length(): number {
    return this.map.size;
  }
}
