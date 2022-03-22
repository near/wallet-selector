# NEAR Wallet Selector

The NEAR Wallet Selector makes it easy for users to interact with your dApp. This package presents a modal to switch between a number of supported wallet types:

- [NEAR Wallet](https://wallet.near.org/) - Web wallet.
- [Sender Wallet](https://chrome.google.com/webstore/detail/sender-wallet/epapihdplajcdnnkdeiahlgigofloibg) - Browser extension wallet.
- [Math Wallet](https://chrome.google.com/webstore/detail/math-wallet/afbcbjpbpfadlkmhmclhkeeodmamcflc) - Browser extension wallet.
- [Ledger](https://www.ledger.com/) - Hardware wallet.


## Preview 

[React](https://reactjs.org/), [Vue](https://vuejs.org/) and [Angular](https://angular.io/) variations of the [Guest Book](https://github.com/near-examples/guest-book/) dApp can be found in the [`examples`](/examples) directory. You can use these to gain a concrete understanding of how to integrate `near-wallet-selector` into your own dApp.

![Preview](./packages/near-wallet-selector/src/images/preview-img.PNG)

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

const selector = new NearWalletSelector({
  wallets: ["near-wallet", "sender-wallet", "ledger-wallet", "math-wallet"],
  networkId: "testnet",
  contract: { contractId: "guest-book.testnet" },
});
```

## Options

```ts
type BuiltInWalletId = "near-wallet" | "sender-wallet" | "ledger-wallet" | "math-wallet";
type NetworkId = "mainnet" | "betanet" | "testnet";
type Theme = "dark" | "light" | "auto";

interface Options {
  // List of wallets you want to support in your dApp.
  wallets: Array<BuiltInWalletId>;
  // Network ID matching that of your dApp.
  networkId: NetworkId;
  // Account ID of the Smart Contract used for 'view' and 'signAndSendTransaction' calls.
  contractId: string;
  // Optional: Specify limited access to particular methods on the Smart Contract.
  methodNames?: Array<string>;
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

### `.init()`

**Parameters**

- N/A

**Returns**

- `Promise<void>`

**Description**

Initialises the selector using the configured options before rendering the UI. If a user has previously signed in, this method will also initialise the selected wallet, ready to handle transaction signing.

**Example**

```ts
await selector.init();
```

### `.show()`

****Parameters****

- N/A

**Returns**

- `void`

**Description**

Opens the modal for users to sign in to their preferred wallet. You can also use this method to switch wallets.

**Example**

```ts
selector.show();
```

### `.hide()`

**Parameters**

- N/A

**Returns**

- `void`

**Description**

Closes the modal.

**Example**

```ts
selector.hide();
```

### `.signIn(params)`

**Parameters**

- `params` (`object`)
  - `walletId` (`string`): ID of the wallet (see example for specific values).
  - `accountId` (`string?`): Required for hardware wallets (e.g. Ledger Wallet). This is the account ID related to the public key found at `derivationPath`.
  - `derviationPath` (`string?`): Required for hardware wallets (e.g. Ledger Wallet). This is the path to the public key on your device.

**Returns**

- `Promise<void>`

**Description**

Programmatically sign in to a specific wallet without presenting the UI. Hardware wallets (e.g. Ledger Wallet) require `accountId` and `derivationPath` to validate access key permissions.

**Example**

```ts
// NEAR Wallet.
await selector.signIn({
  walletId: "near-wallet",
});

// Sender Wallet.
await selector.signIn({
  walletId: "sender-wallet",
});

// Math Wallet.
await selector.signIn({
  walletId: "math-wallet",
});

// Ledger Wallet
await selector.signIn({
  walletId: "ledger-wallet",
  accountId: "account-id.testnet",
  derviationPath: "44'/397'/0'/0'/1'",
});
```

### `.signOut()`

**Parameters**

- N/A

**Returns**

- `Promise<void>`

**Description**

Signs out of the selected wallet.

**Example**

```ts
await selector.signOut();
```

### `.isSignedIn()`

**Parameters**

- N/A

**Returns**

- `Promise<boolean>`

**Description**

Determines whether the user is signed in.

**Example**

```ts
const signedIn = await selector.isSignedIn();
console.log(signedIn) // true
```

### `.getAccounts()`

**Parameters**

- N/A

**Returns**

- `Promise<Array<object>>`
  - `accountId`: An account id for each account associated with the selected wallet.

**Description**

Retrieves account information when the user is signed in. Returns an empty array when the user is signed out. This method can be useful for wallets that support accounts at once such as WalletConnect. In this case, you can use an `accountId` returned as the `signerId` for `signAndSendTransaction`.

**Example**

```ts
const accounts = await selector.getAccounts();
console.log(accounts); // [{ accountId: "test.testnet" }]
```

### `.on(event, callback)`

**Parameters**

- `event` (`string`): Name of the event. This can be either `signIn` or `signOut`.
- `callback` (`() => void`): Handler to be triggered when the `event` fires.

**Returns**

- `object`
  - `remove` (`() => void`): Removes the event handler.

**Description**

Attach an event handler to important events.

**Example**

```ts
const subscription = selector.on("signIn", () => {
   console.log("User signed in!");
});

// Unsubscribe.
subscription.remove();
```

### `.off(event, callback)`

**Parameters**

- `event` (`string`): Name of the event. This can be either `signIn` or `signOut`.
- `callback` (`() => void`): Original handler passed to `.on(event, callback)`.

**Returns**

- `void`

**Description**

Removes the event handler attached to the given `event`.

**Example**

```ts
const handleSignIn = () => {
  console.log("User signed in!");
}

selector.on("signIn", handleSignIn);
selector.off("signIn", handleSignIn);
```

### `.contract.getContractId()`

**Parameters**

- N/A

**Returns**

- `string`

**Description**

Retrieves account ID of the configured Smart Contract.

**Example**

```ts
const contractId = selector.contract.getContractId();
console.log(contractId); // "guest-book.testnet"
```

### `.callFunction(params)`

**Parameters**

- `params` (`object`)
  - `methodName` (`string`): Name of the method on the Smart Contract.
  - `args` (`object?`): Object containing the parameters for the method.
  - `finality` (`string?`): Defaults to `"optimistic"`. More details on this [here](https://docs.near.org/docs/api/rpc#using-finality-param).

**Returns**

- `Promise<unknown>`

**Description**

Executes a view method on the Smart Contract. Sign in isn't required for these calls.

**Example**

```ts
await selector.contract.view({
  methodName: "getMessages"
});
```

### `.signAndSendTransaction(params)`

**Parameters**

- `params` (`object`)
  - `signerId` (`string?`): Account ID used to sign the transaction. 
  - `actions` (`Array<Action>`)
    - `type` (`string`): Action type. See below for available values.
    - `params` (`object?`): Parameters for the Action (if applicable).

**Returns**

- `Promise<object>`: More details on this can be found [here](https://docs.near.org/docs/api/rpc/transactions#send-transaction-await).

**Description**

Signs one or more actions before sending to the network. The user must be signed in to call this method as there's at least charges for gas spent.

Note: Sender Wallet only supports `"FunctionCall"` action types right now. If you wish to use other NEAR Actions in your dApp, it's recommended to remove this wallet in your configuration.

Below are the 8 supported NEAR Actions:

```ts
export interface CreateAccountAction {
  type: "CreateAccount";
}

export interface DeployContractAction {
  type: "DeployContract";
  params: {
    code: Uint8Array;
  };
}

export interface FunctionCallAction {
  type: "FunctionCall";
  params: {
    methodName: string;
    args: object;
    gas: string;
    deposit: string;
  };
}

export interface TransferAction {
  type: "Transfer";
  params: {
    deposit: string;
  };
}

export interface StakeAction {
  type: "Stake";
  params: {
    stake: string;
    publicKey: string;
  };
}  

export interface AddKeyAction {
  type: "AddKey";
  params: {
    publicKey: string;
    accessKey: {
      nonce?: number;
      permission:
        | "FullAccess"
        | {
            receiverId: string;
            allowance?: string;
            methodNames?: Array<string>;
          };
    };
  };
}

export interface DeleteKeyAction {
  type: "DeleteKey";
  params: {
    publicKey: string;
  };
}

export interface DeleteAccountAction {
  type: "DeleteAccount";
  params: {
    beneficiaryId: string;
  };
}
```

**Example**

```ts
await selector.contract.signAndSendTransaction({
  actions: [{
    type: "FunctionCall",
    params: {
      methodName: "addMessage",
      args: { text: "Hello World!" },
      gas: "30000000000000",
      deposit: "10000000000000000000000",
    }
  }]
});
```

## Known Issues

At the time of writing, there is an issue with Sender Wallet where the signed in state is lost when navigating back to a dApp you had previously signed in to - this includes browser refreshes.

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
