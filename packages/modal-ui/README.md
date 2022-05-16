# @near-wallet-selector/modal-ui

This is the modal-ui package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry:

```bash
# Using Yarn
yarn add @near-wallet-selector/modal-ui

# Using NPM.
npm install @near-wallet-selector/modal-ui
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";

const selector = await setupWalletSelector({
  network: "testnet",
  contractId: "guest-book.testnet",
  modules: [setupNearWallet()],
});

const modal = setupModal(selector, {
  theme: "dark",
});

modal.show();
```

## Options

- `theme` (`Theme?`): Specify light/dark theme for UI. Defaults to the browser configuration when omitted or set to 'auto'. This can be either `light`, `dark` or `auto`.
- `description` (`string?`): Define a custom description in the UI.

## API Reference

You can find the entire API reference for Modal UI [here](./docs/api/modal.md).

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
