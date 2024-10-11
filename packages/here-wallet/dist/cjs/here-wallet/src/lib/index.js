"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.icon = void 0;
exports.setupHereWallet = setupHereWallet;
const core_1 = require("@here-wallet/core");
const selector_1 = require("./selector");
const icon_1 = __importDefault(require("./icon"));
exports.icon = icon_1.default;
function setupHereWallet({ deprecated = false, iconUrl = icon_1.default, walletOptions, } = {}) {
    return async () => {
        const isInjected = await core_1.waitInjectedHereWallet;
        return {
            id: "here-wallet",
            type: "injected",
            metadata: {
                name: "Here Wallet",
                description: "Mobile wallet for NEAR Protocol",
                useUrlAccountImport: true,
                downloadUrl: "https://herewallet.app",
                topLevelInjected: isInjected != null,
                iconUrl,
                deprecated,
                available: true,
            },
            init: (config) => (0, selector_1.initHereWallet)({ ...config, walletOptions }),
        };
    };
}
