# NEAR Wallet Selector

The NEAR Wallet Selector makes it easy for users to interact with your dApp. This package presents a modal to switch between a number of supported wallet types:

- [NEAR Wallet](https://wallet.near.org/) - Web wallet.
- [Sender](https://chrome.google.com/webstore/detail/sender-wallet/epapihdplajcdnnkdeiahlgigofloibg) - Browser extension wallet.
- [Ledger](https://www.ledger.com/) - Hardware wallet.

## Installation and Usage

The easiest way to use `near-walletselector` is to install it from NPM:

```bash
npm install near-walletselector
```

Then use it in your dApp:

```ts
import NearWalletSelector from "near-walletselector";

const near = await NearWalletSelector({
  wallets: ["nearwallet", "senderwallet", "ledgerwallet"],
  networkId: "testnet",
  theme: "light",
  contract: {
    address: "guest-book.testnet",
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

Show modal:

```ts
near.showModal();
```

Hide modal:

```ts
near.hideModal();
```

Is signed in:

```ts
near.isSignedIn();
```

Sign out:

```ts
near.signOut();
```

Add event listeners (init, disconnect, signIn):

```ts
near.on("init", () => {
   // your code
});
```

Interact with smart contract:

```ts
const contract = near.getContract();

// Retrieve messages via RPC endpoint (view method).
const messages = await contract.view({ methodName: "getMessages" });

// Send a message, modifying the blockchain (change method).
await contract.call({
  actions: [{
    methodName: "addMessage",
    args: { text: message.value },
    gas: "30000000000000",
    deposit: "10000000000000000000000"
  }]
});
```

## Example Integration

A variation of the [guest-book](https://github.com/near-examples/guest-book/)  example project can be found in the `example` directory. You can use this to gain a concrete understanding of how to integrate this package into your own dApp.

Contributors to this package may also find this integration useful as it provides a quick and consistent way of manually testing new changes and/or bugs. Below is a common workflow you can use:

- Navigate to the `example` directory.
- Execute `npm link ../` to create a symlink locally.
- Execute `npm install`.
- Execute `npm run watch` to watch both `src` directories and automatically recompile.

## Editor Setup

This project uses [ESLint](https://eslint.org/) (with [Prettier](https://prettier.io/)) to enforce a consistent coding style. It's important that you configure your editor correctly to avoid issues when you're ready to open a Pull Request.

Although this project uses Prettier, it's simply an "internal" dependency to our ESLint configuration. This is because we want Prettier to handle code styling while avoiding conflicts with ESLint which specifically focuses on potentially problematic code. As a result, **it's important that you switch off Prettier in your editor and ensure only ESLint is enabled**.
