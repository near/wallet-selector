# NEAR Wallet Selector

The NEAR Wallet Selector makes it easy for users to interact with your dApp. This package presents a modal to switch between a number of supported wallet types:

- [NEAR Wallet](https://wallet.near.org/) - Web wallet.
- [Sender Wallet](https://chrome.google.com/webstore/detail/sender-wallet/epapihdplajcdnnkdeiahlgigofloibg) - Browser extension wallet.
- [Ledger](https://www.ledger.com/) - Hardware wallet.


## Preview 

[React](https://reactjs.org/), [Vue](https://vuejs.org/) and [Angular](https://angular.io/) variations of the [Guest Book](https://github.com/near-examples/guest-book/) dApp can be found in the [`examples`](/examples) directory. You can use these to gain a concrete understanding of how to integrate `near-wallet-selector` into your own dApp.

![Preview](./src/images/preview-img.PNG)

## Installation and Usage

The easiest way to use `near-wallet-selector` is to install it from the NPM registry:

```bash
# Using Yarn
yarn add near-wallet-selector

# Using NPM.
npm install near-wallet-selector
```

Then use it in your dApp:

```ts
import NearWalletSelector, { wallets } from "near-wallet-selector";

const { nearWallet, senderWallet, ledgerWallet } = wallets;

const selector = new NearWalletSelector({
  wallets: [nearWallet(), senderWallet(), ledgerWallet()],
  networkId: "testnet",
  contract: { contractId: "guest-book.testnet" },
});
```

## Options

```ts
type NetworkId = "mainnet" | "betanet" | "testnet";
type Theme = "dark" | "light" | "auto";

interface Options {
  // List of wallets you want to support in your dApp.
  wallets: Array<WalletModule>;
  // Network ID matching that of your dApp.
  networkId: NetworkId;
  contract: {
    // Account ID of the Smart Contract used for 'view' and 'signAndSendTransaction' calls.
    contractId: string;
    // Optional: Specify limited access to particular methods on the Smart Contract.
    methodNames?: Array<string>;
  };
  ui?: {
    // Optional: Specify light/dark theme for UI. Defaults to the browser configuration when
    // omitted or set to 'auto'.
    theme?: Theme;
    // Optional: Provides customisation description text in the UI.
    description?: string;
  };
}
```

## API Reference

Init:

```ts
await selector.init();
```

Show modal:

```ts
selector.show();
```

Hide modal:

```ts
selector.hide();
```

Sign in (programmatically):

```ts
// NEAR Wallet.
await selector.signIn({
  walletId: "near-wallet",
});

// Sender Wallet.
await selector.signIn({
  walletId: "sender-wallet",
});

// Ledger Wallet
await selector.signIn({
  walletId: "ledger-wallet",
  accountId: "account-id.testnet",
  derviationPath: "44'/397'/0'/0'/1'",
});
```

Sign out:

```ts
await selector.signOut();
```

Is signed in:

```ts
await selector.isSignedIn();
```

Get account:

```ts
const account = await selector.getAccount();
```

Add event listeners:

```ts
selector.on("signIn", () => {
  // Your code here.
});

selector.on("signOut", () => {
  // Your code here.
});
```

Remove event listeners:

```ts
// Method 1:
const subscription = selector.on("signIn", () => {
  // Your code here.
});

subscription.remove();

// Method 2:
const handleSignIn = () => {
  // Your code here.
}

selector.on("signIn", handleSignIn);
selector.off("signIn", handleSignIn);
```

Interact with the Smart Contract:

```ts
// Retrieve messages via RPC endpoint (view method).
const messages = await selector.contract.view({ methodName: "getMessages" });

// Add a message, modifying the blockchain (change method).
await selector.contract.signAndSendTransaction({
  actions: [{
    type: "FunctionCall",
    params: {
      methodName: "addMessage",
      args: { text: "Hello World!" },
      gas: "30000000000000",
      deposit: "10000000000000000000000",
    },
  }]
});

// Retrieve contract accountId.
const accountId = selector.contract.getContractId();
```

## Contributing 

Contributors may find the [`examples`](./examples) directory useful as it provides a quick and consistent way to manually test new changes and/or bug fixes. Below is a common workflow you can use:

- Execute `yarn link` in the root directory.
- Navigate to the `examples/{framework}` directory.
- Execute `yarn link near-wallet-selector` to create a symlink locally.
- Execute `yarn start`

## Editor Setup

This project uses [ESLint](https://eslint.org/) (with [Prettier](https://prettier.io/)) to enforce a consistent coding style. It's important that you configure your editor correctly to avoid issues when you're ready to open a Pull Request.

Although this project uses Prettier, it's simply an "internal" dependency to our ESLint configuration. This is because we want Prettier to handle code styling while avoiding conflicts with ESLint which specifically focuses on potentially problematic code. As a result, **it's important that you switch off Prettier in your editor and ensure only ESLint is enabled**.

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0). See [LICENSE-MIT](LICENSE-MIT) and [LICENSE-APACHE](LICENSE-APACHE) for details.
