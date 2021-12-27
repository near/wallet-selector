import EventHandler from "../types/EventHandler";
import EventList from "../types/EventList";

const Event: EventHandler = {
  eventHandlers: {
    connect: () => {},
    disconnect: () => {},
    signIn: () => {},
  },
  addEventHandler(event: EventList, callback: () => void) {
    this.eventHandlers[event] = callback;
  },
  callEventHandler(event: EventList) {
    if (this.eventHandlers[event]) {
      this.eventHandlers[event]();
    }
  },
};

export default Event;
