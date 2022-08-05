# @near-wallet-selector/recommended-wallets

This is the Recommended Wallets package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry, this package requires `near-api-js` v0.44.2 or above:

```bash
# Using Yarn
yarn add near-api-js@^0.44.2

# Using NPM.
npm install near-api-js@^0.44.2
```
```bash
# Using Yarn
yarn add @near-wallet-selector/recommended-wallets

# Using NPM.
npm install @near-wallet-selector/recommended-wallets
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import {
  setupMyNearWallet,
  setupLedger,
  setupSender,
  setupWalletConnect,
} from "@near-wallet-selector/recommended-wallets";

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [
    setupMyNearWallet(),
    setupLedger(),
    setupSender(),
    setupWalletConnect({
      projectId: "c4f79cc...",
      metadata: {
        name: "NEAR Wallet Selector",
        description: "Example dApp used by NEAR Wallet Selector",
        url: "https://github.com/near/wallet-selector",
        icons: ["https://avatars.githubusercontent.com/u/37784886"],
      },
    })
  ],
});
```


## Options

The recommended wallets can take optional or required params, available docs on the links below:

#### MyNearWallet Options

- `walletUrl` (`string?`): Wallet URL used to redirect when signing transactions. This parameter is required for custom network configuration.
- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/my-near-wallet-icon.png`.

#### Sender Options

- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/sender-icon.png`.

#### Ledger Options

- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/ledger-icon.png`.

#### WalletConnect Options

- `projectId` (`string`): Project ID required to instantiate the client. More details can be found [here](https://docs.walletconnect.com/2.0/api/project-id).
- `metadata` (`object`): Metadata used to provide context of the dApp to the connected wallet. More details can be found [here](https://docs.walletconnect.com/2.0/protocol/tech-spec#participant-metadata).
- `chainId` (`string?`): Chain ID for requests. Defaults to `"near:<networkId>` unless using custom network configuration.
- `iconUrl` (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/wallet-connect-icon.png`.


## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
// The same can be done for each recommended wallet.
import { setupMyNearWallet } from "@near-wallet-selector/recommended-wallets";
import myNearWalletIconUrl from "@near-wallet-selector/recommended-wallets/assets/my-near-wallet-icon.png";

const myNearWallet = setupMyNearWallet({
  iconUrl: myNearWalletIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
