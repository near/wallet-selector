"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveOptions = exports.resolveNetwork = exports.getNetworkPreset = void 0;
const services_1 = require("./services");
const getNetworkPreset = (networkId, fallbackRpcUrls) => {
    switch (networkId) {
        case "mainnet":
            return {
                networkId,
                nodeUrl: fallbackRpcUrls?.[0] || "https://rpc.mainnet.near.org",
                helperUrl: "https://helper.mainnet.near.org",
                explorerUrl: "https://nearblocks.io",
                indexerUrl: "https://api.kitwallet.app",
            };
        case "testnet":
            return {
                networkId,
                nodeUrl: fallbackRpcUrls?.[0] || "https://rpc.testnet.near.org",
                helperUrl: "https://helper.testnet.near.org",
                explorerUrl: "https://testnet.nearblocks.io",
                indexerUrl: "https://testnet-api.kitwallet.app",
            };
        default:
            throw Error(`Failed to find config for: '${networkId}'`);
    }
};
exports.getNetworkPreset = getNetworkPreset;
const resolveNetwork = (network) => {
    return typeof network === "string" ? (0, exports.getNetworkPreset)(network) : network;
};
exports.resolveNetwork = resolveNetwork;
const resolveOptions = (params) => {
    const options = {
        languageCode: params.languageCode || undefined,
        network: (0, exports.resolveNetwork)(params.network),
        debug: params.debug || false,
        optimizeWalletOrder: params.optimizeWalletOrder === false ? false : true,
        randomizeWalletOrder: params.randomizeWalletOrder || false,
        relayerUrl: params.relayerUrl || undefined,
    };
    return {
        options,
        storage: params.storage || new services_1.WebStorageService(),
    };
};
exports.resolveOptions = resolveOptions;
