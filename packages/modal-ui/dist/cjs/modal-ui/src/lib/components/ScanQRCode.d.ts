import React from "react";
import type { ModuleState, Wallet } from "@near-wallet-selector/core";
interface ScanQRCodeProps {
    wallet: ModuleState<Wallet>;
    uri?: string;
    onCloseModal: () => void;
    handleOpenDefaultModal?: () => void;
}
export declare const ScanQRCode: React.FC<ScanQRCodeProps>;
export {};
//# sourceMappingURL=ScanQRCode.d.ts.map