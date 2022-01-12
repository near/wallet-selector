import CustomWalletOptions from "./CustomWalletOptions";

type Options = {
  wallets: string[];
  networkId: string;
  customWallets: {
    [name: string]: CustomWalletOptions;
  };
  theme: "dark" | "light" | null;
  contract: {
    address: string;
    viewMethods: string[];
    changeMethods: string[];
  };
  walletSelectorUI: {
    description: string;
    explanation: string;
  };
};

export default Options;
