# @near-wallet-selector/safePal

This is the [safePal](https://chrome.google.com/webstore/detail/safePal-wallet/epapihdplajcdnnkdeiahlgigofloibg) package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry:

```bash
# Using Yarn
yarn add @near-wallet-selector/safePal

# Using NPM.
npm install @near-wallet-selector/safePal
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupsafePal } from "@near-wallet-selector/safePal";

// safePal for Wallet Selector can be setup without any params or it can take one optional param.
const safePal = setupsafePal({
  iconUrl: "https://yourdomain.com/yourwallet-icon.png" //optional
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [safePal],
});
```

## Options

- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/safePal-icon.png`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupsafePal } from "@near-wallet-selector/safePal";
import safePalIconUrl from "@near-wallet-selector/safePal/assets/safePal-icon.png";

const safePal = setupsafePal({
  iconUrl: safePalIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
