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
  REMEMBER_RECENT_WALLETS,
  REMEMBER_RECENT_WALLETS_STATE,
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
        rememberRecentWallets,
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
        rememberRecentWallets,
      };
    }
    case "WALLET_CONNECTED": {
      const { walletId, contract, accounts, recentlySignedInWallets } =
        action.payload;

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
    case "SET_REMEMBER_RECENT_WALLETS": {
      const { selectedWalletId, recentlySignedInWallets } = state;
      const { rememberRecentWallets } = action.payload;
      const newRecentWallets =
        rememberRecentWallets === REMEMBER_RECENT_WALLETS_STATE.ENABLED
          ? REMEMBER_RECENT_WALLETS_STATE.DISABLED
          : REMEMBER_RECENT_WALLETS_STATE.ENABLED;

      const newWalletsVal = [...recentlySignedInWallets];
      if (
        selectedWalletId &&
        !recentlySignedInWallets.includes(selectedWalletId)
      ) {
        newWalletsVal.push(selectedWalletId);
      }

      const newRecentlySignedInWallets =
        newRecentWallets === REMEMBER_RECENT_WALLETS_STATE.ENABLED
          ? newWalletsVal
          : [];

      return {
        ...state,
        rememberRecentWallets: newRecentWallets,
        recentlySignedInWallets: newRecentlySignedInWallets,
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
    rememberRecentWallets:
      (await jsonStorage.getItem(REMEMBER_RECENT_WALLETS)) || "",
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
    syncStorage(
      prevState,
      state,
      REMEMBER_RECENT_WALLETS,
      "rememberRecentWallets"
    );
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
