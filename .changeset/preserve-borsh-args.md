---
"@near-wallet-selector/core": patch
---

Preserve `Uint8Array` (Borsh) `FunctionCall` args in internal action transforms:

- `FunctionCallAction.params.args` now accepts `object | Uint8Array`.
- `najActionToInternal` attempts JSON.parse; on failure, keeps bytes intact.
- `internalActionToNaj` forwards either object or `Uint8Array` to `@near-js/transactions.functionCall`.

This fixes wallets that rely on NAJ → internal conversion (e.g., Meteor, Sender, OKX, HERE, Narwallets, Near Mobile, XDEFI, Bitget, ethereum-wallets) so they can handle Borsh args again.

