"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderNoLedgerAccountsFound = renderNoLedgerAccountsFound;
const ConnectHardwareWallet_1 = require("./ConnectHardwareWallet");
const core_1 = require("@near-wallet-selector/core");
const BackArrowIcon_1 = require("./icons/BackArrowIcon");
const CloseIcon_1 = require("./icons/CloseIcon");
async function renderNoLedgerAccountsFound(module) {
    document.querySelector(".modal-right").innerHTML = `
    <div class="nws-modal-body">
      <div class="nws-modal-header-wrapper"><button class="back-button" id="back-button">${BackArrowIcon_1.BackArrowIcon}</button>
        <div class="nws-modal-header">
          <h3 class="middleTitle">
            ${(0, core_1.translate)("modal.ledger.noAccountsFound")}
          </h3>
          <button class="close-button">${CloseIcon_1.CloseIcon}</button>
        </div>
      </div>
      <div class="derivation-path-wrapper">
        <div class="no-accounts-found-wrapper">
          <p>
            ${(0, core_1.translate)("modal.ledger.cantFindAnyAccount")}
            <a href="https://testnet.mynearwallet.com/create" target="_blank">MyNearWallet</a>
            ${(0, core_1.translate)("modal.ledger.orConnectAnAnotherLedger")}
          </p>
        </div>
      </div>
    </div>
  `;
    document.getElementById("back-button")?.addEventListener("click", () => {
        (0, ConnectHardwareWallet_1.renderConnectHardwareWallet)(module);
    });
}
