# @near-wallet-selector/bitte-wallet

This is the [Bitte Wallet](https://wallet.bitte.ai) package for NEAR Wallet Selector.

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
yarn add @near-wallet-selector/bitte-wallet

# Using NPM.
npm install @near-wallet-selector/bitte-wallet
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupBitteWallet } from "@near-wallet-selector/bitte-wallet";

const bitteWallet =  setupBitteWallet({
  networkId: 'mainnet',
  walletUrl: 'https://wallet.bitte.ai',
  callbackUrl: 'https://www.mywebsite.com',
  contractId: "yourcontract.near", //remove if you don't want limited access keys to be generated
  deprecated: false,
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [bitteWallet],
});
```

## Options

- `networkId`: (`string?`): 'mainnet' or 'testnet' . Defaults to `mainnet`.
- `deprecated`: (`boolean?`): Deprecated is optional. Default is `false`.
- `callbackUrl`: (`string?`): Valid url to send your user after txn.
- `walletUrl`: (`string?`): wallet url: https://wallet.bitte.ai for mainnet and https://testnet.wallet.bitte.ai for testnet.
- `contractId`: (`string?`): the contract for which the generated limited access key will allow transactions, if you do not need a limited access key do not add this and it wont be created providing quicker onboarding


## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
