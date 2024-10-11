"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActiveAccount = void 0;
const getActiveAccount = (state) => {
    return state.accounts.find((account) => account.active) || null;
};
exports.getActiveAccount = getActiveAccount;
