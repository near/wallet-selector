import { ModuleState, Wallet } from "@near-wallet-selector/core";
import { modalState } from "../modal";

export function renderWalletNotInstalled(module: ModuleState<Wallet>) {
  if (!modalState) {
    return;
  }

  document.querySelector(".modal-body")!.innerHTML = `
    <div class="wallet-not-installed-wrapper">
      <div class="wallet-data">
        <div class="wallet-icon-box ${module.id}"><img src="${module.metadata.iconUrl}" alt="${module.metadata.name}"></div>
        <p>${module.metadata.name}</p>
      </div>
      <p>You'll need to install ${module.metadata.name} to continue. After installing<span class="refresh-link">&nbsp;refresh the
          page.</span></p>
      <div class="action-buttons"><button class="left-button">Back</button><button class="right-button">Open ${module.metadata.name}</button></div>
    </div>
  `;
}
