import { ModuleState, Wallet } from "@near-wallet-selector/core";
import { translate } from "@near-wallet-selector/core";

import { connectToWallet } from "../render-modal";
import copy from "copy-to-clipboard";
import * as QRCode from "qrcode";

export async function renderScanQRCode(
  module: ModuleState<Wallet>,
  params: { uri: string; handleOpenDefaultModal: () => void }
) {
  async function formatQRCodeImage(data: string) {
    const dataString = await QRCode.toString(data, { margin: 0, type: "svg" });
    return dataString;
  }

  const svg = await formatQRCodeImage(params.uri);

  document.querySelector(".modal-right")!.innerHTML = `
      <section class="scan-qr-code">
        <div class="nws-modal-header">
          <h3 class="middleTitle">${translate(
            "modal.qr.scanWithYourMobile"
          )}</h3>
          <button class="close-button">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#C1C1C1">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              </svg>
          </button>
        </div>
        <section class="qr-code">
          <div>
              ${svg}
          </div>
          <div class="notification" id="uri-copy-notification"></div>
          <div class="copy-btn" id="copy-uri-to-clipboard">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 15.25a1.75 1.75 0 0 1-1.75-1.75V6.75a2 2 0 0 1 2-2h6.75c.966 0 1.75.784 1.75 1.75"
                  stroke="#4F7CD1"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M8.75 10.75a2 2 0 0 1 2-2h6.5a2 2 0 0 1 2 2v6.5a2 2 0 0 1-2 2h-6.5a2 2 0 0 1-2-2v-6.5Z"
                  stroke="#4F7CD1"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              ${translate("modal.qr.copyToClipboard")}
            </div>
      </section>
      <footer class="footer">
        <p>${translate("modal.qr.preferTheOfficial")}</p>
        <button class="btn" id="default-modal-trigger">${translate(
          "modal.qr.open"
        )}</button>
      </footer>
    </section>
  `;

  document.getElementById("continue-button")?.addEventListener("click", () => {
    connectToWallet(module, false);
  });

  const copyBtnElement = document.getElementById("copy-uri-to-clipboard");
  const notificationElement = document.getElementById("uri-copy-notification");

  const showURICopyNotification = (message: string) => {
    if (notificationElement && copyBtnElement) {
      notificationElement.innerHTML = message;
      notificationElement.style.display = "block";
      copyBtnElement.style.display = "none";
    }
  };

  const hideNotification = () => {
    if (notificationElement && copyBtnElement) {
      copyBtnElement.style.display = "flex";
      notificationElement.style.display = "none";
    }
  };

  document
    .getElementById("copy-uri-to-clipboard")
    ?.addEventListener("click", () => {
      if (!params.uri) {
        return;
      }
      const success = copy(params.uri);
      if (success) {
        showURICopyNotification(translate("modal.qr.copiedToClipboard"));
        setTimeout(() => hideNotification(), 1200);
      } else {
        showURICopyNotification(translate("modal.qr.failedToCopy"));
        setTimeout(() => hideNotification(), 1200);
      }
    });

  document
    .getElementById("default-modal-trigger")
    ?.addEventListener("click", () => {
      params.handleOpenDefaultModal();
    });
}
