"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStore = void 0;
const rxjs_1 = require("rxjs");
const services_1 = require("./services");
const constants_1 = require("./constants");
const reducer = (state, action) => {
    services_1.logger.log("Store Action", action);
    switch (action.type) {
        case "SETUP_WALLET_MODULES": {
            const { modules, accounts, contract, selectedWalletId, recentlySignedInWallets, rememberRecentWallets, } = action.payload;
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
            const { walletId, contract, accounts, recentlySignedInWallets } = action.payload;
            if (!accounts.length) {
                return state;
            }
            const activeAccountIndex = state.accounts.findIndex((account) => account.active);
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
            const isActiveAccountRemoved = !accounts.some((account) => account.accountId === activeAccount?.accountId);
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
            const newRecentWallets = rememberRecentWallets === constants_1.REMEMBER_RECENT_WALLETS_STATE.ENABLED
                ? constants_1.REMEMBER_RECENT_WALLETS_STATE.DISABLED
                : constants_1.REMEMBER_RECENT_WALLETS_STATE.ENABLED;
            const newWalletsVal = [...recentlySignedInWallets];
            if (selectedWalletId &&
                !recentlySignedInWallets.includes(selectedWalletId)) {
                newWalletsVal.push(selectedWalletId);
            }
            const newRecentlySignedInWallets = newRecentWallets === constants_1.REMEMBER_RECENT_WALLETS_STATE.ENABLED
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
const createStore = async (storage) => {
    const jsonStorage = new services_1.JsonStorage(storage, constants_1.PACKAGE_NAME);
    const initialState = {
        modules: [],
        accounts: [],
        contract: await jsonStorage.getItem(constants_1.CONTRACT),
        selectedWalletId: await jsonStorage.getItem(constants_1.SELECTED_WALLET_ID),
        recentlySignedInWallets: (await jsonStorage.getItem(constants_1.RECENTLY_SIGNED_IN_WALLETS)) || [],
        rememberRecentWallets: (await jsonStorage.getItem(constants_1.REMEMBER_RECENT_WALLETS)) || "",
    };
    const state$ = new rxjs_1.BehaviorSubject(initialState);
    const actions$ = new rxjs_1.Subject();
    actions$.pipe((0, rxjs_1.scan)(reducer, initialState)).subscribe(state$);
    const syncStorage = async (prevState, state, storageKey, property) => {
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
        syncStorage(prevState, state, constants_1.SELECTED_WALLET_ID, "selectedWalletId");
        syncStorage(prevState, state, constants_1.CONTRACT, "contract");
        syncStorage(prevState, state, constants_1.RECENTLY_SIGNED_IN_WALLETS, "recentlySignedInWallets");
        syncStorage(prevState, state, constants_1.REMEMBER_RECENT_WALLETS, "rememberRecentWallets");
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
exports.createStore = createStore;
