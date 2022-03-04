import { NetworkId } from "./interfaces/Options";

export interface NetworkConfiguration {
  networkId: NetworkId;
  nodeUrl: string;
  walletUrl: string;
  helperUrl: string;
}

const getConfig = (networkId: NetworkId): NetworkConfiguration => {
  switch (networkId) {
    case "mainnet":
      return {
        networkId,
        nodeUrl: "https://rpc.mainnet.near.org",
        walletUrl: "https://wallet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
      };
    case "testnet":
      return {
        networkId,
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
      };
    case "betanet":
      return {
        networkId,
        nodeUrl: "https://rpc.betanet.near.org",
        walletUrl: "https://wallet.betanet.near.org",
        helperUrl: "https://helper.betanet.near.org",
      };
    default:
      throw Error(`Failed to find config for: '${networkId}'`);
  }
};

export default getConfig;
