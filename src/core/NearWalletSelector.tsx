import React from "react";
import ReactDOM from "react-dom";

import Options from "../types/Options";
import WalletController from "../controllers/WalletController";
import { getState, updateState } from "../state/State";
import SmartContract from "../contracts/SmartContract";
import { MODAL_ELEMENT_ID } from "../constants";
import Modal from "../modal/Modal";
import EventHandler, { Emitter } from "../interfaces/EventsHandler";

export default class NearWalletSelector {
  private walletController: WalletController;
  private contract: SmartContract;
  private emitter: Emitter

  constructor(options?: Options) {
    if (options) {
      updateState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          ...options,
        },
      }));
    }
    this.emitter = new EventHandler()
    this.walletController = new WalletController(this.emitter);
    const state = getState();
    this.contract = new SmartContract(
      state.options.contract.address,
      state.options.contract.viewMethods,
      state.options.contract.changeMethods
    );

    if (state.signedInWalletId !== null) {
      state.walletProviders[state.signedInWalletId].init();
    }

    this.renderModal();
  }

  renderModal() {
    const el = document.createElement("div");
    el.id = MODAL_ELEMENT_ID;
    document.body.appendChild(el);

    ReactDOM.render(<Modal />, document.getElementById(MODAL_ELEMENT_ID));
  }

  getContract() {
    return this.contract;
  }

  showModal() {
    this.walletController.showModal();
  }

  hideModal() {
    this.walletController.hideModal();
  }

  isSignedIn() {
    return this.walletController.isSignedIn();
  }

  signOut() {
    this.walletController.signOut();
  }

  getAccount() {
    return this.walletController.getAccount();
  }

  on(event: any, callback: () => {}) {
    this.emitter.on(event, callback);
  }
}
