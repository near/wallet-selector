import State from "../types/State";
import { LOCALSTORAGE_SIGNED_IN_WALLET_KEY } from "../constants";

const State: State = {
  options: {
    theme: null,
    networkId: "testnet",
    wallets: ["nearwallet", "senderwallet", "ledgerwallet"],
    customWallets: {},
  },
  walletProviders: {},
  isSignedIn: localStorage.getItem(LOCALSTORAGE_SIGNED_IN_WALLET_KEY) !== null,
  signedInWalletId: localStorage.getItem(LOCALSTORAGE_SIGNED_IN_WALLET_KEY),
};

export default State;
