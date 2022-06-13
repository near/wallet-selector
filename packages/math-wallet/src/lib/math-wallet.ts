import { isMobile } from "is-mobile";
import type {
  WalletModuleFactory,
  WalletBehaviourFactory,
  InjectedWallet,
  AccountState,
  Optional,
  Transaction,
} from "@near-wallet-selector/core";
import { waitFor } from "@near-wallet-selector/core";
import type { InjectedMathWallet } from "./injected-math-wallet";
import { signTransactions } from "@near-wallet-selector/wallet-utils";

declare global {
  interface Window {
    nearWalletApi: InjectedMathWallet | undefined;
  }
}

export interface MathWalletParams {
  iconUrl?: string;
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

  const getAccounts = (): Array<AccountState> => {
    const account = _state.wallet.signer.account;

    if (!account) {
      return [];
    }

    return [{ accountId: account.accountId }];
  };

  const transformTransactions = (
    transactions: Array<Optional<Transaction, "signerId" | "receiverId">>
  ): Array<Transaction> => {
    const accounts = getAccounts();
    const { contract } = store.getState();

    if (!accounts.length || !contract) {
      throw new Error("Wallet not signed in");
    }

    return transactions.map((transaction) => {
      return {
        signerId: transaction.signerId || accounts[0].accountId,
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

    async signMessage({ signerId, message }) {
      const accounts = getAccounts();

      if (!accounts.length) {
        throw new Error("Wallet not signed in");
      }

      // Note: Math Wallet currently hangs when calling signMessage.
      throw new Error(`Method not supported by ${metadata.name}`);

      return _state.wallet.signer.signMessage(
        message,
        signerId || accounts[0].accountId,
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

      return Promise.all(
        signedTransactions.map((tx) => provider.sendTransaction(tx))
      );
    },
  };
};

export const setupMathWallet = ({
  iconUrl = "./assets/math-wallet-icon.png",
}: MathWalletParams = {}): WalletModuleFactory<InjectedWallet> => {
  return async () => {
    const mobile = isMobile();
    const installed = await isInstalled();

    if (mobile || !installed) {
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
        deprecated: false,
      },
      init: MathWallet,
    };
  };
};
