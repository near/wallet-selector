import type { ModuleState, Wallet } from "@near-wallet-selector/core";
import { connectToWallet } from "../render-modal";
import { translate } from "@near-wallet-selector/core";
import { CloseIcon } from "./icons/CloseIcon";
import { ConnectionErrorIcon } from "./icons/ConnectionErrorIcon";

export async function renderWalletConnectionFailed(
  module: ModuleState<Wallet>,
  err: Error
) {
  document.querySelector(".modal-right")!.innerHTML = `
    <div class="nws-modal-body">
      <div class="nws-modal-header">
        <h3 class="middleTitle"></h3>
        <button class="close-button">
          ${CloseIcon}
        </button>
      </div>
      <div class="alert-message connecting-wrapper connecting-wrapper-err">
        <div class="content">
          <div class="icon"><img src="${module.metadata.iconUrl}" alt="${
    module.metadata.name
  }"></div>
          <h3 class="connecting-name">${module.metadata.name}</h3>
          <div class="connecting-details">
            <div class="connection">
              <div class="error-wrapper">
                <div class="error">
                    ${ConnectionErrorIcon}
                  ${translate("modal.wallet.connectionFailed")}
                </div>
                  <p>${err && err.message ? err.message : ""}</p>
                  ${
                    !module?.metadata.deprecated && module?.metadata.available
                      ? `<button id='retry-button'>${translate(
                          "modal.ledger.retry"
                        )}</button>`
                      : ""
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("retry-button")?.addEventListener("click", () => {
    connectToWallet(module, false);
  });
}
