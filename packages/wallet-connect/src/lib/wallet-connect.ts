import { providers } from "near-api-js";
import type { SignClientTypes, SessionTypes } from "@walletconnect/types";
import type {
  WalletModuleFactory,
  WalletBehaviourFactory,
  BridgeWallet,
  Subscription,
  Transaction,
} from "@near-wallet-selector/core";

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

interface WalletConnectState {
  client: WalletConnectClient;
  session: SessionTypes.Struct | null;
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

    if (["mainnet", "testnet", "betanet"].includes(networkId)) {
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

  const requestSignIn = async (
    contractId: string,
    methodNames: Array<string> | undefined
  ) => {
    return _state.client.request({
      topic: _state.session!.topic,
      chainId: getChainId(),
      request: {
        method: "near_signIn",
        params: {
          contractId,
          methodNames,
        },
      },
    });
  };

  const signOut = async () => {
    if (_state.session) {
      await _state.client.request({
        topic: _state.session!.topic,
        chainId: getChainId(),
        request: {
          method: "near_signOut",
          params: {},
        },
      });

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

      const accounts = getAccounts();
      const { contract } = store.getState();

      if (!_state.session || !accounts.length || !contract) {
        throw new Error("Wallet not signed in");
      }

      return requestSignAndSendTransaction({
        signerId: signerId || accounts[0].accountId,
        receiverId: receiverId || contract.contractId,
        actions,
      });
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("signAndSendTransactions", { transactions });

      const accounts = getAccounts();
      const { contract } = store.getState();

      if (!_state.session || !accounts.length || !contract) {
        throw new Error("Wallet not signed in");
      }

      return requestSignAndSendTransactions(
        transactions.map((x) => ({
          signerId: x.signerId || accounts[0].accountId,
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
