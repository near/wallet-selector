"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderLedgerAccountsOverviewList = renderLedgerAccountsOverviewList;
const modal_1 = require("../modal");
const LedgerSelectAccount_1 = require("./LedgerSelectAccount");
const WalletConnectionFailed_1 = require("./WalletConnectionFailed");
const core_1 = require("@near-wallet-selector/core");
const BackArrowIcon_1 = require("./icons/BackArrowIcon");
const CloseIcon_1 = require("./icons/CloseIcon");
async function renderLedgerAccountsOverviewList(module, accounts, selectedAccounts) {
    document.querySelector(".modal-right").innerHTML = `
    <div class="nws-modal-body">
    <div class="nws-modal-header-wrapper">
      <button class="back-button" id="back-button">
        ${BackArrowIcon_1.BackArrowIcon}
      </button>
        <div class="nws-modal-header">
          <h3 class="middleTitle">
          ${(0, core_1.translate)("modal.ledger.connecting")} ${selectedAccounts.length} ${(0, core_1.translate)("modal.ledger.ofAccounts")}
          </h3>
    <button class="close-button">${CloseIcon_1.CloseIcon}</button>
        </div>
      </div>
      <div class="derivation-path-wrapper">
        <div class="overview-wrapper">
          <p>
            ${(0, core_1.translate)("modal.ledger.overviewTheListOfAuthorized")}
          </p>
          <div class="accounts" id="accounts"></div>
          <div class="action-buttons">
            <button class="middleButton" id="finish-button">
              ${(0, core_1.translate)("modal.ledger.finish")}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
    for (let i = 0; i < selectedAccounts.length; i++) {
        document.getElementById("accounts")?.insertAdjacentHTML("beforeend", `
        <div>
          <div class="account">
            <span>${selectedAccounts[i].accountId}</span>
          </div>
        </div>
      `);
    }
    document.getElementById("back-button")?.addEventListener("click", () => {
        (0, LedgerSelectAccount_1.renderLedgerSelectAccount)(module, accounts);
    });
    document
        .getElementById("finish-button")
        ?.addEventListener("click", async () => {
        try {
            if (!modal_1.modalState) {
                return;
            }
            const wallet = await module.wallet();
            wallet.signIn({
                contractId: modal_1.modalState.options.contractId,
                methodNames: modal_1.modalState.options.methodNames,
                accounts: selectedAccounts,
            });
            modal_1.modalState.container.children[0].classList.remove("open");
            modal_1.modalState.emitter.emit("onHide", { hideReason: "wallet-navigation" });
        }
        catch (err) {
            await (0, WalletConnectionFailed_1.renderWalletConnectionFailed)(module, err);
        }
    });
}
