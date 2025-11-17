import type { ModuleState, Wallet } from "@near-wallet-selector/core";
import { translate } from "@near-wallet-selector/core";
import { CloseIcon } from "./icons/CloseIcon";

export async function renderWalletConnecting(
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
            <img src="${module?.metadata.iconUrl}" alt="${
    module?.metadata.name
  }">
          </div>
          <h3 class="connecting-name">${module?.metadata.name}</h3>
          <div class="connecting-message">
          <span>
          ${translate("modal.wallet.connectingMessage." + module?.type)}
          </span>
          </div>
          <div class="connecting-details">
            <div class="loading-dots">
              <div class="loading-dot"></div>
              <div class="loading-dot"></div>
              <div class="loading-dot"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
