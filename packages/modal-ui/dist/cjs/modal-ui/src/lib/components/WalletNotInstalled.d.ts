import React from "react";
import type { ModuleState } from "@near-wallet-selector/core";
interface WalletNotInstalledProps {
    module: ModuleState & {
        metadata: {
            downloadUrl?: string;
        };
    };
    onBack: () => void;
    onCloseModal: () => void;
}
export declare const WalletNotInstalled: React.FC<WalletNotInstalledProps>;
export {};
//# sourceMappingURL=WalletNotInstalled.d.ts.map