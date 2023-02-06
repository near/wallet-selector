# @near-wallet-selector/default-wallets

This is the Default Wallets package for NEAR Wallet Selector.

This is the list of default wallets:

>**Note**: This package does not contain any wallets by default.

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
yarn add @near-wallet-selector/default-wallets

# Using NPM.
npm install @near-wallet-selector/default-wallets
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupDefaultWallets } from "@near-wallet-selector/default-wallets";

const selector = await setupWalletSelector({
  network: "testnet",
  modules: await setupDefaultWallets(),
});
```


## Options

The `setupDefaultWallets` does not take any options. </br>
You can override configuration for a wallet that is in the default list by including a customized instance of that wallet ahead of the default wallets in the `modules` array.

>**Note**: In this case the customized wallet setup function must be placed **before** the `setupDefaultWallets` call.

**Example**

```ts
// The same can be done for MyNearWallet and Ledger too.
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupDefaultWallets } from "@near-wallet-selector/default-wallets";

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [
    setupLedger({
      iconUrl: "your-custom-icon-url",
    }),
    ...(await setupDefaultWallets())
  ],
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
