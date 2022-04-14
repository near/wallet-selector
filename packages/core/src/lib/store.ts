import { BehaviorSubject } from "rxjs";

import { logger } from "./services";
import {
  Store,
  WalletSelectorState,
  WalletSelectorAction,
} from "./store.types";

const reducer = (
  state: WalletSelectorState,
  action: WalletSelectorAction
): WalletSelectorState => {
  logger.log("Store Action", action);

  switch (action.type) {
    case "SETUP_WALLET_MODULES": {
      const { wallets, selectedWalletId, accounts } = action.payload;

      return {
        ...state,
        wallets: wallets.map((wallet) => ({
          id: wallet.id,
          name: wallet.name,
          description: wallet.description,
          iconUrl: wallet.iconUrl,
          type: wallet.type,
          selected: wallet.id === selectedWalletId,
        })),
        accounts,
      };
    }
    case "WALLET_CONNECTED": {
      const { walletId, pending, accounts } = action.payload;

      return {
        ...state,
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
        accounts: [],
      };
    }
    case "ACCOUNTS_CHANGED": {
      const { accounts } = action.payload;

      return {
        ...state,
        accounts,
      };
    }
    default:
      return state;
  }
};

export const createStore = (
  initialState: Partial<WalletSelectorState> &
    Pick<WalletSelectorState, "options">
): Store => {
  const subject = new BehaviorSubject<WalletSelectorState>({
    accounts: [],
    wallets: [],
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
