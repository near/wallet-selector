import type { ModuleState, Wallet } from "@near-wallet-selector/core";
import { translate } from "@near-wallet-selector/core";
import { CloseIcon } from "./icons/CloseIcon";
import { ConnectionSuccessIcon } from "./icons/ConnectionSuccessIcon";

export async function renderWalletAccount(
  module: ModuleState<Wallet> | null = null
) {
  document.querySelector(".modal-right")!.innerHTML = `
    <div class="nws-modal-body">
    <div class="nws-modal-header">
        <h3 class="middleTitle"></h3>
        <button class="close-button">
          ${CloseIcon}
        </button>
      </div>
      <div class="connecting-wrapper">
        <div class="content">
          <div class="icon">
            <div class="green-dot"></div>
            <img src="${module?.metadata.iconUrl}" alt="${
    module?.metadata.name
  }">
          </div>
          <h3 class="connecting-name">${module?.metadata.name}</h3>
          <div class="wallet-connected-success">
             ${ConnectionSuccessIcon}
            <span>
              ${translate("modal.wallet.connectionSuccessful")}
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
}
