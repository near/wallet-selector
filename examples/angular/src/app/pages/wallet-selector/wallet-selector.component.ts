import type { OnInit } from "@angular/core";
import type { AccountState, WalletSelector } from "@near-wallet-selector/core";
import { setupWalletSelector } from "@near-wallet-selector/core";
import type { WalletSelectorModal } from "@near-wallet-selector/modal-ui-js";
import { setupModal } from "@near-wallet-selector/modal-ui-js";
import { setupSender } from "@near-wallet-selector/sender";
import { setupBitgetWallet } from "@near-wallet-selector/bitget-wallet";
import { setupXDEFI } from "@near-wallet-selector/xdefi";
import { setupMathWallet } from "@near-wallet-selector/math-wallet";
import { setupNightly } from "@near-wallet-selector/nightly";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupNarwallets } from "@near-wallet-selector/narwallets";
import { setupWelldoneWallet } from "@near-wallet-selector/welldone-wallet";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupCoin98Wallet } from "@near-wallet-selector/coin98-wallet";
import { setupNearFi } from "@near-wallet-selector/nearfi";
import { setupNearSnap } from "@near-wallet-selector/near-snap";
import { setupNeth } from "@near-wallet-selector/neth";
import { setupWalletConnect } from "@near-wallet-selector/wallet-connect";
import { Component } from "@angular/core";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupRamperWallet } from "@near-wallet-selector/ramper-wallet";
import { setupLedger } from "@near-wallet-selector/ledger";
import { setupNearMobileWallet } from "@near-wallet-selector/near-mobile-wallet";
import { setupMintbaseWallet } from "@near-wallet-selector/mintbase-wallet";
import { setupBitteWallet } from "@near-wallet-selector/bitte-wallet";
import { setupOKXWallet } from "@near-wallet-selector/okx-wallet";
import { CONTRACT_ID } from "../../../constants";

declare global {
  interface Window {
    selector: WalletSelector;
    modal: WalletSelectorModal;
  }
}

@Component({
  selector: "near-wallet-selector-wallet-selector",
  templateUrl: "./wallet-selector.component.html",
  styleUrls: ["./wallet-selector.component.scss"],
})
export class WalletSelectorComponent implements OnInit {
  selector: WalletSelector;
  modal: WalletSelectorModal;
  accountId: string | null;
  accounts: Array<AccountState> = [];

  async ngOnInit() {
    await this.initialize().catch((err) => {
      console.error(err);
      alert("Failed to initialise wallet selector");
    });
  }

  async initialize() {
    const _selector = await setupWalletSelector({
      network: "testnet",
      debug: true,
      modules: [
        setupMyNearWallet(),
        setupLedger(),
        setupSender(),
        setupBitgetWallet(),
        setupXDEFI(),
        setupMathWallet(),
        setupNightly(),
        setupMeteorWallet(),
        setupOKXWallet(),
        setupNarwallets(),
        setupWelldoneWallet(),
        setupHereWallet(),
        setupCoin98Wallet(),
        setupNearFi(),
        setupNearSnap(),
        setupNeth({
          bundle: false,
        }),
        setupWalletConnect({
          projectId: "c8cb6204543639c31aef44ea4837a554", // Replace this with your own projectId form WalletConnect.
          // Overrides the default methods on wallet-connect.ts
          // the near_signMessage and near_verifyOwner are missing here.
          methods: [
            "near_signIn",
            "near_signOut",
            "near_getAccounts",
            "near_signTransaction",
            "near_signTransactions",
          ],
          metadata: {
            name: "NEAR Wallet Selector",
            description: "Example dApp used by NEAR Wallet Selector",
            url: "https://github.com/near/wallet-selector",
            icons: ["https://avatars.githubusercontent.com/u/37784886"],
          },
        }),
        setupRamperWallet(),
        setupNearMobileWallet(),
        setupMintbaseWallet({ contractId: CONTRACT_ID }),
        setupBitteWallet({ contractId: CONTRACT_ID }),
      ],
    });

    const _modal = setupModal(_selector, {
      contractId: CONTRACT_ID,
    });
    const state = _selector.store.getState();

    this.accounts = state.accounts;
    this.accountId =
      state.accounts.find((account) => account.active)?.accountId || null;

    window.selector = _selector;
    window.modal = _modal;

    this.selector = _selector;
    this.modal = _modal;
  }
}
