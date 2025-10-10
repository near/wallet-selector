# @near-wallet-selector/intear-wallet

This is the [Intear Wallet](https://wallet.intear.tech) package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry:

```bash
# Using pnpm
pnpm add -w @near-wallet-selector/intear-wallet

# Using NPM.
npm install @near-wallet-selector/intear-wallet
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupIntearWallet } from "@near-wallet-selector/intear-wallet";

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [setupIntearWallet()],
});
```

## Options

- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to the official Intear icon.
- `deprecated`: (`boolean?`): Deprecated is optional. Default is `false`.

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
