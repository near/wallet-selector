"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletConnected = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const CloseButton_1 = require("./CloseButton");
const core_1 = require("@near-wallet-selector/core");
const ConnectionSuccessIcon_1 = require("./icons/ConnectionSuccessIcon");
const WalletConnected = ({ module, onCloseModal, }) => {
    return ((0, jsx_runtime_1.jsxs)(react_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "nws-modal-header", children: [(0, jsx_runtime_1.jsx)("h3", { className: "middleTitle", children: `` }), (0, jsx_runtime_1.jsx)(CloseButton_1.CloseButton, { onClick: onCloseModal })] }), (0, jsx_runtime_1.jsx)("div", { className: "connecting-wrapper", children: (0, jsx_runtime_1.jsxs)("div", { className: "content", children: [(0, jsx_runtime_1.jsxs)("div", { className: "icon", children: [(0, jsx_runtime_1.jsx)("div", { className: "green-dot" }), (0, jsx_runtime_1.jsx)("img", { src: module?.metadata.iconUrl, alt: module?.metadata.name })] }), (0, jsx_runtime_1.jsx)("h3", { className: "connecting-name", children: module?.metadata.name }), (0, jsx_runtime_1.jsxs)("div", { className: "wallet-connected-success", children: [(0, jsx_runtime_1.jsx)(ConnectionSuccessIcon_1.ConnectionSuccessIcon, {}), (0, jsx_runtime_1.jsx)("span", { children: (0, core_1.translate)("modal.wallet.connectionSuccessful") })] })] }) })] }));
};
exports.WalletConnected = WalletConnected;
