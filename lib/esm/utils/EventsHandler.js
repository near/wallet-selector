import { EventEmitter } from "events";
var EventHandler = /** @class */ (function () {
    function EventHandler() {
        this.emitter = new EventEmitter();
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
export { EventHandler };
export default EventHandler;
