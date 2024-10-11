"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderConnectHardwareWallet = renderConnectHardwareWallet;
const modal_1 = require("../modal");
const render_modal_1 = require("../render-modal");
const SpecifyDerivationPath_1 = require("./SpecifyDerivationPath");
const core_1 = require("@near-wallet-selector/core");
const CloseIcon_1 = require("./icons/CloseIcon");
const LedgerDeviceIcon_1 = require("./icons/LedgerDeviceIcon");
function renderConnectHardwareWallet(module) {
    if (!modal_1.modalState) {
        return;
    }
    modal_1.modalState.derivationPath = modal_1.DEFAULT_DERIVATION_PATH;
    document.querySelector(".modal-right").innerHTML = `
    <div class="nws-modal-body">
      <div class="nws-modal-header-wrapper">
        <div class="nws-modal-header">
          <h3 class="middleTitle">
            ${(0, core_1.translate)("modal.ledger.connectWithLedger")}
          </h3>
          <button class="close-button">
          ${CloseIcon_1.CloseIcon}
          </button>
        </div>
      </div>
      <div class="derivation-path-wrapper">
        <div class="enter-derivation-path">
          <div class="ledger-image">
            ${LedgerDeviceIcon_1.LedgerDeviceIcon}
          </div>
          <div class="ledger-description">
            <p> ${(0, core_1.translate)("modal.ledger.makeSureYourLedger")} </p>
            <p class="specify-path" id="specify-derivation-path-button">${(0, core_1.translate)("modal.ledger.specifyHDPath")}</p>
          </div>
          <div class="action-buttons"><button class="middleButton" id="continue-button">${(0, core_1.translate)("modal.ledger.continue")}</button></div>
        </div>
      </div>
    </div>
  `;
    document.getElementById("continue-button")?.addEventListener("click", () => {
        (0, render_modal_1.connectToWallet)(module, false);
    });
    document
        .getElementById("specify-derivation-path-button")
        ?.addEventListener("click", () => {
        (0, SpecifyDerivationPath_1.renderSpecifyDerivationPath)(module);
    });
}
