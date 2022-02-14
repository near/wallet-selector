import React from "react";
import ReactDOM from "react-dom";

import WalletController from "../controllers/WalletController";
import Contract from "./Contract";
import { MODAL_ELEMENT_ID } from "../constants";
import Modal from "../modal/Modal";
import EventHandler, { Emitter, EventList } from "../utils/EventsHandler";
import getConfig from "../config";
import ProviderService from "../services/provider/ProviderService";
import { updateState } from "../state/State";

export type NetworkId =
  | "mainnet"
  | "testnet"
  | "betanet"
  | "ci-testnet"
  | "ci-betanet";

export interface Options {
  wallets: Array<string>;
  networkId: NetworkId;
  theme: "dark" | "light" | null;
  contractId: string;
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

    this.contract = new Contract(options, this.provider, this.controller);
  }

  private renderModal() {
    const el = document.createElement("div");
    el.id = MODAL_ELEMENT_ID;
    document.body.appendChild(el);

    ReactDOM.render(
      <Modal
        options={this.options}
        wallets={this.controller.getWallets()}
        // signIn={this.signIn.bind(this)}
      />,
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

  isSignedIn() {
    return this.controller.isSignedIn();
  }

  connect(walletId: string) {
    return this.controller
      .connect(walletId)
      .then(() => this.emitter.emit("connect"));
  }

  disconnect() {
    return this.controller
      .disconnect()
      .then(() => this.emitter.emit("disconnect"));
  }

  getAccount() {
    return this.controller.getAccount();
  }

  on(event: EventList, callback: () => void) {
    this.emitter.on(event, callback);
  }
}
