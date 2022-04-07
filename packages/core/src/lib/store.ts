import { BehaviorSubject } from "rxjs";
import {
  Store,
  WalletSelectorState,
  WalletSelectorAction,
} from "./store.types";

const reducer = (state: WalletSelectorState, action: WalletSelectorAction) => {
  switch (action.type) {
    case "SETUP_WALLET_MODULES": {
      const { wallets, selectedWalletId } = action.payload;

      return {
        ...state,
        wallets: wallets.map((wallet) => {
          return {
            ...wallet,
            selected: wallet.id === selectedWalletId,
          };
        }),
      };
    }
    case "WALLET_CONNECTED": {
      const { walletId, pending, accounts } = action.payload;

      return {
        ...state,
        showModal: pending,
        wallets: state.wallets.map((wallet) => {
          if (wallet.id === walletId) {
            return {
              ...wallet,
              selected: !pending && !!accounts.length,
            };
          }

          if (wallet.selected) {
            return {
              ...wallet,
              selected: false,
            };
          }

          return wallet;
        }),
        accounts,
      };
    }
    case "WALLET_DISCONNECTED": {
      return {
        ...state,
        wallets: state.wallets.map((wallet) => {
          if (!wallet.selected) {
            return wallet;
          }

          return {
            ...wallet,
            selected: false,
          };
        }),
      };
    }
    case "ACCOUNTS_CHANGED": {
      const { accounts } = action.payload;

      return {
        ...state,
        accounts,
      };
    }
    case "UPDATE":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const createStore = (
  initialState: Partial<WalletSelectorState> &
    Pick<WalletSelectorState, "network" | "contract">
): Store => {
  const subject = new BehaviorSubject<WalletSelectorState>({
    accounts: [],
    wallets: [],
    showModal: false,
    showWalletOptions: true,
    showLedgerDerivationPath: false,
    showWalletNotInstalled: null,
    showSwitchNetwork: false,
    ...initialState,
  });

  return {
    observable: subject,
    getState: () => subject.getValue(),
    dispatch: (action) => {
      const state = subject.getValue();

      subject.next(reducer(state, action));
    },
  };
};
