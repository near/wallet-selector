# @near-wallet-selector/core

This is the core package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry:

```bash
# Using Yarn
yarn add @near-wallet-selector/core

# Using NPM.
npm install @near-wallet-selector/core
```

Then use it in your dApp:

```ts
import NearWalletSelector from "@near-wallet-selector/core";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";

const selector = await NearWalletSelector.init({
  network: "testnet",
  contractId: "guest-book.testnet",
  wallets: [setupNearWallet()],
});
```

## API Reference

### `.init(options)`

**Parameters**

- `options` (`object`)
  - `network` (`string | object`): Network ID or object matching that of your dApp configuration . Network ID can be either `mainnet`, `testnet` or `betanet`.
    - `networkId` (`string`): Custom network ID (e.g. `localnet`).
    - `nodeUrl` (`string`): Custom URL for RPC requests.
    - `helperUrl` (`string`): Custom URL for creating accounts.
    - `explorerUrl` (`string`): Custom URL for 
  - `contractId` (`string`): Account ID of the Smart Contract used for sign in and transactions.
  - `wallets` (`Array<string | WalletModule>`): List of wallets you want to support in your dApp.
  - `methodNames` (`Array<string>?`): Specify limited access to particular methods on the Smart Contract.
  - `ui`: (`object?`)
    - `theme` (`string?`): Specify light/dark theme for UI. Defaults to the browser configuration when omitted or set to 'auto'. This can be either `light`, `dark` or `auto`.
    - `description` (`string?`): Define a custom description in the UI.

**Returns**

- `Promise<NearWalletSelector>`

**Description**

Initialises the selector using the configured options before rendering the UI. If a user has previously signed in, this method will also initialise the selected wallet, ready to handle signing.

**Example**

```ts
await NearWalletSelector.init({
  network: "testnet",
  contractId: "guest-book.testnet",
  wallets: [/* Supported wallets in your dApp */],
});
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

// Sender.
await selector.signIn({
  walletId: "sender",
});

// Math Wallet.
await selector.signIn({
  walletId: "math-wallet",
});

// Ledger
await selector.signIn({
  walletId: "ledger",
  accountId: "account-id.testnet",
  derviationPath: "44'/397'/0'/0'/1'",
});

// WalletConnect.
await selector.signIn({
  walletId: "wallet-connect",
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

### `.getContractId()`

**Parameters**

- N/A

**Returns**

- `string`

**Description**

Retrieves account ID of the configured Smart Contract.

**Example**

```ts
const contractId = selector.getContractId();
console.log(contractId); // "guest-book.testnet"
```

### `.signAndSendTransaction(params)`

**Parameters**

- `params` (`object`)
  - `signerId` (`string?`): Account ID used to sign the transaction. Defaults to the first account.
  - `receiverId` (`string?`): Account ID to receive the transaction. Defaults to `contractId` defined in `.init`.
  - `actions` (`Array<Action>`)
    - `type` (`string`): Action type. See below for available values.
    - `params` (`object?`): Parameters for the Action (if applicable).

**Returns**

- `Promise<void | object>`: Browser wallets won't return the transaction outcome as they may need to redirect for signing. More details on this can be found [here](https://docs.near.org/docs/api/rpc/transactions#send-transaction-await).

**Description**

Signs one or more actions before sending to the network. The user must be signed in to call this method as there's at least charges for gas spent.

Note: Sender only supports `"FunctionCall"` action types right now. If you wish to use other NEAR Actions in your dApp, it's recommended to remove this wallet in your configuration.

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
await selector.signAndSendTransaction({
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

### `.signAndSendTransactions(params)`

**Parameters**

- `params` (`object`)
  - `transactions` (`Array<Transaction>`)
    - `signerId` (`string?`): Account ID used to sign the transaction. Defaults to the first account.
    - `receiverId` (`string`): Account ID to receive the transaction.
    - `actions` (`Array<Action>`)
      - `type` (`string`): Action type. See above for available values.
      - `params` (`object?`): Parameters for the Action (if applicable).

**Returns**

- `Promise<void | Array<object>>`: Browser wallets won't return the transaction outcomes as they may need to redirect for signing. More details on this can be found [here](https://docs.near.org/docs/api/rpc/transactions#send-transaction-await).

**Description**

Signs one or more transactions before sending to the network. The user must be signed in to call this method as there's at least charges for gas spent.

Note: Sender only supports `"FunctionCall"` action types right now. If you wish to use other NEAR Actions in your dApp, it's recommended to remove this wallet in your configuration.

**Example**

```ts
await selector.signAndSendTransactions({
  transactions: [{
    receiverId: "guest-book.testnet",
    actions: [{
      type: "FunctionCall",
      params: {
        methodName: "addMessage",
        args: { text: "Hello World!" },
        gas: "30000000000000",
        deposit: "10000000000000000000000",
      }
    }]
  }]
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
