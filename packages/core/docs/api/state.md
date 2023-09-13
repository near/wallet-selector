## API Reference (State)

### `.contract`

**Returns**

- `ContractState | null`
  - `contractId` (`string`): Account ID of the Smart Contract.
  - `methodNames` (`Array<string>`): List of methods that can only be invoked on the Smart Contract. Empty list means no restriction.

**Description**

Returns the signed in contract.

**Example**

```ts
const { contract } = selector.store.getState();
console.log(contract); // { contractId: "test.testnet", methodNames: [] }
```

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
  - `publicKey` (`string?`): Account public key.
  - `active` (`boolean`): Is account set as active.

**Description**

Returns the list of signed in accounts.

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

### `.recentlySignedInWallets`

**Returns**

- `Array<string>`: List of wallet ID-s

**Description**

Returns ID-s of 5 recently signed in wallets.

**Example**

```ts
const { recentlySignedInWallets } = selector.store.getState();
console.log(recentlySignedInWallets); // ["near-wallet", "sender", ...]
```

### `.message`

**Returns**

- `SignInMessageParams | null`
  - `message` (`string`): The message that wants to be transmitted.
  - `nonce` (`Buffer`): A nonce that uniquely identifies this instance of the message, denoted as a 32 bytes array (a fixed `Buffer` in JS/TS).
  - `recipient` (`string`): The recipient to whom the message is destined (e.g. "alice.near" or "myapp.com").
  - `callbackUrl` (`string?`): Optional, applicable to browser wallets (e.g. MyNearWallet). The URL to call after the signing process.
  - `state` (`string?`): Optional, applicable to browser wallets (e.g. MyNearWallet). A state for authentication purposes.


**Description**

Returns the original message that was used for `signInMessage`.

**Example**

```ts
const { message } = selector.store.getState();
console.log(message); // { message: "test", nonce: [0...31], recipient: "myapp.com" }
```

### `.signedInMessage`

**Returns**

- `SignedMessage | null`
  - `accountId` (`string`): The account name to which the publicKey corresponds as plain text (e.g. "alice.near").
  - `publicKey` (`Buffer`): The public counterpart of the key used to sign, expressed as a string with format "<key-type>:<base58-key-bytes>" (e.g. "ed25519:6TupyNrcHGTt5XRLmHTc2KGaiSbjhQi1KHtCXTgbcr4Y")
  - `signature` (`string`): The base64 representation of the signature.

**Description**

Returns the `SignedMessage` that was signed with `signInMessage`.

**Example**

```ts
const { signedMessage } = selector.store.getState();
console.log(signedMessage); // { accountId: "alice.near", publicKey: "ed25519:6TupyNrcHGTt5XRLmHTc2KGaiSbjhQi1KHtCXTgbcr4Y", signature: "CAbsadROASPfwXRekOt8s0EYZTRxrGbl7TbqssN9KYZrrCRFC7YTZ2gtgQYDAw6qJ7V4Ww48VxnzdqyCGniADQ==" }
```
