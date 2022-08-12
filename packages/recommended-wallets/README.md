# @near-wallet-selector/recommended-wallets

This is the Recommended Wallets package for NEAR Wallet Selector.

This is the list of recommended wallets:

- [My NEAR Wallet](https://www.npmjs.com/package/@near-wallet-selector/my-near-wallet) - Browser wallet.
- [Ledger](https://www.npmjs.com/package/@near-wallet-selector/ledger) - Hardware wallet.
- [WalletConnect](https://www.npmjs.com/package/@near-wallet-selector/wallet-connect) - Bridge wallet.


## Installation and Usage

The easiest way to use this package is to install it from the NPM registry, this package requires `near-api-js` v0.44.2 or above:

```bash
# Using Yarn
yarn add near-api-js@^0.44.2

# Using NPM.
npm install near-api-js@^0.44.2
```
```bash
# Using Yarn
yarn add @near-wallet-selector/recommended-wallets

# Using NPM.
npm install @near-wallet-selector/recommended-wallets
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupRecommendedWallets } from "@near-wallet-selector/recommended-wallets";

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [
    ...(await setupRecommendedWallets())
  ],
});
```


## Options

The `setupRecommendedWallets` does not take any options. </br>
To customize any of the recommended wallets listed above, follow these steps for example customize setup for WalletConnect:

>**Note**: In this case the customized wallet setup function must be placed before the `setupRecommendedWallets` call.

**Example**

```ts
// The same can be done for MyNearWallet and Ledger too.
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupWalletConnect } from "@near-wallet-selector/wallet-connect";
import { setupRecommendedWallets } from "@near-wallet-selector/recommended-wallets";

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [
    setupWalletConnect({
      projectId: "your-custom-project-id",
      metadata: {
        name: "NEAR Wallet Selector",
        description: "Example dApp used by NEAR Wallet Selector",
        url: "https://github.com/near/wallet-selector",
        icons: ["https://avatars.githubusercontent.com/u/37784886"],
      },
    }),
    ...(await setupRecommendedWallets())
  ],
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
