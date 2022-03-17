import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import NearWalletSelector, { AccountInfo, Subscription } from "near-wallet-selector"
import { utils } from "near-api-js";
import { Message } from "../../interfaces/message";
import { Sumbitted } from '../form/form.component';

const { parseNearAmount } = utils.format;

const SUGGESTED_DONATION = "0";
const BOATLOAD_OF_GAS = parseNearAmount("0.00000000003");

@Component({
  selector: 'near-wallet-selector-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {
  @Input() selector: NearWalletSelector;
  account: AccountInfo | null;
  messages: Array<Message>;
  subscriptions: Record<string, Subscription> = {};

  async ngOnInit() {
    const [ messages, account ] = await Promise.all([
      this.getMessages(),
      this.selector.getAccount(),
    ]);

    this.account = account;
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

  getMessages() {
    return this.selector.contract.view<Array<Message>>({
      methodName: "getMessages",
    });
  };

  subscribeToEvents() {
    this.subscriptions['signIn'] = this.selector.on("signIn", () => {
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

    this.subscriptions['signOut'] = this.selector.on("signOut", () => {
      console.log("'signOut' event triggered!");
      this.account = null;
    })
  }

  onSubmit(e: Sumbitted) {
    const { fieldset, message, donation } = e.target.elements;

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
          gas: BOATLOAD_OF_GAS as string,
          deposit: utils.format.parseNearAmount(donation.value || "0") as string
        }
      }]
    })
      .catch((err) => {
        alert("Failed to add message");
        console.log("Failed to add message");
        throw err;
      })
      .then(() => {
        return this.getMessages()
          .then((nextMessages) => {
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
    for (const key in this.subscriptions) {
      const subscription = this.subscriptions[key];

      subscription.remove();
    }
  }

}
