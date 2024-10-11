"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertMessage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ConnectionResult_1 = require("./ConnectionResult");
const ModalHeader_1 = require("./ModalHeader");
const AlertMessage = ({ message, module, onBack, onCloseModal, }) => {
    return ((0, jsx_runtime_1.jsxs)(react_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ModalHeader_1.ModalHeader, { title: "", onCloseModal: onCloseModal }), (0, jsx_runtime_1.jsx)("div", { className: "alert-message connecting-wrapper connecting-wrapper-err", children: (0, jsx_runtime_1.jsxs)("div", { className: "content", children: [(0, jsx_runtime_1.jsx)("div", { className: "icon", children: (0, jsx_runtime_1.jsx)("img", { src: module?.metadata.iconUrl, alt: module?.metadata.name }) }), (0, jsx_runtime_1.jsx)("h3", { className: "connecting-name", children: module?.metadata.name }), (0, jsx_runtime_1.jsx)(ConnectionResult_1.ConnectionResult, { module: module, message: message, err: message !== null, onRetry: () => {
                                onBack(true);
                            } })] }) })] }));
};
exports.AlertMessage = AlertMessage;
