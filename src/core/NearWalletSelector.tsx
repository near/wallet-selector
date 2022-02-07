import React from "react";
import ReactDOM from "react-dom";

import Options from "../types/Options";
import WalletController from "../controllers/WalletController";
import { getState, updateState } from "../state/State";
import Contract from "./Contract";
import { MODAL_ELEMENT_ID } from "../constants";
import Modal from "../modal/Modal";
import EventHandler, { Emitter } from "../utils/EventsHandler";
import EventList from "../types/EventList";
import getConfig from "../config";
import ProviderService from "../services/provider/ProviderService";

export default class NearWalletSelector {
  private walletController: WalletController;
  private emitter: Emitter;
  private provider: ProviderService;

  contract: Contract;

  constructor(options: Options) {
    if (options) {
      updateState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          ...options,
        },
      }));
    }

    const state = getState();
    const config = getConfig(options.networkId);

    this.emitter = new EventHandler();
    this.provider = new ProviderService(config.nodeUrl);
    this.walletController = new WalletController(this.emitter, this.provider);

    this.contract = new Contract(options.accountId, this.provider);

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
    return this.walletController.signOut();
  }

  getAccount() {
    return this.walletController.getAccount();
  }

  on(event: EventList, callback: () => void) {
    this.emitter.on(event, callback);
  }
}
