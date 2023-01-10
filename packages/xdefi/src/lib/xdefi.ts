import type {
  InjectedWallet,
  Optional,
  Transaction,
  WalletBehaviourFactory,
  WalletModuleFactory,
  WalletSelectorStore,
} from "@near-wallet-selector/core";
import { waitFor } from "@near-wallet-selector/core";
import { isMobile } from "is-mobile";
import icon from "./icon";
import type { InjectedXDEFI, NearXDEFI } from "./injected-xdefi";

declare global {
  interface Window {
    xfi: InjectedXDEFI | undefined;
  }
}

export interface XDEFIState {
  wallet: NearXDEFI;
}

const setupXDEFIState = async (
  store: WalletSelectorStore
): Promise<XDEFIState> => {
  const { selectedWalletId } = store.getState();
  const wallet = window.xfi!.near!;

  // Attempt to reconnect wallet if previously selected.
  if (selectedWalletId === "xdefi") {
    await wallet.connect().catch(() => null);
  }

  return {
    wallet,
  };
};

const isInstalled = () => {
  return waitFor(() => !!window.xfi!.near!).catch(() => false);
};

const XDEFI: WalletBehaviourFactory<InjectedWallet> = async ({
  metadata,
  store,
  logger,
}) => {
  const _state = await setupXDEFIState(store);

  const getAccounts = () => {
    if (!_state.wallet.accounts) {
      return [];
    }

    return _state.wallet.accounts;
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
    async signIn() {
      const existingAccounts = getAccounts();

      if (existingAccounts.length) {
        return existingAccounts;
      }

      await _state.wallet.connect();

      return getAccounts();
    },

    async signOut() {
      await _state.wallet.disconnect();
    },

    async getAccounts() {
      return getAccounts().map(({ accountId }) => ({ accountId }));
    },

    async verifyOwner({ message }) {
      logger.log("XDEFI:verifyOwner", { message });

      throw new Error(`Method not supported by ${metadata.name}`);
    },

    async signAndSendTransaction(transaction: Transaction) {
      logger.log("signAndSendTransaction", transaction);

      const { contract } = store.getState();
      const accounts = getAccounts();

      if (!accounts.length || !contract) {
        throw new Error("Wallet not signed in");
      }

      const result = await _state.wallet.signAndSendTransaction(
        transformTransactions([transaction])[0]
      );

      return result;
    },

    async signAndSendTransactions({
      transactions,
    }: {
      transactions: Array<Transaction>;
    }) {
      logger.log("signAndSendTransactions", { transactions });

      const result = await _state.wallet.signAndSendTransactions(
        transformTransactions(transactions)
      );

      return result;
    },
  };
};

export interface XDEFIWalletParams {
  iconUrl?: string;
  deprecated?: boolean;
}

export function setupXDEFI({
  iconUrl = icon,
  deprecated = false,
}: XDEFIWalletParams = {}): WalletModuleFactory<InjectedWallet> {
  return async () => {
    const mobile = isMobile();
    const installed = await isInstalled();

    if (mobile) {
      return null;
    }

    await waitFor(() => !!window.xfi?.near, {
      timeout: 300,
    }).catch(() => false);

    return {
      id: "xdefi",
      type: "injected",
      metadata: {
        name: "XDEFI Wallet",
        description: "One wallet for all your Crypto",
        iconUrl,
        downloadUrl: "https://www.xdefi.io",
        deprecated,
        available: installed,
      },
      init: XDEFI,
    };
  };
}
