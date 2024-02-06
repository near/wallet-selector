# @near-wallet-selector/near-mobile-wallet

This is the [Near Mobile Wallet](https://nearmobile.app/) package for NEAR Wallet Selector.

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
yarn add @near-wallet-selector/near-mobile-wallet

# Using NPM.
npm install @near-wallet-selector/near-mobile-wallet
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupNearMobileWallet } from "@near-wallet-selector/near-mobile-wallet";

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [setupNearMobileWallet()],
});
```

## Options

- `dAppMetadata: DAppMetadata`  (optional): An object to provide data from your dApp to be displayed on Near Mobile Wallet when signing requests. 
```ts
export interface DAppMetadata {
    name: string;
    logoUrl: string;
    url?: string;
}
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
