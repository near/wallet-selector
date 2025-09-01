## API Reference (Transactions)

This documentation covers the NEAR Action types available in `@near-js/transactions` that are used by wallet selector for `signAndSendTransaction` and `signAndSendTransactions`.

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

The following Action classes are available from `@near-js/transactions`:

### Action Creators

The `@near-js/transactions` package provides convenient action creator functions:

```ts
import { actionCreators } from '@near-js/transactions';

const {
  addKey,           // Creates AddKey action
  createAccount,    // Creates CreateAccount action
  deleteAccount,    // Creates DeleteAccount action  
  deleteKey,        // Creates DeleteKey action
  deployContract,   // Creates DeployContract action
  fullAccessKey,    // Creates full access key permission
  functionCallAccessKey, // Creates function call access key permission
  functionCall,     // Creates FunctionCall action
  stake,           // Creates Stake action
  transfer,        // Creates Transfer action
} = actionCreators;
```

### Wallet Selector Action Types

For backward compatibility, wallet selector maintains its own action interfaces that map to the NEAR API JS actions:

```ts
interface CreateAccountAction {
  type: "CreateAccount";
}

interface DeployContractAction {
  type: "DeployContract";
  params: {
    code: Uint8Array;
  };
}

interface FunctionCallAction {
  type: "FunctionCall";
  params: {
    methodName: string;
    args: object;
    gas: string;
    deposit: string;
  };
}

interface TransferAction {
  type: "Transfer";
  params: {
    deposit: string;
  };
}

interface StakeAction {
  type: "Stake";
  params: {
    stake: string;
    publicKey: string;
  };
}  

interface AddKeyAction {
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

interface DeleteKeyAction {
  type: "DeleteKey";
  params: {
    publicKey: string;
  };
}

interface DeleteAccountAction {
  type: "DeleteAccount";
  params: {
    beneficiaryId: string;
  };
}
```

### Migration Note

This documentation reflects the NEAR API JS structure from `@near-js/transactions`. The wallet selector internally handles conversion between its action interfaces and the NEAR API JS Action classes.

For direct usage of NEAR API JS actions, refer to the [official NEAR API JS documentation](https://near.github.io/near-api-js/modules/_near-js_transactions.actions.html).
