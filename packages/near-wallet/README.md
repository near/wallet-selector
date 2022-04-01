# @near-wallet-selector/near-wallet

This is the NEAR Wallet package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry:

```bash
# Using Yarn
yarn add @near-wallet-selector/near-wallet

# Using NPM.
npm install @near-wallet-selector/near-wallet
```

Then use it in your dApp:

```ts
import NearWalletSelector from "@near-wallet-selector/core";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";

// NEAR Wallet for Wallet Selector can be setup without any params or it can take two optional params.
const nearWallet = setupNearWallet({
  walletUrl: "https://wallet.testnet.near.org", // optional
  iconPath: "https://yourdomain.com/yourwallet-icon.png" //optional
});

const selector = await NearWalletSelector.init({
  wallets: [nearWallet],
  network: "testnet",
  contractId: "guest-book.testnet",
});
```

## Options

- `walletUrl` (`string`): Wallet Url is an optional parameter to set a custom walletUrl.
- `iconPath`: (`string`): Icon Path is an optional parameter to set a custom icon for the wallet option showed in the modal.

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
