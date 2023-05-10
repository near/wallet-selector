import type { ModuleState, Wallet } from "@near-wallet-selector/core";
import { DEFAULT_DERIVATION_PATH, modalState } from "../modal";
import { connectToWallet } from "../render-modal";
import { renderSpecifyDerivationPath } from "./SpecifyDerivationPath";
import { translate } from "@near-wallet-selector/core";
import { CloseIcon } from "./icons/CloseIcon";
import { LedgerDeviceIcon } from "./icons/LedgerDeviceIcon";

export function renderConnectHardwareWallet(module: ModuleState<Wallet>) {
  if (!modalState) {
    return;
  }

  modalState.derivationPath = DEFAULT_DERIVATION_PATH;

  document.querySelector(".modal-right")!.innerHTML = `
    <div class="nws-modal-body">
      <div class="nws-modal-header-wrapper">
        <div class="nws-modal-header">
          <h3 class="middleTitle">
            ${translate("modal.ledger.connectWithLedger")}
          </h3>
          <button class="close-button">
          ${CloseIcon}
          </button>
        </div>
      </div>
      <div class="derivation-path-wrapper">
        <div class="enter-derivation-path">
          <div class="ledger-image">
            ${LedgerDeviceIcon}
          </div>
          <div class="ledger-description">
            <p> ${translate("modal.ledger.makeSureYourLedger")} </p>
            <p class="specify-path" id="specify-derivation-path-button">${translate(
              "modal.ledger.specifyHDPath"
            )}</p>
          </div>
          <div class="action-buttons"><button class="middleButton" id="continue-button">${translate(
            "modal.ledger.continue"
          )}</button></div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("continue-button")?.addEventListener("click", () => {
    connectToWallet(module, false);
  });

  document
    .getElementById("specify-derivation-path-button")
    ?.addEventListener("click", () => {
      renderSpecifyDerivationPath(module);
    });
}
