import { storage } from "../services/persistent-storage.service";
import { LOCAL_STORAGE_SELECTED_WALLET_ID } from "../constants";
var state = {
    current: {
        showModal: false,
        showWalletOptions: true,
        showLedgerDerivationPath: false,
        showSenderWalletNotInstalled: false,
        showSwitchNetwork: false,
        selectedWalletId: null,
    },
};
export var updateState = function (func) {
    var nextState = func(state.current);
    // Synchronise storage.
    if (state.current.selectedWalletId !== nextState.selectedWalletId) {
        var storageKey = LOCAL_STORAGE_SELECTED_WALLET_ID;
        if (nextState.selectedWalletId) {
            storage.setItem(storageKey, nextState.selectedWalletId);
        }
        else {
            storage.removeItem(storageKey);
        }
    }
    state.current = nextState;
    if (window.updateWalletSelector) {
        window.updateWalletSelector(nextState);
    }
};
export var getState = function () {
    return state.current;
};
