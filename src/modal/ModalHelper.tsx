import React from "react";
import ReactDOM from "react-dom";
import Modal from "./component/Modal/Modal";
import { MODAL_ELEMENT_ID } from "../constants";

const modalHelper = {
  createModal() {
    const el = document.createElement("div");
    el.id = MODAL_ELEMENT_ID;
    document.body.appendChild(el);

    ReactDOM.render(<Modal />, document.getElementById(MODAL_ELEMENT_ID));

    this.hideModal();
  },
  showModal() {
    this.hideLedgerDerivationPathModal();
    this.hideSenderWalletNotInstalledMessage();
    this.hideSwitchNetworkMessage();
    this.openSelectWalletOptionModal();
    const modal = document.getElementById(MODAL_ELEMENT_ID);
    if (modal) modal.style.display = "block";
  },
  hideModal() {
    const modal = document.getElementById(MODAL_ELEMENT_ID);
    if (modal) modal.style.display = "none";
  },
  openLedgerDerivationPathModal() {
    const modal = document.getElementById(MODAL_ELEMENT_ID);
    if (!modal) return;
    const ledgerDerivationPathModal: HTMLElement | null = modal.querySelector(".Modal-choose-ledger-derivation-path");
    if (ledgerDerivationPathModal) ledgerDerivationPathModal.style.display = "block";
  },
  hideLedgerDerivationPathModal() {
    const modal = document.getElementById(MODAL_ELEMENT_ID);
    if (!modal) return;
    const ledgerDerivationPathModal: HTMLElement | null = modal.querySelector(".Modal-choose-ledger-derivation-path");

    if (ledgerDerivationPathModal) ledgerDerivationPathModal.style.display = "none";
  },
  openSelectWalletOptionModal() {
    const modal = document.getElementById(MODAL_ELEMENT_ID);
    if (!modal) return;
    const selectWalletOptionModal: HTMLElement | null = modal.querySelector(".Modal-select-wallet-option");
    if (selectWalletOptionModal) selectWalletOptionModal.style.display = "block";
  },
  hideSelectWalletOptionModal() {
    const modal = document.getElementById(MODAL_ELEMENT_ID);
    if (!modal) return;
    const selectWalletOptionModal: HTMLElement | null = modal.querySelector(".Modal-select-wallet-option");
    if (selectWalletOptionModal) selectWalletOptionModal.style.display = "none";
  },

  openSenderWalletNotInstalledMessage() {
    const modal = document.getElementById(MODAL_ELEMENT_ID);
    if (!modal) return;
    const senderWalletNotInstalled: HTMLElement | null = modal.querySelector(".Modal-wallet-not-installed");
    if (senderWalletNotInstalled) senderWalletNotInstalled.style.display = "block";
  },

  hideSenderWalletNotInstalledMessage() {
    const modal = document.getElementById(MODAL_ELEMENT_ID);
    if (!modal) return;
    const senderWalletNotInstalled: HTMLElement | null = modal.querySelector(".Modal-wallet-not-installed");
    if (senderWalletNotInstalled) senderWalletNotInstalled.style.display = "none";
  },

  openSwitchNetworkMessage() {
    const modal = document.getElementById(MODAL_ELEMENT_ID);
    if (!modal) return;
    const switchNetworkMessage: HTMLElement | null = modal.querySelector(".Modal-switch-network-message");
    if (switchNetworkMessage) switchNetworkMessage.style.display = "block";
  },

  hideSwitchNetworkMessage() {
    const modal = document.getElementById(MODAL_ELEMENT_ID);
    if (!modal) return;
    const switchNetworkMessage: HTMLElement | null = modal.querySelector(".Modal-switch-network-message");
    if (switchNetworkMessage) switchNetworkMessage.style.display = "none";
  },
};

export default modalHelper;
