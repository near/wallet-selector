# Migration Guide: Upgrading to Wallet Selector v10

This guide will help you migrate your application from Wallet Selector v9.x to v10.x. Version 10 introduces breaking changes related to the migration from `near-api-js` to the modular `@near-js` packages, along with improved action compatibility.

## TL;DR - Quick API Changes Summary

### What Changed

| Area | v9.x | v10.x | Action Required |
|------|------|-------|-----------------|
| **Dependencies** | Requires `near-api-js` | Uses `@near-js/*` packages | ✅ Remove `near-api-js` |
| **Action Type** | Accepts internal format directly | Accepts NAJ actions only | ✅ Use `actionCreators` or convert |

### Critical Changes You Must Make

**1. Update action creation - REQUIRED:**
```typescript
// ❌ v9.x - No longer works
const actions = [{
  type: "FunctionCall",
  params: {
    methodName: "addMessage",
    args: { text: "Hello" },
    gas: "30000000000000",        // String
    deposit: "0",                  // String
  }
}];

// ✅ v10.x - Required approach
import { actionCreators } from "@near-wallet-selector/core";
const { functionCall } = actionCreators;

const actions = [
  functionCall(
    "addMessage",
    { text: "Hello" },
    BigInt("30000000000000"),
    BigInt("0")
  )
];
```

### Alternative: Keep Using Internal Action Format

If you prefer the old format, you can convert it:
```typescript
import { internalActionToNaj } from "@near-wallet-selector/core";

const internalAction = {
  type: "FunctionCall",
  params: { methodName: "addMessage", args: {}, gas: "30000000000000", deposit: "0" }
};

const action = internalActionToNaj(internalAction);
```

---

## Table of Contents

