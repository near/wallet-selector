import type {
  InjectedWallet,
  ModuleState,
  BrowserWallet,
} from "@near-wallet-selector/core";
import { modalState } from "../modal";
import { renderWhatIsAWallet } from "./WhatIsAWallet";
import { translate } from "@near-wallet-selector/core";
import { BackArrowIcon } from "./icons/BackArrowIcon";
import { CloseIcon } from "./icons/CloseIcon";
import { QRIcon } from "./icons/QRIcon";
import { LinkIcon } from "./icons/LinkIcon";

function getWalletUrl(module: ModuleState) {
  if (!modalState) {
    return;
  }

  let url = "";

  if (module.type === "injected") {
    url = (module as ModuleState<InjectedWallet>).metadata.downloadUrl;
  }

  if (module.type === "browser") {
    url = (module as ModuleState<BrowserWallet>).metadata.walletUrl;
  }

  return url;
}

export async function renderGetAWallet() {
  if (!modalState) {
    return;
  }

  document.querySelector(".modal-right")!.innerHTML = `
    <div class="nws-modal-body">
      <div class="wallet-home-wrapper">
        <div class="nws-modal-header-wrapper">
        <button class="back-button" id="back-button">
          ${BackArrowIcon}
        </button>
          <div class="nws-modal-header">
            <h3 class="middleTitle -open">${translate(
              "modal.wallet.getAWallet"
            )}</h3>
            <button class="close-button">
              ${CloseIcon}
            </button>
          </div>
        </div>
        <div class="get-wallet-wrapper" id="wallets">

        </div>
      </div>
    </div>
  `;

  const filterByType = (item: { type: string }) => {
    return (
      item.type !== "bridge" &&
      item.type !== "hardware" &&
      item.type !== "instant-link"
    );
  };

  const filteredModules = modalState.modules.filter(filterByType);

  for (let i = 0; i < filteredModules.length; i++) {
    const qrIcon = ["nearfi", "here-wallet"].includes(filteredModules[i].id);
    const hereWalletType =
      filteredModules[i].id === "here-wallet" ? "mobile" : "";
    const walletUrl = getWalletUrl(filteredModules[i]);

    document.getElementById("wallets")?.insertAdjacentHTML(
      "beforeend",
      `
    <div tabindex="0" class="single-wallet-get ${filteredModules[i].id}" id="${
        filteredModules[i].id
      }">
      <div class="small-icon">
      ${
        qrIcon && walletUrl
          ? `${QRIcon}`
          : !qrIcon && walletUrl
          ? `${LinkIcon}`
          : ``
      }

      </div>
      <div class="icon">
      <img
          src="${filteredModules[i].metadata.iconUrl}"
          alt="${filteredModules[i].metadata.name}"></div>
      <div class="content">
        <div class="title">${filteredModules[i].metadata.name}</div>
        <div class="type">${translate(
          `modal.walletTypes.${hereWalletType || filteredModules[i].type}`
        )}</div>
      </div>
    </div>
`
    );
  }

  Array.from(document.querySelectorAll(".single-wallet-get")).forEach(
    (button) => {
      button.addEventListener("click", () => {
        if (!modalState) {
          return;
        }

        const module = modalState.modules.find((m) => m.id === button.id);

        if (!module) {
          return;
        }
        const walletUrl = getWalletUrl(module);

        if (walletUrl) {
          window.open(walletUrl, "_blank");
        }
      });
    }
  );

  document.getElementById("back-button")?.addEventListener("click", () => {
    renderWhatIsAWallet();
  });
}
