# Custom Wallets

Wallet Selector has been designed with custom wallet integrations in mind. Our existing set of supported wallets work in exactly the same way as this guide, so you might find them useful as a reference for your own integration.

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

const MyWallet: WalletBehaviourFactory<BrowserWallet> = ({
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
}: MyWalletParams = {}): WalletModule<BrowserWallet> {
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

`WalletModule` is made up of two main parts:
- Behaviour: `wallet`.
- Metadata: `id`, `type`, `name`, `description` and `iconUrl`.

The metadata of a wallet is accessible as part of the selector's `wallets` state. It's important that `id` is unique to avoid conflicts with other wallets installed by a dApp. The `type` property is coupled to the parameter we pass to `WalletModule` and `WalletBehaviourFactory`.

Although we've tried to implement a polymorphic approach to wallets, there are some differences between wallet types that means your implementation won't always mirror other wallets such as Sender vs. Ledger. There are currently four types of wallet:

- `BrowserWallet`: NEAR Wallet
- `InjectedWallet`: Sender & Math Wallet
- `HardwareWallet`: Ledger
- `BridgeWallet`: WalletConnect

## Methods

### `isAvailable`

This method is used to determine whether a wallet is available for connecting. For example, injected wallets such as Sender are unavailable on mobile where browser extensions are not supported. The UI will hide the wallet when `false` is returned.

> Note: Injected wallets should be considered available if they aren't installed. The modal handles this case by displaying a download link (using `getDownloadUrl`) when attempting to connect.

### `connect`

- TODO: What is the purpose of this method?
- TODO: What should occur in this method?

### `disconnect`

This method handles disconnecting from accounts and cleanup such as event listeners. It's called when either the user specifically disconnects or when switching to a different wallet. It's important that `disconnected` is emitted regardless of exceptions.

> Note: The requirement to emit "disconnected" is still under review and may be removed in favour of accepting the Promise settling as a signal that this method has completed. 

### `getAccounts`

This method returns the current list of accounts we have access to. When no accounts are returned, the wallet is considered to be in a disconnected state.

### `signAndSendTransaction`

This method signs a list of NEAR Actions before sending via an RPC endpoint. The implementation can differ widely based on how much the wallet you're integrating does for you. At a minimum the wallet must be able to sign a message.

Where you might have to construct NEAR Transactions and send them yourself, you can import `near-api-js` and make use of the injected `provider` that's configured based on `options.network`.

> Note: Browser wallets (i.e. NEAR Wallet) are unable to return the transaction outcome as they can trigger a redirect. The return type in this case is `Promise<void>` instead of the usual `Promise<FinalExecutionOutcome>`.

### `signAndSendTransactions`

- TODO: What is the purpose of this method?
- TODO: What should occur in this method?

### `getDownloadUrl`

- TODO: What is the purpose of this method?
- TODO: What should occur in this method?
