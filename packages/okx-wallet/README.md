# @near-wallet-selector/okx-wallet

This is the [OKX Wallet](https://chromewebstore.google.com/detail/%E6%AC%A7%E6%98%93-web3-%E9%92%B1%E5%8C%85/mcohilncbfahbmgdjkbpemcciiolgcge) package for NEAR Wallet Selector.

## Install OKX Wallet

- [Chrome](https://chromewebstore.google.com/detail/%E6%AC%A7%E6%98%93-web3-%E9%92%B1%E5%8C%85/mcohilncbfahbmgdjkbpemcciiolgcge)
- [Safari](https://apps.apple.com/us/app/okx-wallet/id6463797825)
- [Edge](https://microsoftedge.microsoft.com/addons/detail/%E6%AC%A7%E6%98%93-web3-%E9%92%B1%E5%8C%85/pbpjkcldjiffchgbbndmhojiacbgflha)

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
yarn add @near-wallet-selector/okx-wallet

# Using NPM.
npm install @near-wallet-selector/okx-wallet
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupOKXWallet } from "@near-wallet-selector/okx-wallet";

// OKX Wallet for Wallet Selector can be setup without any params or it can take few optional params, see options below.
const okxWallet = setupOKXWallet({
  iconUrl: "https://<Wallet Icon URL Here>" // optional
});

const selector = await setupWalletSelector({
  network: "mainnet", // OKX Wallet only supports NEAR Mainnet at the moment.
  modules: [okxWallet],
});
```

## Options

- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults is `./assets/okx-wallet.png`.
- `deprecated`: (`boolean?`): Deprecated is optional. Default is `false`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupOKXWallet } from "@near-wallet-selector/okx-wallet";
import okxIconUrl from "@near-wallet-selector/okx-wallet/assets/okx-wallet.png";

const okxWallet = setupOKXWallet({
  iconUrl: okxIconUrl
});
```

## Tip

OKX Wallet only supports NEAR Mainnet at the moment.

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
