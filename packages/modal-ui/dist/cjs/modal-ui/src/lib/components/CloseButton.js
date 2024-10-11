"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const CloseIcon_1 = require("./icons/CloseIcon");
const CloseButton = ({ onClick }) => {
    return ((0, jsx_runtime_1.jsx)("button", { onClick: onClick, className: "close-button", children: (0, jsx_runtime_1.jsx)(CloseIcon_1.CloseIcon, {}) }));
};
exports.CloseButton = CloseButton;
