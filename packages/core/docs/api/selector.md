## API Reference (Selector)

### `.options`

**Returns**

- `network` (`Network`): Resolved network configuration.
  - `networkId` (`string`): Network ID (e.g. `testnet`).
  - `nodeUrl` (`string`): URL for RPC requests.
  - `helperUrl` (`string`): URL for creating accounts.
  - `explorerUrl` (`string`): URL for the NEAR explorer.
  - `indexerUrl` (`string`): URL for the NEAR indexer.
- `debug` (`boolean`): Whether internal logging is enabled.
- `optimizeWalletOrder` (`boolean`): Whether wallet order optimization is enabled.
- `randomizeWalletOrder` (`boolean`): Weather wallet order randomization is enabled.
- `allowMultipleSelectors` (`boolean?`): Wether to allow multiple wallet selector instances to be created.
- `languageCode` (`string?`): ISO 639-1 two-letter language code.
- `relayerUrl` (`string?`): The URL where DelegateActions are sent by meta transaction enabled wallet modules.

**Description**

Resolved variation of the options passed to `setupWalletSelector`.

**Example**

```ts
console.log(selector.options); // { network: { networkId: "testnet", ... }, ... }
```

### `.isSignedIn()`

****Parameters****

- N/A

**Returns**

- `boolean`

**Description**

Determines whether we're signed in to one or more accounts.

**Example**

```ts
console.log(selector.isSignedIn()); // true
```

### `.store.getState()`

****Parameters****

- N/A

**Returns**

- `WalletSelectorState`

**Description**

Retrieve the current state. You can find more information on `WalletSelectorState` [here](./state.md).

**Example**

```ts
const state = selector.store.getState();
console.log(state); // { modules: [{ id: "my-near-wallet", ... }], ... }
```

### `.store.observable`

**Returns**

- `Observable<WalletSelectorState>`

**Description**

Subscribe to state changes using the (RxJS) Observable pattern. You can find more information on `WalletSelectorState` [here](./state.md).

**Example**

```ts
import { map, distinctUntilChanged } from "rxjs";

// Subscribe to all state changes.
selector.store.observable.subscribe((state) => {
  console.log("State changed:", state);
});

// Subscribe to account state changes.
selector.store.observable
  .pipe(
    map((state) => state.accounts),
    distinctUntilChanged()
  )
  .subscribe((accounts) => {
    console.log("Accounts changed", accounts);
  });
```

### `.wallet(id)`

**Parameters**

- `id` (`string?`): ID of wallet. Defaults to the selected wallet.

**Returns**

- `Promise<Wallet>`

**Description**

Programmatically access wallets and call their methods. It's advised to use `state.modules` if you only need access to `id`, `type` or `metadata` as it avoids initialising. You can find more information on `Wallet` [here](./wallet.md).

> Note: This function will throw when calling without an ID and there is no selected wallet.  

**Example**

```ts
// Selected wallet.
(async () => {
  const wallet = await selector.wallet();
  const accounts = await wallet.getAccounts();
})();

// Specific wallet.
(async () => {
  const wallet = await selector.wallet("my-near-wallet");
  const accounts = await wallet.signIn({ contractId: "test.testnet" });
})();
```

### `.setActiveAccount(accountId)`

**Parameters**

- `accountId` (`string`): ID of account to be set as active.

**Returns**

- `void`

**Description**

Programmatically change active account which will be used to sign and send transactions.

> Note: This function will throw when calling with an `accountId` that is not in the `state.accounts` list.

**Example**

```ts
selector.setActiveAccount("sometestaccount.testnet");
```

### `.on(event, callback)`

**Parameters**

- `event` (`string`): Name of the event. This can be: `signedIn | signedOut | accountsChanged | networkChanged | uriChanged`.
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

- `event` (`string`): Name of the event. This can be: `signedIn | signedOut | accountsChanged | networkChanged | uriChanged`.
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
