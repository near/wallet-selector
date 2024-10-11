export class WebStorageService {
    getItem(key) {
        return new Promise((resolve) => {
            const value = localStorage.getItem(key);
            resolve(value);
        });
    }
    setItem(key, value) {
        return new Promise((resolve) => {
            localStorage.setItem(key, value);
            resolve();
        });
    }
    removeItem(key) {
        return new Promise((resolve) => {
            localStorage.removeItem(key);
            resolve();
        });
    }
}
