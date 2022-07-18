# @near-wallet-selector/tokenary

This is the [Tokenary](https://tokenary.io/get) package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry:

```bash
# Using Yarn
yarn add @near-wallet-selector/tokenary

# Using NPM.
npm install @near-wallet-selector/tokenary
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupTokenary } from "@near-wallet-selector/tokenary";

// Tokenary for Wallet Selector can be setup without any params or it can take one optional param.
const tokenary = setupTokenary({
  iconUrl: "https://yourdomain.com/yourwallet-icon.png" //optional
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [tokenary],
});
```

## Options

- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/tokenary-icon.png`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupTokenary } from "@near-wallet-selector/tokenary";
import tokenaryIconUrl from "@near-wallet-selector/tokenary/assets/tokenary-icon.png";

const tokenary = setupTokenary({
  iconUrl: tokenaryIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
