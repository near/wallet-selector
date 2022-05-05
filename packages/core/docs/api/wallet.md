## API Reference (Wallet)

### `.id`

**Returns**

- `string`

**Description**

Unique identifier of the wallet.

**Example**

```ts
(async () => {
  const wallet = await selector.wallet("near-wallet");
  console.log(wallet.id); // "near-wallet"
})();
```

### `.type`

**Returns**

- `WalletType`

**Description**

Returns the type of wallet. This is particular useful when using functionality that's wallet specific (see hardware wallet example).

There are four wallet types: 

- "browser" (`BrowserWallet`)
- "injected" (`InjectedWallet`)
- "hardware" (`HardwareWallet`)
- "bridge" (`BridgeWallet`)

**Example**

```ts
(async () => {
  const wallet = await selector.wallet("math-wallet");
  console.log(wallet.type); // "injected"
})();

// Using functionality specific to hardware wallets.
(async () => {
  const wallet = await selector.wallet("ledger");
  
  if (wallet.type === "hardware") {
    await wallet.connect({ derviationPath: "44'/397'/0'/0'/1'" });
  }
})();
```

### `.metadata`

**Returns**

- `WalletMetadata`

**Description**

Returns meta information about the wallet such as `name`, `description` and `iconUrl` but can include wallet-specific properties such as `downloadUrl` for injected wallets.

**Example**

```ts
(async () => {
  const wallet = await selector.wallet("sender");
  console.log(wallet.metadata); // { name: "Sender", ... }
})();
```

### `.connect(params)`

**Parameters**

- `params` (`object?`)
  - `derviationPath` (`string?`): Required for hardware wallets (e.g. Ledger Wallet). This is the path to the public key on your device.

**Returns**

- `Promise<Array<Account>>`

**Description**

Programmatically connect without presenting the UI. Hardware wallets (e.g. Ledger Wallet) require `derivationPath` to validate access key permissions.

**Example**

```ts
// NEAR Wallet.
(async () => {
  const wallet = await selector.wallet("near-wallet");
  const accounts = await wallet.connect();
})();

// Sender.
(async () => {
  const wallet = await selector.wallet("sender");
  const accounts = await wallet.connect();
})();

// Math Wallet.
(async () => {
  const wallet = await selector.wallet("math-wallet");
  const accounts = await wallet.connect();
})();

// Ledger
(async () => {
  const wallet = await selector.wallet("ledger");
  const accounts = await wallet.connect({ 
    derviationPath: "44'/397'/0'/0'/1'"
  });
})();

// WalletConnect.
(async () => {
  const wallet = await selector.wallet("wallet-connect");
  const accounts = await wallet.connect();
})();
```

### `.disconnect()`

**Parameters**

- N/A

**Returns**

- `Promise<void>`

**Description**

Disconnects from the wallet.

**Example**

```ts
(async () => {
  const wallet = await selector.wallet("sender");
  await wallet.disconnect();
})();
```

### `.getAccounts()`

**Parameters**

- N/A

**Returns**

- `Promise<Array<Account>>`

**Description**

Returns one or more accounts when connected. This method can be useful for wallets that support accounts at once such as WalletConnect. In this case, you can use an `accountId` returned as the `signerId` for `signAndSendTransaction`.

**Example**

```ts
(async () => {
  const wallet = await selector.wallet("sender");
  const accounts = await wallet.getAccounts();
  console.log(accounts); // [{ accountId: "test.testnet" }]
})();
```

### `.signAndSendTransaction(params)`

**Parameters**

- `params` (`object`)
  - `signerId` (`string?`): Account ID used to sign the transaction. Defaults to the first account.
  - `receiverId` (`string?`): Account ID to receive the transaction. Defaults to `contractId` defined in `.init`.
  - `actions` (`Array<Action>`): NEAR Action(s) to sign and send to the network (e.g. `FunctionCall`). See [Transactions](./transactions.md) for more information.

**Returns**

- `Promise<void | FinalExecutionOutcome>`: Browser wallets won't return the transaction outcome as they may need to redirect for signing. More details on this can be found [here](https://docs.near.org/docs/api/rpc/transactions#send-transaction-await).

**Description**

Signs one or more NEAR Actions before sending to the network. The user must be connected to call this method as there's at least charges for gas spent.

> Note: Sender only supports `"FunctionCall"` action types right now. If you wish to use other NEAR Actions in your dApp, it's recommended to remove this wallet in your configuration.

**Example**

```ts
(async () => {
  const wallet = await selector.wallet("sender");
  await wallet.signAndSendTransaction({
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
})();
```

### `.signAndSendTransactions(params)`

**Parameters**

- `params` (`object`)
  - `transactions` (`Array<Transaction>`): NEAR Transactions(s) to sign and send to the network. See [Transactions](./transactions.md) for more information.

**Returns**

- `Promise<void | Array<FinalExecutionOutcome>>`: Browser wallets won't return the transaction outcomes as they may need to redirect for signing. More details on this can be found [here](https://docs.near.org/docs/api/rpc/transactions#send-transaction-await).

**Description**

Signs one or more transactions before sending to the network. The user must be connected to call this method as there's at least charges for gas spent.

> Note: Sender only supports `"FunctionCall"` action types right now. If you wish to use other NEAR Actions in your dApp, it's recommended to remove this wallet in your configuration.

**Example**

```ts
(async () => {
  const wallet = await selector.wallet("sender");
  await wallet.signAndSendTransactions({
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
})();
```
