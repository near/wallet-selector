import type { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import type { WalletSelector, AccountState } from "@near-wallet-selector/core";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupDefaultWallets } from "@near-wallet-selector/default-wallets";
import { setupSender } from "@near-wallet-selector/sender";
import { setupNearFi } from "@near-wallet-selector/nearfi";
import { setupMathWallet } from "@near-wallet-selector/math-wallet";
import { setupNightly } from "@near-wallet-selector/nightly";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupWelldoneWallet } from "@near-wallet-selector/welldone-wallet";
import { setupNightlyConnect } from "@near-wallet-selector/nightly-connect";
import { setupWalletConnect } from "@near-wallet-selector/wallet-connect";
import { setupCoin98Wallet } from "@near-wallet-selector/coin98-wallet";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupNeth } from "@near-wallet-selector/neth";
import { setupOptoWallet } from "@near-wallet-selector/opto-wallet";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
// import { setupModal } from "@near-wallet-selector/modal-ui";
// import type { WalletSelectorModal } from "@near-wallet-selector/modal-ui";
import { setupModal } from "@near-wallet-selector/modal-ui-js";
import type { WalletSelectorModal } from "@near-wallet-selector/modal-ui-js";
import { MAINNET_CONTRACT_ID, TESTNET_CONTRACT_ID } from "../constants";

declare global {
  interface Window {
    selector: WalletSelector;
    modal: WalletSelectorModal;
  }
}

@Component({
  selector: "near-wallet-selector-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  selector: WalletSelector;
  modal: WalletSelectorModal;
  accountId: string | null;
  accounts: Array<AccountState> = [];
  contractId = TESTNET_CONTRACT_ID;
  networkId = "testnet";

  async ngOnInit() {
    await this.initialize().catch((err) => {
      console.error(err);
      alert("Failed to initialise wallet selector");
    });
  }

  setNetwork(networkId: string) {
    console.log("this.selector", this.selector);
    this.contractId =
      networkId === "mainnet" ? MAINNET_CONTRACT_ID : TESTNET_CONTRACT_ID;

    const _modal = setupModal(this.selector, { contractId: this.contractId });
    const state = this.selector.store.getState();

    this.accounts = state.accounts;
    this.accountId =
      state.accounts.find((account) => account.active)?.accountId || null;

    window.selector = this.selector;
    window.modal = _modal;

    this.modal = _modal;
  }

  async initialize() {
    this.selector = await setupWalletSelector([
      {
        network: "testnet",
        debug: true,
        modules: [
          ...(await setupDefaultWallets()),
          setupNearWallet(),
          setupSender(),
          setupMathWallet(),
          setupNightly(),
          setupMeteorWallet(),
          setupWelldoneWallet(),
          setupHereWallet(),
          setupCoin98Wallet(),
          setupNearFi(),
          setupNeth({
            bundle: false,
          }),
          setupOptoWallet(),
          setupWalletConnect({
            projectId: "c4f79cc...",
            metadata: {
              name: "NEAR Wallet Selector",
              description: "Example dApp used by NEAR Wallet Selector",
              url: "https://github.com/near/wallet-selector",
              icons: ["https://avatars.githubusercontent.com/u/37784886"],
            },
          }),
          setupNightlyConnect({
            url: "wss://relay.nightly.app/app",
            appMetadata: {
              additionalInfo: "",
              application: "NEAR Wallet Selector",
              description: "Example dApp used by NEAR Wallet Selector",
              icon: "https://near.org/wp-content/uploads/2020/09/cropped-favicon-192x192.png",
            },
          }),
        ],
      },
      {
        network: "mainnet",
        debug: false,
        modules: [...(await setupDefaultWallets()), setupSender()],
      },
    ]);

    // this.selector.on("networkChanged", ({ networkId, selector }) => {
    //   console.log("this.selector.networkChanged", networkId);
    //   if (selector) {
    //     this.selector = selector;
    //   }
    //   this.setNetwork(networkId);
    // });

    this.setNetwork(this.selector.options.network.networkId);
  }
}
