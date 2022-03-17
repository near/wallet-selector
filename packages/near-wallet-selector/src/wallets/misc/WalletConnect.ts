import WalletConnectClient from "@walletconnect/client";
import { CLIENT_EVENTS } from "@walletconnect/client";
import { PairingTypes, SessionTypes } from "@walletconnect/types";

import { nearWalletIcon } from "../icons";
import { WalletModule, BrowserWallet } from "../Wallet";
import { Subscription } from "../../utils/EventsHandler";

interface WalletConnectParams {
  projectId: string;
}

function setupWalletConnect({ projectId }: WalletConnectParams): WalletModule<BrowserWallet> {
  return function WalletConnect({ options, provider, emitter, logger, updateState }) {
    const subscriptions: Record<string, Subscription> = {};
    let client: WalletConnectClient;
    let session: SessionTypes.Settled;

    const getAccountId = () => {
      if (!session?.state.accounts.length) {
        return null;
      }

      return session.state.accounts[0].split(":")[2];
    }

    const addEventListener = (event: string, listener: unknown) => {
      client.on(event, listener);

      subscriptions[event] = {
        remove: () => client.off(event, listener)
      }
    }

    return {
      id: "wallet-connect",
      type: "browser",
      name: "Wallet Connect",
      description: null,
      iconUrl: nearWalletIcon,

      isAvailable() {
        return true;
      },

      async init() {
        client = await WalletConnectClient.init({
          projectId,
          relayUrl: "wss://relay.walletconnect.com",
          metadata: {
            name: "Example Dapp",
            description: "Example Dapp",
            url: "#",
            icons: ["https://walletconnect.com/walletconnect-logo.png"],
          },
        });

        addEventListener(
          CLIENT_EVENTS.pairing.proposal,
          (proposal: PairingTypes.Proposal) => {
            // uri should be shared with the Wallet either through QR Code scanning or mobile deep linking
            const { uri } = proposal.signal.params;

            console.log("Pairing URI:", uri);
          }
        );

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
          return updateState((prevState) => ({
            ...prevState,
            showModal: false,
            selectedWalletId: this.id,
          }));
        }

        session = await client.connect({
          metadata: {
            name: "NEAR Wallet Selector",
            description: "Example dApp used by NEAR Wallet Selector",
            url: "https://github.com/near-projects/wallet-selector",
            icons: ["https://avatars.githubusercontent.com/u/37784886"],
          },
          permissions: {
            blockchain: {
              chains: [`near:${options.networkId}`],
            },
            jsonrpc: {
              methods: ["near_signAndSendTransaction"],
            },
          },
        });

        updateState((prevState) => ({
          ...prevState,
          showModal: false,
          selectedWalletId: this.id,
        }));
        emitter.emit("signIn");
      },

      async signOut() {
        for (const key in subscriptions) {
          subscriptions[key].remove();
        }

        await client.disconnect({
          topic: session.topic,
          reason: {
            code: 5900,
            message: "User disconnected"
          },
        });

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
          topic: session.topic,
          signerId,
          receiverId,
          actions,
        });

        return client.request({
          topic: session.topic,
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
