import EventList from "../types/EventList";

interface EventHandler {
  eventHandlers: {
    init: () => void;
    disconnect: () => void;
    signIn: () => void;
  };
  addEventHandler(event: EventList, callback: () => void): void;
  callEventHandler(event: EventList): void;
}

export default EventHandler;
