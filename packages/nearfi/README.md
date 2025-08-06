# @near-wallet-selector/nearfi

This is the [NearFi wallet](https://nearfi.finance) package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry, this package requires near-api-js v0.44.2 or above:

```bash
# Using Yarn
yarn add near-api-js

# Using NPM.
npm install near-api-js
```

```bash
# Using Yarn
yarn add @near-wallet-selector/nearfi

# Using NPM.
npm install @near-wallet-selector/nearfi
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupNearFi } from "@near-wallet-selector/nearfi";

// NearFi for Wallet Selector can be setup without any params or it can take one optional param.
const nearFi = setupNearFi({
  iconUrl: "https://yourdomain.com/yourwallet-icon.png" //optional
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [nearFi],
});
```

> Note: NearFi wallet option is available only in the in-built browser of NearFi mobile app. 


## Options

- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/nearfi-icon.png`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupNearFi } from "@near-wallet-selector/nearfi";
import nearfiIconUrl from "@near-wallet-selector/nearfi/assets/nearfi-icon.png";

const nearfi = setupNearFi({
  iconUrl: nearfiIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
