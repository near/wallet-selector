import WalletConnectClient from "@walletconnect/client";
import { CLIENT_EVENTS } from "@walletconnect/client";
import { PairingTypes, SessionTypes } from "@walletconnect/types";

import { nearWalletIcon } from "../icons";
import { WalletModule, BrowserWallet } from "../Wallet";

interface WalletConnectParams {
  projectId: string;
}

function setupWalletConnect({ projectId }: WalletConnectParams): WalletModule<BrowserWallet> {
  return function WalletConnect({ provider }) {
    let client: WalletConnectClient;
    let session: SessionTypes.Settled;

    const getAccountId = () => {
      if (!session?.state.accounts.length) {
        return null;
      }

      return session.state.accounts[0].split(":")[2];
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

        console.log("Client", client);

        client.on(
          CLIENT_EVENTS.pairing.proposal,
          async (proposal: PairingTypes.Proposal) => {
            // uri should be shared with the Wallet either through QR Code scanning or mobile deep linking
            const { uri } = proposal.signal.params;

            console.log("url:", uri);
          }
        );

        if (client.session.topics.length) {
          console.log("Found existing session", client.session.topics[0]);
          session = await client.session.get(client.session.topics[0]);
        }

        console.log("session:", session);
      },

      async signIn() {
        await client.connect({
          metadata: {
            name: "NEAR Wallet Selector",
            description: "Example dApp used by NEAR Wallet Selector",
            url: "https://github.com/near-projects/wallet-selector",
            icons: ["https://avatars.githubusercontent.com/u/37784886"],
          },
          permissions: {
            blockchain: {
              chains: ["near:testnet"],
            },
            jsonrpc: {
              methods: ["near_signAndSendTransaction"],
            },
          },
        });
      },

      async signOut() {
        throw new Error("Not implemented")
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

        const result = await client.request({
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

        console.log("result:", result);
        return result;
      }
    };
  };
}

export default setupWalletConnect;
