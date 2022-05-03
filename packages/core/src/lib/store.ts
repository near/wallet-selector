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
      const { modules, selectedWalletId, accounts } = action.payload;

      return {
        ...state,
        modules,
        accounts,
        selectedWalletId,
      };
    }
    case "WALLET_CONNECTED": {
      const { walletId, pending, accounts } = action.payload;

      return {
        ...state,
        accounts,
        selectedWalletId: !pending && accounts.length ? walletId : null,
      };
    }
    case "WALLET_DISCONNECTED": {
      const { walletId } = action.payload;

      if (walletId !== state.selectedWalletId) {
        return state;
      }

      return {
        ...state,
        accounts: [],
        selectedWalletId: null,
      };
    }
    case "ACCOUNTS_CHANGED": {
      const { walletId, accounts } = action.payload;

      if (walletId !== state.selectedWalletId) {
        return state;
      }

      return {
        ...state,
        accounts,
      };
    }
    default:
      return state;
  }
};

export const createStore = (): Store => {
  const subject = new BehaviorSubject<WalletSelectorState>({
    modules: [],
    accounts: [],
    selectedWalletId: null,
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
