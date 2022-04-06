# Example

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupModal } from "@near-wallet-selector/modal";

const selector = await setupWalletSelector({
  network: "testnet",
  contractId: "guest-book.testnet",
  wallets: [setupNearWallet()]
});

const state = selector.store.getState();
selector.store.toObservable().subscribe((nextState) => console.log("update", nextState));

console.log("network", state.network);
console.log("wallets", state.wallets);
console.log("accounts", state.accounts);

selector.wallet() // selected wallet.

// Connect to Ledger wallet
selector.wallet("ledger").connect({ 
  accountId: "lewis-sqa.testnet",
  derivationPath: "path"
});

selector.show();
selector.hide();











```
