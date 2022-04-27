# Custom Wallets

Wallet Selector has been designed with custom wallet integrations in mind. Our existing set of support wallets work in exactly the same way as this guide, so you might find them useful as a reference for your own integration.

## Getting Started

The basic structure of a (browser) wallet should look like:

```ts
import {
  WalletModule,
  WalletBehaviourFactory,
  BrowserWallet,
  Action,
  Transaction,
} from "@near-wallet-selector/core";

export interface MyWalletParams {
  iconUrl?: string;
}

const MyWallet: WalletBehaviourFactory<InjectedWallet> = ({
  options,
  emitter,
  provider,
}) => {
  return {
    async isAvailable() {
      // Determine whether My Wallet is available.
      // For example, some wallets aren't supported on mobile.
      
      return true;
    },

    async connect() {
      // Connect to My Wallet for access to account(s).
      
      const accounts = [];
      emitter.emit("connected", { accounts });

      return accounts;
    },

    async disconnect() {
      // Disconnect from accounts and cleanup (e.g. listeners).

      emitter.emit("disconnected", null);
    },

    async getAccounts() {
      // Return list of connected accounts.
      
      return [];
    },

    async signAndSendTransaction({
      signerId,
      receiverId = options.contractId,
      actions,
    }) {
      // Sign a list of NEAR Actions before sending via an RPC endpoint.
      // An RPC provider is injected to make this process easier and configured based on options.network.
      
      return provider.sendTransaction(signedTx);
    },

    async signAndSendTransactions({ transactions }) {
      // Sign a list of Transactions before sending via an RPC endpoint.
      // An RPC provider is injected to make this process easier and configured based on options.network.
      
      const signedTxs = [];
        
      return Promise.all(
        signedTxs.map((signedTx) => provider.sendTransaction(signedTx))
      );
    },
  };
};

export function setupMyWallet({
  iconUrl = "./assets/my-wallet-icon.png",
}: SenderParams = {}): WalletModule<BrowserWallet> {
  return {
    id: "my-wallet",
    type: "browser",
    name: "My Wallet",
    description: null,
    iconUrl,
    wallet: MyWallet,
  };
}
```
