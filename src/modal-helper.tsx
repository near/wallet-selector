import React from "react";
import ReactDOM from "react-dom";
import Modal from "./components/Modal/Modal";
import { MODAL_ELEMENT_ID } from "./constants";
import Options from "./types/Options";

const modalHelper = {
  createModal(options: Options, wallets: any) {
    const el = document.createElement("div");
    el.id = MODAL_ELEMENT_ID;
    document.body.appendChild(el);

    ReactDOM.render(
      <Modal options={options} wallets={wallets} />,
      document.getElementById(MODAL_ELEMENT_ID)
    );

    this.hideModal();
  },
  showModal() {
    this.hideLedgerDerivationPathModal();
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
    const ledgerDerivationPathModal: HTMLElement | null = modal.querySelector(
      ".Modal-choose-ledger-derivation-path"
    );
    if (ledgerDerivationPathModal)
      ledgerDerivationPathModal.style.display = "block";
  },
  hideLedgerDerivationPathModal() {
    const modal = document.getElementById(MODAL_ELEMENT_ID);
    if (!modal) return;
    const ledgerDerivationPathModal: HTMLElement | null = modal.querySelector(
      ".Modal-choose-ledger-derivation-path"
    );

    if (ledgerDerivationPathModal)
      ledgerDerivationPathModal.style.display = "none";
  },
  openSelectWalletOptionModal() {
    const modal = document.getElementById(MODAL_ELEMENT_ID);
    if (!modal) return;
    const selectWalletOptionModal: HTMLElement | null = modal.querySelector(
      ".Modal-select-wallet-option"
    );
    if (selectWalletOptionModal)
      selectWalletOptionModal.style.display = "block";
  },
  hideSelectWalletOptionModal() {
    const modal = document.getElementById(MODAL_ELEMENT_ID);
    if (!modal) return;
    const selectWalletOptionModal: HTMLElement | null = modal.querySelector(
      ".Modal-select-wallet-option"
    );
    if (selectWalletOptionModal) selectWalletOptionModal.style.display = "none";
  },
};

export default modalHelper;
