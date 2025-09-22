import type { WalletSelectorParams } from "./wallet-selector.types";
import type { Options, Network, NetworkId } from "./options.types";
import { WebStorageService } from "./services";

export const getNetworkPreset = (
  networkId: NetworkId,
  fallbackRpcUrls?: Array<string>
): Network => {
  switch (networkId) {
    case "mainnet":
      return {
        networkId,
        nodeUrl: fallbackRpcUrls?.[0] || "https://free.rpc.fastnear.com",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://nearblocks.io",
        indexerUrl: "https://api.fastnear.com/v0",
      };
    case "testnet":
      return {
        networkId,
        nodeUrl: fallbackRpcUrls?.[0] || "https://test.rpc.fastnear.com",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://testnet.nearblocks.io",
        indexerUrl: "https://test.api.fastnear.com/v0",
      };
    default:
      throw Error(`Failed to find config for: '${networkId}'`);
  }
};

export const resolveNetwork = (network: NetworkId | Network): Network => {
  return typeof network === "string" ? getNetworkPreset(network) : network;
};

export const resolveOptions = (params: WalletSelectorParams) => {
  const options: Options = {
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
