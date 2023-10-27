# @near-wallet-selector/ramper-wallet


This is the [Ramper Wallet](https://docs.ramper.xyz/) package for NEAR Wallet Selector.

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
yarn add @near-wallet-selector/ramper-wallet

# Using NPM.
npm install @near-wallet-selector/ramper-wallet
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupRamperWallet } from "@near-wallet-selector/ramper-wallet";

// Ramper for Wallet Selector can be setup without any params or it can take few optional params, see options below.
const ramper = setupRamperWallet({
  iconUrl: "https://<Wallet Icon URL Here>" // optional
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [ramper],
});
```

## Options

- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/ramper-wallet.png`.
- `deprecated`: (`boolean?`): Deprecated is optional. Default is `false`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupRamperWallet } from "@near-wallet-selector/ramper-wallet";
import ramperWalletIconUrl from "@near-wallet-selector/ramper-wallet/assets/ramper-wallet.png";

const ramper = setupRamperWallet({
  iconUrl: ramperWalletIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
