import React from "react";
import ReactDOM from "react-dom";

import WalletController, {
  SignInParams,
} from "../controllers/WalletController";
import Modal from "../modal/Modal";
import EventHandler, { Emitter, EventList } from "../utils/EventsHandler";
import ProviderService, {
  CallFunctionParams
} from "../services/provider/ProviderService";
import { updateState } from "../state/State";
import { MODAL_ELEMENT_ID } from "../constants";
import { Options } from "../interfaces/Options";
import { SignAndSendTransactionParams } from "../wallets/Wallet";

export default class NearWalletSelector {
  private options: Options;

  private emitter: Emitter;
  private controller: WalletController;
  private provider: ProviderService;

  constructor(options: Options) {
    const emitter = new EventHandler();
    const provider = new ProviderService(options);
    const controller = new WalletController(options, provider, emitter);

    this.options = options;
    this.emitter = emitter;
    this.controller = controller;
    this.provider = provider;
  }

  private renderModal() {
    const el = document.createElement("div");
    el.id = MODAL_ELEMENT_ID;
    document.body.appendChild(el);

    ReactDOM.render(
      <Modal options={this.options} wallets={this.controller.getWallets()} />,
      document.getElementById(MODAL_ELEMENT_ID)
    );
  }

  async init() {
    await this.controller.init();

    this.renderModal();
  }

  show() {
    updateState((prevState) => ({
      ...prevState,
      showModal: true,
      showWalletOptions: true,
      showLedgerDerivationPath: false,
      showSenderWalletNotInstalled: false,
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

  getAccountId() {
    return this.controller.getAccountId();
  }

  setAccountId(accountId: string) {
    return this.controller.setAccountId(accountId);
  }

  on(event: EventList, callback: () => void) {
    return this.emitter.on(event, callback);
  }

  off(event: EventList, callback: () => void) {
    this.emitter.off(event, callback);
  }

  async view<Response>({
    methodName,
    args,
    finality
  }: Omit<CallFunctionParams, "accountId">) {
    return this.provider.callFunction<Response>({
      accountId: this.options.contractId,
      methodName,
      args,
      finality
    });
  }

  async signAndSendTransaction({
    signerId,
    actions,
  }: Omit<SignAndSendTransactionParams, "receiverId">) {
    const wallet = this.controller.getSelectedWallet();

    if (!wallet) {
      throw new Error("Wallet not selected!");
    }

    return wallet.signAndSendTransaction({
      signerId,
      receiverId: this.options.contractId,
      actions,
    });
  }
}
