import {
  InMemorySigner,
  KeyPair,
  keyStores,
  transactions as nearTransactions,
  providers,
  utils,
} from "near-api-js";
import { AccessKeyView } from "near-api-js/lib/providers/provider";
import type { SignClientTypes, SessionTypes } from "@walletconnect/types";
import type {
  WalletModuleFactory,
  WalletBehaviourFactory,
  BridgeWallet,
  Subscription,
  Transaction,
} from "@near-wallet-selector/core";
import { getActiveAccount } from "@near-wallet-selector/core";
import { createAction } from "@near-wallet-selector/wallet-utils";

import WalletConnectClient from "./wallet-connect-client";
import icon from "./icon";

export interface WalletConnectParams {
  projectId: string;
  metadata: SignClientTypes.Metadata;
  relayUrl?: string;
  iconUrl?: string;
  chainId?: string;
  deprecated?: boolean;
}

interface WalletConnectExtraOptions {
  chainId?: string;
  projectId: string;
  metadata: SignClientTypes.Metadata;
  relayUrl: string;
}

interface LimitedAccessKeyPair {
  accountId: string;
  keyPair: KeyPair;
}

interface LimitedAccessAccount {
  accountId: string;
  publicKey: string;
}

interface WalletConnectAccount {
  accountId: string;
  publicKey: string;
}

interface WalletConnectState {
  client: WalletConnectClient;
  session: SessionTypes.Struct | null;
  keystore: keyStores.KeyStore;
  subscriptions: Array<Subscription>;
}

const WC_METHODS = [
  "near_signIn",
  "near_signOut",
  "near_getAccounts",
  "near_signTransaction",
  "near_signTransactions",
];

const WC_EVENTS = ["chainChanged", "accountsChanged"];

const setupWalletConnectState = async (
  id: string,
  params: WalletConnectExtraOptions
): Promise<WalletConnectState> => {
  const client = new WalletConnectClient();
  let session: SessionTypes.Struct | null = null;
  const keystore = new keyStores.BrowserLocalStorageKeyStore(
    window.localStorage,
    `near-wallet-selector:${id}:keystore:`
  );

  await client.init({
    projectId: params.projectId,
    metadata: params.metadata,
    relayUrl: params.relayUrl,
  });

  if (client.session.length) {
    const lastKeyIndex = client.session.keys.length - 1;
    session = client.session.get(client.session.keys[lastKeyIndex]);
  }

  return {
    client,
    session,
    keystore,
    subscriptions: [],
  };
};

const WalletConnect: WalletBehaviourFactory<
  BridgeWallet,
  { params: WalletConnectExtraOptions }
