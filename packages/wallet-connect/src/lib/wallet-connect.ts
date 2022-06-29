import type { AppMetadata, SessionTypes } from "@walletconnect/types";
import type {
  WalletModuleFactory,
  WalletBehaviourFactory,
  BridgeWallet,
  Subscription,
} from "@near-wallet-selector/core";
import { getActiveAccount } from "@near-wallet-selector/core";

import WalletConnectClient from "./wallet-connect-client";

export interface WalletConnectParams {
  projectId: string;
  metadata: AppMetadata;
  relayUrl?: string;
  iconUrl?: string;
  chainId?: string;
}

interface WalletConnectExtraOptions {
  chainId?: string;
  projectId: string;
  metadata: AppMetadata;
  relayUrl: string;
}

interface WalletConnectState {
  client: WalletConnectClient;
  session: SessionTypes.Settled | null;
  subscriptions: Array<Subscription>;
}

const setupWalletConnectState = async (
  params: WalletConnectExtraOptions
): Promise<WalletConnectState> => {
  const client = new WalletConnectClient();
  let session: SessionTypes.Settled | null = null;

  await client.init(params);

  if (client.session.topics.length) {
    session = await client.session.get(client.session.topics[0]);
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
> = async ({ options, store, params, emitter, logger }) => {
  const _state = await setupWalletConnectState(params);

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
    if (!_state.session) {
      return [];
    }

    return _state.session.state.accounts.map((wcAccountId) => ({
      accountId: wcAccountId.split(":")[2],
    }));
  };

  const cleanup = () => {
    _state.subscriptions.forEach((subscription) => subscription.remove());

    _state.subscriptions = [];
    _state.session = null;
  };

  const signOut = async () => {
    if (_state.session) {
      await _state.client.disconnect({
        topic: _state.session.topic,
        reason: {
          code: 5900,
          message: "User disconnected",
        },
      });
    }

    cleanup();
  };

  const setupEvents = () => {
    _state.subscriptions.push(
      _state.client.on("pairing_created", (pairing) => {
        logger.log("Pairing Created", pairing);
      })
    );

    _state.subscriptions.push(
      _state.client.on("session_updated", (updatedSession) => {
        logger.log("Session Updated", updatedSession);

        if (updatedSession.topic === _state.session?.topic) {
          _state.session = updatedSession;
          emitter.emit("accountsChanged", { accounts: getAccounts() });
        }
      })
    );

    _state.subscriptions.push(
      _state.client.on("session_deleted", async (deletedSession) => {
        logger.log("Session Deleted", deletedSession);

        if (deletedSession.topic === _state.session?.topic) {
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
    async signIn() {
      const existingAccounts = getAccounts();

      if (existingAccounts.length) {
        return existingAccounts;
      }

      try {
        _state.session = await _state.client.connect({
          metadata: params.metadata,
          timeout: 30 * 1000,
          permissions: {
            blockchain: {
              chains: [getChainId()],
            },
            jsonrpc: {
              methods: [
                "near_signAndSendTransaction",
                "near_signAndSendTransactions",
              ],
            },
          },
        });

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

      return _state.client.request({
        timeout: 30 * 1000,
        topic: _state.session.topic,
        chainId: getChainId(),
        request: {
          method: "near_signAndSendTransaction",
          params: {
            signerId: signerId || account.accountId,
            receiverId: receiverId || contract.contractId,
            actions,
          },
        },
      });
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("signAndSendTransactions", { transactions });

      if (!_state.session) {
        throw new Error("Wallet not signed in");
      }

      return _state.client.request({
        timeout: 30 * 1000,
        topic: _state.session.topic,
        chainId: getChainId(),
        request: {
          method: "near_signAndSendTransactions",
          params: { transactions },
        },
      });
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
