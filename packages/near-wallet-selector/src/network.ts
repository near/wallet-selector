import { NetworkId } from "./interfaces/Options";

export interface NetworkConfiguration {
  networkId: string;
  nodeUrl: string;
  helperUrl: string;
  explorerUrl: string;
}

export const getNetwork = (networkId: NetworkId): NetworkConfiguration => {
  switch (networkId) {
    case "mainnet":
      return {
        networkId,
        nodeUrl: "https://rpc.mainnet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://explorer.near.org",
      };
    case "testnet":
      return {
        networkId,
        nodeUrl: "https://rpc.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
      };
    case "betanet":
      return {
        networkId,
        nodeUrl: "https://rpc.betanet.near.org",
        helperUrl: "https://helper.betanet.near.org",
        explorerUrl: "https://explorer.betanet.near.org",
      };
    case "guildnet":
      return {
        networkId,
        nodeUrl: "https://rpc.guildnet.near.org",
        helperUrl: "https://helper.guildnet.near.org",
        explorerUrl: "https://explorer.guildnet.near.org",
      };
    default:
      throw Error(`Failed to find config for: '${networkId}'`);
  }
};

export const resolveNetwork = (
  network: NetworkId | NetworkConfiguration
): NetworkConfiguration => {
  return typeof network === "string" ? getNetwork(network) : network;
};
