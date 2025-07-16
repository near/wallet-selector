# @near-wallet-selector/unity-wallet

This is the [UnityWallet](https://unitywallet.com/) package for NEAR Wallet Selector.

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
yarn add @near-wallet-selector/unity-wallet

# Using NPM.
npm install @near-wallet-selector/unity-wallet
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupUnityWallet } from "@near-wallet-selector/unity-wallet";

const unityWallet = setupUnityWallet({
  projectId: "c4f79cc...",
  metadata: {
    name: "Your dApp name",
    description: "Example dApp used by NEAR Wallet Selector",
    url: "https://github.com/near/wallet-selector",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  },
});

const selector = await setupWalletSelector({
  network: "mainnet",
  modules: [unityWallet],
});
```

## Wallet Connect Configuration

Project ID is required for wallet connect, please obtain it from [walletconnect.com](https://walletconnect.com/)

## Options

- `projectId` (`string`): Project ID is `required` to instantiate the client. More details can be found [here](https://docs.walletconnect.com/2.0/cloud/relay#project-id).
- `metadata` (`object`): Metadata used to provide context of the dApp to the connected wallet. More details can be found [here](https://docs.walletconnect.com/2.0/specs/clients/core/pairing/data-structures#metadata).
- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults is `./assets/unity-wallet-logo.png`.
- `deprecated`: (`boolean?`): Deprecated is optional. Default is `false`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package.

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
