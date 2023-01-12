# @near-wallet-selector/account-export

This is the Export Selector UI package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry:

```bash
# Using Yarn
yarn add @near-wallet-selector/account-export

# Using NPM.
npm install @near-wallet-selector/account-export
```

Then use it in your wallet:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupExportSelectorModal } from "@near-wallet-selector/account-export";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [setupNearWallet()],
});

const modal = setupExportSelectorModal(selector, {
  accounts: [
    { 
        accountId: "test.testnet",
        privateKey: "ed25519:....",
    },
    ...
  ]
});

modal.show();
```

## Options
- `accounts` (`Array`): List of objects with an account id and its private key to be exported.
- `theme` (`Theme?`): Specify light/dark theme for UI. Defaults to the browser configuration when omitted or set to 'auto'. This can be either `light`, `dark` or `auto`.
- `description` (`string?`): Define a custom description in the UI.

## Styles & Customizing CSS

Import modal css styles:

### React & Vue

```ts
// Add import in the main component
import "@near-wallet-selector/modal-ui/styles.css";
import "@near-wallet-selector/account-export/styles.css";
```

These are the available css variables:

```css
--wallet-selector-backdrop-bg
--wallet-selector-heading-color
--wallet-selector-text-color
--wallet-selector-sidebar-border-color
--wallet-selector-selected-wallet-bg
--wallet-selector-selected-wallet-bg-hover
--wallet-selector-wallet-option-border-color
--wallet-selector-wallet-option-bg-hover
--wallet-selector-content-bg
--wallet-selector-change-path-bg
--wallet-selector-home-button-bg
--wallet-selector-confirm-button-bg
--confirm-button-bg-hover
--wallet-selector-error
--wallet-selector-close-button-bg-color
--wallet-selector-close-button-fill-icon-colo
--wallet-selector-spinner-color
--wallet-selector-bottom-section
--wallet-selector-mobile-text
--wallet-selector-connected-green
```

Customizing css is done simply by updating the value of a variable in the root of your css file.

```css
:root {
  --wallet-selector-backdrop-bg: #26262630;
}
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
