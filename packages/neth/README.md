# @near-wallet-selector/neth

This is the [NETH](https://neth.app) package for NEAR Wallet Selector.

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
yarn add @near-wallet-selector/neth

# Using NPM.
npm install @near-wallet-selector/neth
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupNeth } from "@near-wallet-selector/neth";

// NETH for Wallet Selector can be setup without any params or it can take few optional params, see options below.
const neth = setupNearSnap({
  iconUrl: "https://<Wallet Icon URL Here>" // optional
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [neth],
});
```

## Options

- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/sender-icon.png`.
- `deprecated`: (`boolean?`): Deprecated is optional. Default is `false`.
- `gas`: (`string?`): Tgas - for each NETH transaction (bundling can include multiple "inner" transactions). Default is `200 Tgas`.
- `useModalCover`: (`boolean?`): Set background overlay to rgba(0, 0, 0, 0.5) while signing and awaiting transaction outcome. Default is `false`.
- `bundle`: (`boolean?`): The signAndSendTransactions will be bundled into 1 NETH TX. Default is `true`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupNeth } from "@near-wallet-selector/neth";
import nethWalletIcon from "@near-wallet-selector/neth/assets/neth-icon.png";

const neth = setupNeth({
  iconUrl: nethWalletIcon
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
