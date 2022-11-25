# @near-wallet-selector/opto-wallet

This is the [Opto Wallet](https://optowallet.com/) package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry, this package requires `near-api-js` v0.44.2 or above:

```bash
# Using Yarn
yarn add near-api-js

# Using NPM.
npm install near-api-js
```
```bash
# Using Yarn
yarn add @near-wallet-selector/opto-wallet

# Using NPM.
npm install @near-wallet-selector/opto-wallet
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupOptoWallet } from "@near-wallet-selector/opto-wallet";

// My NEAR Wallet for Wallet Selector can be setup without any params or it can take two optional params.
const optoWallet = setupOptoWallet({
  walletUrl: "https://app.testnet.optowallet.com",
  iconUrl: "https://yourdomain.com/yourwallet-icon.png"
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [optoWallet],
});
```

## Options

- `walletUrl` (`string?`): Wallet URL used to redirect when signing transactions. This parameter is required for custom network configuration.
- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/opto-wallet-icon.png`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupOptoWallet } from "@near-wallet-selector/opto-wallet";
import optoWalletIconUrl from "@near-wallet-selector/opto-wallet/assets/opto-wallet-icon.png";

const optoWallet = setupOptoWallet({
  iconUrl: optoWalletIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
