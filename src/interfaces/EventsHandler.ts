import EventList from "../types/EventList";
import { EventEmitter, } from "events";



type EventMap = Record<string, any>;

type EventKey<T extends EventMap> = string & keyof T;

interface Emitter<T extends EventMap> {
  on<K extends EventKey<T>>
    (eventName: K, callback: () => {}): void;

  off<K extends EventKey<T>>
    (eventName: K, callback: () => {}): void;

  emit<K extends EventKey<T>>
    (eventName: K, params: T[K]): void;
}

export class EventHandler<T extends typeof EventList> implements Emitter<T> {
  private emitter = new EventEmitter();
  on<K extends EventKey<T>>(eventName: K, callback: () => {}) {
    this.emitter.on(eventName, callback);
  }

  off<K extends EventKey<T>>(eventName: K, callback: () => {}) {
    this.emitter.off(eventName, callback);
  }

  emit<K extends EventKey<T>>(eventName: K, params: T[K]) {
    this.emitter.emit(eventName, params);
  }
}

export default EventHandler;