import React from "react";
import ReactDOM from "react-dom";

import WalletController from "../controllers/WalletController";
import { getState } from "../state/State";
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
  private walletController: WalletController;

  contract: Contract;

  constructor(options: Options) {
    const config = getConfig(options.networkId);

    this.options = options;

    this.emitter = new EventHandler();
    this.provider = new ProviderService(config.nodeUrl);
    this.walletController = new WalletController(
      options,
      this.emitter,
      this.provider
    );

    this.contract = new Contract(options.accountId, this.provider);
  }

  async init() {
    const state = getState();

    if (state.signedInWalletId) {
      await state.walletProviders[state.signedInWalletId].init();
    }

    this.renderModal();
  }

  renderModal() {
    const el = document.createElement("div");
    el.id = MODAL_ELEMENT_ID;
    document.body.appendChild(el);

    ReactDOM.render(
      <Modal
        options={this.options}
        wallets={this.walletController.getInstances()}
      />,
      document.getElementById(MODAL_ELEMENT_ID)
    );
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
