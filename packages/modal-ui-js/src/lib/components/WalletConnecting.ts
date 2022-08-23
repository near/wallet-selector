import { Wallet } from "@near-wallet-selector/core";
import { modalState } from "../modal";

export function renderWalletConnecting(wallet: Wallet | null = null) {
  if (!modalState) {
    return;
  }

  document.querySelector(".modal-body")!.innerHTML = `
    <div class="connecting-wrapper">
      <div class="content">
          <div class="spinner" id="${wallet?.id}">
              <div class="icon"><img src="${wallet?.metadata.iconUrl}" alt=""></div>
          </div><span>Connecting...</span>
      </div>
      <div class="action-buttons"><button class="left-button">Back</button></div>
    </div>
  `;
}
