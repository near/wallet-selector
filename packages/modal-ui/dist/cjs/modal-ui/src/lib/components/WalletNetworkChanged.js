"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletNetworkChanged = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ModalHeader_1 = require("./ModalHeader");
const BackArrow_1 = require("./BackArrow");
const WalletNetworkChanged = ({ selector, onBack, onCloseModal, }) => {
    return ((0, jsx_runtime_1.jsxs)(react_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "nws-modal-header-wrapper", children: [(0, jsx_runtime_1.jsx)(BackArrow_1.BackArrow, { onClick: onBack }), (0, jsx_runtime_1.jsx)(ModalHeader_1.ModalHeader, { title: "You Must Change the Network", onCloseModal: onCloseModal })] }), (0, jsx_runtime_1.jsx)("div", { className: "switch-network-message-wrapper", children: (0, jsx_runtime_1.jsxs)("div", { className: "content", children: [(0, jsx_runtime_1.jsxs)("p", { children: ["We've detected that you need to change your wallet's network to", (0, jsx_runtime_1.jsx)("strong", { className: "network-id", children: ` ${selector.options.network.networkId}` }), " ", "for this dApp."] }), (0, jsx_runtime_1.jsx)("p", { children: "Some wallets may not support changing networks. If you can not change networks you may consider switching to another wallet." })] }) })] }));
};
exports.WalletNetworkChanged = WalletNetworkChanged;
