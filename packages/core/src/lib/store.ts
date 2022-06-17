import { Subject, BehaviorSubject, scan } from "rxjs";

import { logger, JsonStorage } from "./services";
import { StorageService } from "./services";
import type {
  Store,
  WalletSelectorState,
  WalletSelectorAction,
} from "./store.types";
import { PACKAGE_NAME, CONTRACT, SELECTED_WALLET_ID } from "./constants";

const reducer = (
  state: WalletSelectorState,
  action: WalletSelectorAction
): WalletSelectorState => {
  logger.log("Store Action", action);

  switch (action.type) {
    case "SETUP_WALLET_MODULES": {
      const { modules, accounts, contract, selectedWalletId } = action.payload;

      const accountStates = accounts.map((account, i) => {
        return {
          ...account,
          active: i === 0,
        };
      });

      return {
        ...state,
        modules,
        accounts: accountStates,
        contract,
        selectedWalletId,
      };
    }
    case "WALLET_CONNECTED": {
      const { walletId, contract, accounts } = action.payload;

      if (!accounts.length) {
        return state;
      }

      const accountStates = accounts.map((account, i) => {
        return {
          ...account,
          active: i === 0,
        };
      });

      return {
        ...state,
        contract,
        accounts: accountStates,
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
        contract: null,
        accounts: [],
        selectedWalletId: null,
      };
    }
    case "ACCOUNTS_CHANGED": {
      const { walletId, accounts } = action.payload;

      if (walletId !== state.selectedWalletId) {
        return state;
      }

      const accountStates = accounts.map((account, i) => {
        return {
          ...account,
          active: i === 0,
        };
      });

      return {
        ...state,
        accounts: accountStates,
      };
    }
    default:
      return state;
  }
};

export const createStore = async (storage: StorageService): Promise<Store> => {
  const jsonStorage = new JsonStorage(storage, PACKAGE_NAME);
  const initialState: WalletSelectorState = {
    modules: [],
    accounts: [],
    contract: await jsonStorage.getItem(CONTRACT),
    selectedWalletId: await jsonStorage.getItem(SELECTED_WALLET_ID),
  };

  const state$ = new BehaviorSubject(initialState);
  const actions$ = new Subject<WalletSelectorAction>();

  actions$.pipe(scan(reducer, initialState)).subscribe(state$);

  const syncStorage = async (
    prevState: WalletSelectorState,
    state: WalletSelectorState,
    storageKey: string,
    property: keyof WalletSelectorState
  ) => {
    if (state[property] === prevState[property]) {
      return;
    }

    if (state[property]) {
      await jsonStorage.setItem(storageKey, state[property]);
      return;
    }

    await jsonStorage.removeItem(storageKey);
  };

  let prevState = state$.getValue();
  state$.subscribe((state) => {
    syncStorage(prevState, state, SELECTED_WALLET_ID, "selectedWalletId");
    syncStorage(prevState, state, CONTRACT, "contract");
    prevState = state;
  });

  return {
    observable: state$,
    getState: () => state$.getValue(),
    dispatch: (action) => actions$.next(action),
    toReadOnly: () => ({
      getState: () => state$.getValue(),
      observable: state$.asObservable(),
    }),
  };
};
