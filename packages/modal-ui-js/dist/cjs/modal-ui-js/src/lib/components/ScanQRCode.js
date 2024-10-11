"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderScanQRCode = renderScanQRCode;
const core_1 = require("@near-wallet-selector/core");
const render_modal_1 = require("../render-modal");
const copy_to_clipboard_1 = __importDefault(require("copy-to-clipboard"));
const QRCode = __importStar(require("qrcode"));
const CloseIcon_1 = require("./icons/CloseIcon");
const CopyIcon_1 = require("./icons/CopyIcon");
async function renderScanQRCode(module, params) {
    async function formatQRCodeImage(data) {
        const dataString = await QRCode.toString(data, { margin: 0, type: "svg" });
        return dataString;
    }
    const svg = await formatQRCodeImage(params.uri);
    document.querySelector(".modal-right").innerHTML = `
      <div class="nws-modal-body">
        <section class="scan-qr-code">
          <div class="nws-modal-header">
            <h3 class="middleTitle">${(0, core_1.translate)("modal.qr.scanWithYourMobile")}</h3>
            <button class="close-button">
                ${CloseIcon_1.CloseIcon}
            </button>
          </div>
          <section class="qr-code">
            <div>
                ${svg}
            </div>
            <div class="notification" id="uri-copy-notification"></div>
            <div class="copy-btn" id="copy-uri-to-clipboard">
                ${CopyIcon_1.CopyIcon}
                ${(0, core_1.translate)("modal.qr.copyToClipboard")}
              </div>
        </section>
        <footer class="footer">
          <p>${(0, core_1.translate)("modal.qr.preferTheOfficial")} ${module.metadata.name}?</p>
          <button class="btn" id="default-modal-trigger">${(0, core_1.translate)("modal.qr.open")}</button>
        </footer>
      </section>
    </div>
`;
    document.getElementById("continue-button")?.addEventListener("click", () => {
        (0, render_modal_1.connectToWallet)(module, false);
    });
    const copyBtnElement = document.getElementById("copy-uri-to-clipboard");
    const notificationElement = document.getElementById("uri-copy-notification");
    const showURICopyNotification = (message) => {
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
        const success = (0, copy_to_clipboard_1.default)(params.uri);
        if (success) {
            showURICopyNotification((0, core_1.translate)("modal.qr.copiedToClipboard"));
            setTimeout(() => hideNotification(), 1200);
        }
        else {
            showURICopyNotification((0, core_1.translate)("modal.qr.failedToCopy"));
            setTimeout(() => hideNotification(), 1200);
        }
    });
    document
        .getElementById("default-modal-trigger")
        ?.addEventListener("click", () => {
        params.handleOpenDefaultModal();
    });
}
