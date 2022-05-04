# Custom Wallets

Wallet Selector has been designed with custom wallet integrations in mind. Our existing set of supported wallets work in exactly the same way as this guide, so you might find them useful as a reference for your own integration.

## Getting Started

The basic structure of a (browser) wallet should look like:

```ts
import {
  WalletModuleFactory,
  WalletBehaviourFactory,
  BrowserWallet,
} from "@near-wallet-selector/core";

export interface MyWalletParams {
  iconUrl?: string;
}

const MyWallet: WalletBehaviourFactory<BrowserWallet> = ({
  options,
  provider,
}) => {
  return {
    async connect() {
      // Connect to My Wallet for access to account(s).
      return [];
    },

    async disconnect() {
      // Disconnect from accounts and cleanup (e.g. listeners).
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
}: MyWalletParams = {}): WalletModuleFactory<BrowserWallet> {
  return async () => {
    // Return null here when wallet is unavailable.
    
    return {
      id: "my-wallet",
      type: "browser",
      metadata: {
        name: "My Wallet",
        description: null,
        iconUrl,
      },
      init: MyWallet,
    };
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

### `connect`

This method handles wallet setup (e.g. initialising wallet-specific libraries) and requesting access to accounts via `FunctionCall` access keys. It's important that `connected` is emitted only when we successfully gain access to at least one account.

> Note: Hardware wallets are passed a `derivationPath` where other wallets types are called without any parameters.

> Note: The combination of setup and connecting is still under review.

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

This method is similar to `signAndSendTransaction` but instead sends a batch of Transactions.

> Note: Exactly how this method should behave when transactions fail is still under review with no clear "right" way to do it. NEAR Wallet (website) seems to ignore any transactions that fail and continue executing the rest. Our approach attempts to execute the transactions in a series and bail if any fail (we will look to improve this in the future by implementing a retry feature).
