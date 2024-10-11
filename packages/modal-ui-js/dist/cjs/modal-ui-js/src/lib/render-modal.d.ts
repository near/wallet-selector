import type { HardwareWalletAccount, ModuleState, Wallet } from "@near-wallet-selector/core";
export type HardwareWalletAccountState = HardwareWalletAccount & {
    selected: boolean;
};
export declare const resolveAccounts: (wallet: Wallet) => Promise<Array<HardwareWalletAccountState> | null>;
export declare function connectToWallet(module: ModuleState<Wallet>, qrCodeModal?: boolean): Promise<void>;
export declare function renderModal(): void;
//# sourceMappingURL=render-modal.d.ts.map