import type { ModuleState, Wallet } from "@near-wallet-selector/core";
import { modalState } from "../modal";
import { translate } from "@near-wallet-selector/core";
import { renderWhatIsAWallet } from "./WhatIsAWallet";
import { BackArrowIcon } from "./icons/BackArrowIcon";
import { CloseIcon } from "./icons/CloseIcon";

export function renderWalletNotInstalled(
  module: ModuleState<Wallet> & {
    metadata: {
      downloadUrl?: string;
    };
  }
) {
  if (!modalState) {
    return;
  }

  document.querySelector(".modal-right")!.innerHTML = `
    <div class="nws-modal-body">
      <div class="nws-modal-header-wrapper"><button class="back-button" id="back-button">${BackArrowIcon}</button>
        <div class="nws-modal-header">
          <h3 class="middleTitle"></h3><button class="close-button">${CloseIcon}</button>
        </div>
      </div>
      <div class="wallet-not-installed-wrapper">
        <div class="wallet-data">
          <div class="wallet-icon-box"><img
              src="${module.metadata.iconUrl}" alt="${module.metadata.name}">
          </div>
          <p>
            ${module.metadata.name}
          </p>
        </div>
        <p>
          ${translate("modal.install.youllNeedToInstall")} ${
    module.metadata.name
  }
          ${translate("modal.install.toContinueAfterInstalling")}
          <span class="refresh-link" id="refresh-page-lint">&nbsp;
            ${translate("modal.install.refreshThePage")}
          </span>
        </p>
        <div class="action-buttons">
          <button class="middleButton" id="download-button">
            ${translate("modal.install.open")} ${module.metadata.name}
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById("back-button")?.addEventListener("click", () => {
    renderWhatIsAWallet();
  });

  document
    .getElementById("refresh-page-lint")
    ?.addEventListener("click", () => {
      window.location.reload();
    });

  document.getElementById("download-button")?.addEventListener("click", () => {
    if (module.type !== "injected") {
      return;
    }

    window.open(module.metadata.downloadUrl, "_blank");
  });
}
