import { LOCAL_STORAGE_SELECTED_WALLET_ID } from "../constants";
import { updateState } from "../state/State";

export const setSelectedWalletId = (walletId: string | null) => {
  if (walletId) {
    localStorage.setItem(
      LOCAL_STORAGE_SELECTED_WALLET_ID,
      JSON.stringify(walletId)
    );

    updateState((prevState) => ({
      ...prevState,
      showModal: false,
      selectedWalletId: walletId,
    }));
  } else {
    window.localStorage.removeItem(LOCAL_STORAGE_SELECTED_WALLET_ID);

    updateState((prevState) => ({
      ...prevState,
      selectedWalletId: null,
    }));
  }
};
