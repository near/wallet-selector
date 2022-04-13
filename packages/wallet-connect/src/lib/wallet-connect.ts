import { AppMetadata, SessionTypes } from "@walletconnect/types";
import QRCodeModal from "@walletconnect/qrcode-modal";
import {
  WalletModule,
  WalletBehaviourFactory,
  BridgeWallet,
  Subscription,
} from "@near-wallet-selector/core";

import WalletConnectClient from "./wallet-connect-client";

export interface WalletConnectParams {
  projectId: string;
  appMetadata: AppMetadata;
  relayUrl?: string;
  iconUrl?: string;
}

const WalletConnect: WalletBehaviourFactory<
  BridgeWallet,
  Pick<WalletConnectParams, "projectId" | "appMetadata" | "relayUrl">
> = ({
  options,
  metadata,
  projectId,
  appMetadata,
  relayUrl,
  emitter,
  logger,
}) => {
  let _wallet: WalletConnectClient | null = null;
  let _subscriptions: Array<Subscription> = [];
  let _session: SessionTypes.Settled | null = null;

  const getChainId = () => {
    const { networkId } = options.network;

    if (["mainnet", "testnet", "betanet"].includes(networkId)) {
      return `near:${networkId}`;
    }

    return "near:testnet";
  };

  const getAccounts = () => {
    if (!_session) {
      return [];
    }

    return _session.state.accounts.map((wcAccountId) => ({
      accountId: wcAccountId.split(":")[2],
    }));
  };

  const disconnect = async () => {
    if (!_wallet || !_session) {
      return;
    }

    _subscriptions.forEach((subscription) => subscription.remove());

    await _wallet.disconnect({
      topic: _session.topic,
      reason: {
        code: 5900,
        message: "User disconnected",
      },
    });

    _wallet = null;
    _subscriptions = [];
    _session = null;

    emitter.emit("disconnected", null);
  };

  const setupWallet = async (): Promise<WalletConnectClient> => {
    if (_wallet) {
      return _wallet;
    }

    const client = new WalletConnectClient();

    await client.init({
      projectId,
      relayUrl,
      metadata: appMetadata,
    });

    _subscriptions.push(
      client.on("pairing_created", (pairing) => {
        logger.log("Pairing Created", pairing);
      })
    );

    _subscriptions.push(
      client.on("session_updated", (updatedSession) => {
        logger.log("Session Updated", updatedSession);

        if (updatedSession.topic === _session?.topic) {
          _session = updatedSession;
          emitter.emit("accountsChanged", { accounts: getAccounts() });
        }
      })
    );

    _subscriptions.push(
      client.on("session_deleted", (deletedSession) => {
        logger.log("Session Deleted", deletedSession);

        if (deletedSession.topic === _session?.topic) {
          disconnect();
        }
      })
    );

    if (client.session.topics.length) {
      _session = await client.session.get(client.session.topics[0]);
    }

    _wallet = client;

    return client;
  };

  const getWallet = () => {
    if (!_wallet || !_session) {
      throw new Error(`${metadata.name} not connected`);
    }

    return {
      wallet: _wallet,
      session: _session,
    };
  };

  return {
    isAvailable() {
      return true;
    },

    async connect() {
      const wallet = await setupWallet();
      const existingAccounts = getAccounts();

      if (existingAccounts.length) {
        return existingAccounts;
      }

      const subscription = wallet.on("pairing_proposal", (proposal) => {
        logger.log("Pairing Proposal", proposal);
        const { uri } = proposal.signal.params;

        QRCodeModal.open(uri, () => {
          subscription.remove();
        });
      });

      try {
        _session = await wallet.connect({
          metadata: appMetadata,
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

        const newAccounts = getAccounts();
        emitter.emit("connected", { accounts: newAccounts });

        return newAccounts;
      } finally {
        subscription.remove();
        QRCodeModal.close();
      }
    },

    disconnect,

    getAccounts,

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

      const { wallet, session } = getWallet();

      return wallet.request({
        timeout: 30 * 1000,
        topic: session.topic,
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

      const { wallet, session } = getWallet();

      return wallet.request({
        timeout: 30 * 1000,
        topic: session.topic,
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
  appMetadata,
  relayUrl = "wss://relay.walletconnect.com",
  iconUrl = "./assets/wallet-connect-icon.png",
}: WalletConnectParams): WalletModule<BridgeWallet> {
  return {
    id: "wallet-connect",
    type: "bridge",
    name: "WalletConnect",
    description: null,
    iconUrl,
    wallet: (options) => {
      return WalletConnect({
        ...options,
        projectId,
        appMetadata,
        relayUrl,
      });
    },
  };
}
