# @near-wallet-selector/bitget-wallet

This is the [Bitget Wallet](https://chromewebstore.google.com/detail/bitget-wallet-formerly-bi/jiidiaalihmmhddjgbnbgdfflelocpak) package for NEAR Wallet Selector.

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
yarn add @near-wallet-selector/bitget-wallet

# Using NPM.
npm install @near-wallet-selector/bitget-wallet
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupBitgetWallet } from "@near-wallet-selector/bitget-wallet";

// Bitget Wallet for Wallet Selector can be setup without any params or it can take one optional param.
const bitgetWallet = setupBitgetWallet());

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [bitgetWallet],
});
```

## Options

- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/bitget-wallet-icon`.
- `deprecated`: (`boolean?`): Deprecated is optional. Default is `false`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupBitgetWallet } from "@near-wallet-selector/bitget-wallet";
import bitgetWalletIconUrl from "@near-wallet-selector/bitget-wallet/assets/bitget-wallet-icon";

const bitgetWallet = setupBitgetWallet({
  iconUrl: bitgetWalletIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
