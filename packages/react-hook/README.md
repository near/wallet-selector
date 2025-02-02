# @near-wallet-selector/react-hook

This package implements a React Hook for the NEAR Wallet Selector to simplify using it in React applications.

## Installation and Usage

```bash
# Using Yarn
yarn add @near-wallet-selector/react-hook

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
  createAccessKeyFor: "hello.near-examples.testnet",
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
  const { signedAccountId, walletSelector, wallet, modal } = useWalletSelector();
  ...
  // modal.show() to show the wallet selector modal
  // walletSelector.signOut() to log out the user
  ...
  }
```

## Options

The `setupWalletSelector` function accepts the same options as the `setupWalletSelector` function from the `@near-wallet-selector/core` package. You can find the entire list of options [here](../core/README.md).

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).