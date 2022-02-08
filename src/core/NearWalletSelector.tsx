import React from "react";
import ReactDOM from "react-dom";

import WalletController from "../controllers/WalletController";
import Contract from "./Contract";
import { MODAL_ELEMENT_ID } from "../constants";
import Modal from "../modal/Modal";
import EventHandler, { Emitter, EventList } from "../utils/EventsHandler";
import getConfig from "../config";
import ProviderService from "../services/provider/ProviderService";
import { WalletInfo } from "../interfaces/IWallet";

export type NetworkId =
  | "mainnet"
  | "testnet"
  | "betanet"
  | "ci-testnet"
  | "ci-betanet";

export interface CustomWalletOptions {
  info: WalletInfo;
  onConnectFunction: () => void;
  onDisconnectFunction: () => void;
  isConnectedFunction: () => boolean;
}

export interface Options {
  wallets: Array<string>;
  networkId: NetworkId;
  customWallets: {
    [name: string]: CustomWalletOptions;
  };
  theme: "dark" | "light" | null;
  accountId: string;
  walletSelectorUI: {
    description: string;
    explanation: string;
  };
}

export default class NearWalletSelector {
  private options: Options;

  private emitter: Emitter;
  private provider: ProviderService;
  private controller: WalletController;

  contract: Contract;

  constructor(options: Options) {
    const config = getConfig(options.networkId);

    this.options = options;

    this.emitter = new EventHandler();
    this.provider = new ProviderService(config.nodeUrl);
    this.controller = new WalletController(options, this.provider);

    this.contract = new Contract(
      options.accountId,
      this.provider,
      this.controller
    );
  }

  private renderModal() {
    const el = document.createElement("div");
    el.id = MODAL_ELEMENT_ID;
    document.body.appendChild(el);

    ReactDOM.render(
      <Modal
        options={this.options}
        wallets={this.controller.getInstances()}
        signIn={this.signIn.bind(this)}
      />,
      document.getElementById(MODAL_ELEMENT_ID)
    );
  }

  async init() {
    await this.controller.init();

    this.renderModal();
  }

  showModal() {
    this.controller.showModal();
  }

  hideModal() {
    this.controller.hideModal();
  }

  isSignedIn() {
    return this.controller.isSignedIn();
  }

  signIn(walletId: string) {
    return this.controller
      .signIn(walletId)
      .then(() => this.emitter.emit("signIn"));
  }

  signOut() {
    return this.controller
      .signOut()
      .then(() => this.emitter.emit("disconnect"));
  }

  getAccount() {
    return this.controller.getAccount();
  }

  on(event: EventList, callback: () => void) {
    this.emitter.on(event, callback);
  }
}
