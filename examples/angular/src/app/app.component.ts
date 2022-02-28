import {Component, OnInit} from '@angular/core';
import NearWalletSelector from "near-wallet-selector";
import getConfig from "../config";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  nearWalletSelector: NearWalletSelector | undefined;

  async ngOnInit() {
    await this.initialize();
  }

  show() {
    this.nearWalletSelector?.show()
  }

  async initialize() {
    const nearConfig = getConfig("testnet");

    this.nearWalletSelector = new NearWalletSelector({
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
    await this.nearWalletSelector.init();
  }
}
