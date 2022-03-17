import WalletConnectClient from "@walletconnect/client";
import { CLIENT_EVENTS } from "@walletconnect/client";
import { PairingTypes } from "@walletconnect/types";

import { nearWalletIcon } from "../icons";
import { WalletModule, BrowserWallet } from "../Wallet";

function setupWalletConnect(): WalletModule<BrowserWallet> {
  return function WalletConnect() {
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
        const client = await WalletConnectClient.init({
          projectId: "c4f79cc...",
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

        let session;
        if (client.session.topics.length) {
          console.log("Found existing session", client.session.topics[0]);
          session = await client.session.get(client.session.topics[0]);
        } else {
          console.log("Creating new session");
          session = await client.connect({
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
        }

        console.log("session:", session);

        const [namespace, chainId, address] = session.state.accounts[0].split(":");

        const result = await client!.request({
          topic: session.topic,
          chainId: "near:testnet",
          request: {
            method: "near_signAndSendTransaction",
            params: {
              signerId: address,
              receiverId: "guest-book.testnet",
              actions: [{
                type: "FunctionCall",
                params: {
                  methodName: "addMessage",
                  args: { text: "Hello from Wallet Connect!" },
                  gas: "30000000000000",
                  deposit: "0",
                }
              }]
            },
          },
        });

        console.log("result:", result);
      },

      async signIn() {
        throw new Error("Not implemented")
      },

      async signOut() {
        throw new Error("Not implemented")
      },

      async isSignedIn() {
        throw new Error("Not implemented")
      },

      async getAccount() {
        throw new Error("Not implemented")
      },

      async signAndSendTransaction() {
        throw new Error("Not implemented")
      }
    };
  };
}

export default setupWalletConnect;
