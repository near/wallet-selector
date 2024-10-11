"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitFor = void 0;
const wait = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
const poll = async (cb, interval, remaining) => {
    const result = cb();
    if (result) {
        return result;
    }
    if (!remaining) {
        throw new Error("Exceeded timeout");
    }
    return wait(interval).then(() => poll(cb, interval, remaining - 1));
};
const waitFor = async (cb, opts = {}) => {
    const { timeout = 100, interval = 50 } = opts;
    return Promise.race([
        wait(timeout).then(() => {
            throw new Error("Exceeded timeout");
        }),
        poll(cb, interval, Math.floor(timeout / interval)),
    ]);
};
exports.waitFor = waitFor;
