class Observable {
    constructor() {
        this.subscribers = [];
        this.data = null;
    }

    subscribe(fn) {
        this.subscribers.push(fn);
    }

    notify(data) {
        this.data = data;
        this.subscribers.forEach(fn => fn(data));
    }
}

export default Observable;