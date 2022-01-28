import { MODAL_ELEMENT_ID } from "../constants";

const modalHelper = {
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

  removeSelectedItemClass(id: any) {
    const modal = document.getElementById(MODAL_ELEMENT_ID);
    if (!modal) return;
    const switchNetworkElement: HTMLElement | null = modal.querySelector(
      `#${id}`
    );
    const switchNetworkText: HTMLElement | null = modal.querySelector(
      ".selected-wallet-text"
    );
    if (switchNetworkElement)
      switchNetworkElement.classList.remove("selected-wallet");
    if (switchNetworkText) switchNetworkText.style.display = "none";
  },
};

export default modalHelper;
