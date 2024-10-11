import { WebStorageService } from "./services";
export const getNetworkPreset = (networkId, fallbackRpcUrls) => {
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
export const resolveNetwork = (network) => {
    return typeof network === "string" ? getNetworkPreset(network) : network;
};
export const resolveOptions = (params) => {
    const options = {
        languageCode: params.languageCode || undefined,
        network: resolveNetwork(params.network),
        debug: params.debug || false,
        optimizeWalletOrder: params.optimizeWalletOrder === false ? false : true,
        randomizeWalletOrder: params.randomizeWalletOrder || false,
        relayerUrl: params.relayerUrl || undefined,
    };
    return {
        options,
        storage: params.storage || new WebStorageService(),
    };
};
