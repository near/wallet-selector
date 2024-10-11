import type { Signer } from "@near-js/signers";
import type { SignedTransaction } from "@near-js/transactions";
import type { Network, Transaction } from "@near-wallet-selector/core/src";
export declare const signTransactions: (transactions: Array<Transaction>, signer: Signer, network: Network) => Promise<SignedTransaction[]>;
//# sourceMappingURL=sign-transactions.d.ts.map