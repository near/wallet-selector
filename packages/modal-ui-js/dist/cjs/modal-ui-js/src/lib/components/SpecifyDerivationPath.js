"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderSpecifyDerivationPath = renderSpecifyDerivationPath;
const modal_1 = require("../modal");
const render_modal_1 = require("../render-modal");
const ConnectHardwareWallet_1 = require("./ConnectHardwareWallet");
const LedgerAccountsOverviewList_1 = require("./LedgerAccountsOverviewList");
const LedgerSelectAccount_1 = require("./LedgerSelectAccount");
const NoLedgerAccountsFound_1 = require("./NoLedgerAccountsFound");
const WalletConnecting_1 = require("./WalletConnecting");
const WalletConnectionFailed_1 = require("./WalletConnectionFailed");
const core_1 = require("@near-wallet-selector/core");
const CloseIcon_1 = require("./icons/CloseIcon");
const BackArrowIcon_1 = require("./icons/BackArrowIcon");
const UpArrowIcon_1 = require("./icons/UpArrowIcon");
const DownArrowIcon_1 = require("./icons/DownArrowIcon");
function renderSpecifyDerivationPath(module) {
    if (!modal_1.modalState) {
        return;
    }
    document.querySelector(".modal-right").innerHTML = `
    <div class="nws-modal-body">
      <div class="nws-modal-header-wrapper"><button class="back-button" id="back-button">${BackArrowIcon_1.BackArrowIcon}</button>
        <div class="nws-modal-header">
          <h3 class="middleTitle">
            ${(0, core_1.translate)("modal.ledger.specifyHDPath")}
          </h3>
          <button class="close-button">
            ${CloseIcon_1.CloseIcon}
          </button>
        </div>
      </div>
      <div class="derivation-path-wrapper">
        <div class="specify-path-wrapper">
          <div class="change-path-wrapper">
            <div class="display-path"><span>44'/397'/0'/0'/</span></div>
            <div class="change-path">
              <div class="path-value"><span id="derivation-path-index"></span></div>
              <div class="buttons-wrapper">
                <button id="increase-index-button">
                  ${UpArrowIcon_1.UpArrowIcon}
                </button>
                <button id="decrease-index-button">
                  ${DownArrowIcon_1.DownArrowIcon}
                </button>
              </div>
            </div>
          </div>
          <p class="path-description">
            ${(0, core_1.translate)("modal.ledger.enterYourPreferredHDPath")}
          </p>
          <p class="what-link">
            <a
              href="https://www.ledger.com/academy/crypto/what-are-hierarchical-deterministic-hd-wallets"
              target="_blank"
            >
              What's this?
            </a>
          </p>
          <div class="action-buttons">
            <button class="middleButton" id="scan-button">
            ${(0, core_1.translate)("modal.ledger.scan")}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
    const derivationPathIndexElement = document.getElementById("derivation-path-index");
    derivationPathIndexElement.innerText = modal_1.modalState.derivationPath.slice(-2, -1);
    document
        .getElementById("increase-index-button")
        ?.addEventListener("click", () => {
        if (!modal_1.modalState) {
            return;
        }
        const nextIndex = parseInt(derivationPathIndexElement.innerText) + 1;
        modal_1.modalState.derivationPath =
            modal_1.modalState.derivationPath.slice(0, -2) + nextIndex.toString() + "'";
        derivationPathIndexElement.innerText = nextIndex.toString();
    });
    document
        .getElementById("decrease-index-button")
        ?.addEventListener("click", () => {
        if (!modal_1.modalState) {
            return;
        }
        const nextIndex = parseInt(derivationPathIndexElement.innerText) - 1;
        modal_1.modalState.derivationPath =
            modal_1.modalState.derivationPath.slice(0, -2) + nextIndex.toString() + "'";
        if (nextIndex >= 0) {
            derivationPathIndexElement.innerText = nextIndex.toString();
        }
    });
    document.getElementById("back-button")?.addEventListener("click", () => {
        (0, ConnectHardwareWallet_1.renderConnectHardwareWallet)(module);
    });
    document
        .getElementById("scan-button")
        ?.addEventListener("click", async () => {
        try {
            const wallet = await module.wallet();
            (0, WalletConnecting_1.renderWalletConnecting)(module);
            const accounts = await (0, render_modal_1.resolveAccounts)(wallet);
            if (!accounts || accounts.length < 1) {
                return (0, NoLedgerAccountsFound_1.renderNoLedgerAccountsFound)(module);
            }
            if (accounts.length === 1) {
                (0, LedgerAccountsOverviewList_1.renderLedgerAccountsOverviewList)(module, accounts, accounts);
            }
            (0, LedgerSelectAccount_1.renderLedgerSelectAccount)(module, accounts);
        }
        catch (err) {
            await (0, WalletConnectionFailed_1.renderWalletConnectionFailed)(module, err);
        }
    });
}
