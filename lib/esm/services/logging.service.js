var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Logger = /** @class */ (function () {
    function Logger(logger) {
        if (logger === void 0) { logger = window === null || window === void 0 ? void 0 : window.console; }
        this.logger = logger;
    }
    Object.defineProperty(Logger, "debug", {
        get: function () {
            return Logger._debug;
        },
        set: function (value) {
            Logger._debug = value;
        },
        enumerable: false,
        configurable: true
    });
    Logger.prototype.log = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.trigger.apply(this, __spreadArray(["log"], params, false));
    };
    Logger.prototype.error = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.trigger.apply(this, __spreadArray(["error"], params, false));
    };
    Logger.prototype.info = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.trigger.apply(this, __spreadArray(["info"], params, false));
    };
    Logger.prototype.warn = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.trigger.apply(this, __spreadArray(["warn"], params, false));
    };
    Logger.prototype.trigger = function (method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!Logger._debug) {
            return;
        }
        this.logger[method].apply(console, args);
    };
    Logger._debug = false;
    return Logger;
}());
export { Logger };
export var logger = new Logger();
