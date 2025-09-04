# @near-wallet-selector/react-hook

This package implements a React Hook for the NEAR Wallet Selector to simplify using it in React applications.

## Installation and Usage

```bash
# Using pnpm
pnpm add -w @near-wallet-selector/react-hook

# Using NPM.
npm install @near-wallet-selector/react-hook
```

Then use it in your dApp:

```ts
import '@near-wallet-selector/modal-ui/styles.css';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
import { WalletSelectorProvider } from '@near-wallet-selector/react-hook';
 
const walletSelectorConfig = {
  network: "testnet",
  createAccessKeyFor: {
    contractId: "hello.near-examples.testnet",
    methodNames: []
  },
  modules: [
    setupMyNearWallet(),
    setupMeteorWallet(),
  ],
}

export default function App({ Component }) {
  return (
    <WalletSelectorProvider config={walletSelectorConfig}>
      <Component {...pageProps} />
    </WalletSelectorProvider>
  );
}
```

```ts
import { useWalletSelector } from '@near-wallet-selector/react'

export default function OtherComponent() {
  const { 
    walletSelector,
    signedAccountId,
    wallet,
    signIn,
    signOut,
    viewFunction,
    callFunction,
    getBalance,
    getAccessKeys,
    signAndSendTransactions,
    signMessage,
    createSignedTransaction
  } = useWalletSelector();
  ...
  // walletSelector to interact with the wallet.
  // signedAccountId to get the current signed in account id.
  // wallet to get the current wallet.
  // signIn opens a modal to sign in the user.
  // signOut to sign out the user.
  // viewFunction to call contract view.
  // callFunction to call a function of the contract.
  // getBalance to get the balance of an account.
  // getAccessKeys to get the access keys of an account.
  // signAndSendTransactions to sign and send transactions.
  // signMessage to sign a message.

  ...
  }
```

## Options

The `setupWalletSelector` function accepts the same options as the `setupWalletSelector` function from the `@near-wallet-selector/core` package. You can find the entire list of options [here](../core/README.md).

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
