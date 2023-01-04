# @near-wallet-selector/here-wallet

This is the [Here Wallet](https://herewallet.app/) package for NEAR Wallet Selector.

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
yarn add @near-wallet-selector/here-wallet

# Using NPM.
npm install @near-wallet-selector/here-wallet
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [setupHereWallet()],
});
```


## Here Wallet JS SDK

The library uses @here-wallet/core, you can read more about the functionality here:
https://github.com/here-wallet/js-sdk


## Instant Wallet with AppClip

If your goal is to provide the user with a convenient way to log in to your desktop app, you can use Here Instant Wallet, which allows users without a wallet to instantly create one via appclip.

At the moment here wallet is only available for IOS users

You have the option to override how your user is delivered the signing link. This is how you can create a long-lived transaction signature request and render it on your web page:

```ts
import { QRCodeStrategy } from "@here-wallet/core/qrcode-strategy";
const isHereWallet = (w: Wallet): w is HereWallet => w.id === "here-wallet";

// Correct typings
if (isHereWallet(wallet)) {
  await here.signIn({
    contractId: "social.near",
    strategy: new QRCodeStrategy({ 
      element: document.getElementById("qr-container"), 
      theme: 'dark'
    }),
  });
}
```


## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import HereWalletIconUrl from "@near-wallet-selector/here-wallet/assets/here-wallet-icon.png";

const hereWallet = setupHereWallet({ 
  iconUrl: HereWalletIconUrl 
});

```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
