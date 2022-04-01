import React from "react";
import ReactDOM from "react-dom";

import WalletController, { SignInParams } from "./WalletController";
import Modal from "./modal/Modal";
import { Action, Transaction, WalletEvents } from "./wallet";
import { Options } from "./Options";
import { NetworkConfiguration, resolveNetwork } from "./network";
import { updateState } from "./state";
import { Emitter, EventEmitter } from "./services";
import { MODAL_ELEMENT_ID } from "./constants";
import { Optional } from "./Optional";

interface SignAndSendTransactionParams {
  signerId?: string;
  receiverId?: string;
  actions: Array<Action>;
}

interface SignAndSendTransactionsParams {
  transactions: Array<Optional<Transaction, "signerId">>;
}

export default class NearWalletSelector {
  private options: Options;
  private emitter: Emitter<WalletEvents>;
  private controller: WalletController;

  network: NetworkConfiguration;

  static async init(options: Options) {
    const selector = new NearWalletSelector(options);

    await selector.controller.init();
    selector.renderModal();

    return selector;
  }

  private constructor(options: Options) {
    const network = resolveNetwork(options.network);
    const emitter = new EventEmitter<WalletEvents>();
    const controller = new WalletController(options, network, emitter);

    this.options = options;
    this.network = network;
    this.emitter = emitter;
    this.controller = controller;
  }

  private renderModal() {
    const el = document.createElement("div");
    el.id = MODAL_ELEMENT_ID;
    document.body.appendChild(el);

    ReactDOM.render(
      <Modal
        options={this.options}
        network={this.network}
        wallets={this.controller.getWallets()}
      />,
      document.getElementById(MODAL_ELEMENT_ID)
    );
  }

  show() {
    updateState((prevState) => ({
      ...prevState,
      showModal: true,
      showWalletOptions: true,
      showLedgerDerivationPath: false,
      showWalletNotInstalled: null,
      showSwitchNetwork: false,
    }));
  }

  hide() {
    updateState((prevState) => ({
      ...prevState,
      showModal: false,
    }));
  }

  signIn(params: SignInParams) {
    return this.controller.signIn(params);
  }

  signOut() {
    return this.controller.signOut();
  }

  isSignedIn() {
    return this.controller.isSignedIn();
  }

  getAccounts() {
    return this.controller.getAccounts();
  }

  on<EventName extends keyof WalletEvents>(
    eventName: EventName,
    callback: (event: WalletEvents[EventName]) => void
  ) {
    return this.emitter.on(eventName, callback);
  }

  off<EventName extends keyof WalletEvents>(
    eventName: EventName,
    callback: (event: WalletEvents[EventName]) => void
  ) {
    this.emitter.off(eventName, callback);
  }

  getContractId() {
    return this.options.contractId;
  }

  async signAndSendTransaction({
    signerId,
    receiverId,
    actions,
  }: SignAndSendTransactionParams) {
    const wallet = this.controller.getSelectedWallet();
    const accounts = await this.getAccounts();

    if (!wallet) {
      throw new Error("Wallet not selected");
    }

    if (!accounts.length) {
      throw new Error("No accounts available for signing");
    }

    if (signerId && !accounts.some((x) => x.accountId === signerId)) {
      throw new Error("Invalid signerId");
    }

    return wallet.signAndSendTransaction({
      signerId: signerId || accounts[0].accountId,
      receiverId: receiverId || this.getContractId(),
      actions,
    });
  }

  async signAndSendTransactions({
    transactions,
  }: SignAndSendTransactionsParams) {
    const wallet = this.controller.getSelectedWallet();
    const accounts = await this.getAccounts();

    if (!wallet) {
      throw new Error("Wallet not selected");
    }

    if (!accounts.length) {
      throw new Error("No accounts available for signing");
    }

    return wallet.signAndSendTransactions({
      transactions: transactions.map(({ signerId, receiverId, actions }) => {
        if (signerId && !accounts.some((x) => x.accountId === signerId)) {
          throw new Error("Invalid signerId");
        }

        return {
          signerId: signerId || accounts[0].accountId,
          receiverId,
          actions,
        };
      }),
    });
  }
}
