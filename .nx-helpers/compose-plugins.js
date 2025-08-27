"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composePlugins = void 0;
const tslib_1 = require("tslib");
function composePlugins(...plugins) {
    return function (baseConfig) {
        return function combined(phase, context) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                let config = baseConfig;
                for (const plugin of plugins) {
                    const fn = yield plugin;
                    const configOrFn = fn(config);
                    if (typeof configOrFn === 'function') {
                        config = yield configOrFn(phase, context);
                    }
                    else {
                        config = configOrFn;
                    }
                }
                return config;
            });
        };
    };
}
exports.composePlugins = composePlugins;
//# sourceMappingURL=compose-plugins.js.map