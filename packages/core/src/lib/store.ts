import { Subject, BehaviorSubject, scan } from "rxjs";

import { logger, storage } from "./services";
import {
  Store,
  WalletSelectorState,
  WalletSelectorAction,
} from "./store.types";
import { SELECTED_WALLET_ID } from "./constants";

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
      const { walletId, accounts } = action.payload;

      if (!accounts.length) {
        return state;
      }

      return {
        ...state,
        accounts,
        selectedWalletId: walletId,
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

const syncStorage = (
  prevState: WalletSelectorState,
  state: WalletSelectorState
) => {
  if (state.selectedWalletId === prevState.selectedWalletId) {
    return;
  }

  if (state.selectedWalletId) {
    storage.setItem(SELECTED_WALLET_ID, state.selectedWalletId);
    return;
  }

  storage.removeItem(SELECTED_WALLET_ID);
};

export const createStore = (): Store => {
  const initialState: WalletSelectorState = {
    modules: [],
    accounts: [],
    selectedWalletId: storage.getItem(SELECTED_WALLET_ID),
  };

  const state$ = new BehaviorSubject(initialState);
  const actions$ = new Subject<WalletSelectorAction>();

  actions$.pipe(scan(reducer, initialState)).subscribe(state$);

  let prevState = state$.getValue();
  state$.subscribe((state) => {
    syncStorage(prevState, state);
    prevState = state;
  });

  return {
    observable: state$,
    getState: () => state$.getValue(),
    dispatch: (action) => actions$.next(action),
  };
};
