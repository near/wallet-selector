# @near-wallet-selector/near-snap

This is the NEAR Metamask Snap package for NEAR Wallet Selector.

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
yarn add @near-wallet-selector/near-snap

# Using NPM.
npm install @near-wallet-selector/near-snap
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupNearSnap } from "@near-wallet-selector/near-snap";

// Near Snap for Wallet Selector can be setup without any params or it can take few optional params, see options below.
const nearSnap = setupNearSnap({
  iconUrl: "https://<Wallet Icon URL Here>" // optional
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [nearSnap],
});
```


## Near Snap JS SDK

The library uses @near-snap/sdk, you can read more about the functionality here:
https://github.com/here-wallet/near-snap


## Options

- `iconUrl`: (`string?`): Icon is optional. Default image point to Metamask Flask Logo in base64 format.
- `deprecated`: (`boolean?`): Deprecated is optional. Default is `false`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupNearSnap } from "@near-wallet-selector/near-snap";
import SnapIconUrl from "@near-wallet-selector/near-snap/assets/snap-icon.svg";

const snapWallet = setupNearSnap({ 
  iconUrl: SnapIconUrl 
});

```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
