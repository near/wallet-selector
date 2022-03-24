"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventsHandler_1 = require("../EventsHandler");
describe("emit", function () {
    it("calls the subscribed handlers for the event", function () {
        var emitter = new EventsHandler_1.EventHandler();
        var event = "signIn";
        var handler = jest.fn();
        emitter.on(event, handler);
        emitter.emit(event);
        expect(handler).toHaveBeenCalledTimes(1);
    });
    it("calls the subscribed handlers with data for the event", function () {
        var emitter = new EventsHandler_1.EventHandler();
        var event = "signIn";
        var data = { value: "test" };
        var handler = jest.fn();
        emitter.on(event, handler);
        emitter.emit(event, data);
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith(data);
    });
    it("calls the multiple subscribed handlers with data for the event", function () {
        var emitter = new EventsHandler_1.EventHandler();
        var event = "signIn";
        var data = { value: "test" };
        var handler = jest.fn();
        var secondHandler = jest.fn();
        emitter.on(event, handler);
        emitter.on(event, secondHandler);
        emitter.emit(event, data);
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith(data);
        expect(secondHandler).toHaveBeenCalledTimes(1);
        expect(secondHandler).toHaveBeenCalledWith(data);
    });
});
describe("off", function () {
    it("doesn't call the handler after unsubscribing", function () {
        var emitter = new EventsHandler_1.EventHandler();
        var event = "signIn";
        var handler = jest.fn();
        emitter.on(event, handler);
        emitter.off(event, handler);
        emitter.emit(event);
        expect(handler).not.toHaveBeenCalled();
    });
});
