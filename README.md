# NEAR Wallet Selector

NEAR Wallet Selector makes it easy for users to interact with your dApp by providing an abstraction over various wallets within the NEAR ecosystem:

- [Bitget Wallet](https://www.npmjs.com/package/@near-wallet-selector/bitget-wallet) - Injected wallet.
- [Bitte Wallet](https://www.npmjs.com/package/@near-wallet-selector/bitte-wallet) - Injected wallet.
- [Coin98 Wallet](https://www.npmjs.com/package/@near-wallet-selector/coin98-wallet) - Injected wallet.
- [Ethereum wallets](https://www.npmjs.com/package/@near-wallet-selector/ethereum-wallets) - Injected wallet.
- [Here Wallet](https://www.npmjs.com/package/@near-wallet-selector/here-wallet) - Mobile wallet.
- [Unity Wallet](https://www.npmjs.com/package/@near-wallet-selector/unity-wallet) - Mobile wallet.
- [Ledger](https://www.npmjs.com/package/@near-wallet-selector/ledger) - Hardware wallet.
- [Math Wallet](https://www.npmjs.com/package/@near-wallet-selector/math-wallet) - Injected wallet.
- [Metamask Snap](https://www.npmjs.com/package/@near-wallet-selector/near-snap) - Injected wallet.
- [Meteor Wallet](https://www.npmjs.com/package/@near-wallet-selector/meteor-wallet) - Injected wallet.
- [Meteor Wallet App](https://www.npmjs.com/package/@near-wallet-selector/meteor-wallet-app) - Instant link wallet.
- [My NEAR Wallet](https://www.npmjs.com/package/@near-wallet-selector/my-near-wallet) - Browser wallet.
- [Narwallets](https://www.npmjs.com/package/@near-wallet-selector/narwallets) - Injected wallet.
- [Near Mobile Wallet](https://www.npmjs.com/package/@near-wallet-selector/near-mobile-wallet) - Mobile Wallet.
- [Nightly](https://www.npmjs.com/package/@near-wallet-selector/nightly) - Injected wallet.
- [OKX Wallet](https://www.npmjs.com/package/@near-wallet-selector/okx-wallet) - Injected wallet.
- [Ramper Wallet](https://www.npmjs.com/package/@near-wallet-selector/ramper-wallet) - Injected wallet.
- [Sender](https://www.npmjs.com/package/@near-wallet-selector/sender) - Injected wallet.
- [WalletConnect](https://www.npmjs.com/package/@near-wallet-selector/wallet-connect) - Bridge wallet.
- [WELLDONE Wallet](https://www.npmjs.com/package/@near-wallet-selector/welldone-wallet) - Injected wallet.
- [XDEFI Wallet](https://www.npmjs.com/package/@near-wallet-selector/xdefi) - Injected wallet.
- [Intear Wallet](https://www.npmjs.com/package/@near-wallet-selector/intear-wallet) - Injected wallet.

## Preview

[React](https://reactjs.org/) / [Next.js](https://nextjs.org/) and [Angular](https://angular.io/) variations of the [Guest Book](https://github.com/near-examples/guest-book/) dApp can be found in the [`examples`](/examples) directory. You can use these to gain a concrete understanding of how to integrate NEAR Wallet Selector into your own dApp.

![Preview](./images/preview.gif)

## Installation and Usage

The easiest way to use NEAR Wallet Selector is to install the [`core`](https://www.npmjs.com/package/@near-wallet-selector/core) package from the NPM registry, some packages may require `near-api-js` v1.0.0 or above check them at [`packages`](./packages)

```bash
# Using Yarn
yarn add near-api-js

# Using NPM.
npm install near-api-js
```

```bash
# Using Yarn
yarn add @near-wallet-selector/core

# Using NPM.
npm install @near-wallet-selector/core
```

Next, you'll need to install the wallets you want to support:

```bash
# Using Yarn
yarn add \
  @near-wallet-selector/bitget-wallet \
  @near-wallet-selector/my-near-wallet \
  @near-wallet-selector/sender \
  @near-wallet-selector/here-wallet \
  @near-wallet-selector/unity-wallet \
  @near-wallet-selector/math-wallet \
  @near-wallet-selector/nightly \
  @near-wallet-selector/meteor-wallet \
  @near-wallet-selector/meteor-wallet-app \
  @near-wallet-selector/okx-wallet \
  @near-wallet-selector/narwallets \
  @near-wallet-selector/welldone-wallet \
  @near-wallet-selector/near-snap \
  @near-wallet-selector/ledger \
  @near-wallet-selector/wallet-connect \
  @near-wallet-selector/coin98-wallet \
  @near-wallet-selector/xdefi \
  @near-wallet-selector/ramper-wallet \
  @near-wallet-selector/near-mobile-wallet  \
  @near-wallet-selector/bitget-wallet \
  @near-wallet-selector/bitte-wallet \
  @near-wallet-selector/ethereum-wallets \
  @near-wallet-selector/intear-wallet


# Using NPM.
npm install \
  @near-wallet-selector/bitget-wallet \
  @near-wallet-selector/my-near-wallet \
  @near-wallet-selector/sender \
  @near-wallet-selector/here-wallet \
  @near-wallet-selector/unity-wallet \
  @near-wallet-selector/math-wallet \
  @near-wallet-selector/nightly \
  @near-wallet-selector/meteor-wallet \
  @near-wallet-selector/meteor-wallet-app \
  @near-wallet-selector/okx-wallet \
  @near-wallet-selector/narwallets \
  @near-wallet-selector/welldone-wallet \
  @near-wallet-selector/near-snap \
  @near-wallet-selector/ledger \
  @near-wallet-selector/wallet-connect \
  @near-wallet-selector/coin98-wallet \
  @near-wallet-selector/xdefi \
  @near-wallet-selector/ramper-wallet \
  @near-wallet-selector/near-mobile-wallet \
  @near-wallet-selector/bitget-wallet \
  @near-wallet-selector/bitte-wallet \
  @near-wallet-selector/ethereum-wallets \
  @near-wallet-selector/intear-wallet
```

Optionally, you can install our [`modal-ui`](https://www.npmjs.com/package/@near-wallet-selector/modal-ui) or [`modal-ui-js`](https://www.npmjs.com/package/@near-wallet-selector/modal-ui-js) package for a pre-built interface that wraps the `core` API and presents the supported wallets:

```bash
# Using Yarn
yarn add @near-wallet-selector/modal-ui

# Using NPM.
npm install @near-wallet-selector/modal-ui
```

Then in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupBitgetWallet } from "@near-wallet-selector/bitget-wallet";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupNearSnap } from "@near-wallet-selector/near-snap";
import { setupMathWallet } from "@near-wallet-selector/math-wallet";
import { setupNightly } from "@near-wallet-selector/nightly";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupMeteorWalletApp } from "@near-wallet-selector/meteor-wallet-app";
import { setupOkxWallet } from "@near-wallet-selector/okx-wallet";
import { setupNarwallets } from "@near-wallet-selector/narwallets";
import { setupWelldoneWallet } from "@near-wallet-selector/welldone-wallet";
import { setupLedger } from "@near-wallet-selector/ledger";
import { setupWalletConnect } from "@near-wallet-selector/wallet-connect";
import { setupCoin98Wallet } from "@near-wallet-selector/coin98-wallet";
import { setupXDEFI } from "@near-wallet-selector/xdefi";
import { setupRamperWallet } from "@near-wallet-selector/ramper-wallet";
import { setupUnityWallet } from "@near-wallet-selector/unity-wallet";
import { setupNearMobileWallet } from "@near-wallet-selector/near-mobile-wallet";
import { setupBitteWallet } from "@near-wallet-selector/bitte-wallet";
import { setupEthereumWallets } from "@near-wallet-selector/ethereum-wallets";
import { setupIntearWallet } from "@near-wallet-selector/intear-wallet";

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [
    setupBitgetWallet(),
    setupMyNearWallet(),
    setupSender(),
    setupHereWallet(),
    setupMathWallet(),
    setupNightly(),
    setupMeteorWallet(),
    setupMeteorWalletApp({ contractId: "guest-book.testnet" }),
    setupNearSnap(),
    setupOkxWallet(),
    setupNarwallets(),
    setupWelldoneWallet(),
    setupLedger(),
    setupCoin98Wallet(),
    setupXDEFI(),
    setupWalletConnect({
      projectId: "c4f79cc...",
      metadata: {
        name: "NEAR Wallet Selector",
        description: "Example dApp used by NEAR Wallet Selector",
        url: "https://github.com/near/wallet-selector",
        icons: ["https://avatars.githubusercontent.com/u/37784886"],
      },
    }),
    setupUnityWallet({
      projectId: "c4f79cc...",
      metadata: {
        name: "Your dApp name",
        description: "Example dApp used by NEAR Wallet Selector",
        url: "https://github.com/near/wallet-selector",
        icons: ["https://avatars.githubusercontent.com/u/37784886"],
      },
    }),
    setupNearMobileWallet(),
    setupBitteWallet(),
    setupEthereumWallets({ wagmiConfig, web3Modal }),
    setupIntearWallet(),
  ],
});

const modal = setupModal(selector, {
  contractId: "guest-book.testnet"
});
```

## Wallet Package Documentation

Each wallet package contains its own `README` document, please refer inside the [packages folder](https://github.com/near/wallet-selector/tree/main/packages) for extra information.

## Contributing

Contributors may find the [`examples`](./examples) directory useful as it provides a quick and consistent way to manually test new changes and/or bug fixes.

More details around contributing to this project can be found [here](./CONTRIBUTING.md).

## Editor Setup

This project uses [ESLint](https://eslint.org/) (with [Prettier](https://prettier.io/)) to enforce a consistent coding style. It's important that you configure your editor correctly to avoid issues when you're ready to open a Pull Request.

Although this project uses Prettier, it's simply an "internal" dependency to our ESLint configuration. This is because we want Prettier to handle code styling while avoiding conflicts with ESLint which specifically focuses on potentially problematic code. As a result, **it's important that you switch off Prettier in your editor and ensure only ESLint is enabled**.

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0). See [LICENSE-MIT](LICENSE-MIT) and [LICENSE-APACHE](LICENSE-APACHE) for details.
