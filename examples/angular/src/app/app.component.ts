import {Component, OnInit} from '@angular/core';
import NearWalletSelector from "near-wallet-selector";
import getConfig from "../config";
import {AccountInfo} from "near-wallet-selector/lib/cjs/wallets/Wallet";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  selector: NearWalletSelector;
  account: AccountInfo;

  async ngOnInit() {
    await this.initialize();

    this.account = await this.selector?.getAccount();
    this.subscribeToEvents();
  }

  async initialize() {
    const nearConfig = getConfig("testnet");

    this.selector = new NearWalletSelector({
      wallets: ["near-wallet", "sender-wallet", "ledger-wallet"],
      networkId: "testnet",
      theme: "light",
      contract: {
        accountId: nearConfig.contractName,
      },
      walletSelectorUI: {
        description: "Please select a wallet to connect to this dApp:",
        explanation: [
          "Wallets are used to send, receive, and store digital assets.",
          "There are different types of wallets. They can be an extension",
          "added to your browser, a hardware device plugged into your",
          "computer, web-based, or as an app on your phone.",
        ].join(" "),
      },
    });
    await this.selector.init();
  }

  signIn() {
    this.selector.show();
  }

  signOut() {
    this.selector.signOut().catch((err) => {
      console.log("Failed to sign out");
      console.error(err);
    });
  }

  switchProvider() {
    this.selector.show();
  }

  subscribeToEvents() {
    this.selector.on("signIn", () => {
      console.log("'signIn' event triggered!");

      this.selector
        .getAccount()
        .then((data) => {
          console.log("Account", data);
          this.account = data;
        })
        .catch((err) => {
          console.log("Failed to retrieve account info");
          console.error(err);
        });
    });

    this.selector.on("signOut", () => {
      console.log("'signOut' event triggered!");
      this.account = null;
    })
  }
}
