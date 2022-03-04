import {Component, OnInit} from '@angular/core';
import NearWalletSelector, { wallets } from "near-wallet-selector";
import getConfig from "../config";

const { nearWallet, senderWallet, ledgerWallet } = wallets;

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
      wallets: [nearWallet(), senderWallet(), ledgerWallet()],
      networkId: nearConfig.networkId,
      contract: { contractId: nearConfig.contractName },
    });

    // @ts-ignore
    window.selector = selector;

    await selector.init();

    this.selector = selector;
  }
}
