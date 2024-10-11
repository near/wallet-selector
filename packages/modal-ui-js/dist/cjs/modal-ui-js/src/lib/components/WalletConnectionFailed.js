"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderWalletConnectionFailed = renderWalletConnectionFailed;
const render_modal_1 = require("../render-modal");
const core_1 = require("@near-wallet-selector/core");
const CloseIcon_1 = require("./icons/CloseIcon");
const ConnectionErrorIcon_1 = require("./icons/ConnectionErrorIcon");
async function renderWalletConnectionFailed(module, err) {
    document.querySelector(".modal-right").innerHTML = `
    <div class="nws-modal-body">
      <div class="nws-modal-header">
        <h3 class="middleTitle"></h3>
        <button class="close-button">
          ${CloseIcon_1.CloseIcon}
        </button>
      </div>
      <div class="alert-message connecting-wrapper connecting-wrapper-err">
        <div class="content">
          <div class="icon"><img src="${module.metadata.iconUrl}" alt="${module.metadata.name}"></div>
          <h3 class="connecting-name">${module.metadata.name}</h3>
          <div class="connecting-details">
            <div class="connection">
              <div class="error-wrapper">
                <div class="error">
                    ${ConnectionErrorIcon_1.ConnectionErrorIcon}
                  ${(0, core_1.translate)("modal.wallet.connectionFailed")}
                </div>
                  <p>${err && err.message ? err.message : ""}</p>
                  ${!module?.metadata.deprecated && module?.metadata.available
        ? `<button id='retry-button'>${(0, core_1.translate)("modal.ledger.retry")}</button>`
        : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
    document.getElementById("retry-button")?.addEventListener("click", () => {
        (0, render_modal_1.connectToWallet)(module, false);
    });
}
