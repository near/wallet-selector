import CustomWalletOptions from "./CustomWalletOptions";

type Options = {
  wallets: string[];
  customWallets: {
    [name: string]: CustomWalletOptions;
  };
  theme: "dark" | "light";
};

export default Options;
