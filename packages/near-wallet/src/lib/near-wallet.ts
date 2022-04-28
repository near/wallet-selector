import { WalletConnection, connect, keyStores } from "near-api-js";
import {
  WalletModule,
  WalletBehaviourFactory,
  BrowserWallet,
  Transaction,
  Optional,
} from "@near-wallet-selector/core";
import { createAction, createTransaction } from "@near-wallet-selector/utils";

export interface NearWalletParams {
  walletUrl?: string;
  iconUrl?: string;
}

export const LOCAL_STORAGE_PENDING = `near-wallet:pending`;

const NearWallet: WalletBehaviourFactory<
  BrowserWallet,
  Pick<NearWalletParams, "walletUrl">
> = ({ options, metadata, walletUrl, emitter, logger, storage }) => {
  let _keyStore: keyStores.BrowserLocalStorageKeyStore | null = null;
  let _wallet: WalletConnection | null = null;

  const getWalletUrl = () => {
    if (walletUrl) {
      return walletUrl;
    }

    switch (options.network.networkId) {
      case "mainnet":
        return "https://wallet.near.org";
      case "testnet":
        return "https://wallet.testnet.near.org";
      case "betanet":
        return "https://wallet.betanet.near.org";
      default:
        throw new Error("Invalid wallet URL");
    }
  };

  const cleanup = async () => {
    if (_keyStore) {
      await _keyStore.clear();
      _keyStore = null;
    }

    _wallet = null;
  };

  const getAccounts = () => {
    if (!_wallet) {
      return [];
    }

    const accountId: string | null = _wallet.getAccountId();

    if (!accountId) {
      return [];
    }

    return [{ accountId }];
  };

  const setupWallet = async (): Promise<WalletConnection> => {
    if (_wallet) {
      return _wallet;
    }

    const localStorageKeyStore = new keyStores.BrowserLocalStorageKeyStore();

    const near = await connect({
      keyStore: localStorageKeyStore,
      walletUrl: getWalletUrl(),
      ...options.network,
      headers: {},
    });

    _wallet = new WalletConnection(near, "near_app");
    _keyStore = localStorageKeyStore;

    // Cleanup up any pending keys (cancelled logins).
    if (!_wallet.isSignedIn()) {
      await localStorageKeyStore.clear();
    }

    return _wallet;
  };

  const getWallet = (): WalletConnection => {
    if (!_wallet) {
      throw new Error(`${metadata.name} not connected`);
    }

    return _wallet;
  };

  const transformTransactions = async (
    transactions: Array<Optional<Transaction, "signerId">>
  ) => {
    const wallet = getWallet();
    const account = wallet.account();
    const { networkId, signer, provider } = account.connection;

    const localKey = await signer.getPublicKey(account.accountId, networkId);

    return Promise.all(
      transactions.map(async (transaction, index) => {
        const accessKey = await account.accessKeyForTransaction(
          transaction.receiverId,
          createAction(transaction.actions),
          localKey
        );

        if (!accessKey) {
          throw new Error(
            `Failed to find matching key for transaction sent to ${transaction.receiverId}`
          );
        }

        const block = await provider.block({ finality: "final" });

        return createTransaction({
          accountId: account.accountId,
          publicKey: accessKey.public_key,
          receiverId: transaction.receiverId,
          nonce: accessKey.access_key.nonce + index + 1,
          actions: transaction.actions,
          hash: block.header.hash,
        });
      })
    );
  };

  return {
    async isAvailable() {
      return true;
    },

    async connect() {
      const wallet = await setupWallet();
      const pending = storage.getItem<boolean>(LOCAL_STORAGE_PENDING);
      const existingAccounts = getAccounts();

      if (pending) {
        storage.removeItem(LOCAL_STORAGE_PENDING);
      }

      if (pending || existingAccounts.length) {
        return existingAccounts;
      }

      await wallet.requestSignIn({
        contractId: options.contractId,
        methodNames: options.methodNames,
      });

      // We use the pending flag because we can't guarantee the user will
      // actually sign in. Best we can do is set in storage and validate on init.
      const newAccounts = getAccounts();
      storage.setItem(LOCAL_STORAGE_PENDING, true);
      emitter.emit("connected", { pending: true, accounts: newAccounts });

      return newAccounts;
    },

    async disconnect() {
      if (!_wallet || !_keyStore) {
        return;
      }

      if (!_wallet.isSignedIn()) {
        return cleanup();
      }

      _wallet.signOut();
      await cleanup();

      emitter.emit("disconnected", null);
    },

    async getAccounts() {
      return getAccounts();
    },

    async signAndSendTransaction({
      signerId,
      receiverId = options.contractId,
      actions,
    }) {
      logger.log("NearWallet:signAndSendTransaction", {
        signerId,
        receiverId,
        actions,
      });

      const wallet = getWallet();
      const account = wallet.account();

      return account["signAndSendTransaction"]({
        receiverId,
        actions: createAction(actions),
      }).then(() => {
        // Suppress response since transactions with deposits won't actually
        // return FinalExecutionOutcome.
      });
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("NearWallet:signAndSendTransactions", { transactions });

      const wallet = getWallet();

      return wallet.requestSignTransactions({
        transactions: await transformTransactions(transactions),
      });
    },
  };
};

export function setupNearWallet({
  walletUrl,
  iconUrl = "./assets/near-wallet-icon.png",
}: NearWalletParams = {}): WalletModule<BrowserWallet> {
  return {
    id: "near-wallet",
    type: "browser",
    name: "NEAR Wallet",
    description: null,
    iconUrl,
    wallet: (options) => NearWallet({ ...options, walletUrl }),
  };
}
