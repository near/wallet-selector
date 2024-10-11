"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderGetAWallet = renderGetAWallet;
const modal_1 = require("../modal");
const WhatIsAWallet_1 = require("./WhatIsAWallet");
const core_1 = require("@near-wallet-selector/core");
const BackArrowIcon_1 = require("./icons/BackArrowIcon");
const CloseIcon_1 = require("./icons/CloseIcon");
const QRIcon_1 = require("./icons/QRIcon");
const LinkIcon_1 = require("./icons/LinkIcon");
function getWalletUrl(module) {
    if (!modal_1.modalState) {
        return;
    }
    let url = "";
    if (module.type === "injected") {
        url = module.metadata.downloadUrl;
    }
    if (module.type === "browser") {
        url = module.metadata.walletUrl;
    }
    return url;
}
async function renderGetAWallet() {
    if (!modal_1.modalState) {
        return;
    }
    document.querySelector(".modal-right").innerHTML = `
    <div class="nws-modal-body">
      <div class="wallet-home-wrapper">
        <div class="nws-modal-header-wrapper">
        <button class="back-button" id="back-button">
          ${BackArrowIcon_1.BackArrowIcon}
        </button>
          <div class="nws-modal-header">
            <h3 class="middleTitle -open">${(0, core_1.translate)("modal.wallet.getAWallet")}</h3>
            <button class="close-button">
              ${CloseIcon_1.CloseIcon}
            </button>
          </div>
        </div>
        <div class="get-wallet-wrapper" id="wallets">

        </div>
      </div>
    </div>
  `;
    const filterByType = (item) => {
        return (item.type !== "bridge" &&
            item.type !== "hardware" &&
            item.type !== "instant-link");
    };
    const filteredModules = modal_1.modalState.modules.filter(filterByType);
    for (let i = 0; i < filteredModules.length; i++) {
        const qrIcon = ["nearfi", "here-wallet"].includes(filteredModules[i].id);
        const hereWalletType = filteredModules[i].id === "here-wallet" ? "mobile" : "";
        const walletUrl = getWalletUrl(filteredModules[i]);
        document.getElementById("wallets")?.insertAdjacentHTML("beforeend", `
    <div tabindex="0" class="single-wallet-get ${filteredModules[i].id}" id="${filteredModules[i].id}">
      <div class="small-icon">
      ${qrIcon && walletUrl
            ? `${QRIcon_1.QRIcon}`
            : !qrIcon && walletUrl
                ? `${LinkIcon_1.LinkIcon}`
                : ``}

      </div>
      <div class="icon">
      <img
          src="${filteredModules[i].metadata.iconUrl}"
          alt="${filteredModules[i].metadata.name}"></div>
      <div class="content">
        <div class="title">${filteredModules[i].metadata.name}</div>
        <div class="type">${(0, core_1.translate)(`modal.walletTypes.${hereWalletType || filteredModules[i].type}`)}</div>
      </div>
    </div>
`);
    }
    Array.from(document.querySelectorAll(".single-wallet-get")).forEach((button) => {
        button.addEventListener("click", () => {
            if (!modal_1.modalState) {
                return;
            }
            const module = modal_1.modalState.modules.find((m) => m.id === button.id);
            if (!module) {
                return;
            }
            const walletUrl = getWalletUrl(module);
            if (walletUrl) {
                window.open(walletUrl, "_blank");
            }
        });
    });
    document.getElementById("back-button")?.addEventListener("click", () => {
        (0, WhatIsAWallet_1.renderWhatIsAWallet)();
    });
}
