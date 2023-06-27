import type {
  InjectedWallet,
  Network,
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
  network: Network;
}

const setupXDEFIState = async (
  store: WalletSelectorStore,
  network: Network
): Promise<XDEFIState> => {
  const { selectedWalletId } = store.getState();
  const wallet = window.xfi!.near!;

  // Attempt to reconnect wallet if previously selected.
  if (selectedWalletId === "xdefi") {
    await wallet.connect(network.networkId).catch(() => null);
  }

  return {
    wallet,
    network,
  };
};

const isInstalled = () => {
  return waitFor(() => !!window.xfi?.near).catch(() => false);
};

const XDEFI: WalletBehaviourFactory<InjectedWallet> = async ({
  metadata,
  store,
  logger,
  options,
}) => {
  const _state = await setupXDEFIState(store, options.network);

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
      const existingAccounts = getAccounts().map((x) => ({
        accountId: x.accountId,
        publicKey: x.publicKey.toString(),
      }));

      if (existingAccounts.length) {
        return existingAccounts;
      }

      await _state.wallet.connect(_state.network.networkId);

      return getAccounts().map((x) => ({
        accountId: x.accountId,
        publicKey: x.publicKey.toString(),
      }));
    },

    async signOut() {
      await _state.wallet.disconnect();
    },

    async getAccounts() {
      return getAccounts().map((x) => ({
        accountId: x.accountId,
        publicKey: x.publicKey.toString(),
      }));
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
    if (mobile) {
      return null;
    }
    const installed = await isInstalled();

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
