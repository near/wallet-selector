import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { providers, utils } from "near-api-js";
import type {
  AccountView,
  CodeResult,
} from "near-api-js/lib/providers/provider";
import type { WalletSelector, AccountState } from "@near-wallet-selector/core";

import type { Message } from "../../interfaces/message";
import type { Submitted } from "../form/form.component";
import type { Account } from "../../interfaces/account";
import { distinctUntilChanged, map, Subscription } from "rxjs";
import type { WalletSelectorModal } from "@near-wallet-selector/modal-ui";
import { CONTRACT_ID } from "../../../constants";
import { Transaction } from "@near-wallet-selector/core";

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
  @Input() modal: WalletSelectorModal;
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
    this.modal.show();
  }

  async signOut() {
    const wallet = await this.selector.wallet();

    wallet.signOut().catch((err) => {
      console.log("Failed to sign out");
      console.error(err);
    });
  }

  switchWallet() {
    this.modal.show();
  }

  getMessages() {
    const { network } = this.selector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    return provider
      .query<CodeResult>({
        request_type: "call_function",
        account_id: CONTRACT_ID,
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

    this.selector.setActiveAccount(nextAccountId);

    alert("Switched account to " + nextAccountId);
  }

  async onVerifyOwner() {
    const wallet = await this.selector.wallet();
    try {
      const owner = await wallet.verifyOwner({
        message: "test message for verification",
      });

      if (owner) {
        alert(`Signature for verification: ${JSON.stringify(owner)}`);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      alert(message);
    }
  }

  subscribeToEvents() {
    this.subscription = this.selector.store.observable
      .pipe(
        map((state) => state.accounts),
        distinctUntilChanged()
      )
      .subscribe((nextAccounts) => {
        console.log("Accounts Update", nextAccounts);

        this.accounts = nextAccounts;
        this.accountId =
          nextAccounts.find((account) => account.active)?.accountId || null;

        this.getAccount().then((account) => {
          this.account = account;
        });
      });
  }

  async addMessages(message: string, donation: string, multiple: boolean) {
    const { contract } = this.selector.store.getState();
    const wallet = await this.selector.wallet();

    if (!multiple) {
      return wallet
        .signAndSendTransaction({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          signerId: this.accountId!,
          actions: [
            {
              type: "FunctionCall",
              params: {
                methodName: "addMessage",
                args: { text: message },
                gas: BOATLOAD_OF_GAS,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                deposit: utils.format.parseNearAmount(donation)!,
              },
            },
          ],
        })
        .catch((err) => {
          alert("Failed to add message");
          console.log("Failed to add message");

          throw err;
        });
    }

    const transactions: Array<Transaction> = [];

    for (let i = 0; i < 2; i += 1) {
      transactions.push({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        signerId: this.accountId!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        receiverId: contract!.contractId,
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: "addMessage",
              args: {
                text: `${message} (${i + 1}/2)`,
              },
              gas: BOATLOAD_OF_GAS,
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              deposit: utils.format.parseNearAmount(donation)!,
            },
          },
        ],
      });
    }

    return wallet.signAndSendTransactions({ transactions }).catch((err) => {
      alert("Failed to add messages");
      console.log("Failed to add messages");

      throw err;
    });
  }

  async onSubmit(e: Submitted) {
    const { fieldset, message, donation, multiple } = e.target.elements;

    fieldset.disabled = true;

    this.addMessages(message.value, donation.value || "0", multiple.checked)
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
