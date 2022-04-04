# @near-wallet-selector/sender

This is the [Sender](https://chrome.google.com/webstore/detail/sender-wallet/epapihdplajcdnnkdeiahlgigofloibg) package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry:

```bash
# Using Yarn
yarn add @near-wallet-selector/sender

# Using NPM.
npm install @near-wallet-selector/sender
```

Then use it in your dApp:

```ts
import NearWalletSelector from "@near-wallet-selector/core";
import { setupSender } from "@near-wallet-selector/sender";

// Sender Wallet for Wallet Selector can be setup without any params or it can take one optional param.
const sender = setupSender({
  iconPath: "https://yourdomain.com/yourwallet-icon.png" //optional
});

const selector = await NearWalletSelector.init({
  wallets: [sender],
  network: "testnet",
  contractId: "guest-book.testnet",
});
```

## Options

- `iconPath`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
