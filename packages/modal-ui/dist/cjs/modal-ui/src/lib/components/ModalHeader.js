"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const CloseButton_1 = require("./CloseButton");
const ModalHeader = ({ title, onCloseModal, }) => {
    const additionalClasses = title === "Get a Wallet" ? " -open" : "";
    return ((0, jsx_runtime_1.jsxs)("div", { className: "nws-modal-header", children: [(0, jsx_runtime_1.jsx)("h3", { className: `middleTitle ${additionalClasses}`, children: title }), (0, jsx_runtime_1.jsx)(CloseButton_1.CloseButton, { onClick: onCloseModal })] }));
};
exports.ModalHeader = ModalHeader;
