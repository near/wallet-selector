import Modal from "../components/Modal/Modal";
import Options from "../types/Options";
import Wallets from "../wallets";
import React from "react";
import ReactDOM from "react-dom";

export default class Core {
  private readonly MODAL_ID = "near-walletselector-modal";

  private options: Options = {
    wallets: ["nearwallet", "senderwallet", "ledgerwallet", "narwallet"],
    theme: "light",
    customWallets: {},
  };

  public wallets: Wallets;

  constructor(options?: Options) {
    if (options) {
      this.options = {
        ...this.options,
        ...options,
      };
    }

    this.wallets = new Wallets(
      this.options.wallets,
      this.options.customWallets
    );

    this.renderModal();
  }

  private renderModal() {
    const el = document.createElement("div");
    el.id = this.MODAL_ID;
    document.body.appendChild(el);

    ReactDOM.render(
      <Modal
        options={this.options}
        onClose={() => {}}
        wallets={this.wallets}
      />,
      document.getElementById(this.MODAL_ID)
    );

    this.hideModal();
  }

  public showModal() {
    const modal = document.getElementById(this.MODAL_ID);
    if (modal) modal.style.display = "block";
  }

  public hideModal() {
    const modal = document.getElementById(this.MODAL_ID);
    if (modal) modal.style.display = "none";
  }
}
