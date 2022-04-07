# Example

```ts
import { setupWalletSelector, InjectedWallet, HardwareWallet } from "@near-wallet-selector/core";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupModal } from "@near-wallet-selector/modal";
import { HardwareWallet } from "./wallet";

const selector = await setupWalletSelector({
  network: "testnet",
  contractId: "guest-book.testnet",
  methodNames: ["addMessage"]
  wallets: [setupNearWallet()]
});

const modal = setupModal(selector, {
  theme: "dark",
});

selector.store.observable
  .subscribe((nextState) => console.log("update", nextState));

const state = selector.store.getState();

console.log("network", state.network);
console.log("wallets", state.wallets);
console.log("accounts", state.accounts);

selector.wallet<InjectedWallet>() // selected wallet.

// Connect to Ledger wallet
selector.wallet<HardwareWallet>("ledger").connect({
  accountId: "lewis-sqa.testnet",
  derivationPath: "path"
});

modal.show();
modal.hide();
```
