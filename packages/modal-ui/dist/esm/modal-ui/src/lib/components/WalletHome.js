import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { ModalHeader } from "./ModalHeader";
import { BackArrow } from "./BackArrow";
import { translate } from "@near-wallet-selector/core";
import { QRIcon } from "./icons/QRIcon";
import { LinkIcon } from "./icons/LinkIcon";
import { KeyIcon } from "./icons/KeyIcon";
import { FolderIcon } from "./icons/FolderIcon";
export const WalletHome = ({ selector, onCloseModal, }) => {
    const [modules, setModules] = useState([]);
    const [route, setRoute] = useState("WalletInfo");
    useEffect(() => {
        const subscription = selector.store.observable.subscribe((state) => {
            const filterByType = (item) => {
                return (item.type !== "bridge" &&
                    item.type !== "hardware" &&
                    item.type !== "instant-link");
            };
            const filteredModules = state.modules.filter(filterByType);
            setModules(filteredModules);
        });
        return () => subscription.unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const getWalletUrl = (module) => {
        let url = "";
        if (module.type === "injected") {
            url = module.metadata.downloadUrl;
        }
        if (module.type === "browser") {
            url = module.metadata.walletUrl;
        }
        return url;
    };
    return (_jsxs("div", { className: "wallet-home-wrapper", children: [_jsxs("div", { className: "nws-modal-header-wrapper", children: [route === "GetWallets" && (_jsx(BackArrow, { onClick: () => {
                            setRoute("WalletInfo");
                        } })), _jsx(ModalHeader, { title: route === "GetWallets"
                            ? translate("modal.wallet.getAWallet")
                            : translate("modal.wallet.whatIsAWallet"), onCloseModal: onCloseModal })] }), route === "GetWallets" && (_jsx("div", { className: "get-wallet-wrapper", children: modules.map((module) => {
                    const { iconUrl, name } = module.metadata;
                    const qrIcon = ["nearfi", "here-wallet"].includes(module.id);
                    const hereWalletType = module.id === "here-wallet" ? "mobile" : "";
                    const walletUrl = getWalletUrl(module);
                    return (_jsxs("div", { tabIndex: 0, className: `single-wallet-get ${module.id}`, onClick: () => {
                            if (walletUrl) {
                                window.open(walletUrl, "_blank");
                            }
                        }, children: [_jsxs("div", { className: "small-icon", children: [qrIcon && walletUrl && _jsx(QRIcon, {}), !qrIcon && walletUrl && _jsx(LinkIcon, {})] }), _jsx("div", { className: "icon", children: _jsx("img", { src: iconUrl, alt: name }) }), _jsxs("div", { className: "content", children: [_jsx("div", { className: "title", children: name }), _jsx("div", { className: "type", children: translate(`modal.walletTypes.${hereWalletType || module.type}`) })] })] }, module.id));
                }) })), route === "WalletInfo" && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "wallet-info-wrapper what-wallet-hide", children: [_jsxs("div", { className: "wallet-what", children: [_jsx("div", { className: "icon-side", children: _jsx(KeyIcon, {}) }), _jsxs("div", { className: "content-side", children: [_jsx("h3", { children: translate("modal.wallet.secureAndManage") }), _jsx("p", { children: translate("modal.wallet.safelyStore") })] })] }), _jsxs("div", { className: "wallet-what", children: [_jsx("div", { className: "icon-side", children: _jsx(FolderIcon, {}) }), _jsxs("div", { className: "content-side", children: [_jsx("h3", { children: translate("modal.wallet.logInToAny") }), _jsx("p", { children: translate("modal.wallet.noNeedToCreate") })] })] }), _jsx("div", { className: "button-spacing" }), _jsx("button", { className: "middleButton", onClick: () => {
                                    setRoute("GetWallets");
                                }, children: translate("modal.wallet.getAWallet") })] }), _jsxs("div", { className: "what-wallet-mobile", children: [_jsx("p", { children: translate("modal.wallet.useAWallet") }), _jsx("button", { className: "middleButton", onClick: () => {
                                    setRoute("GetWallets");
                                }, children: translate("modal.wallet.getAWallet") })] }), _jsx("div", { className: "lang-selector-wrapper", children: _jsxs("select", { className: "lang-selector", name: "lang", children: [_jsx("option", { value: "en", children: "English" }), _jsx("option", { value: "es", children: "Spanish" })] }) })] }))] }));
};
