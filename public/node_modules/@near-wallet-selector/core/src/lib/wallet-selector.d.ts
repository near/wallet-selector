import type { WalletSelector, WalletSelectorParams } from "./wallet-selector.types";
/**
 * Initiates a wallet selector instance
 * @param {WalletSelectorParams} params Selector parameters (network, modules...)
 * @returns {Promise<WalletSelector>} Returns a WalletSelector object
 */
export declare const setupWalletSelector: (params: WalletSelectorParams) => Promise<WalletSelector>;
