# NEAR Wallet Selector

The NEAR Wallet Selector makes it easy for users to interact with your dApp. This package presents a modal to switch between a number of supported wallet types:

- [NEAR Wallet](https://wallet.near.org/) - Web wallet.
- [Sender Wallet](https://chrome.google.com/webstore/detail/sender-wallet/epapihdplajcdnnkdeiahlgigofloibg) - Browser extension wallet.
- [Math Wallet](https://chrome.google.com/webstore/detail/math-wallet/afbcbjpbpfadlkmhmclhkeeodmamcflc) - Browser extension wallet.
- [Ledger](https://www.ledger.com/) - Hardware wallet.
- [WalletConnect](https://walletconnect.com/) - Bridge wallet.

## Preview

[React](https://reactjs.org/), [Vue](https://vuejs.org/) and [Angular](https://angular.io/) variations of the [Guest Book](https://github.com/near-examples/guest-book/) dApp can be found in the [`examples`](/examples) directory. You can use these to gain a concrete understanding of how to integrate `near-wallet-selector` into your own dApp.

![Preview](./images/preview-img.PNG)

## Installation and Usage

The easiest way to use `near-wallet-selector` is to install it from the NPM registry:

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
  @near-wallet-selector/near-wallet \
  @near-wallet-selector/sender-wallet \
  @near-wallet-selector/math-wallet \
  @near-wallet-selector/ledger-wallet \
  @near-wallet-selector/wallet-connect

# Using NPM.
npm install \
  @near-wallet-selector/near-wallet \
  @near-wallet-selector/sender-wallet \
  @near-wallet-selector/math-wallet \
  @near-wallet-selector/ledger-wallet \
  @near-wallet-selector/wallet-connect
```

Then them in your dApp:

```ts
import NearWalletSelector from "@near-wallet-selector/core";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupSenderWallet } from "@near-wallet-selector/sender-wallet";
import { setupMathWallet } from "@near-wallet-selector/math-wallet";
import { setupLedgerWallet } from "@near-wallet-selector/ledger-wallet";
import { setupWalletConnect } from "@near-wallet-selector/wallet-connect";

const selector = await NearWalletSelector.init({
  network: "testnet",
  contractId: "guest-book.testnet",
  wallets: [
    setupNearWallet(),
    setupSenderWallet(),
    setupLedgerWallet(),
    setupMathWallet(),
    setupWalletConnect({
      projectId: "c4f79cc...",
      metadata: {
        name: "NEAR Wallet Selector",
        description: "Example dApp used by NEAR Wallet Selector",
        url: "https://github.com/near/wallet-selector",
        icons: ["https://avatars.githubusercontent.com/u/37784886"],
      },
    }),
  ],
});
```

## Known Issues

At the time of writing, there is an issue with Sender Wallet where the signed in state is lost when navigating back to a dApp you had previously signed in to - this includes browser refreshes.

## Contributing

Contributors may find the [`examples`](./examples) directory useful as it provides a quick and consistent way to manually test new changes and/or bug fixes.

More details around contributing to this project can be found [here](./CONTRIBUTING.md).

## Editor Setup

This project uses [ESLint](https://eslint.org/) (with [Prettier](https://prettier.io/)) to enforce a consistent coding style. It's important that you configure your editor correctly to avoid issues when you're ready to open a Pull Request.

Although this project uses Prettier, it's simply an "internal" dependency to our ESLint configuration. This is because we want Prettier to handle code styling while avoiding conflicts with ESLint which specifically focuses on potentially problematic code. As a result, **it's important that you switch off Prettier in your editor and ensure only ESLint is enabled**.

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0). See [LICENSE-MIT](LICENSE-MIT) and [LICENSE-APACHE](LICENSE-APACHE) for details.
