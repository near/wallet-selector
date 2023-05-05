import type { ModuleState, Wallet } from "@near-wallet-selector/core";
import { renderConnectHardwareWallet } from "./ConnectHardwareWallet";
import { translate } from "@near-wallet-selector/core";
import { BackArrowIcon } from "./icons/BackArrowIcon";
import { CloseIcon } from "./icons/CloseIcon";

export async function renderNoLedgerAccountsFound(module: ModuleState<Wallet>) {
  document.querySelector(".modal-right")!.innerHTML = `
    <div class="nws-modal-body">
      <div class="nws-modal-header-wrapper"><button class="back-button" id="back-button">${BackArrowIcon}</button>
        <div class="nws-modal-header">
          <h3 class="middleTitle">
            ${translate("modal.ledger.noAccountsFound")}
          </h3>
          <button class="close-button">${CloseIcon}</button>
        </div>
      </div>
      <div class="derivation-path-wrapper">
        <div class="no-accounts-found-wrapper">
          <p>
            ${translate("modal.ledger.cantFindAnyAccount")}
            <a href="https://testnet.mynearwallet.com/create" target="_blank">MyNearWallet</a>
            ${translate("modal.ledger.orConnectAnAnotherLedger")}
          </p>
        </div>
      </div>
    </div>
  `;

  document.getElementById("back-button")?.addEventListener("click", () => {
    renderConnectHardwareWallet(module);
  });
}
