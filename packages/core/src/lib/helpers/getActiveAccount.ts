import { AccountState } from "../store.types";
import { WalletSelectorStore } from "../wallet-selector.types";

export const getActiveAccount = (
  store: WalletSelectorStore
): AccountState | null => {
  return store.getState().accounts.find((account) => account.active) || null;
};
