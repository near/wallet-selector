import { EventEmitter as NEventEmitter } from "events";
import type { EventEmitterService, Subscription } from "./event-emitter.types";

export class EventEmitter<Events extends Record<string, unknown>>
  implements EventEmitterService<Events>
{
  private emitter = new NEventEmitter();

  on<Event extends keyof Events>(
    eventName: Event,
    callback: (event: Events[Event]) => void
  ): Subscription {
    this.emitter.on(eventName as string, callback);

    return {
      remove: () => this.emitter.off(eventName as string, callback),
    };
  }

  off<Event extends keyof Events>(
    eventName: Event,
    callback: (event: Events[Event]) => void
  ) {
    this.emitter.off(eventName as string, callback);
  }

  emit<Event extends keyof Events>(eventName: Event, event: Events[Event]) {
    this.emitter.emit(eventName as string, event);
  }
}
