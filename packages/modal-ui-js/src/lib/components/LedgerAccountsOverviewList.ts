import type { ModuleState, Wallet } from "@near-wallet-selector/core";
import type { HardwareWalletAccountState } from "../render-modal";
import { modalState } from "../modal";
import { renderLedgerSelectAccount } from "./LedgerSelectAccount";
import { renderWalletConnectionFailed } from "./WalletConnectionFailed";
import { translate } from "@near-wallet-selector/core";
import { BackArrowIcon } from "./icons/BackArrowIcon";
import { CloseIcon } from "./icons/CloseIcon";

export async function renderLedgerAccountsOverviewList(
  module: ModuleState<Wallet>,
  accounts: Array<HardwareWalletAccountState>,
  selectedAccounts: Array<HardwareWalletAccountState>
) {
  document.querySelector(".modal-right")!.innerHTML = `
    <div class="nws-modal-body">
    <div class="nws-modal-header-wrapper">
      <button class="back-button" id="back-button">
        ${BackArrowIcon}
      </button>
        <div class="nws-modal-header">
          <h3 class="middleTitle">
          ${translate("modal.ledger.connecting")} ${
    selectedAccounts.length
  } ${translate("modal.ledger.ofAccounts")}
          </h3>
    <button class="close-button">${CloseIcon}</button>
        </div>
      </div>
      <div class="derivation-path-wrapper">
        <div class="overview-wrapper">
          <p>
            ${translate("modal.ledger.overviewTheListOfAuthorized")}
          </p>
          <div class="accounts" id="accounts"></div>
          <div class="action-buttons">
            <button class="middleButton" id="finish-button">
              ${translate("modal.ledger.finish")}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  for (let i = 0; i < selectedAccounts.length; i++) {
    document.getElementById("accounts")?.insertAdjacentHTML(
      "beforeend",
      `
        <div>
          <div class="account">
            <span>${selectedAccounts[i].accountId}</span>
          </div>
        </div>
      `
    );
  }

  document.getElementById("back-button")?.addEventListener("click", () => {
    renderLedgerSelectAccount(module, accounts);
  });

  document
    .getElementById("finish-button")
    ?.addEventListener("click", async () => {
      try {
        if (!modalState) {
          return;
        }

        const wallet = await module.wallet();
        wallet.signIn({
          contractId: modalState.options.contractId,
          methodNames: modalState.options.methodNames,
          accounts: selectedAccounts,
        });

        modalState.container.children[0].classList.remove("open");
        modalState.emitter.emit("onHide", { hideReason: "wallet-navigation" });
      } catch (err) {
        await renderWalletConnectionFailed(module, err as Error);
      }
    });
}
