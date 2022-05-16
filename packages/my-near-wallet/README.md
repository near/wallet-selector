# @near-wallet-selector/near-wallet

This is the [My NEAR Wallet](https://mynearwallet.near.org/) package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry:

```bash
# Using Yarn
yarn add @near-wallet-selector/my-near-wallet

# Using NPM.
npm install @near-wallet-selector/my-near-wallet
```

Then use it in your dApp:

```ts
import NearWalletSelector from "@near-wallet-selector/core";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";

// NEAR Wallet for Wallet Selector can be setup without any params or it can take two optional params.
const myNearWallet = setupMyNearWallet({
  walletUrl: "https://wallet.testnet.mynear.org",
  iconUrl: "https://yourdomain.com/yourwallet-icon.png"
});

const selector = await NearWalletSelector.init({
  network: "testnet",
  contractId: "guest-book.testnet",
  wallets: [myNearWallet],
});
```

## Options

- `walletUrl` (`string?`): Wallet URL used to redirect when signing transactions. This parameter is required when using custom network configuration.
- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/near-wallet-icon.png`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import myNearWalletIconUrl from "@near-wallet-selector/my-near-wallet/assets/my-near-wallet-icon.png";

const nearWallet = setupMyNearWallet({
  iconUrl: myNearWalletIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
