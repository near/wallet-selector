"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getState = exports.updateState = void 0;
var persistent_storage_service_1 = require("../services/persistent-storage.service");
var constants_1 = require("../constants");
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
var updateState = function (func) {
    var nextState = func(state.current);
    // Synchronise storage.
    if (state.current.selectedWalletId !== nextState.selectedWalletId) {
        var storageKey = constants_1.LOCAL_STORAGE_SELECTED_WALLET_ID;
        if (nextState.selectedWalletId) {
            persistent_storage_service_1.storage.setItem(storageKey, nextState.selectedWalletId);
        }
        else {
            persistent_storage_service_1.storage.removeItem(storageKey);
        }
    }
    state.current = nextState;
    if (window.updateWalletSelector) {
        window.updateWalletSelector(nextState);
    }
};
exports.updateState = updateState;
var getState = function () {
    return state.current;
};
exports.getState = getState;
