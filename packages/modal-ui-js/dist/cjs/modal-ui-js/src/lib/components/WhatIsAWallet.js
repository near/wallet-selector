"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderWhatIsAWallet = renderWhatIsAWallet;
const GetAWallet_1 = require("./GetAWallet");
const core_1 = require("@near-wallet-selector/core");
const CloseIcon_1 = require("./icons/CloseIcon");
const KeyIcon_1 = require("./icons/KeyIcon");
const FolderIcon_1 = require("./icons/FolderIcon");
async function renderWhatIsAWallet() {
    document.querySelector(".modal-right").innerHTML = `
    <div class="nws-modal-body">
      <div class="wallet-home-wrapper">
        <div class="nws-modal-header-wrapper">
          <div class="nws-modal-header">
            <h3 class="middleTitle">${(0, core_1.translate)("modal.wallet.whatIsAWallet")}</h3>
            <button class="close-button">
              ${CloseIcon_1.CloseIcon}
            </button>
          </div>
        </div>

        <div class="wallet-info-wrapper  what-wallet-hide">
          <div class="wallet-what">
            <div class="icon-side">
                ${KeyIcon_1.KeyIcon}
            </div>
            <div class="content-side">
              <h3>${(0, core_1.translate)("modal.wallet.secureAndManage")}</h3>
              <p>${(0, core_1.translate)("modal.wallet.safelyStore")}</p>
            </div>
          </div>

          <div class="wallet-what">
            <div class="icon-side">
              ${FolderIcon_1.FolderIcon}
            </div>
            <div class="content-side">
              <h3>${(0, core_1.translate)("modal.wallet.logInToAny")}</h3>
              <p>${(0, core_1.translate)("modal.wallet.noNeedToCreate")}</p>
            </div>
          </div>

            <div class="button-spacing"></div>
              <button class="middleButton" id="get-a-wallet-button">
                ${(0, core_1.translate)("modal.wallet.getAWallet")}
              </button>
        </div>

        <div class="what-wallet-mobile">
          <p>
            ${(0, core_1.translate)("modal.wallet.useAWallet")}
          </p>
          <button class="middleButton" id="get-a-wallet-button-mobile">
            ${(0, core_1.translate)("modal.wallet.getAWallet")}
          </button>
        </div>

        <div class="lang-selector-wrapper">
          <select class="lang-selector" name="lang">
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>
        </div>

      </div>
    </div>
  `;
    document
        .getElementById("get-a-wallet-button")
        ?.addEventListener("click", () => {
        (0, GetAWallet_1.renderGetAWallet)();
    });
    document
        .getElementById("get-a-wallet-button-mobile")
        ?.addEventListener("click", () => {
        (0, GetAWallet_1.renderGetAWallet)();
    });
}
