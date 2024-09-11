# @near-wallet-selector/my-near-wallet

This is the [Arepa Wallet](https://mi.arepa.digital/) package for NEAR Wallet Selector.

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
yarn add @near-wallet-selector/arepa-wallet

# Using NPM.
npm install @near-wallet-selector/arepa-wallet
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupArepaWallet } from "@near-wallet-selector/arepa-wallet";

// My NEAR Wallet for Wallet Selector can be setup without any params or it can take few optional params, see options below.
const arepaWallet = setupArepaWallet({
  walletUrl: "https://develop.globaldv.tech/wallet-arepa/",
  iconUrl: "https://<Wallet Icon URL Here>" // optional
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [arepaWallet],
});
```

## Options

- `walletUrl` (`string?`): Wallet URL used to redirect when signing transactions. This parameter is required for custom network configuration.
- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/arepa-wallet-icon.png`.
- `deprecated`: (`boolean?`): Deprecated is optional. Default is `false`.
- `successUrl`: (`string?`): SuccessUrl is optional. Default is `''` (empty string).
- `failureUrl`: (`string?`): FailureUrl is optional. Default is `''` (empty string).

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupMyNearWallet } from "@near-wallet-selector/arepa-wallet";
import arepaWalletIconUrl from "@near-wallet-selector/arepa-wallet/assets/arepa-wallet-icon.png";

const arepaWallet = setupArepaWallet({
  iconUrl: arepaWalletIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
