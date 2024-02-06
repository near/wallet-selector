# @near-wallet-selector/core

This is the core package for NEAR Wallet Selector.

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
yarn add @near-wallet-selector/core

# Using NPM.
npm install @near-wallet-selector/core
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";

// The entire set of options can be found in the section below.
const selector = await setupWalletSelector({
  network: "testnet",
  modules: [setupMyNearWallet()],
});
```

## Options

- `network` (`NetworkId | Network`): Network ID or object matching that of your dApp configuration . Network ID can be either `mainnet` or `testnet`.
  - `networkId` (`string`): Custom network ID (e.g. `localnet`).
  - `nodeUrl` (`string`): Custom URL for RPC requests.
  - `helperUrl` (`string`): Custom URL for creating accounts.
  - `explorerUrl` (`string`): Custom URL for the NEAR explorer.
  - `indexerUrl` (`string`): Custom URL for the Indexer service.
- `debug` (`boolean?`): Enable internal logging for debugging purposes. Defaults to `false`.
- `optimizeWalletOrder` (`boolean?`): Enable automatic wallet order. Reorders last signed in wallet on top, then installed wallets over not installed and deprecated wallets.
- `randomizeWalletOrder` (`boolean?`): Randomize wallets order in the `More` section of the UI.
- `allowMultipleSelectors` (`boolean?`): Optionally allow creating new instances of wallet selector.
- `languageCode` (`string?`): Optionally set specific ISO 639-1 two-letter language code, disables language detection based on the browser's settings.
- `relayerUrl` (`string?`): Optionally set the URL that meta-transaction enabled wallet modules can use to submit DelegateActions to a relayer
- `storage` (`StorageService?`): Async storage implementation. Useful when [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) is unavailable. Defaults to `localStorage`.
- `modules` (`Array<WalletModuleFactory>`): List of wallets to support in your dApp.

## API Reference

You can find the entire API reference for Wallet Selector [here](./docs/api/selector.md).

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
