import { EventEmitter, } from "events";

type EventList = "init" | "disconnect" | "signIn";

type EventMap = Record<EventList, unknown>;

type EventKey = keyof EventMap;

export interface Emitter<T extends EventMap = EventMap> {
  on<K extends EventKey>
    (eventName: K, callback: () => {}): void;

  off<K extends EventKey>
    (eventName: K, callback: () => {}): void;

  emit<K extends EventKey>
    (eventName: K, params?: T[K]): void;
}

export class EventHandler<T extends EventMap> implements Emitter<T> {
  private emitter = new EventEmitter();
  on<K extends EventKey>(eventName: K, callback: () => {}) {
    this.emitter.on(eventName, callback);
  }

  off<K extends EventKey>(eventName: K, callback: () => {}) {
    this.emitter.off(eventName, callback);
  }

  emit<K extends EventKey>(eventName: K, params: T[K]) {
    this.emitter.emit(eventName, params);
  }
}

export default EventHandler;