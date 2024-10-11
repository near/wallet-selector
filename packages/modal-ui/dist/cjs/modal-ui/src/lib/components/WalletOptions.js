"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletOptions = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const WarningIcon_1 = require("./icons/WarningIcon");
const WalletOptions = ({ selector, handleWalletClick, }) => {
    const [modules, setModules] = (0, react_1.useState)([]);
    const [recentModules, setRecentModules] = (0, react_1.useState)([]);
    const [moreModules, setMoreModules] = (0, react_1.useState)([]);
    const [activeWalletId, setActiveWalletId] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        const subscription = selector.store.observable.subscribe((state) => {
            const { selectedWalletId } = selector.store.getState();
            if (selectedWalletId) {
                setActiveWalletId(selectedWalletId);
            }
            const wallets = state.modules.filter((module) => !(module.type === "instant-link" && selectedWalletId !== module.id));
            if (selector.options.optimizeWalletOrder) {
                state.modules.sort((current, next) => {
                    if (current.metadata.deprecated === next.metadata.deprecated) {
                        return 0;
                    }
                    return current.metadata.deprecated ? 1 : -1;
                });
                state.modules.sort((current, next) => {
                    if (next.metadata.available === current.metadata.available) {
                        return 0;
                    }
                    return next.metadata.available ? 1 : -1;
                });
                const moreWallets = [];
                const recentlySignedInWallets = [];
                wallets.forEach((module) => {
                    if (selector.store
                        .getState()
                        .recentlySignedInWallets.includes(module.id)) {
                        recentlySignedInWallets.push(module);
                    }
                    else {
                        moreWallets.push(module);
                    }
                });
                setRecentModules(recentlySignedInWallets);
                setMoreModules(moreWallets);
            }
            if (selector.options.randomizeWalletOrder) {
                setModules(wallets.sort(() => Math.random() - 0.5));
            }
            else {
                setModules(wallets);
            }
        });
        return () => subscription.unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    (0, react_1.useEffect)(() => {
        const { recentlySignedInWallets } = selector.store.getState();
        if (recentlySignedInWallets.length) {
            setActiveWalletId(recentlySignedInWallets[0]);
        }
    }, [selector.store]);
    function renderOptionsList(modulesToRender) {
        return modulesToRender.reduce((result, module, index) => {
            const { selectedWalletId } = selector.store.getState();
            const { name, description, iconUrl, deprecated } = module.metadata;
            const selected = module.id === selectedWalletId;
            result.push((0, jsx_runtime_1.jsxs)("li", { tabIndex: 0, className: `single-wallet ${activeWalletId === module.id ? "selected-wallet" : ""} ${selected ? "connected-wallet" : ""} ${deprecated ? "deprecated-wallet" : ""} sidebar ${module.id}`, onClick: () => {
                    if (selector.options.network.networkId === "testnet" &&
                        module.id === "here-wallet") {
                        alert("Here Wallet is not supported on testnet");
                        return;
                    }
                    if (module.id === modulesToRender[index].id) {
                        setActiveWalletId(module.id);
                    }
                    return handleWalletClick(module);
                }, children: [(0, jsx_runtime_1.jsx)("div", { className: "icon", children: (0, jsx_runtime_1.jsx)("img", { src: iconUrl, alt: name }) }), (0, jsx_runtime_1.jsxs)("div", { className: "content", children: [(0, jsx_runtime_1.jsx)("div", { className: "title", children: name }), (0, jsx_runtime_1.jsx)("div", { className: "description", children: description })] }), deprecated && ((0, jsx_runtime_1.jsx)("div", { className: "warning-triangle", children: (0, jsx_runtime_1.jsx)(WarningIcon_1.WarningIcon, {}) }))] }, module.id));
            return result;
        }, []);
    }
    return ((0, jsx_runtime_1.jsx)("div", { children: selector.options.optimizeWalletOrder &&
            selector.store.getState().recentlySignedInWallets.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "wallet-options-wrapper", children: [(0, jsx_runtime_1.jsxs)("div", { className: "options-list-section-recent", children: [(0, jsx_runtime_1.jsx)("div", { className: "options-list-section-header", children: "Recent" }), (0, jsx_runtime_1.jsx)("div", { className: "options-list more-options-list-content", children: renderOptionsList(recentModules) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "options-list-section-more", children: [(0, jsx_runtime_1.jsx)("div", { className: "options-list-section-header", children: "More" }), (0, jsx_runtime_1.jsx)("div", { className: "options-list more-options-list-content", children: renderOptionsList(moreModules) })] })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "wallet-options-wrapper", children: (0, jsx_runtime_1.jsx)("div", { className: "options-list", children: renderOptionsList(modules) }) })) }));
};
exports.WalletOptions = WalletOptions;
