import { AppMetadata, SessionTypes } from "@walletconnect/types";
import QRCodeModal from "@walletconnect/qrcode-modal";
import {
  WalletModule,
  BridgeWallet,
  Subscription,
} from "@near-wallet-selector/core";

import WalletConnectClient from "./wallet-connect-client";

export interface WalletConnectParams {
  projectId: string;
  metadata: AppMetadata;
  iconUrl?: string;
}

export function setupWalletConnect({
  projectId,
  metadata,
  iconUrl,
}: WalletConnectParams): WalletModule<BridgeWallet> {
  return function WalletConnect({ network, emitter, logger, updateState }) {
    let subscriptions: Array<Subscription> = [];
    let client: WalletConnectClient;
    let session: SessionTypes.Settled | null = null;

    const getChainId = () => {
      if (["mainnet", "testnet", "betanet"].includes(network.networkId)) {
        return `near:${network.networkId}`;
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
        relayUrl: "wss://relay.walletconnect.com",
        metadata,
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
            const accounts = getAccounts();
            emitter.emit("accountsChanged", { accounts });
          }
        })
      );

      subscriptions.push(
        wcClient.on("session_deleted", (deletedSession) => {
          logger.log("Session Deleted", deletedSession);

          if (deletedSession.topic === session?.topic) {
            cleanup();
            updateState((prevState) => ({
              ...prevState,
              selectedWalletId: null,
            }));

            const accounts = getAccounts();
            emitter.emit("accountsChanged", { accounts });
            emitter.emit("signOut", { accounts });
          }
        })
      );

      client = wcClient;
    };

    return {
      id: "wallet-connect",
      type: "bridge",
      name: "WalletConnect",
      description: null,
      iconUrl: iconUrl || "./assets/wallet-connect-icon.png",

      isAvailable() {
        return true;
      },

      async init() {
        await setupClient();

        if (await this.isSignedIn()) {
          logger.log("WalletConnect:init", "Found historic session");
          session = await client.session.get(client.session.topics[0]);
        }
      },

      async signIn() {
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
            metadata,
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

          updateState((prevState) => ({
            ...prevState,
            showModal: false,
            selectedWalletId: this.id,
          }));

          const accounts = getAccounts();
          emitter.emit("signIn", { accounts });
          emitter.emit("accountsChanged", { accounts });
        } finally {
          subscription.remove();
          QRCodeModal.close();
        }
      },

      async signOut() {
        return client.disconnect({
          topic: session!.topic,
          reason: {
            code: 5900,
            message: "User disconnected",
          },
        });
      },

      async isSignedIn() {
        return client.isSignedIn();
      },

      async getAccounts() {
        return getAccounts();
      },

      async signAndSendTransaction({ signerId, receiverId, actions }) {
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
}
