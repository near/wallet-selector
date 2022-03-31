import { Component, OnInit } from "@angular/core";
import NearWalletSelector from "@near-wallet-selector/core";
import { AccountInfo } from "@near-wallet-selector/wallet";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupSenderWallet } from "@near-wallet-selector/sender-wallet";
import { setupLedgerWallet } from "@near-wallet-selector/ledger-wallet";
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

  async initialize() {
    NearWalletSelector.init({
      wallets: [
        setupNearWallet(),
        setupSenderWallet(),
        setupLedgerWallet(),
        setupMathWallet(),
        setupWalletConnect({
          projectId: "c4f79cc...",
          metadata: {
            name: "NEAR Wallet Selector",
            description: "Example dApp used by NEAR Wallet Selector",
            url: "https://github.com/near/wallet-selector",
            icons: ["https://avatars.githubusercontent.com/u/37784886"],
          },
        }),
      ],
      network: "testnet",
      contractId: "guest-book.testnet",
    })
      .then((instance) => {
        return instance.getAccounts().then(async (initAccounts) => {
          let initAccountId = localStorage.getItem("accountId");

          // Ensure the accountId in storage is still valid.
          if (
            initAccountId &&
            !initAccounts.some((x) => x.accountId === initAccountId)
          ) {
            initAccountId = null;
            localStorage.removeItem("accountId");
          }

          // Assume the first account if one hasn't been selected.
          if (!initAccountId && initAccounts.length) {
            initAccountId = initAccounts[0].accountId;
            localStorage.setItem("accountId", initAccountId);
          }

          if (initAccountId) {
            this.accountId = initAccountId;
          }

          window.selector = instance;
          this.selector = instance;

          this.accounts = initAccounts;
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to initialise wallet selector");
      });
  }
}
