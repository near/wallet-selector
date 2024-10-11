"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupModal = exports.modalState = exports.DEFAULT_DERIVATION_PATH = void 0;
exports.updateModalState = updateModalState;
const render_modal_1 = require("./render-modal");
const WhatIsAWallet_1 = require("./components/WhatIsAWallet");
const WalletAccount_1 = require("./components/WalletAccount");
const core_1 = require("@near-wallet-selector/core");
const MODAL_ELEMENT_ID = "near-wallet-selector-modal";
exports.DEFAULT_DERIVATION_PATH = "44'/397'/0'/0'/1'";
let modalInstance = null;
exports.modalState = null;
function updateModalState(newModalState) {
    exports.modalState = newModalState;
}
if (typeof window !== "undefined") {
    const el = document.createElement("div");
    el.id = MODAL_ELEMENT_ID;
    document.body.appendChild(el);
}
/**
 * Initiates a modal instance
 * @param {WalletSelector} selector Selector
 * @param {ModalOptions} options Modal options
 * @returns {WalletSelectorModal} Returns a WalletSelectorModal object
 */
const setupModal = (selector, options) => {
    const emitter = new core_1.EventEmitter();
    selector.store.getState().modules.forEach(async (module) => {
        if ("topLevelInjected" in module.metadata) {
            if (!module.metadata.topLevelInjected) {
                return;
            }
            const wallet = await module.wallet();
            if (wallet.type !== "injected") {
                return;
            }
            await wallet.signIn({
                contractId: options.contractId,
                methodNames: options.methodNames,
            });
        }
    });
    exports.modalState = {
        container: document.getElementById(MODAL_ELEMENT_ID),
        selector,
        options,
        route: {
            name: "WalletOptions",
        },
        modules: [],
        derivationPath: exports.DEFAULT_DERIVATION_PATH,
        emitter,
    };
    exports.modalState.selector.store.observable.subscribe((state) => {
        if (!exports.modalState) {
            return;
        }
        if (selector.options.optimizeWalletOrder) {
            state.modules.sort((current, next) => {
                if (current.metadata.deprecated === next.metadata.deprecated) {
                    return 0;
                }
                return current.metadata.deprecated ? 1 : -1;
            });
            state.modules.sort((current, next) => {
                if (next.metadata.available === current.metadata.available) {
                    return 0;
                }
                return next.metadata.available ? 1 : -1;
            });
        }
        exports.modalState.modules = state.modules;
    });
    const close = (e) => {
        if (e.key === "Escape") {
            if (!exports.modalState) {
                return;
            }
            exports.modalState.container.children[0].classList.remove("open");
            exports.modalState.emitter.emit("onHide", { hideReason: "user-triggered" });
        }
    };
    window.addEventListener("keydown", close);
    (0, render_modal_1.renderModal)();
    if (!modalInstance) {
        modalInstance = {
            show: () => {
                if (!exports.modalState) {
                    return;
                }
                (0, core_1.allowOnlyLanguage)(exports.modalState.selector.options.languageCode);
                (0, render_modal_1.renderModal)();
                const selectedWalletId = exports.modalState.selector.store.getState().selectedWalletId;
                if (selectedWalletId) {
                    const module = exports.modalState.modules.find((m) => m.id === selectedWalletId);
                    (0, WalletAccount_1.renderWalletAccount)(module);
                }
                else {
                    (0, WhatIsAWallet_1.renderWhatIsAWallet)();
                }
                exports.modalState.container.children[0].classList.add("open");
            },
            hide: () => {
                if (!exports.modalState) {
                    return;
                }
                exports.modalState.container.children[0].classList.remove("open");
            },
            on: (eventName, callback) => {
                return exports.modalState.emitter.on(eventName, callback);
            },
            off: (eventName, callback) => {
                exports.modalState.emitter.off(eventName, callback);
            },
        };
    }
    return modalInstance;
};
exports.setupModal = setupModal;
