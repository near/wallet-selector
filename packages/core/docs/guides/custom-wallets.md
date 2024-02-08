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
  deprecated?: boolean;
}

const MyWallet: WalletBehaviourFactory<BrowserWallet> = ({
  options,
  provider,
}) => {
  // Initialise wallet-specific client(s) here.
  
  return {
    async signIn({ contractId, methodNames }) {
      // Sign in to My Wallet for access to account(s).
      
      return [];
    },

    async signOut() {
      // Sign out from accounts and cleanup (e.g. listeners).
    },

    async getAccounts() {
      // Return list of signed in accounts.
      
      return [];
    },

    async verifyOwner({ message }) {
      const signature = provider.signMessage(message);

      return {
        ...data,
        signature: Buffer.from(signature.signature).toString("base64"),
        keyType: signature.publicKey.keyType,
      }; // Promise<VerifiedOwner>
    },

    async signAndSendTransaction({ signerId, receiverId, actions }) {
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

    async signMessage({ message, nonce, recipient, callbackUrl, state }) {
      // A standardized Wallet API method, namely `signMessage`, 
      // that allows users to sign a message for a specific receiver using their NEAR account
      return await wallet.signMessage({ message, nonce, recipient, callbackUrl, state });
    },
  };
};

export function setupMyWallet({
  iconUrl = "./assets/my-wallet-icon.png",
  deprecated = false,
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
        deprecated,
        available: true,
      },
      init: MyWallet,
    };
  };
}
```

`WalletModule` (return type of `WalletModuleFactory`) is made up of four properties:
- `id`: Unique identifier for the wallet.
- `type`: Type of wallet to infer the behaviour and metadata.
- `metadata`: Metadata for displaying information to the user.
- `init`: The implementation (behaviour) of the wallet.

A variation of `WalletModule` is added to state during setup under `modules` (`ModuleState`) and accessed by the UI to display the available wallets. It's important that `id` is unique to avoid conflicts with other wallets installed by a dApp. The `type` property is coupled to the parameter we pass to `WalletModuleFactory` and `WalletBehaviourFactory`.

Although we've tried to implement a polymorphic approach to wallets, there are some differences between wallet types that means your implementation won't always mirror other wallets such as Sender vs. Ledger. There are currently five types of wallet:

- `BrowserWallet`
- `InjectedWallet`
- `HardwareWallet`
- `BridgeWallet`
- `InstantLinkWallet`

## Methods

### `signIn`

This method handles access to accounts via `FunctionCall` access keys. It's important that at least one account is returned to be in a signed in state.

> Note: Hardware wallets require `accounts`.

### `signOut`

This method handles signing out from accounts and cleanup such as event listeners. It's called when either the user specifically signs out or when switching to a different wallet.

### `getAccounts`

This method returns the current list of accounts we have access to. When no accounts are returned, the wallet is considered to be in a signed out state.

### `verifyOwner`

Signs the message and verifies the owner. Message is not sent to blockchain.

### `signAndSendTransaction`

This method signs a list of NEAR Actions before sending via an RPC endpoint. The implementation can differ widely based on how much the wallet you're integrating does for you. At a minimum the wallet must be able to sign a message.

Where you might have to construct NEAR Transactions and send them yourself, you can import `near-api-js` and make use of the injected `provider` that's configured based on `options.network`.

> Note: Browser wallets (i.e. MyNearWallet) are unable to return the transaction outcome as they can trigger a redirect. The return type in this case is `Promise<void>` instead of the usual `Promise<FinalExecutionOutcome>`.

### `signAndSendTransactions`

This method is similar to `signAndSendTransaction` but instead sends a batch of Transactions.

> Note: Exactly how this method should behave when transactions fail is still under review with no clear "right" way to do it. MyNearWallet (website) seems to ignore any transactions that fail and continue executing the rest. Our approach attempts to execute the transactions in a series and bail if any fail (we will look to improve this in the future by implementing a retry feature).

### `signMessage`

This method allows users to sign a message for a specific recipient using their NEAR account.
Returns the `SignedMessage` based on the [NEP413](https://github.com/near/NEPs/blob/master/neps/nep-0413.md).
