import { EventEmitter } from "events";

export interface Subscription {
  remove: () => void;
}

export interface Emitter<Events extends Record<string, unknown>> {
  on<Event extends keyof Events>(
    event: Event,
    callback: (data: Events[Event]) => void
  ): Subscription;

  off<Event extends keyof Events>(
    event: Event,
    callback: (data: Events[Event]) => void
  ): void;

  emit<Event extends keyof Events>(event: Event, data: Events[Event]): void;
}

export class EventHandler<Events extends Record<string, unknown>>
  implements Emitter<Events>
{
  private emitter = new EventEmitter();

  on<Event extends keyof Events>(
    event: Event,
    callback: (data: Events[Event]) => void
  ): Subscription {
    this.emitter.on(event as string, callback);

    return {
      remove: () => this.emitter.off(event as string, callback),
    };
  }

  off<Event extends keyof Events>(
    event: Event,
    callback: (data: Events[Event]) => void
  ) {
    this.emitter.off(event as string, callback);
  }

  emit<Event extends keyof Events>(event: Event, data: Events[Event]) {
    this.emitter.emit(event as string, data);
  }
}

export default EventHandler;
