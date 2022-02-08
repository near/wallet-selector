import { LOCALSTORAGE_SIGNED_IN_WALLET_KEY } from "../constants";
import IWallet from "../interfaces/IWallet";

export interface State {
  showModal: boolean;
  showWalletOptions: boolean;
  showLedgerDerivationPath: boolean;
  showSenderWalletNotInstalled: boolean;
  showSwitchNetwork: boolean;
  walletProviders: {
    [name: string]: IWallet;
  };
  isSignedIn: boolean;
  signedInWalletId: string | null;
}

const state: { current: State } = {
  current: {
    showModal: false,
    showWalletOptions: true,
    showLedgerDerivationPath: false,
    showSenderWalletNotInstalled: false,
    showSwitchNetwork: false,
    walletProviders: {},
    isSignedIn:
      localStorage.getItem(LOCALSTORAGE_SIGNED_IN_WALLET_KEY) !== null,
    signedInWalletId: localStorage.getItem(LOCALSTORAGE_SIGNED_IN_WALLET_KEY),
  },
};

export const updateState = (func: (prevState: State) => State) => {
  const nextState = func(state.current);
  state.current = nextState;
  if (window.updateWalletSelector) {
    window.updateWalletSelector(nextState);
  }
};

export const getState = () => {
  return state.current;
};
