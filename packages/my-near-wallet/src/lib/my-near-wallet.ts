import * as nearAPI from "near-api-js";
import type {
  WalletModuleFactory,
  WalletBehaviourFactory,
  BrowserWallet,
  Transaction,
  Optional,
  Network,
  Account,
  JsonStorageService,
  SignedMessage,
  SignInMessageParams,
} from "@near-wallet-selector/core";
import { createAction } from "@near-wallet-selector/wallet-utils";
import icon from "./icon";
import type { SignMessageParams } from "@near-wallet-selector/core";
import {
  verifyFullKeyBelongsToUser,
  verifySignature,
} from "@near-wallet-selector/core";

export interface MyNearWalletParams {
  walletUrl?: string;
  iconUrl?: string;
  deprecated?: boolean;
  successUrl?: string;
  failureUrl?: string;
}

interface MyNearWalletState {
  wallet: nearAPI.WalletConnection;
  keyStore: nearAPI.keyStores.BrowserLocalStorageKeyStore;
  signedInMessageAccount: Account | null;
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

const verifyMessage = async (
  message: SignMessageParams,
  signedMessage: SignedMessage,
  network: Network
) => {
  const verifiedSignature = verifySignature({
    message: message.message,
    nonce: Buffer.from(message.nonce),
    recipient: message.recipient,
    publicKey: signedMessage.publicKey,
    signature: signedMessage.signature,
    callbackUrl: message.callbackUrl,
  });
  const verifiedFullKeyBelongsToUser = await verifyFullKeyBelongsToUser({
    publicKey: signedMessage.publicKey,
    accountId: signedMessage.accountId,
    network,
  });

  return verifiedFullKeyBelongsToUser && verifiedSignature;
};

const getSignedInMessageAccount = async (
  storage: JsonStorageService,
  network: Network
): Promise<Account | null> => {
  const urlParams = new URLSearchParams(
    window.location.hash.substring(1) // skip the first char (#)
  );
  const accountId = urlParams.get("accountId") as string;
  const publicKey = urlParams.get("publicKey") as string;
  const signature = urlParams.get("signature") as string;
  const message = await storage.getItem<SignInMessageParams>("message:pending");

  if ((!accountId && !publicKey && !signature) || !message) {
    return null;
  }
  const signedMessage = {
    accountId,
    publicKey,
    signature,
  };
  const isMessageVerified = await verifyMessage(
    message,
    signedMessage,
    network
  );
  if (!isMessageVerified) {
    return null;
  }
  const url = new URL(location.href);
  url.hash = "";
  url.search = "";
  window.history.replaceState({}, document.title, url);

  return { accountId, publicKey };
};

const setupWalletState = async (
  params: MyNearWalletExtraOptions,
  network: Network,
  storage: JsonStorageService
): Promise<MyNearWalletState> => {
  const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();

  const near = await nearAPI.connect({
    keyStore,
    walletUrl: params.walletUrl,
    ...network,
    headers: {},
  });

  const wallet = new nearAPI.WalletConnection(near, "near_app");

  const signedInMessageAccount = await getSignedInMessageAccount(
    storage,
    network
  );

  return {
    wallet,
    keyStore,
    signedInMessageAccount,
  };
};

const MyNearWallet: WalletBehaviourFactory<
  BrowserWallet,
  { params: MyNearWalletExtraOptions }
> = async ({ metadata, options, store, params, logger, id, storage }) => {
  const _state = await setupWalletState(params, options.network, storage);
  const getAccounts = async (): Promise<Array<Account>> => {
    const accountId = _state.wallet.getAccountId();
    const account = _state.wallet.account();
    const { signedInMessageAccount } = store.getState();

    if (accountId && account) {
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
    }

    if (_state.signedInMessageAccount) {
      return [{ ..._state.signedInMessageAccount }];
    }

    if (signedInMessageAccount) {
      return [{ ...signedInMessageAccount }];
    }

    return [];
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

      if (id !== "my-near-wallet") {
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
      href.searchParams.append("nonce", nonce.toString());
      href.searchParams.append("recipient", recipient);
      href.searchParams.append("callbackUrl", url);
      if (state) {
        href.searchParams.append("state", state);
      }

      window.location.replace(href.toString());

      return;
    },

    async signInMessage({ message, nonce, recipient, callbackUrl, state }) {
      logger.log("sign message", { message });

      if (id !== "my-near-wallet") {
        throw Error(
          `The signInMessage method is not supported by ${metadata.name}`
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
      href.searchParams.append("nonce", nonce.toString());
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

    buildImportAccountsUrl() {
      return `${params.walletUrl}/batch-import`;
    },
  };
};

export function setupMyNearWallet({
  walletUrl,
  iconUrl = icon,
  deprecated = false,
  successUrl = "",
  failureUrl = "",
}: MyNearWalletParams = {}): WalletModuleFactory<BrowserWallet> {
  return async (moduleOptions) => {
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
        successUrl,
        failureUrl,
        walletUrl: resolveWalletUrl(moduleOptions.options.network, walletUrl),
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
