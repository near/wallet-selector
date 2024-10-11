"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.Logger = void 0;
class Logger {
    static debug = false;
    namespace;
    constructor(namespace) {
        this.namespace = namespace;
    }
    emit(method, ...params) {
        if (!Logger.debug) {
            return;
        }
        if (this.namespace && method !== "error") {
            // eslint-disable-next-line no-console
            console[method](this.namespace, ...params);
            return;
        }
        // eslint-disable-next-line no-console
        console[method](...params);
    }
    log(...params) {
        this.emit("log", ...params);
    }
    info(...params) {
        this.emit("info", ...params);
    }
    warn(...params) {
        this.emit("warn", ...params);
    }
    error(...params) {
        this.emit("error", ...params);
    }
}
exports.Logger = Logger;
exports.logger = new Logger();
