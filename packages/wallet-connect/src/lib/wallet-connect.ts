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
> = ({ options, projectId, appMetadata, relayUrl, emitter, logger }) => {
  let subscriptions: Array<Subscription> = [];
  let client: WalletConnectClient;
  let session: SessionTypes.Settled | null = null;

  const getChainId = () => {
    const { networkId } = options.network;

    if (["mainnet", "testnet", "betanet"].includes(networkId)) {
      return `near:${networkId}`;
    }

    return "near:testnet";
  };

  const getAccounts = () => {
    if (!session) {
      return [];
    }

    return session.state.accounts.map((wcAccountId) => ({
      accountId: wcAccountId.split(":")[2],
    }));
  };

  const cleanup = () => {
    subscriptions.forEach((subscription) => subscription.remove());
    subscriptions = [];

    session = null;
  };

  const setupClient = async () => {
    const wcClient = new WalletConnectClient();

    await wcClient.init({
      projectId,
      relayUrl,
      metadata: appMetadata,
    });

    subscriptions.push(
      wcClient.on("pairing_created", (pairing) => {
        logger.log("Pairing Created", pairing);
      })
    );

    subscriptions.push(
      wcClient.on("session_updated", (updatedSession) => {
        logger.log("Session Updated", updatedSession);

        if (updatedSession.topic === session?.topic) {
          session = updatedSession;
          emitter.emit("accountsChanged", { accounts: getAccounts() });
        }
      })
    );

    subscriptions.push(
      wcClient.on("session_deleted", (deletedSession) => {
        logger.log("Session Deleted", deletedSession);

        if (deletedSession.topic === session?.topic) {
          cleanup();

          emitter.emit("disconnected", null);
        }
      })
    );

    client = wcClient;
  };

  return {
    isAvailable() {
      return true;
    },

    async init() {
      await setupClient();

      if (client.session.topics.length) {
        logger.log("WalletConnect:init", "Found historic session");
        session = await client.session.get(client.session.topics[0]);
      }

      emitter.emit("init", { accounts: getAccounts() });
    },

    async connect() {
      if (!client) {
        await setupClient();
      }

      const subscription = client.on("pairing_proposal", (proposal) => {
        logger.log("Pairing Proposal", proposal);
        const { uri } = proposal.signal.params;

        QRCodeModal.open(uri, () => {
          subscription.remove();
        });
      });

      try {
        session = await client.connect({
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

        emitter.emit("connected", { accounts: getAccounts() });
      } finally {
        subscription.remove();
        QRCodeModal.close();
      }
    },

    async disconnect() {
      if (!session) {
        return;
      }

      await client.disconnect({
        topic: session.topic,
        reason: {
          code: 5900,
          message: "User disconnected",
        },
      });

      cleanup();
    },

    async getAccounts() {
      return getAccounts();
    },

    async signAndSendTransaction({
      signerId,
      receiverId = options.contractId,
      actions,
    }) {
      logger.log("WalletConnect:signAndSendTransaction", {
        topic: session!.topic,
        signerId,
        receiverId,
        actions,
      });

      return client.request({
        timeout: 30 * 1000,
        topic: session!.topic,
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

      return client.request({
        timeout: 30 * 1000,
        topic: session!.topic,
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
