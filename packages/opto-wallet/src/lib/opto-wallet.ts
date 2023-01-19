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
  Account,
} from "@near-wallet-selector/core";
import { createAction } from "@near-wallet-selector/wallet-utils";
import icon from "./icon";

declare global {
  interface Window {
    opto: object | undefined;
  }
}

export interface OptoWalletParams {
  walletUrl?: string;
  iconUrl?: string;
  deprecated?: boolean;
}

interface OptoWalletState {
  wallet: WalletConnection;
  keyStore: keyStores.BrowserLocalStorageKeyStore;
}

interface OptoWalletExtraOptions {
  walletUrl: string;
}

const resolveWalletUrl = (network: Network, walletUrl?: string) => {
  if (walletUrl) {
    return walletUrl;
  }

  switch (network.networkId) {
    case "mainnet":
      return "https://app.optowallet.com";
    case "testnet":
      return "https://app.testnet.optowallet.com";
    default:
      throw new Error("Invalid wallet url");
  }
};

const setupWalletState = async (
  params: OptoWalletExtraOptions,
  network: Network
): Promise<OptoWalletState> => {
  const keyStore = new keyStores.BrowserLocalStorageKeyStore();

  const near = await connect({
    keyStore,
    walletUrl: params.walletUrl,
    ...network,
    headers: {},
  });

  const wallet = new WalletConnection(near, "near_app");

  return {
    wallet,
    keyStore,
  };
};

const OptoWallet: WalletBehaviourFactory<
  BrowserWallet,
  { params: OptoWalletExtraOptions }
> = async ({ metadata, options, store, params, logger }) => {
  const _state = await setupWalletState(params, options.network);

  const getAccounts = async (): Promise<Array<Account>> => {
    const accountId: string | null = _state.wallet.getAccountId();

    if (!accountId) {
      return [];
    }

    const account = _state.wallet.account();

    return [
      {
        accountId,
        publicKey: account
          ? (
              await account.connection.signer.getPublicKey(
                account.accountId,
                options.network.networkId
              )
            ).toString()
          : undefined,
      },
    ];
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
      const existingAccounts = await getAccounts();

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

export function setupOptoWallet({
  walletUrl,
  iconUrl = icon,
  deprecated = false,
}: OptoWalletParams = {}): WalletModuleFactory<BrowserWallet> {
  return async () => {
    if (!window.opto) {
      return null;
    }

    return {
      id: "opto-wallet",
      type: "browser",
      metadata: {
        name: "OptoWallet",
        description: "Have Sign of your Crypto with Opto Wallet.",
        iconUrl,
        deprecated,
        available: true,
      },
      init: (options) => {
        return OptoWallet({
          ...options,
          params: {
            walletUrl: resolveWalletUrl(options.options.network, walletUrl),
          },
        });
      },
    };
  };
}
