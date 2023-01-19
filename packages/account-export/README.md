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

## Wallet Selector Implementation

Implementing account imports in Wallet Selector requires either:
- Direct method call to an installed browser extension (injected wallets only)
- URL with encrypted account data, either a link to a wallet domain or a deep link for mobile wallets

### Injected Wallets
For injected wallets implemented in browser extensions, calling a method directly on this plugin is permitted without encryption of account data.
To use this method, an injected wallet would implement the [importAccountsInSecureContext](../core/src/lib/wallet/wallet.types.ts) method e.g.:
```ts
importAccountsInSecureContext(params: AccountImportSecureContextParams): Promise<void> {
    params.forEach(({ accountId, privateKey }) => {
        this.wallet.importAccount({ accountId, privateKey });
    });
}
```

Note that this is the default expected behavior for injected wallets. Injected wallets may opt into the URL-based approach described below by setting
the `useUrlAccountImport` flag on `InjectedWalletMetadata` to `true`.

### URL-Based

Wallets may instead opt to implement a URL-based strategy, including browser wallets, mobile wallets via deep links, and injected wallets with a web component capable of
communicating with an extension. To use a URL, the [buildImportAccountsUrl](../core/src/lib/wallet/wallet.types.ts) must be implemented to return the base URL for the account import. The encrypted data will
then be appended to this URL as a fragment before redirecting the user to the composed URL, e.g.:
```ts
buildImportAccountsUrl(): string {
  /* this URL must exist and parse the fragment data */
  return `https://awesome-near-wallet.xyz/${this.state.networkId}`;
}
```

The Wallet Selector will use this base URL and append encrypted data to it before redirecting there, so the final URL would be in the form of `"https://awesome-near-wallet.xyz/mainnet#xyz...abc"`

Once redirected, the user would be prompted for the passphrase used to encrypt this data so that it could be decrypted in the destination wallet. The symmetric decryption method should be imported
from this library:

```ts
import { decryptAccountData } from "@wallet-selector/account-export";
const accounts = decryptAccountData({ ciphertext: urlHash, secretKey: userInputSecret });
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
