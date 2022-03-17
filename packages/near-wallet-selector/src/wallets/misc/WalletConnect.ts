import WalletConnectClient from "@walletconnect/client";

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
