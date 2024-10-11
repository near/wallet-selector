import React from "react";
import type { ModuleState } from "@near-wallet-selector/core";
interface AlertMessageProps {
    message: string;
    module?: ModuleState;
    onBack: (retry: boolean) => void;
    onCloseModal: () => void;
}
export declare const AlertMessage: React.FC<AlertMessageProps>;
export {};
//# sourceMappingURL=AlertMessage.d.ts.map