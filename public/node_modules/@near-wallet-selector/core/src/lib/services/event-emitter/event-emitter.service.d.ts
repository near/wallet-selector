import type { EventEmitterService, Subscription } from "./event-emitter.types";
export declare class EventEmitter<Events extends Record<string, unknown>> implements EventEmitterService<Events> {
    private emitter;
    on<Event extends keyof Events>(eventName: Event, callback: (event: Events[Event]) => void): Subscription;
    off<Event extends keyof Events>(eventName: Event, callback: (event: Events[Event]) => void): void;
    emit<Event extends keyof Events>(eventName: Event, event: Events[Event]): void;
}
