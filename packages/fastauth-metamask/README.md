# @near-wallet-selector/fastauth-metamask

This is the [fastauth-metamask](https://fastauth-metamask.app) package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry, this package requires `near-api-js` v0.44.2 or above:

```bash
# Using Yarn
yarn add near-api-js

# Using NPM.
npm install near-api-js
```
```bash
# Using Yarn
yarn add @near-wallet-selector/fastauth-metamask

# Using NPM.
npm install @near-wallet-selector/fastauth-metamask
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupfastauth-metamask } from "@near-wallet-selector/fastauth-metamask";

// fastauth-metamask for Wallet Selector can be setup without any params or it can take one optional param.
const fastauth-metamask = setupfastauth-metamask({
  // default fastauth-metamask icon included
  iconUrl?: string;
  // default 200 Tgas - for each fastauth-metamask transaction (bundling can include multiple "inner" transactions)
  gas?: string; 
  // default false - cover screen with rgba(0, 0, 0, 0.5) mask while signing and awaiting transaction outcome
  useModalCover?: boolean;
  // default true - signAndSendTransactions will be bundled into 1 fastauth-metamask TX
  bundle?: boolean,
  // default false
  deprecated?: boolean,
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [fastauth-metamask],
});
```

## Options

Setup options are described in comments above

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupfastauth-metamask } from "@near-wallet-selector/fastauth-metamask";
import { nearWalletIcon } from "@near-wallet-selector/fastauth-metamask/assets/icons";

const fastauth-metamask = setupfastauth-metamask({
  iconUrl: nearWalletIcon
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
