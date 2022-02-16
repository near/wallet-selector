# NEAR Wallet Selector

The NEAR Wallet Selector makes it easy for users to interact with your dApp. This package presents a modal to switch between a number of supported wallet types:

- [NEAR Wallet](https://wallet.near.org/) - Web wallet.
- [Sender Wallet](https://chrome.google.com/webstore/detail/sender-wallet/epapihdplajcdnnkdeiahlgigofloibg) - Browser extension wallet.
- [Ledger](https://www.ledger.com/) - Hardware wallet.

## Installation and Usage

The easiest way to use `near-wallet-selector` is to install it from NPM:

```bash
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
    methodName: "addMessage",
    args: { text: message.value },
    gas: "30000000000000",
    deposit: "10000000000000000000000"
  }]
});

// Retrieve contract accountId.
const accountId = near.contract.getAccountId();
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
