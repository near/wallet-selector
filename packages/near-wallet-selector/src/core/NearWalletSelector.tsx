import React from "react";
import ReactDOM from "react-dom";

import WalletController, {
  SignInParams,
} from "../controllers/WalletController";
import Modal from "../modal/Modal";
import EventHandler, { Emitter, EventList } from "../utils/EventsHandler";
import ProviderService from "../services/provider/ProviderService";
import { updateState } from "../state/State";
import { MODAL_ELEMENT_ID } from "../constants";
import { Options } from "../interfaces/Options";
import { Action } from "../wallets/actions";
import getConfig, { NetworkConfiguration } from "../config";

interface SignAndSendTransactionParams {
  signerId?: string;
  actions: Array<Action>;
}

export default class NearWalletSelector {
  private options: Options;
  private emitter: Emitter;
  private controller: WalletController;

  network: NetworkConfiguration

  constructor(options: Options) {
    const config = getConfig(options.networkId);
    const emitter = new EventHandler();
    const provider = new ProviderService(config.nodeUrl);
    const controller = new WalletController(options, provider, emitter);

    this.network = config;
    this.options = options;
    this.emitter = emitter;
    this.controller = controller;
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

  getContractId() {
    return this.options.contractId;
  }

  async signAndSendTransaction({
    signerId,
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
      receiverId: this.getContractId(),
      actions,
    });
  }
}
