import { WalletConnection, connect, keyStores, utils } from "near-api-js";
import * as nearApi from "near-api-js";
import {
  WalletModule,
  WalletBehaviourFactory,
  BrowserWallet,
  Transaction,
  Optional,
  transformActions,
} from "@near-wallet-selector/core";

export interface NearWalletParams {
  walletUrl?: string;
  iconUrl?: string;
}

const NearWallet: WalletBehaviourFactory<
  BrowserWallet,
  Pick<NearWalletParams, "walletUrl">
> = ({ options, metadata, walletUrl, emitter, logger }) => {
  let _keyStore: keyStores.KeyStore | null = null;
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
        const actions = transformActions(transaction.actions);
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

        return nearApi.transactions.createTransaction(
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
    isAvailable() {
      return true;
    },

    async connect() {
      const wallet = await setupWallet();
      const accounts = getAccounts();

      if (accounts.length) {
        return emitter.emit("connected", { accounts });
      }

      await wallet.requestSignIn({
        contractId: options.contractId,
        methodNames: options.methodNames,
      });

      // We use the pending flag because we can't guarantee the user will
      // actually sign in. Best we can do is set in storage and validate on init.
      emitter.emit("connected", { pending: true });
    },

    async disconnect() {
      if (!_wallet || !_keyStore) {
        return;
      }

      _wallet.signOut();
      await _keyStore.clear();

      _wallet = null;
      _keyStore = null;

      emitter.emit("disconnected", null);
    },

    getAccounts,

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
        actions: transformActions(actions),
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
