# @near-wallet-selector/wallet-connect

This is the [WalletConnect](https://walletconnect.com/) package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry:

```bash
# Using Yarn
yarn add @near-wallet-selector/wallet-connect

# Using NPM.
npm install @near-wallet-selector/wallet-connect
```

Then use it in your dApp:

```ts
import NearWalletSelector from "@near-wallet-selector/core";
import { setupWalletConnect } from "@near-wallet-selector/wallet-connect";

const walletConnect = setupWalletConnect({
  projectId: "c4f79cc...",
  metadata: {
    name: "NEAR Wallet Selector",
    description: "Example dApp used by NEAR Wallet Selector",
    url: "https://github.com/near/wallet-selector",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  },
  iconUrl: "https://yourdomain.com/yourwallet-icon.png",
});

const selector = await NearWalletSelector.init({
  wallets: [walletConnect],
  network: "testnet",
  contractId: "guest-book.testnet",
});
```

## Options

- `projectId` (`string`): Project ID required to instantiate the client. More details can be found [here](https://docs.walletconnect.com/2.0/api/project-id).
- `metadata`: (`object`): Metadata used to provide context of the dApp to the connected wallet. More details can be found [here](https://docs.walletconnect.com/2.0/protocol/tech-spec#participant-metadata).
- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
