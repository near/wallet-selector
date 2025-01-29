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
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
import { useWalletSelector } from '@near-wallet-selector/react'

export default function MyApp({ Component, pageProps }) {

  const { setupWalletSelector } = useWalletSelector();

  useEffect(() => {
    setupWalletSelector({
      network: NetworkId,
      createAccessKeyFor: HelloNearContract,
      modules: [
        setupMyNearWallet(),
        setupMeteorWallet(),
      ],
    })
  }, []);

  return (<>
      <Navigation />
      <Component {...pageProps} />
    </>
  );
}
```

```ts
import { useWalletSelector } from '@near-wallet-selector/react'

export default function OtherComponent() {
  const { signedAccountId, walletSelector } = useWalletSelector();
  ...
```

## Options

The `setupWalletSelector` function accepts the same options as the `setupWalletSelector` function from the `@near-wallet-selector/core` package. You can find the entire list of options [here](../core/README.md).

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).