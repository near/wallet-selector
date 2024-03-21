## API Reference (Wallet)

### `.id`

**Returns**

- `string`

**Description**

Unique identifier of the wallet.

**Example**

```ts
(async () => {
  const wallet = await selector.wallet("my-near-wallet");
  console.log(wallet.id); // "my-near-wallet"
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
- "instant-link" (`InstantLinkWallet`)

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
    await wallet.signIn({ derivationPaths: ["44'/397'/0'/0'/1'"] });
  }
})();
```

### `.metadata`

**Returns**

- `WalletMetadata`

**Description**

Returns meta information about the wallet such as `name`, `description`, `iconUrl` , `deprecated` and `available` but can include wallet-specific properties such as `downloadUrl`, `useUrlAccountImport` and `topLevelInjected` for injected wallets or `contractId`,  `runOnStartup` for instant-link wallets and `walletUrl` for browser wallets.

- `name`: Displayed in modal-ui as wallet name
- `description`: Displayed in modal-ui as wallet description
- `iconUrl`: Displayed in modal-ui as wallet icon
- `deprecated`: Makes the wallet unselectable via modal-ui
- `available`: Makes the wallet unselectable via modal-ui, use if the wallet cannot be selected in the user's environment.
- `downloadUrl`: Link to download injected wallet, available via modal-ui
- `useUrlAccountImport`: If `true`, then this injected wallet supports @account-export api and will be available in the account export modal window
- `topLevelInjected`: If the value `true` is passed for an injected wallet, modal-ui will call the signIn method of this wallet immediately upon initializing setupModal. This will allow wallet applications that open the dApp in the internal browser to immediately log in with the user's wallet.

**Example**

```ts
(async () => {
  const wallet = await selector.wallet("sender");
  console.log(wallet.metadata); // { name: "Sender", ... }
})();
```

### `.signIn(params)`

**Parameters**

- `params` (`object`)
  - `contractId` (`string`): Account ID of the Smart Contract.
  - `methodNames` (`Array<string>?`): Specify limited access to particular methods on the Smart Contract.
  - `accounts` (`Array<{derivationPath: string, publicKey: string, accountId: string}>?`): Required for hardware wallets (e.g. Ledger). This is a list of `accounts` linked to public keys on your device.
  - `qrCodeModal` (`boolean?`): Optional for bridge wallets (e.g Wallet Connect). This indicates whether to render QR Code in wallet selector modal or use the default vendor modal.
  - `successUrl` (`string?`): Optional for browser wallets (e.g MyNearWallet and HERE Wallet). After successfully signing in where to redirect.
  - `failureUrl` (`string?`): Optional for browser wallets (e.g MyNearWallet and HERE Wallet). After failing to sign in where to redirect.

**Returns**

- `Promise<Array<Account>>`

**Description**

Programmatically sign in. Hardware wallets (e.g. Ledger) require `derivationPaths` to validate access key permissions.

**Example**

```ts
// MyNearWallet.
(async () => {
  const wallet = await selector.wallet("my-near-wallet");
  const accounts = await wallet.signIn({ contractId: "test.testnet" });
})();

// Sender.
(async () => {
  const wallet = await selector.wallet("sender");
  const accounts = await wallet.signIn({ contractId: "test.testnet" });
})();

// Math Wallet.
(async () => {
  const wallet = await selector.wallet("math-wallet");
  const accounts = await wallet.signIn({ contractId: "test.testnet" });
})();

// Ledger
(async () => {
  const wallet = await selector.wallet("ledger");
  const derivationPath = "44'/397'/0'/0'/1'";
  const publicKey = await wallet.getPublicKey(derivationPath);
  const accountId = "youraccountid.testnet"
  
  const accounts = await wallet.signIn({
    contractId: "test.testnet",
    accounts: [{
      derivationPath,
      publicKey,
      accountId
    }],
  });
})();

// WalletConnect.
(async () => {
  const wallet = await selector.wallet("wallet-connect");
  const accounts = await wallet.signIn({ contractId: "test.testnet" });
})();
```

### `.signOut()`

**Parameters**

- N/A

**Returns**

- `Promise<void>`

**Description**

Sign out from the wallet.

**Example**

```ts
(async () => {
  const wallet = await selector.wallet("sender");
  await wallet.signOut();
})();
```

### `.getAccounts()`

**Parameters**

- N/A

**Returns**

- `Promise<Array<Account>>`

**Description**

Returns one or more accounts when signed in. This method can be useful for wallets that support accounts at once such as WalletConnect. In this case, you can use an `accountId` returned as the `signerId` for `signAndSendTransaction`.

