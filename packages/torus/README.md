# @near-wallet-selector/torus

This is the [Torus](https://tor.us/) package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry:

```bash
# Using Yarn
yarn add @near-wallet-selector/torus

# Using NPM.
npm install @near-wallet-selector/torus
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupTorus } from "@near-wallet-selector/torus";

const torus = setupTorus({
  clientId: "<CLIENT_ID>",
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [walletConnect],
});
```

## Options

- `projectId` (`string`): Project ID required to instantiate the client. More details can be found [here](https://docs.walletconnect.com/2.0/api/project-id).
- `metadata` (`object`): Metadata used to provide context of the dApp to the connected wallet. More details can be found [here](https://docs.walletconnect.com/2.0/protocol/tech-spec#participant-metadata).
- `chainId` (`string?`): Chain ID for requests. Defaults to `"near:<networkId>` unless using custom network configuration.
- `iconUrl` (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/torus-icon.png`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupTorus } from "@near-wallet-selector/torus";
import torusIconUrl from "@near-wallet-selector/torus/assets/torus-icon.png";

const walletConnect = setupTorus({
  iconUrl: torusIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
