import React from "react";
import type { EventEmitterService, WalletSelector } from "@near-wallet-selector/core";
import type { ModalEvents, ModalOptions } from "../modal.types";
interface ModalProps {
    selector: WalletSelector;
    options: ModalOptions;
    visible: boolean;
    hide: () => void;
    emitter: EventEmitterService<ModalEvents>;
}
export declare const Modal: React.FC<ModalProps>;
export {};
//# sourceMappingURL=Modal.d.ts.map