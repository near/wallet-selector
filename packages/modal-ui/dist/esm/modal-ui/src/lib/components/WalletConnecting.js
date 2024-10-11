import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from "react";
// import LoadingIcon from "../images/connecting-loader.png";
const loadingIcon = require("../images/connecting-loader.png");
import { ModalHeader } from "./ModalHeader";
import { translate } from "@near-wallet-selector/core";
export const WalletConnecting = ({ wallet, onCloseModal, }) => {
    return (_jsxs(Fragment, { children: [_jsx(ModalHeader, { title: "", onCloseModal: onCloseModal }), _jsx("div", { className: "connecting-wrapper", children: _jsxs("div", { className: "content", children: [_jsx("div", { className: "icon", children: _jsx("img", { src: wallet?.metadata.iconUrl, alt: wallet?.metadata.name }) }), _jsx("h3", { className: "connecting-name", children: wallet?.metadata.name }), _jsxs("div", { className: "connecting-details", children: [_jsx("div", { className: "spinner", children: _jsx("img", { src: loadingIcon, alt: "loading-icon" }) }), _jsxs("span", { children: [translate("modal.wallet.connectingTo"), " ", wallet?.metadata.name, "..."] })] }), _jsx("div", { className: "connecting-message", children: _jsx("span", { children: translate(`modal.wallet.connectingMessage.${wallet?.type}`) }) })] }) })] }));
};
