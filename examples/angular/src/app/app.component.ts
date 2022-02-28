import {Component, OnInit} from '@angular/core';
import NearWalletSelector from "near-wallet-selector";
import getConfig from "../config";
import {AccountInfo} from "near-wallet-selector/lib/cjs/wallets/Wallet";

import { utils } from "near-api-js";
import {NewMessage} from "./components/form/form.component";
const { parseNearAmount } = utils.format;

const SUGGESTED_DONATION = "0";
const BOATLOAD_OF_GAS = parseNearAmount("0.00000000003");

export interface Message {
  premium: boolean;
  sender: string;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  selector: NearWalletSelector;
  account: AccountInfo;
  messages: Message[];

  async ngOnInit() {
    await this.initialize();

    const [ messages, account ] = await Promise.all([
      this.selector.contract.view({methodName: "getMessages"}),
      this.selector.getAccount(),
    ]);

    this.account = account;
    // @ts-ignore
    this.messages = messages;

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

  onSubmit(newMessage: NewMessage) {
    console.log(newMessage)

    let { message, donation } = newMessage;

    // TODO: optimistically update page with new message,
    // update blockchain data in background
    // add uuid to each message, so we know which one is already known
    this.selector.contract.signAndSendTransaction({
      actions: [{
        type: "FunctionCall",
        params: {
          methodName: "addMessage",
          args: { text: message },
          gas: BOATLOAD_OF_GAS,
          deposit: utils.format.parseNearAmount(donation || "0")!
        }
      }]
    })
      .catch((err) => {
        alert("Failed to add message");
        console.log("Failed to add message");
        throw err;
      })
      .then(() => {
        return this.selector.contract
          .view({ methodName: "getMessages" })
          .then((nextMessages: Message[]) => {
            this.messages = nextMessages;
            message = "";
            donation = SUGGESTED_DONATION;
          })
          .catch((err) => {
            alert("Failed to refresh messages");
            console.log("Failed to refresh messages");
            throw err;
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
