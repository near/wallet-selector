# @near-wallet-selector/rabby-wallet

This is the [Rabby Wallet](https://chromewebstore.google.com/detail/rabby-wallet/acmacodkjbdgmoleebolmdjonilkdbch) package for NEAR Wallet Selector.

## Install Rabby Wallet

- [Chrome](https://chromewebstore.google.com/detail/rabby-wallet/acmacodkjbdgmoleebolmdjonilkdbch)


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
yarn add @near-wallet-selector/rabby-wallet

# Using NPM.
npm install @near-wallet-selector/rabby-wallet
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupRabbyWallet } from "@near-wallet-selector/rabby-wallet";

// Rabby Wallet for Wallet Selector can be setup without any params or it can take few optional params, see options below.
const rabbyWallet = setupRabbyWallet({
  iconUrl: "https://<Wallet Icon URL Here>" // optional
});

const selector = await setupWalletSelector({
  network: "mainnet", // Rabby Wallet only supports NEAR Mainnet at the moment.
  modules: [rabbyWallet],
});
```

## Options

- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults is `./assets/rabby-wallet.png`.
- `deprecated`: (`boolean?`): Deprecated is optional. Default is `false`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupRabbyWallet } from "@near-wallet-selector/rabby-wallet";
import rabbyIconUrl from "@near-wallet-selector/rabby-wallet/assets/rabby-wallet.png";

const rabbyWallet = setupRabbyWallet({
  iconUrl: rabbyIconUrl
});
```

## Tip

Rabby Wallet only supports NEAR Mainnet at the moment.

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
