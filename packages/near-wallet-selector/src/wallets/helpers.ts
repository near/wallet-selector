import { LOCAL_STORAGE_SELECTED_WALLET_ID } from "../constants";
import { updateState } from "../state/State";
import { storage } from "../services/persistent-storage.service";

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
