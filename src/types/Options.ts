import CustomWalletOptions from "./CustomWalletOptions";

export type NetworkId =
  | "mainnet"
  | "testnet"
  | "betanet"
  | "ci-testnet"
  | "ci-betanet";

type Options = {
  wallets: string[];
  networkId: NetworkId;
  customWallets: {
    [name: string]: CustomWalletOptions;
  };
  theme: "dark" | "light" | null;
  accountId: string;
  walletSelectorUI: {
    description: string;
    explanation: string;
  };
};

export default Options;
