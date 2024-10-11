import React from "react";
import type { ModuleState } from "@near-wallet-selector/core";
interface ConnectionResultProps {
    module: ModuleState;
    message: string;
    err: boolean;
    onRetry: () => void;
}
export declare const ConnectionResult: React.FC<ConnectionResultProps>;
export {};
//# sourceMappingURL=ConnectionResult.d.ts.map