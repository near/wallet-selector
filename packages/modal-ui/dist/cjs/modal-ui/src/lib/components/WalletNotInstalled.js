"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletNotInstalled = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ModalHeader_1 = require("./ModalHeader");
const BackArrow_1 = require("./BackArrow");
const core_1 = require("@near-wallet-selector/core");
const WalletNotInstalled = ({ module, onBack, onCloseModal, }) => {
    return ((0, jsx_runtime_1.jsxs)(react_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "nws-modal-header-wrapper", children: [(0, jsx_runtime_1.jsx)(BackArrow_1.BackArrow, { onClick: onBack }), (0, jsx_runtime_1.jsx)(ModalHeader_1.ModalHeader, { title: "", onCloseModal: onCloseModal })] }), (0, jsx_runtime_1.jsxs)("div", { className: "wallet-not-installed-wrapper", children: [(0, jsx_runtime_1.jsxs)("div", { className: "wallet-data", children: [(0, jsx_runtime_1.jsx)("div", { className: `wallet-icon-box ${module.id}`, children: (0, jsx_runtime_1.jsx)("img", { src: module.metadata.iconUrl, alt: module.metadata.name }) }), (0, jsx_runtime_1.jsx)("p", { children: module.metadata.name })] }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, core_1.translate)("modal.install.youllNeedToInstall"), " ", module.metadata.name, " ", (0, core_1.translate)("modal.install.toContinueAfterInstalling"), (0, jsx_runtime_1.jsxs)("span", { className: "refresh-link", onClick: () => window.location.reload(), children: [" ", (0, core_1.translate)("modal.install.refreshThePage")] })] }), (0, jsx_runtime_1.jsx)("div", { className: "action-buttons", children: (0, jsx_runtime_1.jsxs)("button", { className: "middleButton", onClick: () => {
                                if (module.type !== "injected") {
                                    return;
                                }
                                window.open(module.metadata.downloadUrl, "_blank");
                            }, children: [(0, core_1.translate)("modal.install.open"), " ", module.metadata.name] }) })] })] }));
};
exports.WalletNotInstalled = WalletNotInstalled;
