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

const MyNearWallet: WalletBehaviourFactory<
  BrowserWallet,
  { params: MyNearWalletExtraOptions }
> = async ({ metadata, options, store, params, logger }) => {
  const _state = {
    ...(await setupWalletState(params, options.network)),
  };
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
  const getAccountObjectForTargetContract = async (targetContract: string, callerAccountId: string, networkId: string): Promise<nearAPI.ConnectedWalletAccount | null> => {
    const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore(
      window.localStorage,
      `${targetContract}:keystore:`
    );

    if (await keyStore.getKey(_state.wallet._networkId, callerAccountId)) {
      const appPrefix = targetContract;
      localStorage.setItem(
        `${appPrefix}_wallet_auth_key`,
        localStorage.getItem("near_app_wallet_auth_key")!
      );
      const near = await nearAPI.connect({
        keyStore,
        walletUrl: params.walletUrl,
        networkId: networkId,
        nodeUrl: `https://rpc.${networkId}.near.org`,
        headers: {},
      });
      const walletConnection = new nearAPI.WalletConnection(near, appPrefix);
      return walletConnection.account();
    } else {
      return null;
    }
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

    async addContractConnection(
      contractId: string,
      methodNames: Array<string>
    ) {
      // Create a new random key pair for the access key

      const keyPair = nearAPI.utils.KeyPair.fromRandom("ed25519");

      const permission = nearAPI.transactions.functionCallAccessKey(
        contractId,
        methodNames
      );

      // Construct the transaction
      const actions = [
        nearAPI.transactions.addKey(keyPair.getPublicKey(), permission),
      ];

      const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore(
        window.localStorage,
        `${contractId}:keystore:`
      );

      const account = _state.wallet.account();
      await keyStore.setKey(
        _state.wallet._networkId,
        account.accountId,
        keyPair
      );

      // Sign and send the transaction
      await account.signAndSendTransaction({
        receiverId: account.accountId,
        actions,
      });
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
      let account = _state.wallet.account();

      if (!_state.wallet.isSignedIn() || !contract) {
        throw new Error("Wallet not signed in");
      }

      const targetContract = receiverId || contract.contractId;

      account = await getAccountObjectForTargetContract(targetContract, account.accountId, account.connection.networkId) || account;

      const result = account.signAndSendTransaction({
        receiverId: targetContract,
        actions: actions.map((action) => createAction(action)),
        walletCallbackUrl: callbackUrl,
      });

      return result;
    },

    async signAndSendTransactions({ transactions, callbackUrl }) {
      logger.log("signAndSendTransactions", { transactions, callbackUrl });

      if (!_state.wallet.isSignedIn()) {
        throw new Error("Wallet not signed in");
      }

      if (transactions.length == 1) {
        const transaction = transactions[0];
        const receiverId = transaction.receiverId;
        let account = _state.wallet.account();
        account = await getAccountObjectForTargetContract(receiverId, account.accountId, account.connection.networkId) || account;

        await account.signAndSendTransaction({
          receiverId,
          actions: transaction.actions.map((action) => createAction(action)),
          walletCallbackUrl: callbackUrl
        });
      } else {
        return _state.wallet.requestSignTransactions({
          transactions: await transformTransactions(transactions),
          callbackUrl,
        });
      }
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
