# @near-wallet-selector/bitte-wallet

This is the [Bitte Wallet](https://wallet.bitte.ai) package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry, this package requires `near-api-js` v1.0.0 or above:

```bash
# Using Yarn
yarn add near-api-js

# Using NPM.
npm install near-api-js
```
```bash
# Using Yarn
yarn add @near-wallet-selector/bitte-wallet

# Using NPM.
npm install @near-wallet-selector/bitte-wallet
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupBitteWallet } from "@near-wallet-selector/bitte-wallet";

const bitteWallet =  setupBitteWallet();

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [bitteWallet],
});
```

## Options

- `walletUrl`: (`string?`): wallet url: https://wallet.bitte.ai for mainnet and https://testnet.wallet.bitte.ai for testnet.


## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
