# @near-wallet-selector/recommended-wallets

This is the Recommended Wallets package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry, this package requires `near-api-js` v0.44.2 or above:

```bash
# Using Yarn
yarn add near-api-js@^0.44.2

# Using NPM.
npm install near-api-js@^0.44.2
```
```bash
# Using Yarn
yarn add @near-wallet-selector/recommended-wallets

# Using NPM.
npm install @near-wallet-selector/recommended-wallets
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupRecommendedWallets } from "@near-wallet-selector/recommended-wallets";

const selector = await setupWalletSelector({
  network: "testnet",
  modules: await setupRecommendedWallets(),
});
```

## Options

- TODO

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
