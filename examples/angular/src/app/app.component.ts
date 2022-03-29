import { Component, OnInit } from "@angular/core";
import NearWalletSelector from "near-wallet-selector";
import { AccountInfo } from "near-wallet-selector";

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
      wallets: ["near-wallet", "sender-wallet", "ledger-wallet", "math-wallet"],
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

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore-next-line
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
