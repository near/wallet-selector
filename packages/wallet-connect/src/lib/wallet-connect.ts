import { KeyPair, keyStores, providers, utils } from "near-api-js";
import type { SignClientTypes, SessionTypes } from "@walletconnect/types";
import type {
  WalletModuleFactory,
  WalletBehaviourFactory,
  BridgeWallet,
  Subscription,
  Transaction,
} from "@near-wallet-selector/core";
import { getActiveAccount } from "@near-wallet-selector/core";

import WalletConnectClient from "./wallet-connect-client";

export interface WalletConnectParams {
  projectId: string;
  metadata: SignClientTypes.Metadata;
  relayUrl?: string;
  iconUrl?: string;
  chainId?: string;
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

interface WalletConnectState {
  client: WalletConnectClient;
  session: SessionTypes.Struct | null;
  keystore: keyStores.KeyStore;
  subscriptions: Array<Subscription>;
}

const WC_METHODS = [
  "near_signIn",
  "near_signOut",
  "near_signAndSendTransaction",
  "near_signAndSendTransactions",
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
> = async ({ id, options, store, params, emitter, logger }) => {
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

  const requestSignAndSendTransaction = async (transaction: Transaction) => {
    return _state.client.request<providers.FinalExecutionOutcome>({
      topic: _state.session!.topic,
      chainId: getChainId(),
      request: {
        method: "near_signAndSendTransaction",
        params: transaction,
      },
    });
  };

  const requestSignAndSendTransactions = async (
    transactions: Array<Transaction>
  ) => {
    if (!transactions.length) {
      return [];
    }

    return _state.client.request<Array<providers.FinalExecutionOutcome>>({
      topic: _state.session!.topic,
      chainId: getChainId(),
      request: {
        method: "near_signAndSendTransactions",
        params: { transactions },
      },
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
    contractId: string,
    methodNames: Array<string> | undefined
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
          contractId,
          methodNames,
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
    async signIn({ contractId, methodNames }) {
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

        await requestSignIn(contractId, methodNames);

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

      return requestSignAndSendTransaction({
        signerId: signerId || account.accountId,
        receiverId: receiverId || contract.contractId,
        actions,
      });
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

      return requestSignAndSendTransactions(
        transactions.map((x) => ({
          signerId: x.signerId || account.accountId,
          receiverId: x.receiverId,
          actions: x.actions,
        }))
      );
    },
  };
};

export function setupWalletConnect({
  projectId,
  metadata,
  chainId,
  relayUrl = "wss://relay.walletconnect.com",
  iconUrl = "./assets/wallet-connect-icon.png",
}: WalletConnectParams): WalletModuleFactory<BridgeWallet> {
  return async () => {
    return {
      id: "wallet-connect",
      type: "bridge",
      metadata: {
        name: "WalletConnect",
        description: null,
        iconUrl,
        deprecated: false,
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
