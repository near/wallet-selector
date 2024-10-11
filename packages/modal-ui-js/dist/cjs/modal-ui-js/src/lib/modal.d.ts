import type { EventEmitterService, ModuleState, Wallet, WalletSelector } from "@near-wallet-selector/core";
import type { WalletSelectorModal, ModalOptions, ModalRoute, ModalEvents } from "./modal.types";
export declare const DEFAULT_DERIVATION_PATH = "44'/397'/0'/0'/1'";
type ModalState = {
    container: HTMLElement;
    selector: WalletSelector;
    options: ModalOptions;
    route: ModalRoute;
    modules: Array<ModuleState<Wallet>>;
    derivationPath: string;
    emitter: EventEmitterService<ModalEvents>;
};
export declare let modalState: ModalState | null;
export declare function updateModalState(newModalState: ModalState): void;
/**
 * Initiates a modal instance
 * @param {WalletSelector} selector Selector
 * @param {ModalOptions} options Modal options
 * @returns {WalletSelectorModal} Returns a WalletSelectorModal object
 */
export declare const setupModal: (selector: WalletSelector, options: ModalOptions) => WalletSelectorModal;
export {};
//# sourceMappingURL=modal.d.ts.map