import WalletConnectClient, {
  RELAYER_DEFAULT_PROTOCOL,
  SESSION_EMPTY_PERMISSIONS,
  SESSION_SIGNAL_METHOD_PAIRING
} from "@walletconnect/client";
import { CLIENT_EVENTS } from "@walletconnect/client";
import { PairingTypes, SessionTypes, AppMetadata } from "@walletconnect/types";
import QRCodeModal from "@walletconnect/qrcode-modal";

import { nearWalletIcon } from "../icons";
import { WalletModule, BrowserWallet } from "../Wallet";
import { Subscription } from "../../utils/EventsHandler";

interface WalletConnectParams {
  projectId: string;
  metadata: AppMetadata
}

function setupWalletConnect({ projectId, metadata }: WalletConnectParams): WalletModule<BrowserWallet> {
  return function WalletConnect({ options, provider, emitter, logger, updateState }) {
    const subscriptions: Array<Subscription> = [];
    let client: WalletConnectClient;
    let session: SessionTypes.Settled | null = null;

    const getAccountId = () => {
      if (!session?.state.accounts.length) {
        return null;
      }

      return session.state.accounts[0].split(":")[2];
    };

    const addEventListener = (event: string, listener: unknown): Subscription => {
      client.on(event, listener);

      return {
        remove: () => client.off(event, listener)
      }
    };

    // Used instead of client.connect to reduce the timeout of pairing from 5 minutes.
    const connect = async () => {
      const relay = { protocol: RELAYER_DEFAULT_PROTOCOL };
      const timeout = 30 * 1000;

      const pairing = await client.pairing.create({ relay, timeout });

      return client.session.create({
        signal: {
          method: SESSION_SIGNAL_METHOD_PAIRING,
          params: { topic: pairing.topic }
        },
        relay,
        timeout,
        metadata,
        permissions: {
          ...SESSION_EMPTY_PERMISSIONS,
          blockchain: {
            chains: [`near:${options.networkId}`],
          },
          jsonrpc: {
            methods: ["near_signAndSendTransaction"],
          },
        },
      })
    }

    return {
      id: "wallet-connect",
      type: "browser",
      name: "WalletConnect",
      description: null,
      iconUrl: nearWalletIcon,

      isAvailable() {
        return true;
      },

      async init() {
        client = await WalletConnectClient.init({
          projectId,
          relayUrl: "wss://relay.walletconnect.com",
          metadata,
        });

        subscriptions.push(
          addEventListener(
            CLIENT_EVENTS.pairing.created,
            (pairing: PairingTypes.Settled) => {
              logger.log("Pairing Created", pairing);
            }
          )
        );

        subscriptions.push(
          addEventListener(
            CLIENT_EVENTS.session.created,
            (newSession: SessionTypes.Settled) => {
              logger.log("Session Created", newSession);
            }
          )
        );

        subscriptions.push(
          addEventListener(
            CLIENT_EVENTS.session.updated,
            (updatedSession: SessionTypes.Settled) => {
              logger.log("Session Updated", updatedSession);
              session = updatedSession;
            }
          )
        );

        // @ts-ignore
        window.wcClient = client;

        if (client.session.topics.length) {
          const topic = client.session.topics[0];
          logger.log("WalletConnect:init:topic", topic);

          session = await client.session.get(topic);
        }
      },

      async signIn() {
        if (!client) {
          await this.init();
        }

        if (session) {
          logger.log("Session already exists");

          updateState((prevState) => ({
            ...prevState,
            showModal: false,
            selectedWalletId: this.id,
          }));
          emitter.emit("signIn");
          return;
        }

        const subscription = addEventListener(
          CLIENT_EVENTS.pairing.proposal,
          (proposal: PairingTypes.Proposal) => {
            logger.log("Pairing Proposal", proposal);
            const { uri } = proposal.signal.params;

            QRCodeModal.open(uri, () => {
              subscription.remove();
            });
          }
        );

        try {
          const newSession = await connect();

          if (newSession.state.accounts.length > 1) {
            const message = "Multiple accounts not supported";
            await client.session.delete({
              topic: newSession.topic,
              reason: { code: 9000, message }
            });

            throw new Error(message);
          }

          session = newSession;

          updateState((prevState) => ({
            ...prevState,
            showModal: false,
            selectedWalletId: this.id,
          }));
          emitter.emit("signIn");
        } catch (err) {
          logger.log("Failed to create WalletConnect session");
          logger.error(err);
          throw new Error("Failed to sign in");
        } finally {
          subscription.remove();
          QRCodeModal.close();
        }
      },

      async signOut() {
        subscriptions.forEach((subscription) => subscription.remove());

        await client.disconnect({
          topic: session!.topic,
          reason: {
            code: 5900,
            message: "User disconnected"
          },
        });
        session = null;

        updateState((prevState) => ({
          ...prevState,
          selectedWalletId: null,
        }));
        emitter.emit("signOut");
      },

      async isSignedIn() {
        return Boolean(client.session.topics.length);
      },

      async getAccount() {
        const accountId = getAccountId();

        if (!accountId) {
          return null;
        }

        const account = await provider.viewAccount({ accountId });

        return {
          accountId,
          balance: account.amount,
        };
      },

      async signAndSendTransaction({ receiverId, actions }) {
        const signerId = getAccountId()!;

        logger.log("WalletConnect:signAndSendTransaction", {
          topic: session!.topic,
          signerId,
          receiverId,
          actions,
        });

        return client.request({
          topic: session!.topic,
          chainId: "near:testnet",
          request: {
            method: "near_signAndSendTransaction",
            params: {
              signerId,
              receiverId,
              actions
            },
          },
        });
      }
    };
  };
}

export default setupWalletConnect;
