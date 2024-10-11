import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from "react";
import { CloseButton } from "./CloseButton";
import { translate } from "@near-wallet-selector/core";
import { ConnectionSuccessIcon } from "./icons/ConnectionSuccessIcon";
export const WalletConnected = ({ module, onCloseModal, }) => {
    return (_jsxs(Fragment, { children: [_jsxs("div", { className: "nws-modal-header", children: [_jsx("h3", { className: "middleTitle", children: `` }), _jsx(CloseButton, { onClick: onCloseModal })] }), _jsx("div", { className: "connecting-wrapper", children: _jsxs("div", { className: "content", children: [_jsxs("div", { className: "icon", children: [_jsx("div", { className: "green-dot" }), _jsx("img", { src: module?.metadata.iconUrl, alt: module?.metadata.name })] }), _jsx("h3", { className: "connecting-name", children: module?.metadata.name }), _jsxs("div", { className: "wallet-connected-success", children: [_jsx(ConnectionSuccessIcon, {}), _jsx("span", { children: translate("modal.wallet.connectionSuccessful") })] })] }) })] }));
};
