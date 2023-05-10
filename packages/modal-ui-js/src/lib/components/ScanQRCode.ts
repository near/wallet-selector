import type { ModuleState, Wallet } from "@near-wallet-selector/core";
import { translate } from "@near-wallet-selector/core";

import { connectToWallet } from "../render-modal";
import copy from "copy-to-clipboard";
import * as QRCode from "qrcode";
import { CloseIcon } from "./icons/CloseIcon";
import { CopyIcon } from "./icons/CopyIcon";

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
      <div class="nws-modal-body">
        <section class="scan-qr-code">
          <div class="nws-modal-header">
            <h3 class="middleTitle">${translate(
              "modal.qr.scanWithYourMobile"
            )}</h3>
            <button class="close-button">
                ${CloseIcon}
            </button>
          </div>
          <section class="qr-code">
            <div>
                ${svg}
            </div>
            <div class="notification" id="uri-copy-notification"></div>
            <div class="copy-btn" id="copy-uri-to-clipboard">
                ${CopyIcon}
                ${translate("modal.qr.copyToClipboard")}
              </div>
        </section>
        <footer class="footer">
          <p>${translate("modal.qr.preferTheOfficial")} ${
    module.metadata.name
  }?</p>
          <button class="btn" id="default-modal-trigger">${translate(
            "modal.qr.open"
          )}</button>
        </footer>
      </section>
    </div>
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
