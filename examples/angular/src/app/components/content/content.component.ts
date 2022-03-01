import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import NearWalletSelector from "near-wallet-selector";
import { AccountInfo } from "near-wallet-selector/lib/cjs/wallets/Wallet";
import { Subscription } from "near-wallet-selector/lib/esm/utils/EventsHandler";
import { utils } from "near-api-js";
import { Message } from "../../interfaces/message";

const { parseNearAmount } = utils.format;

const SUGGESTED_DONATION = "0";
const BOATLOAD_OF_GAS = parseNearAmount("0.00000000003");

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {
  @Input() selector: NearWalletSelector;
  account: AccountInfo;
  messages: Array<Message>;
  subscriptions: Record<string, Subscription> = {};

  constructor() { }

  async ngOnInit() {
    const [ messages, account ] = await Promise.all([
      this.selector.contract.view({methodName: "getMessages"}),
      this.selector.getAccount(),
    ]);

    this.account = account;
    // @ts-ignore
    this.messages = messages;

    this.subscribeToEvents();
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
    this.subscriptions.signIn = this.selector.on("signIn", () => {
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

    this.subscriptions.signOut = this.selector.on("signOut", () => {
      console.log("'signOut' event triggered!");
      this.account = null;
    })
  }

  onSubmit(e: SubmitEvent) {
    //@ts-ignore
    let { fieldset, message, donation } = e.target.elements;

    fieldset.disabled = true;

    // TODO: optimistically update page with new message,
    // update blockchain data in background
    // add uuid to each message, so we know which one is already known
    this.selector.contract.signAndSendTransaction({
      actions: [{
        type: "FunctionCall",
        params: {
          methodName: "addMessage",
          args: { text: message.value },
          gas: BOATLOAD_OF_GAS,
          deposit: utils.format.parseNearAmount(donation.value || "0")!
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
            message.value = "";
            donation.value = SUGGESTED_DONATION;
            fieldset.disabled = false;
            message.focus();
          })
          .catch((err) => {
            alert("Failed to refresh messages");
            console.log("Failed to refresh messages");
            throw err;
          });
      })
      .catch((err) => {
        console.error(err);

        fieldset.disabled = false;
      });
  }

  ngOnDestroy() {
    for (let key in this.subscriptions) {
      const subscription = this.subscriptions[key];

      subscription.remove();
    }
  }

}
