# @near-wallet-selector/mintbase-wallet

This is the [Mintbase Wallet](https://wallet.mintbase.xyz) package for NEAR Wallet Selector.

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
yarn add @near-wallet-selector/mintbase-wallet

# Using NPM.
npm install @near-wallet-selector/mintbase-wallet
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupMintbaseWallet } from "@near-wallet-selector/mintbase-wallet";

const mintbaseWallet =  setupMintbaseWallet({
  networkId: 'mainnet',
  walletUrl: 'https://wallet.mintbase.xyz',
  callbackUrl: 'https://www.mywebsite.com',
  contractId: "yourcontract.near", //remove if you don't want limited access keys to be generated
  deprecated: false,
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [mintbaseWallet],
});
```

## Options

- `networkId`: (`string?`): 'mainnet' or 'testnet' . Defaults to `mainnet`.
- `deprecated`: (`boolean?`): Deprecated is optional. Default is `false`.
- `callbackUrl`: (`string?`): Valid url to send your user after txn.
- `walletUrl`: (`string?`): wallet url: https://wallet.mintbase.xyz for mainnet and https://testnet.wallet.mintbase.xyz for testnet.
- `contractId`: (`string?`): the contract for which the generated limited access key will allow transactions, if you do not need a limited access key do not add this and it wont be created providing quicker onboarding


## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
