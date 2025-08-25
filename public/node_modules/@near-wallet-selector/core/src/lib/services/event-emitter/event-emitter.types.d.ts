export interface Subscription {
    remove: () => void;
}
export interface EventEmitterService<Events extends Record<string, unknown>> {
    on<EventName extends keyof Events>(eventName: EventName, callback: (event: Events[EventName]) => void): Subscription;
    off<EventName extends keyof Events>(eventName: EventName, callback: (event: Events[EventName]) => void): void;
    emit<EventName extends keyof Events>(eventName: EventName, event: Events[EventName]): void;
}
