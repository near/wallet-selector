import { WalletSelectorParams } from "./wallet-selector.types";
import { Options, Network, NetworkId } from "./options.types";

export const getNetworkPreset = (networkId: NetworkId): Network => {
  switch (networkId) {
    case "mainnet":
      return {
        networkId,
        nodeUrl: "https://rpc.mainnet.near.org",
        // helperUrl: "https://helper.mainnet.near.org",
        // explorerUrl: "https://explorer.near.org",
        // restApiUrl: "https://rest.nearapi.org",
      };
    case "testnet":
      return {
        networkId,
        nodeUrl: "https://rpc.testnet.near.org",
        // helperUrl: "https://helper.testnet.near.org",
        // explorerUrl: "https://explorer.testnet.near.org",
        // restApiUrl: "https://rest.nearapi.org",
      };
    case "betanet":
      return {
        networkId,
        nodeUrl: "https://rpc.betanet.near.org",
        // helperUrl: "https://helper.betanet.near.org",
        // explorerUrl: "https://explorer.betanet.near.org",
        // restApiUrl: "https://rest.nearapi.org",
      };
    default:
      throw Error(`Failed to find config for: '${networkId}'`);
  }
};

export const resolveNetwork = (network: NetworkId | Network): Network => {
  return typeof network === "string" ? getNetworkPreset(network) : network;
};

export const resolveOptions = (params: WalletSelectorParams): Options => {
  return {
    network: resolveNetwork(params.network),
    contractId: params.contractId,
    methodNames: params.methodNames,
  };
};
