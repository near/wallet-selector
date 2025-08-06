# @near-wallet-selector/coin98-wallet

Coin98 Wallet [Coin98 Wallet](https://chrome.google.com/webstore/detail/coin98-wallet/aeachknmefphepccionboohckonoeemg) Package for NEAR Wallet Selector

## Installation

This package requires `near-api-js` v0.44.2 or above:

```bash
# Using Yarn
yarn add near-api-js

# Using NPM.
npm install near-api-js
```

```bash
# Using Yarn
yarn add @near-wallet-selector/coin98-wallet

# Using NPM.
npm install @near-wallet-selector/coin98-wallet
```

## Usage

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupCoin98Wallet } from "@near-wallet-selector/coin98-wallet";

// Coin98 Wallet for Wallet Selector can be setup without any params or it can take one optional param.
const coin98Wallet = setupCoin98Wallet({
  iconUrl: "https://<Your Icon URL here>"
});


const selector = await setupWalletSelector({
  network: "testnet",
  modules: [coin98Wallet],
});
```

## Options

- `iconUrl`: (`string?`): Icon is optional. Default image point to Coin98 Wallet Logo in base64 format.

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
