import React from "react";
import type { Wallet } from "@near-wallet-selector/core";
interface WalletConnectingProps {
    wallet: Wallet | undefined;
    onBack: () => void;
    onCloseModal: () => void;
}
export declare const WalletConnecting: React.FC<WalletConnectingProps>;
export {};
//# sourceMappingURL=WalletConnecting.d.ts.map