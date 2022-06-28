# @near-wallet-selector/nightly-connect

This is the [NightlyConnect](https://connect.nightly.app/) package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry:

```bash
# Using Yarn
yarn add @near-wallet-selector/nightly-connect

# Using NPM.
npm install @near-wallet-selector/nightly-connect
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupNightlyConnect } from "@near-wallet-selector/nightly-connect";

const nightlyConnect = setupNightlyConnect({
          additionalInfo: "",
          application: "NEAR Wallet Selector",
          description: "Example dApp used by NEAR Wallet Selector",
          url: "wss://ncproxy.nightly.app/app",
          appIcon:
            "https://near.org/wp-content/uploads/2020/09/cropped-favicon-192x192.png",
        });

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [nightlyConnect],
});
```

## Options


- `application` (`string`): Application name.
- `description` (`string`): Description of application.
- `appIcon` (`string`): URL of application icon.
- `additionalInfo` (`string?`): Additional informations about application.
- `url` (`string?`): URL address of NightlyConnect proxy.
- `timeout` (`number?`): Timeout of requests sent via proxy.
- `iconUrl` (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/nightly-connect.png`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupNightlyConnect } from "@near-wallet-selector/nightly-connect";
import nightlyConnectIconUrl from "@near-wallet-selector/wallet-connect/assets/nightly-connect.png";

const walletConnect = setupWalletConnect({
  iconUrl: nightlyConnectIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
