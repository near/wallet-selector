import CustomWalletOptions from "./CustomWalletOptions";

type Options = {
  wallets: string[];
  networkId: string;
  customWallets: {
    [name: string]: CustomWalletOptions;
  };
  theme: "dark" | "light" | null;
};

export default Options;
