import {
  WalletConnection,
  connect,
  keyStores,
  transactions as nearTransactions,
  utils,
} from "near-api-js";
import type {
  WalletModuleFactory,
  WalletBehaviourFactory,
  BrowserWallet,
  Transaction,
  Optional,
  Network,
} from "@near-wallet-selector/core";
import { createAction } from "@near-wallet-selector/wallet-utils";
import icon from "./icon";

export interface MyNearWalletParams {
  walletUrl?: string;
  iconUrl?: string;
  deprecated?: boolean;
}

interface MyNearWalletState {
  wallet: WalletConnection;
  keyStore: keyStores.BrowserLocalStorageKeyStore;
}

interface MyNearWalletExtraOptions {
  walletUrl: string;
}

const resolveWalletUrl = (network: Network, walletUrl?: string) => {
  if (walletUrl) {
    return walletUrl;
  }

  switch (network.networkId) {
    case "mainnet":
      return "https://app.mynearwallet.com";
    case "testnet":
      return "https://testnet.mynearwallet.com";
    default:
      throw new Error("Invalid wallet url");
  }
};

const setupWalletState = async (
  params: MyNearWalletExtraOptions,
  network: Network
): Promise<MyNearWalletState> => {
  const keyStore = new keyStores.BrowserLocalStorageKeyStore();

  const near = await connect({
    keyStore,
    walletUrl: params.walletUrl,
    ...network,
    headers: {},
  });

  const wallet = new WalletConnection(near, "near_app");

  // Cleanup up any pending keys (cancelled logins).
  if (!wallet.isSignedIn()) {
    await keyStore.clear();
  }

  return {
    wallet,
    keyStore,
  };
};

const MyNearWallet: WalletBehaviourFactory<
  BrowserWallet,
  { params: MyNearWalletExtraOptions }
> = async ({ metadata, options, store, params, logger }) => {
  const _state = await setupWalletState(params, options.network);

  const cleanup = () => {
    _state.keyStore.clear();
  };

  const getAccounts = () => {
    const accountId: string | null = _state.wallet.getAccountId();

    if (!accountId) {
      return [];
    }

    return [{ accountId }];
  };

  const transformTransactions = async (
    transactions: Array<Optional<Transaction, "signerId">>
  ) => {
    const account = _state.wallet.account();
    const { networkId, signer, provider } = account.connection;

    const localKey = await signer.getPublicKey(account.accountId, networkId);

    return Promise.all(
      transactions.map(async (transaction, index) => {
        const actions = transaction.actions.map((action) =>
          createAction(action)
        );
        const accessKey = await account.accessKeyForTransaction(
          transaction.receiverId,
          actions,
          localKey
        );

        if (!accessKey) {
          throw new Error(
            `Failed to find matching key for transaction sent to ${transaction.receiverId}`
          );
        }

        const block = await provider.block({ finality: "final" });

        return nearTransactions.createTransaction(
          account.accountId,
          utils.PublicKey.from(accessKey.public_key),
          transaction.receiverId,
          accessKey.access_key.nonce + index + 1,
          actions,
          utils.serialize.base_decode(block.header.hash)
        );
      })
    );
  };

  return {
    async signIn({ contractId, methodNames }) {
      const existingAccounts = getAccounts();

      if (existingAccounts.length) {
        return existingAccounts;
      }

      await _state.wallet.requestSignIn({ contractId, methodNames });

      return getAccounts();
    },

    async signOut() {
      if (_state.wallet.isSignedIn()) {
        _state.wallet.signOut();
      }

      cleanup();
    },

    async getAccounts() {
      return getAccounts();
    },

    async verifyOwner({ message, callbackUrl, meta }) {
      logger.log("verifyOwner", { message });

      const account = _state.wallet.account();

      if (!account) {
        throw new Error("Wallet not signed in");
      }
      const locationUrl =
        typeof window !== "undefined" ? window.location.href : "";

      const url = callbackUrl || locationUrl;

      if (!url) {
        throw new Error(`The callbackUrl is missing for ${metadata.name}`);
      }

      const encodedUrl = encodeURIComponent(url);
      const extraMeta = meta ? `&meta=${meta}` : "";

      window.location.replace(
        `${params.walletUrl}/verify-owner?message=${message}&callbackUrl=${encodedUrl}${extraMeta}`
      );

      return;
    },

    async signAndSendTransaction({
      signerId,
      receiverId,
      actions,
      callbackUrl,
    }) {
      logger.log("signAndSendTransaction", {
        signerId,
        receiverId,
        actions,
        callbackUrl,
      });

      const { contract } = store.getState();

      if (!_state.wallet.isSignedIn() || !contract) {
        throw new Error("Wallet not signed in");
      }

      const account = _state.wallet.account();

      return account["signAndSendTransaction"]({
        receiverId: receiverId || contract.contractId,
        actions: actions.map((action) => createAction(action)),
        walletCallbackUrl: callbackUrl,
      });
    },

    async signAndSendTransactions({ transactions, callbackUrl }) {
      logger.log("signAndSendTransactions", { transactions, callbackUrl });

      if (!_state.wallet.isSignedIn()) {
        throw new Error("Wallet not signed in");
      }

      return _state.wallet.requestSignTransactions({
        transactions: await transformTransactions(transactions),
        callbackUrl,
      });
    },
  };
};

export function setupMyNearWallet({
  walletUrl,
  iconUrl = icon,
  deprecated = false,
}: MyNearWalletParams = {}): WalletModuleFactory<BrowserWallet> {
  return async () => {
    return {
      id: "my-near-wallet",
      type: "browser",
      metadata: {
        name: "MyNearWallet",
        description:
          "NEAR wallet to store, buy, send and stake assets for DeFi.",
        iconUrl,
        deprecated,
        available: true,
      },
      init: (options) => {
        return MyNearWallet({
          ...options,
          params: {
            walletUrl: resolveWalletUrl(options.options.network, walletUrl),
          },
        });
      },
    };
  };
}
