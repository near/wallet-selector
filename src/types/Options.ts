import CustomWalletOptions from "./CustomWalletOptions";

type Options = {
  wallets: string[];
  networkId: string;
  customWallets: {
    [name: string]: CustomWalletOptions;
  };
  theme: "dark" | "light" | null;
  walletSelectorUI: {
    description: string;
    explanation: string;
  };
};

export default Options;
