# @near-wallet-selector/xoth

This is the [Xoth Wallet](https://xoth.app/) package for NEAR Wallet Selector.

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
yarn add @near-wallet-selector/xoth

# Using NPM.
npm install @near-wallet-selector/xoth
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupXothWallet } from "@near-wallet-selector/xoth";

// My NEAR Wallet for Wallet Selector can be setup without any params or it can take two optional params.
const xothWallet = setupXothWallet();

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [xothWallet],
});
```

## Options

- `walletUrl` (`string?`): Wallet URL used to redirect when signing transactions. This parameter is required for custom network configuration.
- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/xoth-icon.png`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupXothWallet } from "@near-wallet-selector/xoth";
import xothWalletIconUrl from "@near-wallet-selector/xoth/assets/xoth-icon.png";

const xothWallet = setupXothWallet({
  iconUrl: xothWalletIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
