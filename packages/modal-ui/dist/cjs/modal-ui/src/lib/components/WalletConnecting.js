"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletConnecting = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
// import LoadingIcon from "../images/connecting-loader.png";
const loadingIcon = require("../images/connecting-loader.png");
const ModalHeader_1 = require("./ModalHeader");
const core_1 = require("@near-wallet-selector/core");
const WalletConnecting = ({ wallet, onCloseModal, }) => {
    return ((0, jsx_runtime_1.jsxs)(react_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ModalHeader_1.ModalHeader, { title: "", onCloseModal: onCloseModal }), (0, jsx_runtime_1.jsx)("div", { className: "connecting-wrapper", children: (0, jsx_runtime_1.jsxs)("div", { className: "content", children: [(0, jsx_runtime_1.jsx)("div", { className: "icon", children: (0, jsx_runtime_1.jsx)("img", { src: wallet?.metadata.iconUrl, alt: wallet?.metadata.name }) }), (0, jsx_runtime_1.jsx)("h3", { className: "connecting-name", children: wallet?.metadata.name }), (0, jsx_runtime_1.jsxs)("div", { className: "connecting-details", children: [(0, jsx_runtime_1.jsx)("div", { className: "spinner", children: (0, jsx_runtime_1.jsx)("img", { src: loadingIcon, alt: "loading-icon" }) }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, core_1.translate)("modal.wallet.connectingTo"), " ", wallet?.metadata.name, "..."] })] }), (0, jsx_runtime_1.jsx)("div", { className: "connecting-message", children: (0, jsx_runtime_1.jsx)("span", { children: (0, core_1.translate)(`modal.wallet.connectingMessage.${wallet?.type}`) }) })] }) })] }));
};
exports.WalletConnecting = WalletConnecting;
