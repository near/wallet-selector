# @near-wallet-selector/meteor-wallet-app

This is the [Meteor Wallet (for in app only)](https://meteorwallet.app) package for NEAR Wallet Selector.

If you are looking for NEAR Wallet Selector for Meteor Web or extension, please check out `@near-wallet-selector/meteor-wallet` instead.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry

```bash
# Using pnpm
pnpm add -w @near-wallet-selector/meteor-wallet-app

# Using NPM.
npm install @near-wallet-selector/meteor-wallet-app
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupMeteorWalletApp } from "@near-wallet-selector/meteor-wallet-app";

// Meteor App for Wallet Selector must setup with contractId and take few optional params, see options below.
const meteorWallet = setupMeteorWalletApp({
  contractId: "guest-book.testnet", // required
  iconUrl: "https://<Wallet Icon URL Here>" // optional
  deprecated: false // optional
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [meteorWallet],
});
```

## Options

- `contractId`: (`string`): The contract ID your DApp is interacting with.
- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image.
- `deprecated`: (`boolean?`): Deprecated is optional. Default is `false`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import meteorIconUrl from "@near-wallet-selector/meteor-wallet-app/assets/meteor-app-icon.png";

const meteorWallet = setupMeteorWallet({
  iconUrl: meteorIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
