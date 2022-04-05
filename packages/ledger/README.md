# @near-wallet-selector/ledger

This is the [Ledger](https://www.ledger.com/) package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry:

```bash
# Using Yarn
yarn add @near-wallet-selector/ledger

# Using NPM.
npm install @near-wallet-selector/ledger
```

Then use it in your dApp:

```ts
import NearWalletSelector from "@near-wallet-selector/core";
import { setupLedger } from "@near-wallet-selector/ledger";

// Ledger for Wallet Selector can be setup without any params or it can take one optional param.
const ledger = setupLedger({
  iconUrl: "https://yourdomain.com/yourwallet-icon.png"
});

const selector = await NearWalletSelector.init({
  network: "testnet",
  contractId: "guest-book.testnet",
  wallets: [ledger],
});
```

## Options

- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/ledger-icon.png`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupLedger } from "@near-wallet-selector/ledger";
import ledgerIconUrl from "@near-wallet-selector/ledger/assets/ledger-icon.png";

const ledger = setupLedger({
  iconUrl: ledgerIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
