import { Options } from "near-wallet-selector/core";

const CONTRACT_NAME = "guest-book.testnet";

interface Configuration {
  networkId: Options["networkId"];
  contractName: string;
  nodeUrl: string;
  walletUrl: string;
  helperUrl: string;
}

const getConfig = (networkId: Options["networkId"]): Configuration => {
  switch (networkId) {
    case "mainnet":
      return {
        networkId,
        nodeUrl: "https://rpc.mainnet.near.org",
        contractName: CONTRACT_NAME,
        walletUrl: "https://wallet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
      };
    case "betanet":
      return {
        networkId,
        nodeUrl: "https://rpc.betanet.near.org",
        contractName: CONTRACT_NAME,
        walletUrl: "https://wallet.betanet.near.org",
        helperUrl: "https://helper.betanet.near.org",
      };
    case "testnet":
      return {
        networkId,
        nodeUrl: "https://rpc.testnet.near.org",
        contractName: CONTRACT_NAME,
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
      };
    default:
      throw Error(`Invalid networkId '${networkId}'.`);
  }
};

export default getConfig;
