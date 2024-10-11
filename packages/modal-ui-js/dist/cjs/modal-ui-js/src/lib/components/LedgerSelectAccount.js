"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderLedgerSelectAccount = renderLedgerSelectAccount;
const modal_1 = require("../modal");
const LedgerAccountsOverviewList_1 = require("./LedgerAccountsOverviewList");
const SpecifyDerivationPath_1 = require("./SpecifyDerivationPath");
const core_1 = require("@near-wallet-selector/core");
const BackArrowIcon_1 = require("./icons/BackArrowIcon");
const CloseIcon_1 = require("./icons/CloseIcon");
async function renderLedgerSelectAccount(module, accounts) {
    if (!modal_1.modalState) {
        return;
    }
    document.querySelector(".modal-right").innerHTML = `
    <div class="nws-modal-body">
      <div class="nws-modal-header-wrapper"><button class="back-button" id="back-button">${BackArrowIcon_1.BackArrowIcon}</button>
        <div class="nws-modal-header">
          <h3 class="middleTitle">${(0, core_1.translate)("modal.ledger.selectYourAccounts")}</h3>
            <button class="close-button">${CloseIcon_1.CloseIcon}</button>
        </div>
      </div>
      <div class="derivation-path-wrapper">
        <div class="choose-ledger-account-form-wrapper">
          <p>We found ${accounts.length} accounts on your device. Select the account(s) you wish to connect.</p>
          <div class="button-wrapper"><button id="change-derivation-path-button">HD.../${modal_1.modalState.derivationPath.slice(-2, -1)}</button></div>
          <form class="form">
            <div>
              <div class="nws-form-control">
                <div id="accounts"></div>
              <div class="action-buttons"><button class="middleButton" id="connect-button">Connect</button></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
    for (let i = 0; i < accounts.length; i++) {
        document.getElementById("accounts")?.insertAdjacentHTML("beforeend", `
      <div class="account">
        <input type="checkbox" id="${accounts[i].accountId}" name="account" value="${accounts[i].accountId}" ${i === 0 ? "checked" : ""}>
        <label for="${accounts[i].accountId}"> ${accounts[i].accountId}</label>
        <br>
      </div>
      `);
    }
    document
        .getElementById("change-derivation-path-button")
        ?.addEventListener("click", () => {
        (0, SpecifyDerivationPath_1.renderSpecifyDerivationPath)(module);
    });
    document.getElementById("connect-button")?.addEventListener("click", (e) => {
        e.preventDefault();
        const accountCheckStatuses = Array.from(document.querySelectorAll("input[name='account']")).map((el) => el.checked);
        const checkedAccounts = accounts.filter((_account, i) => accountCheckStatuses[i]);
        if (checkedAccounts.length < 1) {
            return;
        }
        (0, LedgerAccountsOverviewList_1.renderLedgerAccountsOverviewList)(module, accounts, checkedAccounts);
    });
}
