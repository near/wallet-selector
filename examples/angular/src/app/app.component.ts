import { Component, OnInit } from "@angular/core";
import NearWalletSelector, { AccountInfo } from "@near-wallet-selector/core";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import { setupLedger } from "@near-wallet-selector/ledger";
import { setupMathWallet } from "@near-wallet-selector/math-wallet";
import { setupWalletConnect } from "@near-wallet-selector/wallet-connect";

declare global {
  interface Window {
    selector: NearWalletSelector;
  }
}

@Component({
  selector: "near-wallet-selector-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  selector: NearWalletSelector;
  accountId: string | null;
  accounts: Array<AccountInfo> = [];

  async ngOnInit() {
    await this.initialize();
  }

  syncAccountState(
    currentAccountId: string | null,
    newAccounts: Array<AccountInfo>
  ) {
    if (!newAccounts.length) {
      localStorage.removeItem("accountId");
      this.accountId = null;
      this.accounts = [];

      return;
    }

    const validAccountId =
      currentAccountId &&
      newAccounts.some((x) => x.accountId === currentAccountId);
    const newAccountId = validAccountId
      ? currentAccountId
      : newAccounts[0].accountId;

    localStorage.setItem("accountId", newAccountId);
    this.accountId = newAccountId;
    this.accounts = newAccounts;
  }

  async initialize() {
    NearWalletSelector.init({
      network: "testnet",
      contractId: "guest-book.testnet",
      wallets: [
        setupNearWallet(),
        setupSender(),
        setupLedger(),
        setupMathWallet(),
        setupWalletConnect({
          projectId: "d43d7d0e46eea5ee28e1f75e1131f984",
          metadata: {
            name: "NEAR Wallet Selector",
            description: "Example dApp used by NEAR Wallet Selector",
            url: "https://github.com/near/wallet-selector",
            icons: ["https://avatars.githubusercontent.com/u/37784886"],
          },
        }),
      ],
    })
      .then((instance) => {
        return instance.getAccounts().then(async (newAccounts) => {
          this.syncAccountState(localStorage.getItem("accountId"), newAccounts);

          window.selector = instance;
          this.selector = instance;
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to initialise wallet selector");
      });
  }
}
