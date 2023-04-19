# @near-wallet-selector/wallet-utils

This is the Wallet Utils package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry, this package requires `near-api-js` v1.0.0 or above:

```bash
# Using Yarn
yarn add near-api-js

# Using NPM.
npm install near-api-js
```

```bash
# Using Yarn
yarn add @near-wallet-selector/wallet-utils

# Using NPM.
npm install @near-wallet-selector/wallet-utils
```

Then use it in your custom wallet integration:

```ts
import { createAction, signTransactions } from "@near-wallet-selector/wallet-utils";

const action = createAction({
  type: "Transfer",
  params: {
    deposit: "10000000000000000000000",
  },
});

const signedTransactions = await signTransactions(
  [{ signerId, receiverId, actions }],
  signer,
  options.network
);
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
