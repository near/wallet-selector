import { Subject, BehaviorSubject, scan } from "rxjs";

import { logger, JsonStorage } from "./services";
import type { StorageService } from "./services";
import type {
  Store,
  WalletSelectorState,
  WalletSelectorAction,
} from "./store.types";
import {
  PACKAGE_NAME,
  CONTRACT,
  SELECTED_WALLET_ID,
  RECENTLY_SIGNED_IN_WALLETS,
  SIGN_IN_MESSAGE,
  SIGNED_IN_MESSAGE,
} from "./constants";

const reducer = (
  state: WalletSelectorState,
  action: WalletSelectorAction
): WalletSelectorState => {
  logger.log("Store Action", action);

  switch (action.type) {
    case "SETUP_WALLET_MODULES": {
      const {
        modules,
        accounts,
        contract,
        selectedWalletId,
        recentlySignedInWallets,
        message,
        signedInMessage,
      } = action.payload;

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
        recentlySignedInWallets,
        message: message,
        signedInMessage: signedInMessage,
      };
    }
    case "WALLET_CONNECTED": {
      const {
        walletId,
        contract,
        accounts,
        recentlySignedInWallets,
        message,
        signedInMessage,
      } = action.payload;

      if (!accounts.length) {
        return state;
      }

      const activeAccountIndex = state.accounts.findIndex(
        (account) => account.active
      );

      const accountStates = accounts.map((account, i) => {
        return {
          ...account,
          active: i === (activeAccountIndex > -1 ? activeAccountIndex : 0),
        };
      });

      return {
        ...state,
        contract,
        accounts: accountStates,
        selectedWalletId: walletId,
        recentlySignedInWallets,
        message,
        signedInMessage,
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
        message: null,
        signedInMessage: null,
      };
    }
    case "ACCOUNTS_CHANGED": {
      const { walletId, accounts } = action.payload;

      if (walletId !== state.selectedWalletId) {
        return state;
      }

      const activeAccount = state.accounts.find((account) => account.active);

      const isActiveAccountRemoved = !accounts.some(
        (account) => account.accountId === activeAccount?.accountId
      );

      const accountStates = accounts.map((account, i) => {
        return {
          ...account,
          active: isActiveAccountRemoved
            ? i === 0
            : account.accountId === activeAccount?.accountId,
        };
      });

      return {
        ...state,
        accounts: accountStates,
      };
    }
    case "SET_ACTIVE_ACCOUNT": {
      const { accountId } = action.payload;

      const accountStates = state.accounts.map((account) => {
        return {
          ...account,
          active: account.accountId === accountId,
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
    recentlySignedInWallets:
      (await jsonStorage.getItem(RECENTLY_SIGNED_IN_WALLETS)) || [],
    message: await jsonStorage.getItem(SIGN_IN_MESSAGE),
    signedInMessage: await jsonStorage.getItem(SIGNED_IN_MESSAGE),
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
    syncStorage(
      prevState,
      state,
      RECENTLY_SIGNED_IN_WALLETS,
      "recentlySignedInWallets"
    );
    syncStorage(prevState, state, SIGN_IN_MESSAGE, "message");
    syncStorage(prevState, state, SIGNED_IN_MESSAGE, "signedInMessage");
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
