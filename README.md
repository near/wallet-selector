# NEAR Wallet Selector

The NEAR Wallet Selector makes it easy for users to interact with your dApp. This package presents a modal to switch between a number of supported wallet types:

- [NEAR Wallet](https://wallet.near.org/) - Web wallet.
- [Sender Wallet](https://chrome.google.com/webstore/detail/sender-wallet/epapihdplajcdnnkdeiahlgigofloibg) - Browser extension wallet.
- [Ledger](https://www.ledger.com/) - Hardware wallet.


## Preview 
You can test the library on the [Guest Book](https://github.com/near-projects/wallet-selector/tree/dev/example) dApp which is located inside `/example`

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
import NearWalletSelector from "near-wallet-selector";

const near = new NearWalletSelector({
  wallets: ["near-wallet", "sender-wallet", "ledger-wallet"],
  networkId: "testnet",
  theme: "light",
  contract: {
    accountId: "guest-book.testnet",
    viewMethods: ["getMessages"],
    changeMethods: ["addMessage"],
  },
  walletSelectorUI: {
    description: "Please select a wallet to connect to this dApp:",
    explanation: [
      "Wallets are used to send, receive, and store digital assets.",
      "There are different types of wallets. They can be an extension",
      "added to your browser, a hardware device plugged into your",
      "computer, web-based, or as an app on your phone.",
    ].join(" "),
  }
});
```

## API Reference

Init:

```ts
await near.init();
```

Show modal:

```ts
near.show();
```

Hide modal:

```ts
near.hide();
```

Sign in (programmatically):

```ts
await near.signIn("near-wallet");
```

Sign out:

```ts
await near.signOut();
```

Is signed in:

```ts
await near.isSignedIn();
```

Get account:

```ts
const account = await near.getAccount();
```

Add event listeners:

```ts
near.on("signIn", () => {
   // your code
});

near.on("signOut", () => {
  // your code
});
```

Remove event listeners:

```ts
// Method 1:
const subscription = near.on("signIn", () => {
   // your code
});

subscription.remove();

// Method 2:
const handleSignIn = () => {
  // your code
}

near.on("signIn", handleSignIn);
near.off("signIn", handleSignIn);
```

Interact with the Smart Contract:

```ts
// Retrieve messages via RPC endpoint (view method).
const messages = await near.contract.view({ methodName: "getMessages" });

// Add a message, modifying the blockchain (change method).
await near.contract.signAndSendTransaction({
  actions: [{
    type: "FunctionCall",
    params: {
      methodName: "addMessage",
      args: {text: message.value},
      gas: "30000000000000",
      deposit: "10000000000000000000000"
    }
  }]
});

// Retrieve contract accountId.
const accountId = near.contract.getAccountId();
```

## Custom Themes

If no value is provided for `theme` option then the theme will be picked by System's default mode/theme.

There are two available themes `light` and `dark`:

To use the `light` mode, add `theme` option with the value `light`

```ts
const near = new NearWalletSelector({
  ...otherOptions,
  theme: "light",
});
```

To use the `dark` mode, add `theme` option with the value `dark`

```ts
const near = new NearWalletSelector({
  ...otherOptions,
  theme: "dark",
});
```
## Custom/Optional UI Elements

The `walletSelectorUI` option provides two properties which help to modify/customize the UI:

- The `description` property if provided replaces the default description.
- The `explanation` property if provided shows **What is a wallet?** section, if not provided there is no default wallet explanation the section will be hidden.

```ts
const near = new NearWalletSelector({
  ...otherOptions,
  walletSelectorUI: {
    description: "Add your own description",
    explanation: "Add your own wallet explanation",
  }
});
```
## Examples

[React](https://reactjs.org/) and [Vue](https://vuejs.org/) variations of the [Guest Book](https://github.com/near-examples/guest-book/) project can be found in the [`examples`](/examples) directory. You can use these to gain a concrete understanding of how to integrate `near-wallet-selector` into your own dApp.

Contributors to this package may also find these examples useful as it provides a quick and consistent way of manually testing new changes and/or bugs. Below is a common workflow you can use:

- Execute `yarn link` in the root directory.
- Navigate to the `examples/{react|vue|angular}` directory.
- Execute `yarn link near-wallet-selector` to create a symlink locally.
- Execute `yarn start`

## Editor Setup

This project uses [ESLint](https://eslint.org/) (with [Prettier](https://prettier.io/)) to enforce a consistent coding style. It's important that you configure your editor correctly to avoid issues when you're ready to open a Pull Request.

Although this project uses Prettier, it's simply an "internal" dependency to our ESLint configuration. This is because we want Prettier to handle code styling while avoiding conflicts with ESLint which specifically focuses on potentially problematic code. As a result, **it's important that you switch off Prettier in your editor and ensure only ESLint is enabled**.

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0). See [LICENSE-MIT](LICENSE-MIT) and [LICENSE-APACHE](LICENSE-APACHE) for details.
