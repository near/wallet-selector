"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveAccounts = void 0;
exports.connectToWallet = connectToWallet;
exports.renderModal = renderModal;
const ConnectHardwareWallet_1 = require("./components/ConnectHardwareWallet");
const LedgerAccountsOverviewList_1 = require("./components/LedgerAccountsOverviewList");
const LedgerSelectAccount_1 = require("./components/LedgerSelectAccount");
const NoLedgerAccountsFound_1 = require("./components/NoLedgerAccountsFound");
const WalletConnecting_1 = require("./components/WalletConnecting");
const WalletConnectionFailed_1 = require("./components/WalletConnectionFailed");
const WalletNotInstalled_1 = require("./components/WalletNotInstalled");
const modal_1 = require("./modal");
const WalletAccount_1 = require("./components/WalletAccount");
const ScanQRCode_1 = require("./components/ScanQRCode");
const core_1 = require("@near-wallet-selector/core");
const WarningIcon_1 = require("./components/icons/WarningIcon");
let initialRender = true;
let isChecked = false;
const getAccountIds = async (publicKey) => {
    if (!modal_1.modalState) {
        return [];
    }
    const response = await fetch(`${modal_1.modalState.selector.options.network.indexerUrl}/publicKey/ed25519:${publicKey}/accounts`);
    if (!response.ok) {
        throw new Error("Failed to get account id from public key");
    }
    const accountIds = await response.json();
    if (!Array.isArray(accountIds) || !accountIds.length) {
        return [];
    }
    return accountIds;
};
const resolveAccounts = async (wallet) => {
    if (!modal_1.modalState) {
        return [];
    }
    const publicKey = await wallet.getPublicKey(modal_1.modalState.derivationPath);
    try {
        const accountIds = await getAccountIds(publicKey);
        return accountIds.map((accountId, index) => {
            return {
                derivationPath: modal_1.modalState.derivationPath,
                publicKey,
                accountId,
                selected: index === 0,
            };
        });
    }
    catch (e) {
        return null;
    }
};
exports.resolveAccounts = resolveAccounts;
async function connectToWallet(module, qrCodeModal = false) {
    if (!modal_1.modalState) {
        return;
    }
    const { selectedWalletId } = modal_1.modalState.selector.store.getState();
    if (selectedWalletId === module.id) {
        (0, WalletAccount_1.renderWalletAccount)(module);
        return;
    }
    try {
        if (module.type === "injected" && !module.metadata.available) {
            return (0, WalletNotInstalled_1.renderWalletNotInstalled)(module);
        }
        if (module.metadata.deprecated) {
            return (0, WalletConnectionFailed_1.renderWalletConnectionFailed)(module, new Error("Wallet is deprecated"));
        }
        const wallet = await module.wallet();
        await (0, WalletConnecting_1.renderWalletConnecting)(module);
        if (wallet.type === "hardware") {
            const accounts = await (0, exports.resolveAccounts)(wallet);
            if (!accounts || accounts.length < 1) {
                return (0, NoLedgerAccountsFound_1.renderNoLedgerAccountsFound)(module);
            }
            if (accounts.length === 1) {
                return (0, LedgerAccountsOverviewList_1.renderLedgerAccountsOverviewList)(module, accounts, accounts);
            }
            else {
                return (0, LedgerSelectAccount_1.renderLedgerSelectAccount)(module, accounts);
            }
        }
        if (wallet.type === "bridge") {
            const subscription = modal_1.modalState.selector.on("uriChanged", ({ uri }) => {
                (0, ScanQRCode_1.renderScanQRCode)(module, {
                    uri,
                    handleOpenDefaultModal: () => {
                        connectToWallet(module, true);
                    },
                });
            });
            await wallet.signIn({
                contractId: modal_1.modalState.options.contractId,
                methodNames: modal_1.modalState.options.methodNames,
                qrCodeModal,
            });
            subscription.remove();
            modal_1.modalState.container.children[0].classList.remove("open");
            modal_1.modalState.emitter.emit("onHide", { hideReason: "wallet-navigation" });
            return;
        }
        if (wallet.type === "browser") {
            await wallet.signIn({
                contractId: modal_1.modalState.options.contractId,
                methodNames: modal_1.modalState.options.methodNames,
                successUrl: wallet.metadata.successUrl,
                failureUrl: wallet.metadata.failureUrl,
            });
            modal_1.modalState.container.children[0].classList.remove("open");
            modal_1.modalState.emitter.emit("onHide", { hideReason: "wallet-navigation" });
            return;
        }
        await wallet.signIn({
            contractId: modal_1.modalState.options.contractId,
            methodNames: modal_1.modalState.options.methodNames,
        });
        modal_1.modalState.container.children[0].classList.remove("open");
        modal_1.modalState.emitter.emit("onHide", { hideReason: "wallet-navigation" });
    }
    catch (err) {
        const { name } = module.metadata;
        const message = err && typeof err === "object" && "message" in err
            ? err.message
            : "Something went wrong";
        await (0, WalletConnectionFailed_1.renderWalletConnectionFailed)(module, new Error(`Failed to sign in with ${name}: ${message}`));
    }
}
function renderOptionsList(parentClass, modules) {
    if (!modal_1.modalState) {
        return;
    }
    for (let i = 0; i < modules.length; i++) {
        const module = modules[i];
        if (modules[i].type === "instant-link" &&
            modal_1.modalState.selector.store.getState().selectedWalletId !== module.id) {
            continue;
        }
        const { name, description, iconUrl } = module.metadata;
        document.querySelector(parentClass)?.insertAdjacentHTML("beforeend", `
        <div tabindex="0" class="single-wallet ${module.id === modal_1.modalState.selector.store.getState().selectedWalletId
            ? "selected-wallet connected-wallet"
            : ""} sidebar ${module.metadata.deprecated ? "deprecated-wallet" : ""} ${module.id}" id="module-${module.id}">
          <div class="icon"><img src="${iconUrl}" alt="${name}"></div>
          <div class="content">
            <div class="title">${name}</div>
            <div class="description">${description}</div>
          </div>
          ${module.metadata.deprecated
            ? `
              <div class="warning-triangle">
                ${WarningIcon_1.WarningIcon}
              </div>
                `
            : ""}
        </div>
      `);
        document
            .getElementById("module-" + module.id)
            ?.addEventListener("click", () => {
            document.querySelectorAll(".selected-wallet").forEach((element) => {
                element.classList.remove("selected-wallet");
            });
            document
                .getElementById("module-" + module.id)
                ?.classList.add("selected-wallet");
            if (module.type === "hardware") {
                return (0, ConnectHardwareWallet_1.renderConnectHardwareWallet)(module);
            }
            connectToWallet(module, false);
        });
    }
}
const renderWalletOptions = () => {
    if (!modal_1.modalState) {
        return;
    }
    const moreWallets = [];
    const recentlySignedInWallets = [];
    modal_1.modalState.modules.forEach((module) => {
        if (modal_1.modalState?.selector.store
            .getState()
            .recentlySignedInWallets.includes(module.id)) {
            recentlySignedInWallets.push(module);
        }
        else {
            moreWallets.push(module);
        }
    });
    const optionsWrapper = document.querySelector(".wallet-options-wrapper");
    if (optionsWrapper) {
        optionsWrapper.innerHTML = "";
    }
    if (modal_1.modalState.selector.options.optimizeWalletOrder &&
        recentlySignedInWallets.length > 0) {
        optionsWrapper?.insertAdjacentHTML("beforeend", `
      <div class="options-list-section-recent">
        <div class="options-list-section-header">Recent</div>
        <div class="options-list recent-options-list-content"></div>
      </div>
      `);
        optionsWrapper?.insertAdjacentHTML("beforeend", `
      <div class="options-list-section-more">
        <div class="options-list-section-header">More</div>
        <div class="options-list more-options-list-content"></div>
      </div>
      `);
        renderOptionsList(".recent-options-list-content", recentlySignedInWallets);
        if (modal_1.modalState.selector.options.randomizeWalletOrder) {
            renderOptionsList(".more-options-list-content", moreWallets.sort(() => Math.random() - 0.5));
        }
        else {
            renderOptionsList(".more-options-list-content", moreWallets);
        }
    }
    else {
        optionsWrapper?.insertAdjacentHTML("beforeend", `<div class="options-list"></div>`);
        renderOptionsList(".options-list", modal_1.modalState.modules);
    }
};
const handleSwitchChange = () => {
    if (!modal_1.modalState) {
        return;
    }
    isChecked = !isChecked;
    modal_1.modalState.selector.setRememberRecentWallets();
    renderWalletOptions();
};
function renderModal() {
    if (!modal_1.modalState) {
        return;
    }
    const { rememberRecentWallets, selectedWalletId } = modal_1.modalState.selector.store.getState();
    isChecked = rememberRecentWallets === "enabled";
    modal_1.modalState.container.innerHTML = `
    <div class="nws-modal-wrapper ${modal_1.modalState.options.theme === "dark" ? "dark-theme" : ""}">
      <div class="nws-modal-overlay"></div>
      <div class="nws-modal">
        <div class="modal-left">
          <div class="modal-left-title">
            <h2>${(0, core_1.translate)("modal.wallet.connectYourWallet")}</h2>
            <span class="nws-remember-wallet">
              ${(0, core_1.translate)("modal.wallet.rememberWallet")}
            </span>
            <label class="nws-switch">
              <input type="checkbox" ${isChecked ? "checked" : ""} id="rememberWalletSwitch" />
              <span class="nws-slider round" />
            </label>
          </div>
          <div class="nws-modal-body">
            <div class="wallet-options-wrapper"></div>
          </div>
        </div>
        <div class="modal-right"></div>
      </div>
    </div>
  `;
    document
        .getElementById("rememberWalletSwitch")
        ?.addEventListener("change", handleSwitchChange);
    const moreWallets = [];
    const recentlySignedInWallets = [];
    modal_1.modalState.modules.forEach((module) => {
        if (modal_1.modalState?.selector.store
            .getState()
            .recentlySignedInWallets.includes(module.id)) {
            recentlySignedInWallets.push(module);
        }
        else {
            moreWallets.push(module);
        }
    });
    if (modal_1.modalState.selector.options.optimizeWalletOrder &&
        recentlySignedInWallets.length > 0) {
        document.querySelector(".wallet-options-wrapper")?.insertAdjacentHTML("beforeend", `
      <div class="options-list-section-recent">
        <div class="options-list-section-header">Recent</div>
        <div class="options-list recent-options-list-content"></div>
      </div>
      `);
        document.querySelector(".wallet-options-wrapper")?.insertAdjacentHTML("beforeend", `
      <div class="options-list-section-more">
        <div class="options-list-section-header">More</div>
        <div class="options-list more-options-list-content"></div>
      </div>
      `);
        renderOptionsList(".recent-options-list-content", recentlySignedInWallets);
        if (modal_1.modalState.selector.options.randomizeWalletOrder) {
            renderOptionsList(".more-options-list-content", moreWallets.sort(() => Math.random() - 0.5));
        }
        else {
            renderOptionsList(".more-options-list-content", moreWallets);
        }
        if (!selectedWalletId && recentlySignedInWallets.length > 0) {
            const firstWallet = recentlySignedInWallets[0];
            document
                .querySelector(`#module-${firstWallet.id}`)
                ?.classList.add("selected-wallet");
        }
    }
    else {
        document
            .querySelector(".wallet-options-wrapper")
            ?.insertAdjacentHTML("beforeend", `<div class="options-list"></div>`);
        renderOptionsList(".options-list", modal_1.modalState.modules);
    }
    document
        .querySelector(".nws-modal-overlay")
        ?.addEventListener("click", () => {
        if (!modal_1.modalState) {
            return;
        }
        modal_1.modalState.container.children[0].classList.remove("open");
        modal_1.modalState.emitter.emit("onHide", { hideReason: "user-triggered" });
    });
    // TODO: Better handle `click` event listener for close-button.
    if (initialRender) {
        document.addEventListener("click", (e) => {
            if (!modal_1.modalState) {
                return;
            }
            const target = e.target;
            if (target && target.className === "close-button") {
                modal_1.modalState.container.children[0].classList.remove("open");
                modal_1.modalState.emitter.emit("onHide", { hideReason: "user-triggered" });
            }
        });
        initialRender = false;
    }
}
