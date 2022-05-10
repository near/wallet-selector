import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { providers, utils } from "near-api-js";
import { AccountView, CodeResult } from "near-api-js/lib/providers/provider";
import { WalletSelector, AccountState } from "@near-wallet-selector/core";

import { Message } from "../../interfaces/message";
import { Sumbitted } from "../form/form.component";
import { Account } from "../../interfaces/account";
import { distinctUntilChanged, map, Subscription } from "rxjs";

const SUGGESTED_DONATION = "0";
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const BOATLOAD_OF_GAS = utils.format.parseNearAmount("0.00000000003")!;

@Component({
  selector: "near-wallet-selector-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.scss"],
})
export class ContentComponent implements OnInit, OnDestroy {
  @Input() selector: WalletSelector;
  @Input() accounts: Array<AccountState>;
  @Input() accountId: string | null;

  account: Account | null;
  messages: Array<Message>;
  subscription?: Subscription;

  async ngOnInit() {
    const [messages, account] = await Promise.all([
      this.getMessages(),
      this.getAccount(),
    ]);

    this.account = account;
    this.messages = messages;

    this.subscribeToEvents();
  }

  async getAccount() {
    if (!this.accountId) {
      return null;
    }

    const { network } = this.selector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    return provider
      .query<AccountView>({
        request_type: "view_account",
        finality: "final",
        account_id: this.accountId,
      })
      .then((data) => ({
        ...data,
        account_id: this.accountId,
      }));
  }

  signIn() {
    // this.selector.show();
  }

  async signOut() {
    const wallet = await this.selector.wallet();

    wallet.disconnect().catch((err) => {
      console.log("Failed to disconnect");
      console.error(err);
    });
  }

  switchProvider() {
    // this.selector.show();
  }

  getMessages() {
    const { network, contractId } = this.selector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    return provider
      .query<CodeResult>({
        request_type: "call_function",
        account_id: contractId,
        method_name: "getMessages",
        args_base64: "",
        finality: "optimistic",
      })
      .then((res) => JSON.parse(Buffer.from(res.result).toString()));
  }

  switchAccount() {
    const currentIndex = this.accounts.findIndex(
      (x) => x.accountId === this.accountId
    );
    const nextIndex =
      currentIndex < this.accounts.length - 1 ? currentIndex + 1 : 0;

    const nextAccountId = this.accounts[nextIndex].accountId;

    this.accountId = nextAccountId;
    alert("Switched account to " + nextAccountId);

    this.account = null;
    this.getAccount().then((account) => {
      this.account = account;
    });
  }

  async onSendMultipleTransactions() {
    const { contractId } = this.selector.options;
    const wallet = await this.selector.wallet();

    wallet.signAndSendTransactions({
      transactions: [
        {
          // Deploy your own version of https://github.com/near-examples/rust-counter using Gitpod to get a valid receiverId.
          receiverId: "dev-1648806797290-14624341764914",
          actions: [
            {
              type: "FunctionCall",
              params: {
                methodName: "increment",
                args: {},
                gas: BOATLOAD_OF_GAS,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                deposit: utils.format.parseNearAmount("0")!,
              },
            },
          ],
        },
        {
          receiverId: contractId,
          actions: [
            {
              type: "FunctionCall",
              params: {
                methodName: "addMessage",
                args: { text: "Hello World!" },
                gas: BOATLOAD_OF_GAS,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                deposit: utils.format.parseNearAmount("0")!,
              },
            },
          ],
        },
      ],
    });
  }

  syncAccountState(
    currentAccountId: string | null,
    newAccounts: Array<AccountState>
  ) {
    if (!newAccounts.length) {
      localStorage.removeItem("accountId");
      this.accountId = null;
      this.accounts = [];

      return;
    }

    const validAccountId =
      currentAccountId &&
      newAccounts.some((x) => x.accountId === currentAccountId);
    const newAccountId = validAccountId
      ? currentAccountId
      : newAccounts[0].accountId;

    localStorage.setItem("accountId", newAccountId);
    this.accountId = newAccountId;
    this.accounts = newAccounts;
  }

  subscribeToEvents() {
    this.subscription = this.selector.store.observable
      .pipe(
        map((state) => state.accounts),
        distinctUntilChanged()
      )
      .subscribe((nextAccounts) => {
        console.log("Accounts Update", nextAccounts);

        const prevAccountId = this.accountId;

        this.syncAccountState(this.accountId, nextAccounts);

        if (prevAccountId !== this.accountId) {
          this.getAccount().then((account) => {
            this.account = account;
          });
        }
      });
  }

  async onSubmit(e: Sumbitted) {
    const { fieldset, message, donation } = e.target.elements;

    fieldset.disabled = true;

    // TODO: optimistically update page with new message,
    // update blockchain data in background
    // add uuid to each message, so we know which one is already known

    const wallet = await this.selector.wallet();

    wallet
      .signAndSendTransaction({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        signerId: this.accountId!,
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: "addMessage",
              args: { text: message.value },
              gas: BOATLOAD_OF_GAS as string,
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              deposit: utils.format.parseNearAmount(donation.value || "0")!,
            },
          },
        ],
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
    this.subscription?.unsubscribe();
  }
}
