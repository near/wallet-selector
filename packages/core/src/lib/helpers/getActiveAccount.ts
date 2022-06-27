import type { AccountState, WalletSelectorState } from "../store.types";

export const getActiveAccount = (
  state: WalletSelectorState
): AccountState | null => {
  return state.accounts.find((account) => account.active) || null;
};
