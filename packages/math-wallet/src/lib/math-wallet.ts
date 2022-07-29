import { isMobile } from "is-mobile";
import type {
  WalletModuleFactory,
  WalletBehaviourFactory,
  InjectedWallet,
  Account,
  Optional,
  Transaction,
} from "@near-wallet-selector/core";
import { getActiveAccount } from "@near-wallet-selector/core";
import { waitFor } from "@near-wallet-selector/core";
import type { InjectedMathWallet } from "./injected-math-wallet";
import { signTransactions } from "@near-wallet-selector/wallet-utils";
import type { FinalExecutionOutcome } from "near-api-js/lib/providers";

declare global {
  interface Window {
    nearWalletApi: InjectedMathWallet | undefined;
  }
}

export interface MathWalletParams {
  iconUrl?: string;
  deprecated?: boolean;
}

interface MathWalletState {
  wallet: InjectedMathWallet;
}

const isInstalled = () => {
  return waitFor(() => !!window.nearWalletApi).catch(() => false);
};

const setupMathWalletState = (): MathWalletState => {
  const wallet = window.nearWalletApi!;

  return {
    wallet,
  };
};

const MathWallet: WalletBehaviourFactory<InjectedWallet> = async ({
  metadata,
  options,
  store,
  provider,
  logger,
}) => {
  const _state = setupMathWalletState();

  const getAccounts = (): Array<Account> => {
    const account = _state.wallet.signer.account;

    if (!account) {
      return [];
    }

    return [{ accountId: account.accountId }];
  };

  const transformTransactions = (
    transactions: Array<Optional<Transaction, "signerId" | "receiverId">>
  ): Array<Transaction> => {
    const { contract } = store.getState();

    if (!contract) {
      throw new Error("Wallet not signed in");
    }

    const account = getActiveAccount(store.getState());

    if (!account) {
      throw new Error("No active account");
    }

    return transactions.map((transaction) => {
      return {
        signerId: transaction.signerId || account.accountId,
        receiverId: transaction.receiverId || contract.contractId,
        actions: transaction.actions,
      };
    });
  };

  return {
    async signIn({ contractId }) {
      const existingAccounts = getAccounts();

      if (existingAccounts.length) {
        return existingAccounts;
      }

      await _state.wallet.login({ contractId });

      return getAccounts();
    },

    async signOut() {
      // Ignore if unsuccessful (returns false).
      await _state.wallet.logout();
    },

    async getAccounts() {
      return getAccounts();
    },

    async verifyOwner({ message = "verify owner", signerId, publicKey } = {}) {
      const account = getActiveAccount(store.getState());

      if (!account) {
        throw new Error("No active account");
      }

      const accountId = signerId || account.accountId;
      const pubKey =
        publicKey || (await _state.wallet.signer.getPublicKey(accountId));
      const block = await provider.block({ finality: "final" });

      const msg = JSON.stringify({
        accountId,
        message,
        blockId: block.header.hash,
        publicKey: Buffer.from(pubKey.data).toString("base64"),
        keyType: pubKey.keyType,
      });

      // Note: Math Wallet currently hangs when calling signMessage.
      throw new Error(`Method not supported by ${metadata.name}`);

      return _state.wallet.signer.signMessage(
        new Uint8Array(Buffer.from(msg)),
        accountId,
        options.network.networkId
      );
    },

    async signAndSendTransaction({ signerId, receiverId, actions }) {
      logger.log("signAndSendTransaction", { signerId, receiverId, actions });
      const signedTransactions = await signTransactions(
        transformTransactions([{ signerId, receiverId, actions }]),
        _state.wallet.signer,
        options.network
      );

      return provider.sendTransaction(signedTransactions[0]);
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("signAndSendTransactions", { transactions });

      const signedTransactions = await signTransactions(
        transformTransactions(transactions),
        _state.wallet.signer,
        options.network
      );

      logger.log(
        "signAndSendTransactions:signedTransactions",
        signedTransactions
      );

      const results: Array<FinalExecutionOutcome> = [];

      for (let i = 0; i < signedTransactions.length; i++) {
        results.push(await provider.sendTransaction(signedTransactions[i]));
      }

      return results;
    },
  };
};

export const setupMathWallet = ({
  iconUrl = "./assets/math-wallet-icon.png",
  deprecated = false,
}: MathWalletParams = {}): WalletModuleFactory<InjectedWallet> => {
  return async () => {
    const mobile = isMobile();
    const installed = await isInstalled();

    if (mobile) {
      return null;
    }

    return {
      id: "math-wallet",
      type: "injected",
      metadata: {
        name: "Math Wallet",
        description: null,
        iconUrl,
        downloadUrl:
          "https://chrome.google.com/webstore/detail/math-wallet/afbcbjpbpfadlkmhmclhkeeodmamcflc",
        deprecated,
        available: installed,
      },
      init: MathWallet,
    };
  };
};
