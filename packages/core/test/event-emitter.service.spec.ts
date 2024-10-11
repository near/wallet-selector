import { EventEmitter } from "../src/lib/services/event-emitter/event-emitter.service";

describe("emit", () => {
  it("calls the subscribed handlers for the event", () => {
    const emitter = new EventEmitter();
    const event = "signIn";
    const handler = jest.fn();
    emitter.on(event, handler);
    emitter.emit(event, { accounts: [] });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("calls the subscribed handlers with data for the event", () => {
    const emitter = new EventEmitter();
    const event = "signIn";
    const data = { value: "test" };
    const handler = jest.fn();
    emitter.on(event, handler);
    emitter.emit(event, data);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(data);
  });

  it("calls the multiple subscribed handlers with data for the event", () => {
    const emitter = new EventEmitter();
    const event = "signIn";
    const data = { value: "test" };
    const handler = jest.fn();
    const secondHandler = jest.fn();
    emitter.on(event, handler);
    emitter.on(event, secondHandler);
    emitter.emit(event, data);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(data);
    expect(secondHandler).toHaveBeenCalledTimes(1);
    expect(secondHandler).toHaveBeenCalledWith(data);
  });
});

describe("off", () => {
  it("doesn't call the handler after unsubscribing", () => {
    const emitter = new EventEmitter();
    const event = "signIn";
    const handler = jest.fn();
    emitter.on(event, handler);
    emitter.off(event, handler);
    emitter.emit(event, { accounts: [] });
    expect(handler).not.toHaveBeenCalled();
  });
});
