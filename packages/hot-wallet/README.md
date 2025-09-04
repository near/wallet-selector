# @near-wallet-selector/hot-wallet

This is the [HOT Wallet](https://hot-labs.org/wallet) package for NEAR Wallet Selector. Hot wallet available as browser extension and Telegram mini-app. Supports NEAR, Ethereum, TON, Solana, and other chains with MPC security.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry, this package requires `near-api-js` v1.0.0 or above:

```bash
# Using pnpm
pnpm add -w near-api-js

# Using NPM.
npm install near-api-js
```

```bash
# Using pnpm
pnpm add -w @near-wallet-selector/hot-wallet

# Using NPM.
npm install @near-wallet-selector/hot-wallet
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupHotWallet } from "@near-wallet-selector/hot-wallet";

// HOT Wallet for Wallet Selector can be setup without any params or it can take few optional params, see options below.
const hotWallet = setupHereWallet({
  iconUrl: "https://<Wallet Icon URL Here>" // optional
});

const selector = await setupWalletSelector({
  network: "mainnet", 
  modules: [hotWallet],
});
```

## Options

- `iconUrl`: (`string?`): Icon is optional. Default image point to Here Wallet Logo in base64 format.
- `deprecated`: (`boolean?`): Deprecated is optional. Default is `false`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupHotWallet } from "@near-wallet-selector/hot-wallet";
import HereWalletIconUrl from "@near-wallet-selector/hot-wallet/assets/hot-wallet-icon.png";

const hereWallet = setupHotWallet({ 
  iconUrl: HereWalletIconUrl 
});

```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
