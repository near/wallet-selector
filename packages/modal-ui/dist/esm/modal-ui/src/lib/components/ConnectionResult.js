import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { translate } from "@near-wallet-selector/core";
import { ConnectionErrorIcon } from "./icons/ConnectionErrorIcon";
import { ConnectionSuccessIcon } from "./icons/ConnectionSuccessIcon";
export const ConnectionResult = ({ module, message, err, onRetry, }) => {
    return (_jsx("div", { className: "connection connecting-details", children: err ? (_jsxs("div", { className: "error-wrapper", children: [_jsxs("div", { className: "error", children: [_jsx(ConnectionErrorIcon, {}), translate("modal.wallet.connectionFailed")] }), _jsx("p", { children: message }), module?.metadata.available && (_jsx("button", { onClick: onRetry, children: translate("modal.ledger.retry") }))] })) : (_jsxs("div", { className: "success", children: [_jsx(ConnectionSuccessIcon, {}), translate("modal.wallet.connectionSuccessful")] })) }));
};
