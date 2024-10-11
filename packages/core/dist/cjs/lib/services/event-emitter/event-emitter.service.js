"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
const events_1 = require("events");
class EventEmitter {
    emitter = new events_1.EventEmitter();
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
exports.EventEmitter = EventEmitter;
