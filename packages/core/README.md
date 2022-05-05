# @near-wallet-selector/core

This is the core package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry:

```bash
# Using Yarn
yarn add @near-wallet-selector/core

# Using NPM.
npm install @near-wallet-selector/core
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";

// The entire set of options can be found in the section below.
const selector = await setupWalletSelector({
  network: "testnet",
  contractId: "guest-book.testnet",
  modules: [setupNearWallet()],
});
```

## Options

- `network` (`NetworkId | Network`): Network ID or object matching that of your dApp configuration . Network ID can be either `mainnet`, `testnet` or `betanet`.
  - `networkId` (`string`): Custom network ID (e.g. `localnet`).
  - `nodeUrl` (`string`): Custom URL for RPC requests.
  - `helperUrl` (`string`): Custom URL for creating accounts.
  - `explorerUrl` (`string`): Custom URL for the NEAR explorer.
- `contractId` (`string`): Account ID of the Smart Contract used for `connect` and signing transactions.
- `methodNames` (`Array<string>?`): Specify limited access to particular methods on the Smart Contract.
- `debug`: (`boolean?`): Enable internal logging for debugging purposes.
- `modules` (`Array<WalletModuleFactory>`): List of wallets to support in your dApp.
- `ui`: (`ModalOptions?`)
  - `theme` (`Theme?`): Specify light/dark theme for UI. Defaults to the browser configuration when omitted or set to 'auto'. This can be either `light`, `dark` or `auto`.
  - `description` (`string?`): Define a custom description in the UI.

## API Reference

You can find the entire API reference for Wallet Selector [here](./docs/api/selector.md).

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
