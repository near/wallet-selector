## API Reference (Selector)

### `.options`

**Returns**

- `network` (`Network`): Resolved network configuration.
  - `networkId` (`string`): Network ID (e.g. `testnet`).
  - `nodeUrl` (`string`): URL for RPC requests.
  - `helperUrl` (`string`): URL for creating accounts.
  - `explorerUrl` (`string`): URL for the NEAR explorer.
- `contractId` (`string`): Account ID of the Smart Contract used for `connect` and signing transactions.
- `methodNames` (`Array<string>?`): List of methods that can only be accessed on the Smart Contract.
- `debug`: (`boolean`): Whether internal logging is enabled.

**Description**

TODO: Description here.

**Example**

```ts
console.log(selector.options); // { contractId: "guest-book.testnet", ... }
```

### `.connected`

**Returns**

- `boolean`

**Description**

TODO: Description here.

**Example**

```ts
console.log(selector.connected); // true
```

### `.store.getState()`

****Parameters****

- N/A

**Returns**

- `WalletSelectorState`

**Description**

TODO: Description here.

**Example**

```ts
selector.store.getState();
```

### `.store.observable`

****Parameters****

- N/A

**Returns**

- `Observable<WalletSelectorState>`

**Description**

TODO: Description here.

**Example**

```ts
selector.store.observable.subscribe((state) => {
  console.log("State changed:", state);
});
```

### `.wallet(id)`

**Parameters**

- `id` (`string?`): TODO.

**Returns**

- `Promise<Wallet>`

**Description**

Removes the event handler attached to the given `event`.

**Example**

```ts
// Selected wallet.
(async () => {
  const wallet = await selector.wallet();
  const accounts = await wallet.getAccounts();
})();

// Specific wallet.
(async () => {
  const wallet = await selector.wallet("near-wallet");
  const accounts = await wallet.connect();
})();
```

### `.show()`

****Parameters****

- N/A

**Returns**

- `void`

**Description**

Opens the modal for users to connect to their preferred wallet. You can also use this method to switch wallets.

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

### `.on(event, callback)`

**Parameters**

- `event` (`string`): Name of the event. This can be: `networkChanged`.
- `callback` (`Function`): Handler to be triggered when the `event` fires.

**Returns**

- `Subscription`

**Description**

Attach an event handler to important events.

**Example**

```ts
const subscription = selector.on("networkChanged", ({ networkId }) => {
   console.log(`Network changed to ${networkId}`);
});

// Unsubscribe.
subscription.remove();
```

### `.off(event, callback)`

**Parameters**

- `event` (`string`): Name of the event. This can be: `networkChanged`.
- `callback` (`Function`): Original handler passed to `.on(event, callback)`.

**Returns**

- `void`

**Description**

Removes the event handler attached to the given `event`.

**Example**

```ts
const handleNetworkChanged = ({
  networkId
}: WalletSelectorEvents["networkChanged"]) => {
  console.log(`Network changed to ${networkId}`);
}

selector.on("networkChanged", handleNetworkChanged);
selector.off("networkChanged", handleNetworkChanged);
```
