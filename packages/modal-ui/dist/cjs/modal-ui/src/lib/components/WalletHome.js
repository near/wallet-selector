"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletHome = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ModalHeader_1 = require("./ModalHeader");
const BackArrow_1 = require("./BackArrow");
const core_1 = require("@near-wallet-selector/core");
const QRIcon_1 = require("./icons/QRIcon");
const LinkIcon_1 = require("./icons/LinkIcon");
const KeyIcon_1 = require("./icons/KeyIcon");
const FolderIcon_1 = require("./icons/FolderIcon");
const WalletHome = ({ selector, onCloseModal, }) => {
    const [modules, setModules] = (0, react_1.useState)([]);
    const [route, setRoute] = (0, react_1.useState)("WalletInfo");
    (0, react_1.useEffect)(() => {
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
    return ((0, jsx_runtime_1.jsxs)("div", { className: "wallet-home-wrapper", children: [(0, jsx_runtime_1.jsxs)("div", { className: "nws-modal-header-wrapper", children: [route === "GetWallets" && ((0, jsx_runtime_1.jsx)(BackArrow_1.BackArrow, { onClick: () => {
                            setRoute("WalletInfo");
                        } })), (0, jsx_runtime_1.jsx)(ModalHeader_1.ModalHeader, { title: route === "GetWallets"
                            ? (0, core_1.translate)("modal.wallet.getAWallet")
                            : (0, core_1.translate)("modal.wallet.whatIsAWallet"), onCloseModal: onCloseModal })] }), route === "GetWallets" && ((0, jsx_runtime_1.jsx)("div", { className: "get-wallet-wrapper", children: modules.map((module) => {
                    const { iconUrl, name } = module.metadata;
                    const qrIcon = ["nearfi", "here-wallet"].includes(module.id);
                    const hereWalletType = module.id === "here-wallet" ? "mobile" : "";
                    const walletUrl = getWalletUrl(module);
                    return ((0, jsx_runtime_1.jsxs)("div", { tabIndex: 0, className: `single-wallet-get ${module.id}`, onClick: () => {
                            if (walletUrl) {
                                window.open(walletUrl, "_blank");
                            }
                        }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "small-icon", children: [qrIcon && walletUrl && (0, jsx_runtime_1.jsx)(QRIcon_1.QRIcon, {}), !qrIcon && walletUrl && (0, jsx_runtime_1.jsx)(LinkIcon_1.LinkIcon, {})] }), (0, jsx_runtime_1.jsx)("div", { className: "icon", children: (0, jsx_runtime_1.jsx)("img", { src: iconUrl, alt: name }) }), (0, jsx_runtime_1.jsxs)("div", { className: "content", children: [(0, jsx_runtime_1.jsx)("div", { className: "title", children: name }), (0, jsx_runtime_1.jsx)("div", { className: "type", children: (0, core_1.translate)(`modal.walletTypes.${hereWalletType || module.type}`) })] })] }, module.id));
                }) })), route === "WalletInfo" && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "wallet-info-wrapper what-wallet-hide", children: [(0, jsx_runtime_1.jsxs)("div", { className: "wallet-what", children: [(0, jsx_runtime_1.jsx)("div", { className: "icon-side", children: (0, jsx_runtime_1.jsx)(KeyIcon_1.KeyIcon, {}) }), (0, jsx_runtime_1.jsxs)("div", { className: "content-side", children: [(0, jsx_runtime_1.jsx)("h3", { children: (0, core_1.translate)("modal.wallet.secureAndManage") }), (0, jsx_runtime_1.jsx)("p", { children: (0, core_1.translate)("modal.wallet.safelyStore") })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "wallet-what", children: [(0, jsx_runtime_1.jsx)("div", { className: "icon-side", children: (0, jsx_runtime_1.jsx)(FolderIcon_1.FolderIcon, {}) }), (0, jsx_runtime_1.jsxs)("div", { className: "content-side", children: [(0, jsx_runtime_1.jsx)("h3", { children: (0, core_1.translate)("modal.wallet.logInToAny") }), (0, jsx_runtime_1.jsx)("p", { children: (0, core_1.translate)("modal.wallet.noNeedToCreate") })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "button-spacing" }), (0, jsx_runtime_1.jsx)("button", { className: "middleButton", onClick: () => {
                                    setRoute("GetWallets");
                                }, children: (0, core_1.translate)("modal.wallet.getAWallet") })] }), (0, jsx_runtime_1.jsxs)("div", { className: "what-wallet-mobile", children: [(0, jsx_runtime_1.jsx)("p", { children: (0, core_1.translate)("modal.wallet.useAWallet") }), (0, jsx_runtime_1.jsx)("button", { className: "middleButton", onClick: () => {
                                    setRoute("GetWallets");
                                }, children: (0, core_1.translate)("modal.wallet.getAWallet") })] }), (0, jsx_runtime_1.jsx)("div", { className: "lang-selector-wrapper", children: (0, jsx_runtime_1.jsxs)("select", { className: "lang-selector", name: "lang", children: [(0, jsx_runtime_1.jsx)("option", { value: "en", children: "English" }), (0, jsx_runtime_1.jsx)("option", { value: "es", children: "Spanish" })] }) })] }))] }));
};
exports.WalletHome = WalletHome;
