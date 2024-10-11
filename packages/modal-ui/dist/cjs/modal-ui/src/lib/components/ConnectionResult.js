"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionResult = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const core_1 = require("@near-wallet-selector/core");
const ConnectionErrorIcon_1 = require("./icons/ConnectionErrorIcon");
const ConnectionSuccessIcon_1 = require("./icons/ConnectionSuccessIcon");
const ConnectionResult = ({ module, message, err, onRetry, }) => {
    return ((0, jsx_runtime_1.jsx)("div", { className: "connection connecting-details", children: err ? ((0, jsx_runtime_1.jsxs)("div", { className: "error-wrapper", children: [(0, jsx_runtime_1.jsxs)("div", { className: "error", children: [(0, jsx_runtime_1.jsx)(ConnectionErrorIcon_1.ConnectionErrorIcon, {}), (0, core_1.translate)("modal.wallet.connectionFailed")] }), (0, jsx_runtime_1.jsx)("p", { children: message }), module?.metadata.available && ((0, jsx_runtime_1.jsx)("button", { onClick: onRetry, children: (0, core_1.translate)("modal.ledger.retry") }))] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "success", children: [(0, jsx_runtime_1.jsx)(ConnectionSuccessIcon_1.ConnectionSuccessIcon, {}), (0, core_1.translate)("modal.wallet.connectionSuccessful")] })) }));
};
exports.ConnectionResult = ConnectionResult;
