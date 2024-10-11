import React from "react";
import type { HardwareWalletAccount, Wallet, WalletSelector } from "@near-wallet-selector/core";
import type { ModalOptions } from "../modal.types";
import type { DerivationPathModalRouteParams } from "./Modal.types";
interface DerivationPathProps {
    selector: WalletSelector;
    options: ModalOptions;
    onBack: () => void;
    onConnected: () => void;
    params: DerivationPathModalRouteParams;
    onError: (message: string, wallet: Wallet) => void;
    onCloseModal: () => void;
}
export type HardwareWalletAccountState = HardwareWalletAccount & {
    selected: boolean;
};
export type HardwareRoutes = "EnterDerivationPath" | "SpecifyHDPath" | "NoAccountsFound" | "ChooseAccount" | "AddCustomAccountId" | "OverviewAccounts";
export declare const DerivationPath: React.FC<DerivationPathProps>;
export {};
//# sourceMappingURL=DerivationPath.d.ts.map