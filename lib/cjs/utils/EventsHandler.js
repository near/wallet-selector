"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandler = void 0;
var events_1 = require("events");
var EventHandler = /** @class */ (function () {
    function EventHandler() {
        this.emitter = new events_1.EventEmitter();
    }
    EventHandler.prototype.on = function (eventName, callback) {
        var _this = this;
        this.emitter.on(eventName, callback);
        return {
            remove: function () { return _this.emitter.off(eventName, callback); },
        };
    };
    EventHandler.prototype.off = function (eventName, callback) {
        this.emitter.off(eventName, callback);
    };
    EventHandler.prototype.emit = function (eventName, params) {
        this.emitter.emit(eventName, params);
    };
    return EventHandler;
}());
exports.EventHandler = EventHandler;
exports.default = EventHandler;
