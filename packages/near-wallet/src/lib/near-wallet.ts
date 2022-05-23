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

export interface NearWalletParams {
  walletUrl?: string;
  iconUrl?: string;
}

interface NearWalletState {
  wallet: WalletConnection;
  keyStore: keyStores.BrowserLocalStorageKeyStore;
}

type NearWalletExtraOptions = Pick<NearWalletParams, "walletUrl">;

const getWalletUrl = (network: Network, walletUrl?: string) => {
  if (walletUrl) {
    return walletUrl;
  }

  switch (network.networkId) {
    case "mainnet":
      return "https://wallet.near.org";
    case "testnet":
      return "https://wallet.testnet.near.org";
    case "betanet":
      return "https://wallet.betanet.near.org";
    default:
      throw new Error("Invalid wallet url");
  }
};

const setupWalletState = async (
  params: NearWalletExtraOptions,
  network: Network
): Promise<NearWalletState> => {
  const keyStore = new keyStores.BrowserLocalStorageKeyStore();

  const near = await connect({
    keyStore,
    walletUrl: getWalletUrl(network, params.walletUrl),
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

const NearWallet: WalletBehaviourFactory<
  BrowserWallet,
  { params: NearWalletExtraOptions }
> = async ({ options, store, params, logger }) => {
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
    async connect({ contractId, methodNames }) {
      const existingAccounts = getAccounts();

      if (existingAccounts.length) {
        return existingAccounts;
      }

      await _state.wallet.requestSignIn({ contractId, methodNames });

      return getAccounts();
    },

    async disconnect() {
      if (_state.wallet.isSignedIn()) {
        _state.wallet.signOut();
      }

      cleanup();
    },

    async getAccounts() {
      return getAccounts();
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
        throw new Error("Wallet not connected");
      }

      const account = _state.wallet.account();

      return account["signAndSendTransaction"]({
        receiverId: receiverId || contract.contractId,
        actions: actions.map((action) => createAction(action)),
        walletCallbackUrl: callbackUrl,
      }).then(() => {
        // Suppress response since transactions with deposits won't actually
        // return FinalExecutionOutcome.
      });
    },

    async signAndSendTransactions({ transactions, callbackUrl }) {
      logger.log("signAndSendTransactions", { transactions, callbackUrl });

      if (!_state.wallet.isSignedIn()) {
        throw new Error("Wallet not connected");
      }

      return _state.wallet.requestSignTransactions({
        transactions: await transformTransactions(transactions),
        callbackUrl,
      });
    },
  };
};

export function setupNearWallet({
  walletUrl,
  iconUrl = "./assets/near-wallet-icon.png",
}: NearWalletParams = {}): WalletModuleFactory<BrowserWallet> {
  return async () => {
    return {
      id: "near-wallet",
      type: "browser",
      metadata: {
        name: "NEAR Wallet",
        description: null,
        iconUrl,
      },
      init: (options) => {
        return NearWallet({
          ...options,
          params: {
            walletUrl,
          },
        });
      },
    };
  };
}
