## API Reference (State)

### `.modules`

**Returns**

- `Array<ModuleState>`
  - `id` (`string`): TODO.
  - `type` (`string`): TODO.
  - `metadata` (`string`): TODO.
  - `wallet` (`Function<Promise<Wallet>>`): TODO.

**Description**

TODO: Description here.

**Example**

```ts
const { modules } = selector.store.getState();
console.log(modules); // [{ id: "near-wallet", ... }]
```

### `.accounts`

**Returns**

- `Array<AccountState>`
  - `accountId` (`string`): TODO.

**Description**

TODO: Description here.

**Example**

```ts
const { accounts } = selector.store.getState();
console.log(accounts); // [{ accountId: "test.testnet" }]
```

### `.selectedWalletId`

**Returns**

- `string | null`

**Description**

TODO: Description here.

**Example**

```ts
const { selectedWalletId } = selector.store.getState();
console.log(selectedWalletId); // "near-wallet"
```
