# @near-wallet-selector/near-snap
[Metamask Snap](https://metamask.io/snaps/) system that allows anyone to safely expand the capabilities of MetaMask. Currently is pre-release software running on [Metamask Flask](https://metamask.io/flask/).

This package implement NEAR snap for NEAR Wallet Selector.

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
yarn add @near-wallet-selector/near-snap

# Using NPM.
npm install @near-wallet-selector/near-snap
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupNearSnap } from "@near-wallet-selector/near-snap";

// NearSnap for Wallet Selector can be setup without any params or it can take one optional param.
const nearSnap = setupNearSnap({
  iconUrl: "https://yourdomain.com/yourwallet-icon.png" //optional
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [nearSnap],
});
```

## Options

- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/near-snap-icon.png`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupNearSnap } from "@near-wallet-selector/near-snap";
import nearSnapIconUrl from "@near-wallet-selector/near-snap/assets/near-snap-icon.png";

const nearSnap = setupNearSnap({
  iconUrl: nearSnapIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
