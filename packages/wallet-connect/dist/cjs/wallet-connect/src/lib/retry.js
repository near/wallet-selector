"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retry = void 0;
const timeout = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
const retry = (func, opts = {}) => {
    const { retries = 5, interval = 500 } = opts;
    return func().catch((err) => {
        if (retries <= 1) {
            throw err;
        }
        return timeout(interval).then(() => {
            return (0, exports.retry)(func, {
                ...opts,
                retries: retries - 1,
                interval: interval * 1.5,
            });
        });
    });
};
exports.retry = retry;
