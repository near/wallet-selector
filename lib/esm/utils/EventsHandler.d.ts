export declare type EventList = "signIn" | "signOut";
declare type EventMap = Record<EventList, unknown>;
declare type EventKey = keyof EventMap;
export interface Subscription {
    remove: () => void;
}
export interface Emitter<T extends EventMap = EventMap> {
    on<K extends EventKey>(eventName: K, callback: () => void): Subscription;
    off<K extends EventKey>(eventName: K, callback: () => void): void;
    emit<K extends EventKey>(eventName: K, params?: T[K]): void;
}
export declare class EventHandler<T extends EventMap> implements Emitter<T> {
    private emitter;
    on<K extends EventKey>(eventName: K, callback: () => void): Subscription;
    off<K extends EventKey>(eventName: K, callback: () => void): void;
    emit<K extends EventKey>(eventName: K, params?: T[K]): void;
}
export default EventHandler;
