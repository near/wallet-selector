# @near-wallet-selector/safepal-wallet

This is the [SafePal Wallet](https://www.safepal.com/en/download) package for NEAR Wallet Selector.

## Install SafePal Wallet

- [Chrome Extension](https://www.safepal.com/en/download)
- [Mobile App](https://www.safepal.com/en/download)

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry, this package requires `near-api-js` v1.0.0 or above:

```bash
# Using pnpm
pnpm add -w near-api-js

# Using NPM.
npm install near-api-js
```
```bash
# Using pnpm
pnpm add -w @near-wallet-selector/safepal-wallet

# Using NPM.
npm install @near-wallet-selector/safepal-wallet
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupSafePalWallet } from "@near-wallet-selector/safepal-wallet";

// SafePal Wallet for Wallet Selector can be setup without any params or it can take few optional params, see options below.
const safepalWallet = setupSafePalWallet({
  iconUrl: "https://<Wallet Icon URL Here>" // optional
});

const selector = await setupWalletSelector({
  network: "mainnet",
  modules: [safepalWallet],
});
```

## Options

- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults is `./assets/safepal-wallet.png`.
- `deprecated`: (`boolean?`): Deprecated is optional. Default is `false`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupSafePalWallet } from "@near-wallet-selector/safepal-wallet";
import safepalIconUrl from "@near-wallet-selector/safepal-wallet/assets/safepal-wallet.png";

const safepalWallet = setupSafePalWallet({
  iconUrl: safepalIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
