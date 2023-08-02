import type { ModuleState, Wallet } from "@near-wallet-selector/core";
import { modalState } from "../modal";
import { resolveAccounts } from "../render-modal";
import { renderConnectHardwareWallet } from "./ConnectHardwareWallet";
import { renderLedgerAccountsOverviewList } from "./LedgerAccountsOverviewList";
import { renderLedgerSelectAccount } from "./LedgerSelectAccount";
import { renderNoLedgerAccountsFound } from "./NoLedgerAccountsFound";
import { renderWalletConnecting } from "./WalletConnecting";
import { renderWalletConnectionFailed } from "./WalletConnectionFailed";
import { translate } from "@near-wallet-selector/core";
import { CloseIcon } from "./icons/CloseIcon";
import { BackArrowIcon } from "./icons/BackArrowIcon";
import { UpArrowIcon } from "./icons/UpArrowIcon";
import { DownArrowIcon } from "./icons/DownArrowIcon";

export function renderSpecifyDerivationPath(module: ModuleState<Wallet>) {
  if (!modalState) {
    return;
  }

  document.querySelector(".modal-right")!.innerHTML = `
    <div class="nws-modal-body">
      <div class="nws-modal-header-wrapper"><button class="back-button" id="back-button">${BackArrowIcon}</button>
        <div class="nws-modal-header">
          <h3 class="middleTitle">
            ${translate("modal.ledger.specifyHDPath")}
          </h3>
          <button class="close-button">
            ${CloseIcon}
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
                  ${UpArrowIcon}
                </button>
                <button id="decrease-index-button">
                  ${DownArrowIcon}
                </button>
              </div>
            </div>
          </div>
          <p class="path-description">
            ${translate("modal.ledger.enterYourPreferredHDPath")}
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
            ${translate("modal.ledger.scan")}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  const derivationPathIndexElement = document.getElementById(
    "derivation-path-index"
  )!;

  derivationPathIndexElement.innerText = modalState.derivationPath.slice(
    -2,
    -1
  );

  document
    .getElementById("increase-index-button")
    ?.addEventListener("click", () => {
      if (!modalState) {
        return;
      }

      const nextIndex = parseInt(derivationPathIndexElement!.innerText) + 1;
      modalState.derivationPath =
        modalState.derivationPath.slice(0, -2) + nextIndex.toString() + "'";
      derivationPathIndexElement.innerText = nextIndex.toString();
    });

  document
    .getElementById("decrease-index-button")
    ?.addEventListener("click", () => {
      if (!modalState) {
        return;
      }

      const nextIndex = parseInt(derivationPathIndexElement!.innerText) - 1;
      modalState.derivationPath =
        modalState.derivationPath.slice(0, -2) + nextIndex.toString() + "'";
      if (nextIndex >= 0) {
        derivationPathIndexElement.innerText = nextIndex.toString();
      }
    });

  document.getElementById("back-button")?.addEventListener("click", () => {
    renderConnectHardwareWallet(module);
  });

  document
    .getElementById("scan-button")
    ?.addEventListener("click", async () => {
      try {
        const wallet = await module.wallet();
        renderWalletConnecting(module);
        const accounts = await resolveAccounts(wallet);

        if (!accounts || accounts.length < 1) {
          return renderNoLedgerAccountsFound(module);
        }

        if (accounts.length === 1) {
          renderLedgerAccountsOverviewList(module, accounts, accounts);
        }

        renderLedgerSelectAccount(module, accounts);
      } catch (err) {
        await renderWalletConnectionFailed(module, err as Error);
      }
    });
}
