const KEY_DELIMITER = ":";
export class JsonStorage {
    storage;
    namespace;
    constructor(storage, namespace) {
        this.storage = storage;
        this.namespace = Array.isArray(namespace)
            ? namespace.join(KEY_DELIMITER)
            : namespace;
    }
    resolveKey(key) {
        return [this.namespace, key].join(KEY_DELIMITER);
    }
    getItem(key) {
        return this.storage.getItem(this.resolveKey(key)).then((item) => {
            return typeof item === "string" ? JSON.parse(item) : null;
        });
    }
    setItem(key, value) {
        return this.storage.setItem(this.resolveKey(key), JSON.stringify(value));
    }
    removeItem(key) {
        return this.storage.removeItem(this.resolveKey(key));
    }
}
