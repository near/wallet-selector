import * as nearAPI from "near-api-js";
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

export interface ArepaWalletParams {
  walletUrl?: string;
  iconUrl?: string;
  deprecated?: boolean;
  successUrl?: string;
  failureUrl?: string;
}

interface ArepaWalletState {
  wallet: nearAPI.WalletConnection;
  keyStore: nearAPI.keyStores.BrowserLocalStorageKeyStore;
}

interface ArepaWalletExtraOptions {
  walletUrl: string;
}

const resolveWalletUrl = (network: Network, walletUrl?: string) => {
  if (walletUrl) {
    return walletUrl;
  }

  switch (network.networkId) {
    case "mainnet":
      return "https://mi.arepa.digital";
    case "testnet":
      return "https://testnet.arepa.digital";
    default:
      throw new Error("Invalid wallet url");
  }
};

const setupWalletState = async (
  params: ArepaWalletExtraOptions,
  network: Network
): Promise<ArepaWalletState> => {
  const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();

  const near = await nearAPI.connect({
    keyStore,
    walletUrl: params.walletUrl,
    ...network,
    headers: {},
  });

  const wallet = new nearAPI.WalletConnection(near, "near_app");

  return {
    wallet,
    keyStore,
  };
};

const ArepaWallet: WalletBehaviourFactory<
  BrowserWallet,
  { params: ArepaWalletExtraOptions }
> = async ({ metadata, options, store, params, logger, id }) => {
  const _state = await setupWalletState(params, options.network);
  const getAccounts = async (): Promise<Array<Account>> => {
    const accountId = _state.wallet.getAccountId();
    const account = _state.wallet.account();

    if (!accountId || !account) {
      return [];
    }

    const publicKey = await account.connection.signer.getPublicKey(
      account.accountId,
      options.network.networkId
    );
    return [
      {
        accountId,
        publicKey: publicKey ? publicKey.toString() : "",
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

        return nearAPI.transactions.createTransaction(
          account.accountId,
          nearAPI.utils.PublicKey.from(accessKey.public_key),
          transaction.receiverId,
          accessKey.access_key.nonce + index + 1,
          actions,
          nearAPI.utils.serialize.base_decode(block.header.hash)
        );
      })
    );
  };

  return {
    async signIn({ contractId, methodNames, successUrl, failureUrl }) {
      const existingAccounts = await getAccounts();

      if (existingAccounts.length) {
        return existingAccounts;
      }

      await _state.wallet.requestSignIn({
        contractId,
        methodNames,
        successUrl,
        failureUrl,
        keyType: "ed25519",
      });

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

    async verifyOwner() {
      throw new Error(`Method not supported by ${metadata.name}`);
    },

    async signMessage({ message, nonce, recipient, callbackUrl, state }) {
      logger.log("sign message", { message });

      if (id !== "arepa-wallet") {
        throw Error(
          `The signMessage method is not supported by ${metadata.name}`
        );
      }

      const locationUrl =
        typeof window !== "undefined" ? window.location.href : "";

      const url = callbackUrl || locationUrl;

      if (!url) {
        throw new Error(`The callbackUrl is missing for ${metadata.name}`);
      }

      const href = new URL(params.walletUrl);
      href.pathname = "sign-message";
      href.searchParams.append("message", message);
      href.searchParams.append("nonce", nonce.toString("base64"));
      href.searchParams.append("recipient", recipient);
      href.searchParams.append("callbackUrl", url);
      if (state) {
        href.searchParams.append("state", state);
      }

      window.location.replace(href.toString());

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

    async createSignedTransaction(receiverId, actions) {
      logger.log("createSignedTransaction", { receiverId, actions });

      throw new Error(`Method not supported by ${metadata.name}`);
    },

    async signTransaction(transaction) {
      logger.log("signTransaction", { transaction });

      throw new Error(`Method not supported by ${metadata.name}`);
    },

    async getPublicKey() {
      logger.log("getPublicKey", {});

      throw new Error(`Method not supported by ${metadata.name}`);
    },

    async signNep413Message(message, accountId, recipient, nonce, callbackUrl) {
      logger.log("signNep413Message", {
        message,
        accountId,
        recipient,
        nonce,
        callbackUrl,
      });

      throw new Error(`Method not supported by ${metadata.name}`);
    },

    async signDelegateAction(delegateAction) {
      logger.log("signDelegateAction", { delegateAction });

      throw new Error(`Method not supported by ${metadata.name}`);
    },
  };
};

export function setupArepaWallet({
  walletUrl,
  iconUrl = icon,
  deprecated = false,
  successUrl = "",
  failureUrl = "",
}: ArepaWalletParams = {}): WalletModuleFactory<BrowserWallet> {
  return async (moduleOptions) => {
    return {
      id: "arepa-wallet",
      type: "browser",
      metadata: {
        name: "ArepaWallet",
        description:
          "NEAR wallet to store, buy, send and stake assets for DeFi.",
        iconUrl,
        deprecated,
        available: true,
        successUrl,
        failureUrl,
        walletUrl: resolveWalletUrl(moduleOptions.options.network, walletUrl),
      },
      init: (options) => {
        return ArepaWallet({
          ...options,
          params: {
            walletUrl: resolveWalletUrl(options.options.network, walletUrl),
          },
        });
      },
    };
  };
}
