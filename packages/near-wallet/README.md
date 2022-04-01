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
  walletUrl: "https://wallet.testnet.near.org",
  iconPath: "https://yourdomain.com/yourwallet-icon.png"
});

const selector = await NearWalletSelector.init({
  wallets: [nearWallet],
  network: "testnet",
  contractId: "guest-book.testnet",
});
```

## Options

- `walletUrl` (`string?`): Wallet URL used to redirect when signing transactions. This parameter is required when using custom network configuration.
- `iconPath`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image.
## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
