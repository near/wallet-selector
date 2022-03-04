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

### `.init()`

**Parameters**

- N/A

**Returns**

- `Promise<void>`

**Description**

TODO: Description here.

**Example**

```ts
await near.init();
```

### `.show()`

****Parameters****

- N/A

**Returns**

- `void`

**Description**

TODO: Description here.

**Example**

```ts
near.show();
```

### `.hide()`

**Parameters**

- N/A

**Returns**

- `void`

**Description**

TODO: Description here.

**Example**

```ts
near.hide();
```

### `.signIn(walletId)`

**Parameters**

- `walletId` (`"near-wallet" | "sender-wallet" | "ledger-wallet`): TODO: Description here.

**Returns**

- `Promise<void>`

**Description**

TODO: Description here.

**Example**

TODO: Description here.

```ts
await near.signIn("near-wallet");
```

### `.signOut()`

**Parameters**

- N/A

**Returns**

- `Promise<void>`

**Description**

TODO: Description here.

**Example**

```ts
await near.signOut();
```

### `.isSignedIn()`

**Parameters**

- N/A

**Returns**

- `boolean`

**Description**

TODO: Description here.

**Example**

```ts
await near.isSignedIn();
```

### `.getAccount()`

**Parameters**

- N/A

**Returns**

- `Promise<AccountInfo>`: TODO: Description here.

**Description**

TODO: Description here.

**Example**

```ts
const account = await near.getAccount();
```

### `.on(event, callback)`

**Parameters**

- `event` (`"signIn" | "signOut"`): TODO: Description here.
- `callback` (`() => void`): TODO: Description here.

**Returns**

- `Subscription`: TODO: Description here.

**Description**

TODO: Description here.

**Example**

```ts
const subscription = near.on("signIn", () => {
   // your code
});

// Unsubscribe.
subscription.remove();
```

### `.off(event, callback)`

**Parameters**

- `event` (`"signIn" | "signOut"`): TODO: Description here.
- `callback` (`() => void`): TODO: Description here.

**Returns**

- `void`

**Description**

TODO: Description here.

**Example**

```ts
const handleSignIn = () => {
  // your code
}

near.on("signIn", handleSignIn);
near.off("signIn", handleSignIn);
```

### `.contract.getContractId()`

**Parameters**

- N/A

**Returns**

- `string`

**Description**

TODO: Description here.

**Example**

```ts
near.contract.getContractId();
```

### `.contract.view(params)`

**Parameters**

- `params` (`object`)
  - `methodName` (`string`): TODO: Description here.
  - `args` (`object?`): TODO: Description here.
  - `finality` (`string?`): TODO: Description here.

**Returns**

- `Promise<unknown>`

**Description**

TODO: Description here.

**Example**

```ts
await near.contract.view({
  methodName: "getMessages"
});
```

### `.contract.signAndSendTransaction(params)`

**Parameters**

- `params` (`object`)
  - `actions` (`Array<Action>`)
    - `type` (`ActionType`): TODO: Description here.
    - `params` (`object`): TODO: Description here.

**Returns**

- `Promise<unknown>`

**Description**

TODO: Description here.

**Example**

```ts
await near.contract.signAndSendTransaction({
  actions: [{
    type: "FunctionCall",
    params: {
      methodName: "addMessage",
      args: { text: "Hello World!" },
      gas: "30000000000000",
      deposit: "10000000000000000000000"
    }
  }]
});
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
