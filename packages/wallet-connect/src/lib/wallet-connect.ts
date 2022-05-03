import { AppMetadata, SessionTypes } from "@walletconnect/types";
import {
  WalletModuleFactory,
  WalletBehaviourFactory,
  BridgeWallet,
  Subscription,
} from "@near-wallet-selector/core";

import WalletConnectClient from "./wallet-connect-client";

export interface WalletConnectParams {
  projectId: string;
  metadata: AppMetadata;
  relayUrl?: string;
  iconUrl?: string;
  chainId?: string;
}

type WalletConnectExtraOptions = Pick<WalletConnectParams, "chainId"> &
  Required<Pick<WalletConnectParams, "projectId" | "metadata" | "relayUrl">>;

interface WalletConnectState {
  client: WalletConnectClient;
  session: SessionTypes.Settled | null;
  subscriptions: Array<Subscription>;
}

const setupWalletConnectState = async (
  params: WalletConnectExtraOptions
): Promise<WalletConnectState> => {
  const client = new WalletConnectClient();
  const session: SessionTypes.Settled | null = null;

  await client.init(params);

  if (client.session.topics.length) {
    await client.session.get(client.session.topics[0]);
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
> = async ({ options, params, emitter, logger }) => {
  const _state = await setupWalletConnectState(params);

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
  };

  const disconnect = async () => {
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
          await disconnect();
        }
      })
    );
  };

  if (_state.session) {
    setupEvents();
  }

  return {
    async connect() {
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

        return getAccounts();
      } catch (err) {
        await disconnect();

        throw err;
      }
    },

    disconnect,

    async getAccounts() {
      return getAccounts();
    },

    async signAndSendTransaction({
      signerId,
      receiverId = options.contractId,
      actions,
    }) {
      logger.log("WalletConnect:signAndSendTransaction", {
        signerId,
        receiverId,
        actions,
      });

      return _state.client.request({
        timeout: 30 * 1000,
        topic: _state.session!.topic,
        chainId: getChainId(),
        request: {
          method: "near_signAndSendTransaction",
          params: {
            signerId,
            receiverId,
            actions,
          },
        },
      });
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("WalletConnect:signAndSendTransactions", { transactions });

      return _state.client.request({
        timeout: 30 * 1000,
        topic: _state.session!.topic,
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
