"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderWalletAccount = renderWalletAccount;
const core_1 = require("@near-wallet-selector/core");
const CloseIcon_1 = require("./icons/CloseIcon");
const ConnectionSuccessIcon_1 = require("./icons/ConnectionSuccessIcon");
async function renderWalletAccount(module = null) {
    document.querySelector(".modal-right").innerHTML = `
    <div class="nws-modal-body">
    <div class="nws-modal-header">
        <h3 class="middleTitle"></h3>
        <button class="close-button">
          ${CloseIcon_1.CloseIcon}
        </button>
      </div>
      <div class="connecting-wrapper">
        <div class="content">
          <div class="icon">
            <div class="green-dot"></div>
            <img src="${module?.metadata.iconUrl}" alt="${module?.metadata.name}">
          </div>
          <h3 class="connecting-name">${module?.metadata.name}</h3>
          <div class="wallet-connected-success">
             ${ConnectionSuccessIcon_1.ConnectionSuccessIcon}
            <span>
              ${(0, core_1.translate)("modal.wallet.connectionSuccessful")}
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
}
