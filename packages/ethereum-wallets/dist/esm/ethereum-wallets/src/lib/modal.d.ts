import type { Transaction } from "@near-wallet-selector/core";
import type { Chain } from "viem";
export declare function createTxModal({ onCancel, txs, relayerPublicKey, explorerUrl, }: {
    onCancel: () => void;
    txs: Array<Transaction>;
    relayerPublicKey: string;
    explorerUrl: string;
}): {
    showModal: () => void;
    hideModal: () => void;
    renderTxs: ({ selectedIndex, ethTxHashes, error, onConfirm, }: {
        selectedIndex: number;
        ethTxHashes: Array<string>;
        error?: string | null;
        onConfirm?: () => void;
    }) => void;
};
export declare function createChainSwitchModal({ chain }: {
    chain: Chain;
}): {
    showModal: () => void;
    hideModal: () => void;
};
//# sourceMappingURL=modal.d.ts.map