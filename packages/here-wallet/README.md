# @near-wallet-selector/here-wallet

This is the [Here Wallet](https://herewallet.app/) package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry:

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

const hereWallet = setupHereWallet();
const selector = await setupWalletSelector({
  network: "testnet",
  modules: [hereWallet],
});
```

## Options

- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to base64 from `src/icon.ts`

## Additional Methods

* `getHereBalance(): Promise<BN>` <br/>
  Return available yoktoNears from Here smart contract

* `getAvailableBalance(): Promise<BN>` <br/>
  Return available yoktoNears from near account + getHereBalance()

You can use it with Typescript:
```ts
const isHereWallet = (w: Wallet): w is HereWallet =>
  w.id === "here-wallet";

if (isHereWallet(wallet)) {
  wallet.getAvailableBalance(); // correct typings
}
```

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import HereWalletIconUrl from "@near-wallet-selector/here-wallet/assets/here-wallet-icon.png";

const hereWallet = setupHereWallet({ iconUrl: HereWalletIconUrl });
const selector = await setupWalletSelector({
  network: "testnet",
  modules: [hereWallet],
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
