## API Reference (State)

### `.modules`

**Returns**

- `Array<ModuleState>`
  - `id` (`string`): Unique identifier for the wallet
  - `type` (`string`): Type of the wallet.
  - `metadata` (`string`): Meta information about the wallet.
  - `wallet` (`Function<Promise<Wallet>>`): Access functionality of the wallet.

**Description**

Returns the list of available modules.

**Example**

```ts
const { modules } = selector.store.getState();
console.log(modules); // [{ id: "near-wallet", ... }]
```

### `.accounts`

**Returns**

- `Array<AccountState>`
  - `accountId` (`string`): NEAR account identifier.

**Description**

Returns the list of connected accounts.

**Example**

```ts
const { accounts } = selector.store.getState();
console.log(accounts); // [{ accountId: "test.testnet" }]
```

### `.selectedWalletId`

**Returns**

- `string | null`

**Description**

Returns the ID of the selected wallet.

**Example**

```ts
const { selectedWalletId } = selector.store.getState();
console.log(selectedWalletId); // "near-wallet"
```
