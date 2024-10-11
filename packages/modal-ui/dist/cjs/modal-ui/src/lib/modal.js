"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupModal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("react-dom/client");
const Modal_1 = require("./components/Modal");
const core_1 = require("@near-wallet-selector/core");
const MODAL_ELEMENT_ID = "near-wallet-selector-modal";
let modalInstance = null;
let root = null;
/**
 * Initiates a modal instance
 * @param {WalletSelector} selector Selector
 * @param {ModalOptions} options Modal options
 * @returns {WalletSelectorModal} Returns a WalletSelectorModal object
 */
const setupModal = (selector, options) => {
    if (!root) {
        const body = document.body;
        const container = document.createElement("div");
        container.id = MODAL_ELEMENT_ID;
        body.appendChild(container);
        root = (0, client_1.createRoot)(container);
    }
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
    const render = (visible = false) => {
        root.render((0, jsx_runtime_1.jsx)(Modal_1.Modal, { selector: selector, options: options, visible: visible, hide: () => render(false), emitter: emitter }));
    };
    if (!modalInstance) {
        modalInstance = {
            show: () => {
                render(true);
            },
            hide: () => {
                render(false);
            },
            on: (eventName, callback) => {
                return emitter.on(eventName, callback);
            },
            off: (eventName, callback) => {
                emitter.off(eventName, callback);
            },
        };
    }
    return modalInstance;
};
exports.setupModal = setupModal;
