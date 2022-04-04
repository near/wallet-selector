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

// Sender for Wallet Selector can be setup without any params or it can take one optional param.
const sender = setupSender({
  iconUrl: "https://yourdomain.com/yourwallet-icon.png" //optional
});

const selector = await NearWalletSelector.init({
  network: "testnet",
  contractId: "guest-book.testnet",
  wallets: [sender],
});
```

## Options

- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/sender-icon.png`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupSender } from "@near-wallet-selector/sender";
import senderIconUrl from "@near-wallet-selector/sender/assets/sender-icon.png";

const sender = setupSender({
  iconUrl: senderIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
