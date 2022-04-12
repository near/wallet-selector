import { storage } from "./services";
import { LOCAL_STORAGE_SELECTED_WALLET_ID } from "./constants";

declare global {
  // tslint:disable-next-line
  interface Window {
    updateWalletSelector: (state: State) => void;
  }
}

export interface State {
  showModal: boolean;
  showWalletOptions: boolean;
  showLedgerDerivationPath: boolean;
  showWalletNotInstalled: string | null;
  showSwitchNetwork: boolean;
  selectedWalletId: string | null;
}

const state: { current: State } = {
  current: {
    showModal: false,
    showWalletOptions: true,
    showLedgerDerivationPath: false,
    showWalletNotInstalled: null,
    showSwitchNetwork: false,
    selectedWalletId: null,
  },
};

export const updateState = (func: (prevState: State) => State) => {
  const nextState = func(state.current);

  // Synchronise storage.
  if (state.current.selectedWalletId !== nextState.selectedWalletId) {
    const storageKey = LOCAL_STORAGE_SELECTED_WALLET_ID;

    if (nextState.selectedWalletId) {
      storage.setItem(storageKey, nextState.selectedWalletId);
    } else {
      storage.removeItem(storageKey);
    }
  }

  state.current = nextState;

  if (window.updateWalletSelector) {
    window.updateWalletSelector(nextState);
  }
};

export const getState = () => {
  return state.current;
};

export const setSelectedWalletId = (walletId: string | null) => {
  if (walletId) {
    storage.setItem(LOCAL_STORAGE_SELECTED_WALLET_ID, walletId);

    updateState((prevState) => ({
      ...prevState,
      showModal: false,
      selectedWalletId: walletId,
    }));
  } else {
    storage.removeItem(LOCAL_STORAGE_SELECTED_WALLET_ID);

    updateState((prevState) => ({
      ...prevState,
      selectedWalletId: null,
    }));
  }
};
