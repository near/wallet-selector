import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { WarningIcon } from "./icons/WarningIcon";
export const WalletOptions = ({ selector, handleWalletClick, }) => {
    const [modules, setModules] = useState([]);
    const [recentModules, setRecentModules] = useState([]);
    const [moreModules, setMoreModules] = useState([]);
    const [activeWalletId, setActiveWalletId] = useState("");
    useEffect(() => {
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
    useEffect(() => {
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
            result.push(_jsxs("li", { tabIndex: 0, className: `single-wallet ${activeWalletId === module.id ? "selected-wallet" : ""} ${selected ? "connected-wallet" : ""} ${deprecated ? "deprecated-wallet" : ""} sidebar ${module.id}`, onClick: () => {
                    if (selector.options.network.networkId === "testnet" &&
                        module.id === "here-wallet") {
                        alert("Here Wallet is not supported on testnet");
                        return;
                    }
                    if (module.id === modulesToRender[index].id) {
                        setActiveWalletId(module.id);
                    }
                    return handleWalletClick(module);
                }, children: [_jsx("div", { className: "icon", children: _jsx("img", { src: iconUrl, alt: name }) }), _jsxs("div", { className: "content", children: [_jsx("div", { className: "title", children: name }), _jsx("div", { className: "description", children: description })] }), deprecated && (_jsx("div", { className: "warning-triangle", children: _jsx(WarningIcon, {}) }))] }, module.id));
            return result;
        }, []);
    }
    return (_jsx("div", { children: selector.options.optimizeWalletOrder &&
            selector.store.getState().recentlySignedInWallets.length > 0 ? (_jsxs("div", { className: "wallet-options-wrapper", children: [_jsxs("div", { className: "options-list-section-recent", children: [_jsx("div", { className: "options-list-section-header", children: "Recent" }), _jsx("div", { className: "options-list more-options-list-content", children: renderOptionsList(recentModules) })] }), _jsxs("div", { className: "options-list-section-more", children: [_jsx("div", { className: "options-list-section-header", children: "More" }), _jsx("div", { className: "options-list more-options-list-content", children: renderOptionsList(moreModules) })] })] })) : (_jsx("div", { className: "wallet-options-wrapper", children: _jsx("div", { className: "options-list", children: renderOptionsList(modules) }) })) }));
};
