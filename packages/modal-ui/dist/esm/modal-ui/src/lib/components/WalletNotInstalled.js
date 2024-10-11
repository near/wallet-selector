import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from "react";
import { ModalHeader } from "./ModalHeader";
import { BackArrow } from "./BackArrow";
import { translate } from "@near-wallet-selector/core";
export const WalletNotInstalled = ({ module, onBack, onCloseModal, }) => {
    return (_jsxs(Fragment, { children: [_jsxs("div", { className: "nws-modal-header-wrapper", children: [_jsx(BackArrow, { onClick: onBack }), _jsx(ModalHeader, { title: "", onCloseModal: onCloseModal })] }), _jsxs("div", { className: "wallet-not-installed-wrapper", children: [_jsxs("div", { className: "wallet-data", children: [_jsx("div", { className: `wallet-icon-box ${module.id}`, children: _jsx("img", { src: module.metadata.iconUrl, alt: module.metadata.name }) }), _jsx("p", { children: module.metadata.name })] }), _jsxs("p", { children: [translate("modal.install.youllNeedToInstall"), " ", module.metadata.name, " ", translate("modal.install.toContinueAfterInstalling"), _jsxs("span", { className: "refresh-link", onClick: () => window.location.reload(), children: [" ", translate("modal.install.refreshThePage")] })] }), _jsx("div", { className: "action-buttons", children: _jsxs("button", { className: "middleButton", onClick: () => {
                                if (module.type !== "injected") {
                                    return;
                                }
                                window.open(module.metadata.downloadUrl, "_blank");
                            }, children: [translate("modal.install.open"), " ", module.metadata.name] }) })] })] }));
};
