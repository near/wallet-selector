"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackArrow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const BackArrowIcon_1 = require("./icons/BackArrowIcon");
const BackArrow = ({ onClick }) => {
    return ((0, jsx_runtime_1.jsx)("button", { onClick: onClick, className: "back-button", children: (0, jsx_runtime_1.jsx)(BackArrowIcon_1.BackArrowIcon, {}) }));
};
exports.BackArrow = BackArrow;
