import { WalletConnection, connect, keyStores, utils } from "near-api-js";
import * as nearApi from "near-api-js";
import {
  WalletModule,
  BrowserWallet,
  Transaction,
  Optional,
  transformActions,
} from "@near-wallet-selector/core";

export interface NearWalletParams {
  walletUrl?: string;
  iconUrl?: string;
}

export function setupNearWallet({
  walletUrl,
  iconUrl,
}: NearWalletParams = {}): WalletModule<BrowserWallet> {
  return function NearWallet({ options, emitter, logger }) {
    let keyStore: keyStores.KeyStore;
    let wallet: WalletConnection;

    const getAccounts = () => {
      const accountId: string | null = wallet.getAccountId();

      if (!accountId) {
        return [];
      }

      return [{ accountId }];
    };

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

    const transformTransactions = async (
      transactions: Array<Optional<Transaction, "signerId">>
    ) => {
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
      id: "near-wallet",
      type: "browser",
      name: "NEAR Wallet",
      description: null,
      iconUrl: iconUrl || "./assets/near-wallet-icon.png",

      isAvailable() {
        return true;
      },

      async init() {
        const localStorageKeyStore =
          new keyStores.BrowserLocalStorageKeyStore();

        const near = await connect({
          keyStore: localStorageKeyStore,
          walletUrl: getWalletUrl(),
          ...options.network,
          headers: {},
        });

        wallet = new WalletConnection(near, "near_app");
        keyStore = localStorageKeyStore;

        // Cleanup up any pending keys (cancelled logins).
        if (!wallet.isSignedIn()) {
          await localStorageKeyStore.clear();
        }

        emitter.emit("init", { accounts: getAccounts() });
      },

      async connect() {
        if (!wallet) {
          await this.init();
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
        if (!wallet) {
          return;
        }

        wallet.signOut();
        await keyStore.clear();

        emitter.emit("disconnected", null);
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

        return wallet.requestSignTransactions({
          transactions: await transformTransactions(transactions),
        });
      },
    };
  };
}
