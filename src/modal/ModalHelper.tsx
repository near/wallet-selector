import { MODAL_ELEMENT_ID } from "../constants";

const modalHelper = {
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
