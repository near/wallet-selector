import {Component, OnInit} from '@angular/core';
import NearWalletSelector  from "near-wallet-selector";
import getConfig from "../config";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  selector: NearWalletSelector;

  async ngOnInit() {
    await this.initialize();
  }

  async initialize() {
    const nearConfig = getConfig("testnet");

    const selector = new NearWalletSelector({
      wallets: ["near-wallet", "sender-wallet", "ledger-wallet"],
      networkId: nearConfig.networkId,
      contract: { contractId: nearConfig.contractName },
    });

    // @ts-ignore
    window.selector = selector;

    await selector.init();

    this.selector = selector;
  }
}
