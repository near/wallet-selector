# @near-wallet-selector/wallet-connect

This is the [WalletConnect](https://walletconnect.com/) package for NEAR Wallet Selector.

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
yarn add @near-wallet-selector/wallet-connect

# Using NPM.
npm install @near-wallet-selector/wallet-connect
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupWalletConnect } from "@near-wallet-selector/wallet-connect";

const walletConnect = setupWalletConnect({
  projectId: "c4f79cc...",
  metadata: {
    name: "NEAR Wallet Selector",
    description: "Example dApp used by NEAR Wallet Selector",
    url: "https://github.com/near/wallet-selector",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  },
  chainId: "near:testnet",
  iconUrl: "https://<Wallet Icon URL Here>",
  // Please note that the 'methods' option is discretionary;
  // if omitted, all methods are included by default.
  // Use it solely to override the default configuration.
  methods: [
    "near_signIn",
    "near_signOut",
    "near_getAccounts",
    "near_signTransaction",
    "near_signTransactions",
    "near_verifyOwner",
    "near_signMessage",
  ]
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [walletConnect],
});
```

## Wallet Connect Configuration

Project ID is required for wallet connect, please obtain it from [walletconnect.com](https://walletconnect.com/)


## Options

- `projectId` (`string`): Project ID is `required` to instantiate the client. More details can be found [here](https://docs.walletconnect.com/2.0/cloud/relay#project-id).
- `metadata` (`object`): Metadata used to provide context of the dApp to the connected wallet. More details can be found [here](https://docs.walletconnect.com/2.0/specs/clients/core/pairing/data-structures#metadata).
- `chainId` (`string?`): Chain ID for requests. Defaults to `"near:<networkId>` unless using custom network configuration.
- `relayUrl` (`string?`): Relay URL for requests. Defaults to `"wss://relay.walletconnect.com"`.
- `iconUrl` (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/wallet-connect-icon.png`.
- `deprecated`: (`boolean?`): Deprecated is optional. Default is `false`.
- `methods`: (`Array<string>?`): Methods is optional overrides default WC_METHODS. Defaults to `undefined`.
- `events`: (`Array<string>?`): Events is optional overrides default WC_EVENTS. Defaults to `undefined`.

## Supported methods
- `near_signIn`
- `near_signOut`
- `near_getAccounts`
- `near_signTransaction`
- `near_signTransactions`
- `near_verifyOwner`
- `near_signMessage`

## Supported events

- `chainChanged`
- `accountsChanged`

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupWalletConnect } from "@near-wallet-selector/wallet-connect";
import walletConnectIconUrl from "@near-wallet-selector/wallet-connect/assets/wallet-connect-icon.png";

const walletConnect = setupWalletConnect({
  iconUrl: walletConnectIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
