import EventList from "../types/EventList";

type EventHandler = {
  eventHandlers: {
    connect: () => void;
    disconnect: () => void;
    signIn: () => void;
    connected: () => void;
  };
  addEventHandler(event: EventList, callback: () => void): void;
  callEventHandler(event: EventList): void;
};

export default EventHandler;
