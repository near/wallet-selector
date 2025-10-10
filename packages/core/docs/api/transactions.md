## API Reference (Transactions)

This documentation covers the NEAR Action types available in `@near-js/transactions` that are used by wallet selector for `signAndSendTransaction` and `signAndSendTransactions`.

> **Note:** If you're upgrading from v9.x to v10.x, see the [Migration Guide](../../../../MIGRATION-v10.md) for information about action format changes.

### Transaction

Below is the interface of a NEAR Transaction used by `signAndSendTransactions`:

```ts
interface Transaction {
  signerId: string;
  receiverId: string;
  actions: Array<Action>;
}
```

### Actions

Wallet Selector v10's `Action` type accepts NAJ actions from `@near-js/transactions`:

1. **NEAR API JS actions** (recommended) - Using `actionCreators` from `@near-js/transactions`
2. **Internal action format** - Available via `InternalAction` type, but requires conversion using `internalActionToNaj` utility

### Action Creators (Recommended)

The `@near-js/transactions` package provides convenient action creator functions that can be imported from `@near-wallet-selector/core` or directly from `@near-js/transactions`:

```ts
import { actionCreators } from '@near-wallet-selector/core';
// or
import { actionCreators } from '@near-js/transactions';

const {
  addKey,           // Creates AddKey action
  createAccount,    // Creates CreateAccount action
  deleteAccount,    // Creates DeleteAccount action  
  deleteKey,        // Creates DeleteKey action
  deployContract,   // Creates DeployContract action
  functionCall,     // Creates FunctionCall action
  stake,           // Creates Stake action
  transfer,        // Creates Transfer action
} = actionCreators;
```

#### Example: Function Call Action

```ts
import { actionCreators } from '@near-wallet-selector/core';
import { parseNearAmount } from '@near-js/utils';

const { functionCall } = actionCreators;

const action = functionCall(
  "addMessage",                      // Method name
  { text: "Hello World!" },          // Arguments as object
  BigInt("30000000000000"),         // Gas (as BigInt)
  BigInt(parseNearAmount("0.1")!)   // Deposit (as BigInt)
);

await wallet.signAndSendTransaction({
  receiverId: "contract.testnet",
  actions: [action],
});
```

#### Example: Transfer Action

```ts
import { actionCreators } from '@near-wallet-selector/core';
import { parseNearAmount } from '@near-js/utils';

const { transfer } = actionCreators;

await wallet.signAndSendTransaction({
  receiverId: "recipient.testnet",
  actions: [
    transfer(BigInt(parseNearAmount("1")!))  // Transfer 1 NEAR
  ],
});
```

### Internal Action Format (Requires Conversion)

The internal action format (`InternalAction`) is still available but requires manual conversion to NAJ actions:

```ts
import { internalActionToNaj } from '@near-wallet-selector/core';

const internalAction = {
  type: "FunctionCall" as const,
  params: {
    methodName: "addMessage",
    args: { text: "Hello World!" },
    gas: "30000000000000",      // String format
    deposit: "100000000000000000000000", // String format
  },
};

// Convert to NAJ action
const najAction = internalActionToNaj(internalAction);

await wallet.signAndSendTransaction({
  receiverId: "contract.testnet",
  actions: [najAction],
});
```

### Migration Note

Wallet Selector v10's `Action` type only accepts NAJ actions from `@near-js/transactions`. If you need to use the internal action format, you must convert it using `internalActionToNaj`. However, we recommend using `actionCreators` directly for better type safety and compatibility with the NEAR ecosystem.

For more details on the migration process, see the [Migration Guide](../../../../MIGRATION-v10.md).

For direct usage of NEAR API JS actions, refer to the [official NEAR API JS documentation](https://near.github.io/near-api-js/modules/_near-js_transactions.actions.html).
