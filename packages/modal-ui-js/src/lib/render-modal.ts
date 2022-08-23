import { renderWalletOptions } from "./components/WalletOptions";
import { modalState } from "./modal";

export function renderModal() {
  if (!modalState) {
    return;
  }

  modalState.container.innerHTML = `
    <div class="nws-modal-wrapper">
      <div class="modal-overlay"></div>
      <div class="modal">
          <div class="modal-header">
            <h2>Connect Wallet</h2>
            <button id="close-button">Close</button>
          </div>
          <div class="modal-body">
            Wallets
          </div>
        </div>
    </div>
  `;

  switch (modalState.route.name) {
    case "AlertMessage":
      renderWalletOptions();
      break;
    case "DerivationPath":
      renderWalletOptions();
      break;
    case "WalletConnecting":
      renderWalletOptions();
      break;
    case "WalletNetworkChanged":
      renderWalletOptions();
      break;
    case "WalletNotInstalled":
      renderWalletOptions();
      break;
    case "WalletOptions":
      renderWalletOptions();
      break;
    default:
      throw new Error("Route name not matching");
  }

  document.getElementById("close-button")?.addEventListener("click", () => {
    if (!modalState) {
      return;
    }

    modalState.container.children[0].classList.remove("open");
  });
}