- [TL;DR - Quick API Changes Summary](#tldr---quick-api-changes-summary)
- [Overview of Changes](#overview-of-changes)
- [Breaking Changes](#breaking-changes)
- [Migration Steps](#migration-steps)
- [Detailed Changes](#detailed-changes)
- [Examples](#examples)
- [Additional Resources](#additional-resources)

## Overview of Changes

Version 10 includes two major updates:

1. **Migration from `near-api-js` to `@near-js` packages** (PR #1422)
   - Replaced the monolithic `near-api-js` with individual `@near-js/*` packages (v2.3.0)
   - Improved tree-shaking and reduced bundle sizes
   - More modular imports

2. **NAJ (NEAR API JS) Actions Compatibility** (PR #1409)
   - Added support for `@near-js/transactions` action format
   - Internal conversion between wallet selector's action format and NAJ actions
   - Simplified action creation with `actionCreators`

## Breaking Changes

### 1. Dependencies

**Before (v9.x):**
```json
{
  "dependencies": {
    "near-api-js": "^4.0.0 or ^5.0.0"
  }
}
```

**After (v10.x):**
```json
{
  "dependencies": {
    // No need to explicitly install @near-js packages
    // They are bundled as dependencies of @near-wallet-selector packages
  }
}
```

### 2. Import Statements

**Before (v9.x):**
```typescript
import { transactions, utils, providers } from "near-api-js";
```

**After (v10.x):**
```typescript
// Import from individual @near-js packages
import { actionCreators } from "@near-js/transactions";
import { parseNearAmount, baseDecode } from "@near-js/utils";
import { JsonRpcProvider } from "@near-js/providers";
import { PublicKey, KeyType } from "@near-js/crypto";

// Or use the re-exported actionCreators from wallet selector core
import { actionCreators } from "@near-wallet-selector/core";
```

### 3. Action Creation (BREAKING CHANGE)

**Before (v9.x):**
```typescript
// Using wallet selector's internal action format
const actions = [
  {
    type: "FunctionCall",
    params: {
      methodName: "addMessage",
      args: { text: "Hello" },
      gas: "30000000000000",
      deposit: "10000000000000000000000",
    },
  },
];
```

**After (v10.x):**

**Option 1: Use actionCreators (Recommended)**
```typescript
import { actionCreators } from "@near-wallet-selector/core";

const { functionCall } = actionCreators;

const actions = [
  functionCall(
    "addMessage",
    { text: "Hello" },
    BigInt("30000000000000"),
    BigInt("10000000000000000000000")
  ),
];
```

**Option 2: Convert internal actions manually**
```typescript
import { internalActionToNaj } from "@near-wallet-selector/core";

// Define using internal format
const internalActions = [
  {
    type: "FunctionCall" as const,
    params: {
      methodName: "addMessage",
      args: { text: "Hello" },
      gas: "30000000000000",
      deposit: "10000000000000000000000",
    },
  },
];

// Convert to NAJ actions
const actions = internalActions.map(internalActionToNaj);
```

> **Important:** The `Action` type in v10 now only accepts NAJ actions from `@near-js/transactions`. If you want to continue using the internal action format, you must convert it using the exported `internalActionToNaj` utility. However, we recommend migrating to `actionCreators` directly for better type safety and ecosystem compatibility.

### 4. Transaction Creation

**Before (v9.x):**
```typescript
import { transactions } from "near-api-js";

const transaction = transactions.createTransaction(
  accountId,
  publicKey,
  receiverId,
  nonce,
  actions,
  blockHash
);
```

**After (v10.x):**
```typescript
import { createTransaction } from "@near-js/transactions";

const transaction = createTransaction(
  accountId,
  publicKey,
  receiverId,
  nonce,
  actions,
  blockHash
);
```

### 5. Number Types in Actions

**Important:** When using `actionCreators`, numeric values (gas and deposit) must now be passed as `BigInt` instead of strings.

**Before (v9.x):**
```typescript
{
  type: "FunctionCall",
  params: {
    methodName: "method",
    args: {},
    gas: "30000000000000",
    deposit: "1000000000000000000000000",
  }
}
```

**After (v10.x) with actionCreators:**
```typescript
actionCreators.functionCall(
  "method",
  {},
  BigInt("30000000000000"),
  BigInt("1000000000000000000000000")
)
```

## Migration Steps

### Step 1: Update Dependencies

Remove `near-api-js` and update wallet selector packages:

```bash
# Using npm
npm uninstall near-api-js
npm install @near-wallet-selector/core@^10.0.0

# Using pnpm
pnpm remove near-api-js
pnpm add @near-wallet-selector/core@^10.0.0

# Using yarn
yarn remove near-api-js
yarn add @near-wallet-selector/core@^10.0.0
```

Update all wallet selector packages to v10:

```bash
# Update all @near-wallet-selector/* packages to v10.x
npm install @near-wallet-selector/modal-ui@^10.0.0 \
  @near-wallet-selector/my-near-wallet@^10.0.0 \
  # ... other wallet packages
```

### Step 2: Update Imports

Replace `near-api-js` imports with `@near-js/*` imports:

**Find and replace:**
```typescript
// Old
import { transactions } from "near-api-js";
// New
import { actionCreators, createTransaction } from "@near-js/transactions";

// Old
import { utils } from "near-api-js";
// New
import { parseNearAmount, formatNearAmount, baseDecode, baseEncode } from "@near-js/utils";

// Old
import { providers } from "near-api-js";
// New
import { JsonRpcProvider } from "@near-js/providers";

// Old
import { KeyPair, PublicKey } from "near-api-js";
// New
import { PublicKey, KeyType } from "@near-js/crypto";
import { InMemorySigner } from "@near-js/signers";
```

### Step 3: Update Action Creation (REQUIRED)

You **must** migrate to using `actionCreators` from `@near-js/transactions`:

**Before:**
```typescript
const transactions = [
  {
    signerId: accountId,
    receiverId: contractId,
    actions: [
      {
        type: "FunctionCall",
        params: {
          methodName: "method",
          args: { key: "value" },
          gas: "30000000000000",
          deposit: "0",
        },
      },
    ],
  },
];

await wallet.signAndSendTransactions({ transactions });
```

**After:**
```typescript
import { actionCreators } from "@near-wallet-selector/core";

const { functionCall } = actionCreators;

const transactions = [
  {
    signerId: accountId,
    receiverId: contractId,
    actions: [
      functionCall(
        "method",
        { key: "value" },
        BigInt("30000000000000"),
        BigInt("0")
      ),
    ],
  },
];

await wallet.signAndSendTransactions({ transactions });
```

### Step 4: Update Utility Function Calls

Replace `near-api-js` utility functions:

**Before:**
```typescript
import { utils } from "near-api-js";

const amount = utils.format.parseNearAmount("1");
const formatted = utils.format.formatNearAmount("1000000000000000000000000");
```

**After:**
```typescript
import { parseNearAmount, formatNearAmount } from "@near-js/utils";

const amount = parseNearAmount("1");
const formatted = formatNearAmount("1000000000000000000000000");
```

### Step 5: Test Your Application

After migration:
1. Test all transaction signing flows
2. Verify action execution works correctly
3. Check that numeric values are properly converted to BigInt
4. Ensure wallet connections and sign-in flows work
5. Test sign message and NEP-413 signing if used

## Detailed Changes

### Action Creators Available

The following action creators are available from `@near-wallet-selector/core` or `@near-js/transactions`:

```typescript
import { actionCreators } from "@near-wallet-selector/core";

const {
  createAccount,    // Creates CreateAccount action
  deleteAccount,    // Creates DeleteAccount action  
  deleteKey,        // Creates DeleteKey action
  addKey,          // Creates AddKey action
  deployContract,   // Creates DeployContract action
  functionCall,     // Creates FunctionCall action
  stake,           // Creates Stake action
  transfer,        // Creates Transfer action
} = actionCreators;
```

### Action Creator Signatures

#### functionCall
```typescript
functionCall(
  methodName: string,
  args: object,
  gas: bigint,
  deposit: bigint
)
```

#### transfer
```typescript
transfer(deposit: bigint)
```

#### addKey
```typescript
addKey(
  publicKey: PublicKey,
  accessKey: AccessKey
)
```

#### deleteKey
```typescript
deleteKey(publicKey: PublicKey)
```

#### deleteAccount
```typescript
deleteAccount(beneficiaryId: string)
```

#### deployContract
```typescript
deployContract(code: Uint8Array)
```

#### stake
```typescript
stake(
  stake: bigint,
  publicKey: PublicKey
)
```

#### createAccount
```typescript
createAccount()
```

### LegacySigner Compatibility

For wallet implementations that haven't migrated to the new `Signer` interface from `@near-js/signers`, a `LegacySigner` abstract class is provided for backward compatibility:

```typescript
import type { LegacySigner } from "@near-wallet-selector/wallet-utils";

// LegacySigner interface
abstract class LegacySigner {
  abstract createKey(
    accountId: string,
    networkId?: string,
    keyType?: KeyType
  ): Promise<PublicKey>;
  
  abstract getPublicKey(
    accountId?: string,
    networkId?: string
  ): Promise<PublicKey>;
  
  abstract signMessage(
    message: Uint8Array,
    accountId?: string,
    networkId?: string
  ): Promise<Signature>;
}
```

### Internal Action Format (Requires Conversion)

The internal action format is still available as `InternalAction` type, but requires manual conversion to NAJ actions using the `internalActionToNaj` utility:

```typescript
import { internalActionToNaj, type InternalAction } from "@near-wallet-selector/core";

// Internal action types
const internalAction: InternalAction = {
  type: "FunctionCall",
  params: {
    methodName: "addMessage",
    args: { text: "Hello" },
    gas: "30000000000000",
    deposit: "0",
  }
};

// Convert to NAJ action before passing to wallet
const najAction = internalActionToNaj(internalAction);

await wallet.signAndSendTransaction({
  receiverId: "contract.testnet",
  actions: [najAction],
});
```


## Examples

### Example 1: Simple Function Call

**Before (v9.x):**
```typescript
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [setupMyNearWallet()],
});

const wallet = await selector.wallet();

await wallet.signAndSendTransaction({
  receiverId: "contract.testnet",
  actions: [
    {
      type: "FunctionCall",
      params: {
        methodName: "method",
        args: { key: "value" },
        gas: "30000000000000",
        deposit: "1000000000000000000000000",
      },
    },
  ],
});
```

**After (v10.x):**
```typescript
import { setupWalletSelector, actionCreators } from "@near-wallet-selector/core";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { parseNearAmount } from "@near-js/utils";

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [setupMyNearWallet()],
});

const wallet = await selector.wallet();

const { functionCall } = actionCreators;

await wallet.signAndSendTransaction({
  receiverId: "contract.testnet",
  actions: [
    functionCall(
      "method",
      { key: "value" },
      BigInt("30000000000000"),
      BigInt(parseNearAmount("1")!)
    ),
  ],
});
```

### Example 2: Multiple Transactions

**Before (v9.x):**
```typescript
const transactions = [
  {
    signerId: accountId,
    receiverId: "contract1.testnet",
    actions: [
      {
        type: "FunctionCall",
        params: {
          methodName: "method1",
          args: {},
          gas: "30000000000000",
          deposit: "0",
        },
      },
    ],
  },
  {
    signerId: accountId,
    receiverId: "contract2.testnet",
    actions: [
      {
        type: "Transfer",
        params: {
          deposit: "1000000000000000000000000",
        },
      },
    ],
  },
];

await wallet.signAndSendTransactions({ transactions });
```

**After (v10.x):**
```typescript
import { actionCreators } from "@near-wallet-selector/core";
import { parseNearAmount } from "@near-js/utils";

const { functionCall, transfer } = actionCreators;

const transactions = [
  {
    signerId: accountId,
    receiverId: "contract1.testnet",
    actions: [
      functionCall(
        "method1",
        {},
        BigInt("30000000000000"),
        BigInt("0")
      ),
    ],
  },
  {
    signerId: accountId,
    receiverId: "contract2.testnet",
    actions: [
      transfer(BigInt(parseNearAmount("1")!)),
    ],
  },
];

await wallet.signAndSendTransactions({ transactions });
```

### Example 3: Creating Signed Transaction

**Before (v9.x):**
```typescript
import { transactions, utils } from "near-api-js";

const signedTx = await wallet.createSignedTransaction(
  "contract.testnet",
  [
    {
      type: "FunctionCall",
      params: {
        methodName: "method",
        args: { key: "value" },
        gas: "30000000000000",
        deposit: utils.format.parseNearAmount("1")!,
      },
    },
  ]
);
```

**After (v10.x):**
```typescript
import { actionCreators } from "@near-wallet-selector/core";
import { parseNearAmount } from "@near-js/utils";

const { functionCall } = actionCreators;

const signedTx = await wallet.createSignedTransaction(
  "contract.testnet",
  [
    functionCall(
      "method",
      { key: "value" },
      BigInt("30000000000000"),
      BigInt(parseNearAmount("1")!)
    ),
  ]
);
```

### Example 4: Sign and Send with Low-Level Transaction API

**After (v10.x only - new capability):**
```typescript
import { createTransaction, actionCreators } from "@near-js/transactions";
import { baseDecode } from "@near-js/utils";

const { functionCall } = actionCreators;

// Create transaction manually
const transaction = createTransaction(
  accountId,
  await wallet.getPublicKey(),
  "contract.testnet",
  BigInt(100), // nonce
  [
    functionCall(
      "method",
      { key: "value" },
      BigInt("30000000000000"),
      BigInt("0")
    ),
  ],
  baseDecode("blockHashHere")
);

// Sign the transaction
const [hash, signedTransaction] = await wallet.signTransaction(transaction);

// Broadcast using provider
const result = await provider.sendTransaction(signedTransaction);
```

### Example 5: Adding Access Keys

**Before (v9.x):**
```typescript
const actions = [
  {
    type: "AddKey",
    params: {
      publicKey: "ed25519:...",
      accessKey: {
        nonce: 0,
        permission: {
          receiverId: "contract.testnet",
          methodNames: ["method1", "method2"],
          allowance: "250000000000000000000000",
        },
      },
    },
  },
];
```

**After (v10.x):**
```typescript
import { actionCreators } from "@near-wallet-selector/core";
import { PublicKey } from "@near-js/crypto";
import {
  AccessKey,
  AccessKeyPermission,
  FunctionCallPermission,
} from "@near-js/transactions";

const { addKey } = actionCreators;

const actions = [
  addKey(
    PublicKey.from("ed25519:..."),
    new AccessKey({
      nonce: BigInt(0),
      permission: new AccessKeyPermission({
        functionCall: new FunctionCallPermission({
          receiverId: "contract.testnet",
          methodNames: ["method1", "method2"],
          allowance: BigInt("250000000000000000000000"),
        }),
      }),
    })
  ),
];
```

## Troubleshooting

## Additional Resources

- [NEAR JavaScript SDK Documentation](https://docs.near.org/tools/near-api-js/quick-reference)
- [@near-js/transactions Documentation](https://near.github.io/near-api-js/modules/_near_js_transactions.html)
- [Wallet Selector API Reference](./packages/core/docs/api/selector.md)
- [Transaction Actions Reference](./packages/core/docs/api/transactions.md)

## Getting Help

If you encounter issues during migration:

1. Check this migration guide and the troubleshooting section
2. Review the [examples](./examples) directory for working code
3. Open an issue on [GitHub](https://github.com/near/wallet-selector/issues)
4. Join the [NEAR Discord](https://discord.gg/near) for community support