**Example**

```ts
(async () => {
  const wallet = await selector.wallet("sender");
  const accounts = await wallet.getAccounts();
  console.log(accounts); // [{ accountId: "test.testnet", publicKey: "..." }]
})();
```

### `.verifyOwner(params)`

**Parameters**
- `params` (`object`)
  - `message` (`string`): The message requested sign. Defaults to `verify owner` string.
  - `callbackUrl` (`string?`): Applicable to browser wallets (e.g. MyNearWallet). This is the callback url once the signing is approved. Defaults to `window.location.href`.
  - `meta` (`string?`): Applicable to browser wallets (e.g. MyNearWallet) extra data that will be passed to the callback url once the signing is approved.

**Returns**
- `Promise<void | VerifiedOwner>`: Browser wallets won't return the signing outcome as they may need to redirect for signing. For MyNearWallet the outcome is passed to the callback url.

**Description**

Signs the message and verifies the owner. Message is not sent to blockchain.

> Note: This feature is currently supported only by MyNearWallet, Meteor Wallet and WalletConnect on **testnet**. Sender can sign messages when unlocked.
**Example**

```ts
// MyNearWallet
(async () => {
  const wallet = await selector.wallet("my-near-wallet");
  await wallet.verifyOwner({
    message: "Test message",
  });
})();
```


### `.signAndSendTransaction(params)`

**Parameters**

- `params` (`object`)
  - `signerId` (`string?`): Account ID used to sign the transaction. Defaults to the first account.
  - `receiverId` (`string?`): Account ID to receive the transaction. Defaults to `contractId` defined in `.init`.
  - `actions` (`Array<Action>`): NEAR Action(s) to sign and send to the network (e.g. `FunctionCall`). You can find more information on `Action` [here](./transactions.md).
  - `callbackUrl` (`string?`): Applicable to browser wallets (e.g. MyNearWallet). This the callback url once the transaction is approved.

**Returns**

- `Promise<void | FinalExecutionOutcome>`: Browser wallets won't return the transaction outcome as they may need to redirect for signing. More details on this can be found [here](https://docs.near.org/api/rpc/transactions#send-transaction-await).

**Description**

Signs one or more NEAR Actions before sending to the network. The user must be signed in to call this method as there's at least charges for gas spent.

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
  - `transactions` (`Array<Transaction>`): NEAR Transactions(s) to sign and send to the network. You can find more information on `Transaction` [here](./transactions.md).
  - `callbackUrl` (`string?`): Applicable to browser wallets (e.g. MyNearWallet). This the callback url once the transaction is approved.

**Returns**

- `Promise<void | Array<FinalExecutionOutcome>>`: Browser wallets won't return the transaction outcomes as they may need to redirect for signing. More details on this can be found [here](https://docs.near.org/api/rpc/transactions#send-transaction-await).

**Description**

Signs one or more transactions before sending to the network. The user must be signed in to call this method as there's at least charges for gas spent.

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

### `.signMessage(params)`

**Parameters**
- `params` (`object`)
  - `message` (`string`): The message that wants to be transmitted.
  - `recipient` (`string`): The recipient to whom the message is destined (e.g. "alice.near" or "myapp.com").
  - `nonce` (`Buffer`): A nonce that uniquely identifies this instance of the message, denoted as a 32 bytes array (a fixed `Buffer` in JS/TS).
  - `callbackUrl` (`string?`): Optional, applicable to browser wallets (e.g. MyNearWallet). The URL to call after the signing process. Defaults to `window.location.href`.
  - `state` (`string?`): Optional, applicable to browser wallets (e.g. MyNearWallet). A state for authentication purposes.

**Returns**
- `Promise<void | SignedMessage>`: Browser wallets won't return the signing outcome as they may need to redirect for signing. For MyNearWallet the outcome is passed to the callback url.

**Description**

Allows users to sign a message for a specific recipient using their NEAR account, based on the [NEP413](https://github.com/near/NEPs/blob/master/neps/nep-0413.md).

**Example**

```ts
// MyNearWallet
(async () => {
  const wallet = await selector.wallet("my-near-wallet");
  const message = "test message for verification";
  let nonceArray: Uint8Array = new Uint8Array(32);
  nonceArray = crypto.getRandomValues(nonceArray);
  const nonce = Buffer.from(nonceArray);
  const recipient = "myapp.com";
  
  await wallet.signMessage({ message, recipient, nonce });
})();
```
