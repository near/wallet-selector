"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderWalletNotInstalled = renderWalletNotInstalled;
const modal_1 = require("../modal");
const core_1 = require("@near-wallet-selector/core");
const WhatIsAWallet_1 = require("./WhatIsAWallet");
const BackArrowIcon_1 = require("./icons/BackArrowIcon");
const CloseIcon_1 = require("./icons/CloseIcon");
function renderWalletNotInstalled(module) {
    if (!modal_1.modalState) {
        return;
    }
    document.querySelector(".modal-right").innerHTML = `
    <div class="nws-modal-body">
      <div class="nws-modal-header-wrapper"><button class="back-button" id="back-button">${BackArrowIcon_1.BackArrowIcon}</button>
        <div class="nws-modal-header">
          <h3 class="middleTitle"></h3><button class="close-button">${CloseIcon_1.CloseIcon}</button>
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
          ${(0, core_1.translate)("modal.install.youllNeedToInstall")} ${module.metadata.name}
          ${(0, core_1.translate)("modal.install.toContinueAfterInstalling")}
          <span class="refresh-link" id="refresh-page-lint">&nbsp;
            ${(0, core_1.translate)("modal.install.refreshThePage")}
          </span>
        </p>
        <div class="action-buttons">
          <button class="middleButton" id="download-button">
            ${(0, core_1.translate)("modal.install.open")} ${module.metadata.name}
          </button>
        </div>
      </div>
    </div>
  `;
    document.getElementById("back-button")?.addEventListener("click", () => {
        (0, WhatIsAWallet_1.renderWhatIsAWallet)();
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
