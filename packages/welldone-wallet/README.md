# @near-wallet-selector/welldone

This is the [WELLDONE](https://chrome.google.com/webstore/detail/welldone-wallet-for-multi/bmkakpenjmcpfhhjadflneinmhboecjf) package for NEAR Wallet Selector.

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
yarn add @near-wallet-selector/welldone-wallet

# Using NPM.
npm install @near-wallet-selector/welldone-wallet
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupWelldoneWallet } from "@near-wallet-selector/welldone-wallet";

// WELLDONE Wallet for Wallet Selector can be setup without any params or it can take few optional params, see options below.
const welldone = setupWelldoneWallet({
  iconUrl: "https://<Wallet Icon URL Here>" // optional
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [welldone],
});
```

## Options

- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/welldone-wallet.png`.
- `deprecated`: (`boolean?`): Deprecated is optional. Default is `false`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupWelldoneWallet } from "@near-wallet-selector/welldone-wallet";
import welldoneIconUrl from "@near-wallet-selector/welldone-wallet/assets/welldone-wallet.png";

const welldone = setupWelldoneWallet({
  iconUrl: welldoneIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
