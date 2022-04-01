# @near-wallet-selector/math-wallet

This is the Math Wallet package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry:

```bash
# Using Yarn
yarn add @near-wallet-selector/math-wallet

# Using NPM.
npm install @near-wallet-selector/math-wallet
```

Then use it in your dApp:

```ts
import NearWalletSelector from "@near-wallet-selector/core";
import { setupMathWallet } from "@near-wallet-selector/math-wallet";

// Math Wallet for Wallet Selector can be setup without any params or it can take one optional param.
const mathWallet = setupMathWallet({
  iconPath: "https://yourdomain.com/yourwallet-icon.png"
});

const selector = await NearWalletSelector.init({
  wallets: [mathWallet],
  network: "testnet",
  contractId: "guest-book.testnet",
});
```

## Options

- `iconPath`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
