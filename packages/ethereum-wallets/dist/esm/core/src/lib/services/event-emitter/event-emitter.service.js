import { EventEmitter as NEventEmitter } from "events";
export class EventEmitter {
    emitter = new NEventEmitter();
    on(eventName, callback) {
        this.emitter.on(eventName, callback);
        return {
            remove: () => this.emitter.off(eventName, callback),
        };
    }
    off(eventName, callback) {
        this.emitter.off(eventName, callback);
    }
    emit(eventName, event) {
        this.emitter.emit(eventName, event);
    }
}