> = async ({
  id,
  options,
  store,
  params,
  provider,
  emitter,
  logger,
  metadata,
}) => {
  const _state = await setupWalletConnectState(id, params);

  const getChainId = () => {
    if (params.chainId) {
      return params.chainId;
    }

    const { networkId } = options.network;

    if (["mainnet", "testnet"].includes(networkId)) {
      return `near:${networkId}`;
    }

    throw new Error("Invalid chain id");
  };

  const getAccounts = () => {
    return (_state.session?.namespaces["near"].accounts || []).map((x) => ({
      accountId: x.split(":")[2],
    }));
  };

  const cleanup = async () => {
    _state.subscriptions.forEach((subscription) => subscription.remove());

    _state.subscriptions = [];
    _state.session = null;

    await _state.keystore.clear();
  };

  const validateAccessKey = (
    transaction: Transaction,
    accessKey: AccessKeyView
  ) => {
    if (accessKey.permission === "FullAccess") {
      return accessKey;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { receiver_id, method_names } = accessKey.permission.FunctionCall;

    if (transaction.receiverId !== receiver_id) {
      return null;
    }

    return transaction.actions.every((action) => {
      if (action.type !== "FunctionCall") {
        return false;
      }

      const { methodName, deposit } = action.params;

      if (method_names.length && method_names.includes(methodName)) {
        return false;
      }

      return parseFloat(deposit) <= 0;
    });
  };

  const signTransactions = async (transactions: Array<Transaction>) => {
    const signer = new InMemorySigner(_state.keystore);
    const signedTransactions: Array<nearTransactions.SignedTransaction> = [];

    const block = await provider.block({ finality: "final" });

    for (let i = 0; i < transactions.length; i += 1) {
      const transaction = transactions[i];
      const publicKey = await signer.getPublicKey(
        transaction.signerId,
        options.network.networkId
      );

      if (!publicKey) {
        throw new Error("No public key found");
      }

      const accessKey = await provider.query<AccessKeyView>({
        request_type: "view_access_key",
        finality: "final",
        account_id: transaction.signerId,
        public_key: publicKey.toString(),
      });

      if (!validateAccessKey(transaction, accessKey)) {
        throw new Error("Invalid access key");
      }

      const tx = nearTransactions.createTransaction(
        transactions[i].signerId,
        utils.PublicKey.from(publicKey.toString()),
        transactions[i].receiverId,
        accessKey.nonce + i + 1,
        transaction.actions.map((action) => createAction(action)),
        utils.serialize.base_decode(block.header.hash)
      );

      const [, signedTx] = await nearTransactions.signTransaction(
        tx,
        signer,
        transactions[i].signerId,
        options.network.networkId
      );

      signedTransactions.push(signedTx);
    }

    return signedTransactions;
  };

  const requestAccounts = async () => {
    return _state.client.request<Array<WalletConnectAccount>>({
      topic: _state.session!.topic,
      chainId: getChainId(),
      request: {
        method: "near_getAccounts",
        params: {},
      },
    });
  };

  const requestSignTransaction = async (transaction: Transaction) => {
    const accounts = await requestAccounts();
    const account = accounts.find((x) => x.accountId === transaction.signerId);

    if (!account) {
      throw new Error("Invalid signer id");
    }

    const [block, accessKey] = await Promise.all([
      provider.block({ finality: "final" }),
      provider.query<AccessKeyView>({
        request_type: "view_access_key",
        finality: "final",
        account_id: transaction.signerId,
        public_key: account.publicKey,
      }),
    ]);

    const tx = nearTransactions.createTransaction(
      transaction.signerId,
      utils.PublicKey.from(account.publicKey),
      transaction.receiverId,
      accessKey.nonce + 1,
      transaction.actions.map((action) => createAction(action)),
      utils.serialize.base_decode(block.header.hash)
    );

    const result = await _state.client.request<Uint8Array>({
      topic: _state.session!.topic,
      chainId: getChainId(),
      request: {
        method: "near_signTransaction",
        params: { transaction: tx.encode() },
      },
    });

    return nearTransactions.SignedTransaction.decode(Buffer.from(result));
  };

  const requestSignTransactions = async (transactions: Array<Transaction>) => {
    if (!transactions.length) {
      return [];
    }

    const txs: Array<nearTransactions.Transaction> = [];

    const [block, accounts] = await Promise.all([
      provider.block({ finality: "final" }),
      requestAccounts(),
    ]);

    for (let i = 0; i < transactions.length; i += 1) {
      const transaction = transactions[i];
      const account = accounts.find(
        (x) => x.accountId === transaction.signerId
      );

      if (!account) {
        throw new Error("Invalid signer id");
      }

      const accessKey = await provider.query<AccessKeyView>({
        request_type: "view_access_key",
        finality: "final",
        account_id: transaction.signerId,
        public_key: account.publicKey,
      });

      txs.push(
        nearTransactions.createTransaction(
          transaction.signerId,
          utils.PublicKey.from(account.publicKey),
          transaction.receiverId,
          accessKey.nonce + i + 1,
          transaction.actions.map((action) => createAction(action)),
          utils.serialize.base_decode(block.header.hash)
        )
      );
    }

    const results = await _state.client.request<Array<Uint8Array>>({
      topic: _state.session!.topic,
      chainId: getChainId(),
      request: {
        method: "near_signAndSendTransactions",
        params: { transactions: txs.map((x) => x.encode()) },
      },
    });

    return results.map((result) => {
      return nearTransactions.SignedTransaction.decode(Buffer.from(result));
    });
  };

  const createLimitedAccessKeyPairs = (): Array<LimitedAccessKeyPair> => {
    const accounts = getAccounts();

    return accounts.map(({ accountId }) => ({
      accountId,
      keyPair: utils.KeyPair.fromRandom("ed25519"),
    }));
  };

  const requestSignIn = async (
    permission: nearTransactions.FunctionCallPermission
  ) => {
    const keyPairs = createLimitedAccessKeyPairs();
    const limitedAccessAccounts: Array<LimitedAccessAccount> = keyPairs.map(
      ({ accountId, keyPair }) => ({
        accountId,
        publicKey: keyPair.getPublicKey().toString(),
      })
    );

    await _state.client.request({
      topic: _state.session!.topic,
      chainId: getChainId(),
      request: {
        method: "near_signIn",
        params: {
          permission: permission,
          accounts: limitedAccessAccounts,
        },
      },
    });

    for (let i = 0; i < keyPairs.length; i += 1) {
      const { accountId, keyPair } = keyPairs[i];

      await _state.keystore.setKey(
        options.network.networkId,
        accountId,
        keyPair
      );
    }
  };

  const requestSignOut = async () => {
    const accounts = getAccounts();
    const limitedAccessAccounts: Array<LimitedAccessAccount> = [];

    for (let i = 0; i < accounts.length; i += 1) {
      const account = accounts[i];
      const keyPair = await _state.keystore.getKey(
        options.network.networkId,
        account.accountId
      );

      if (!keyPair) {
        continue;
      }

      limitedAccessAccounts.push({
        accountId: account.accountId,
        publicKey: keyPair.getPublicKey().toString(),
      });
    }

    if (!limitedAccessAccounts.length) {
      return;
    }

    await _state.client.request({
      topic: _state.session!.topic,
      chainId: getChainId(),
      request: {
        method: "near_signOut",
        params: {
          accounts: limitedAccessAccounts,
        },
      },
    });

    for (let i = 0; i < limitedAccessAccounts.length; i += 1) {
      const { accountId } = limitedAccessAccounts[i];

      await _state.keystore.removeKey(options.network.networkId, accountId);
    }
  };

  const signOut = async () => {
    if (_state.session) {
      await requestSignOut();

      await _state.client.disconnect({
        topic: _state.session.topic,
        reason: {
          code: 5900,
          message: "User disconnected",
        },
      });
    }

    await cleanup();
  };

  const setupEvents = () => {
    _state.subscriptions.push(
      _state.client.on("session_update", (event) => {
        logger.log("Session Update", event);

        if (event.topic === _state.session?.topic) {
          _state.session = {
            ..._state.client.session.get(event.topic),
            namespaces: event.params.namespaces,
          };

          emitter.emit("accountsChanged", { accounts: getAccounts() });
        }
      })
    );

    _state.subscriptions.push(
      _state.client.on("session_delete", async (event) => {
        logger.log("Session Deleted", event);

        if (event.topic === _state.session?.topic) {
          await cleanup();
          emitter.emit("signedOut", null);
        }
      })
    );
  };

  if (_state.session) {
    setupEvents();
  }

  return {
    async signIn({ contractId, methodNames = [] }) {
      const existingAccounts = getAccounts();

      if (existingAccounts.length) {
        return existingAccounts;
      }

      try {
        _state.session = await _state.client.connect({
          requiredNamespaces: {
            near: {
              chains: [getChainId()],
              methods: WC_METHODS,
              events: WC_EVENTS,
            },
          },
        });

        await requestSignIn({ receiverId: contractId, methodNames });

        setupEvents();

        return getAccounts();
      } catch (err) {
        await signOut();

        throw err;
      }
    },

    signOut,

    async getAccounts() {
      return getAccounts();
    },

    async verifyOwner({ message }) {
      logger.log("WalletConnect:verifyOwner", { message });

      throw new Error(`Method not supported by ${metadata.name}`);
    },

    async signAndSendTransaction({ signerId, receiverId, actions }) {
      logger.log("signAndSendTransaction", { signerId, receiverId, actions });

      const { contract } = store.getState();

      if (!_state.session || !contract) {
        throw new Error("Wallet not signed in");
      }

      const account = getActiveAccount(store.getState());

      if (!account) {
        throw new Error("No active account");
      }

      const resolvedTransaction: Transaction = {
        signerId: signerId || account.accountId,
        receiverId: receiverId || contract.contractId,
        actions,
      };

      try {
        const [signedTx] = await signTransactions([resolvedTransaction]);
        return provider.sendTransaction(signedTx);
      } catch (err) {
        logger.log("Falling back to WalletConnect to sign transaction", err);

        const signedTx = await requestSignTransaction(resolvedTransaction);
        return provider.sendTransaction(signedTx);
      }
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("signAndSendTransactions", { transactions });

      const { contract } = store.getState();

      if (!_state.session || !contract) {
        throw new Error("Wallet not signed in");
      }

      const account = getActiveAccount(store.getState());

      if (!account) {
        throw new Error("No active account");
      }

      const resolvedTransactions = transactions.map((x) => ({
        signerId: x.signerId || account.accountId,
        receiverId: x.receiverId,
        actions: x.actions,
      }));

      try {
        const signedTxs = await signTransactions(resolvedTransactions);
        const results: Array<providers.FinalExecutionOutcome> = [];

        for (let i = 0; i < signedTxs.length; i += 1) {
          results.push(await provider.sendTransaction(signedTxs[i]));
        }

        return results;
      } catch (err) {
        const signedTxs = await requestSignTransactions(resolvedTransactions);
        const results: Array<providers.FinalExecutionOutcome> = [];

        for (let i = 0; i < signedTxs.length; i += 1) {
          results.push(await provider.sendTransaction(signedTxs[i]));
        }

        return results;
      }
    },
  };
};

export function setupWalletConnect({
  projectId,
  metadata,
  chainId,
  relayUrl = "wss://relay.walletconnect.com",
  iconUrl = icon,
  deprecated = false,
}: WalletConnectParams): WalletModuleFactory<BridgeWallet> {
  return async () => {
    return {
      id: "wallet-connect",
      type: "bridge",
      metadata: {
        name: "WalletConnect",
        description: "Bridge wallet for NEAR.",
        iconUrl,
        deprecated,
        available: true,
      },
      init: (options) => {
        return WalletConnect({
          ...options,
          params: {
            projectId,
            metadata,
            relayUrl,
            chainId,
          },
        });
      },
    };
  };
}
