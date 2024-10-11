"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const WalletNetworkChanged_1 = require("./WalletNetworkChanged");
const WalletOptions_1 = require("./WalletOptions");
const AlertMessage_1 = require("./AlertMessage");
const DerivationPath_1 = require("./DerivationPath");
const WalletConnecting_1 = require("./WalletConnecting");
const WalletNotInstalled_1 = require("./WalletNotInstalled");
const WalletHome_1 = require("./WalletHome");
const WalletConnected_1 = require("./WalletConnected");
const ScanQRCode_1 = require("./ScanQRCode");
const core_1 = require("@near-wallet-selector/core");
const getThemeClass = (theme) => {
    switch (theme) {
        case "dark":
            return "dark-theme";
        case "light":
            return "light-theme";
        default:
            return "";
    }
};
const Modal = ({ selector, options, visible, hide, emitter, }) => {
    const [route, setRoute] = (0, react_1.useState)({
        name: "WalletHome",
    });
    const [alertMessage, setAlertMessage] = (0, react_1.useState)(null);
    const [selectedWallet, setSelectedWallet] = (0, react_1.useState)();
    const [bridgeWalletUri, setBridgeWalletUri] = (0, react_1.useState)();
    const { rememberRecentWallets } = selector.store.getState();
    const [isChecked, setIsChecked] = (0, react_1.useState)(rememberRecentWallets === "enabled");
    const handleSwitchChange = () => {
        setIsChecked((prevIsChecked) => !prevIsChecked);
        selector.setRememberRecentWallets();
    };
    (0, react_1.useEffect)(() => {
        setRoute({
            name: "WalletHome",
        });
        (0, core_1.allowOnlyLanguage)(selector.options.languageCode);
        const { selectedWalletId, modules } = selector.store.getState();
        if (selectedWalletId) {
            const module = modules.find((m) => m.id === selectedWalletId);
            setSelectedWallet(module);
            setRoute({
                name: "WalletConnected",
                params: {
                    module,
                },
            });
        }
        setBridgeWalletUri("");
        // eslint-disable-next-line
    }, [visible]);
    (0, react_1.useEffect)(() => {
        const subscription = selector.on("networkChanged", ({ networkId }) => {
            // Switched back to the correct network.
            if (networkId === selector.options.network.networkId) {
                return handleDismissClick({});
            }
            setRoute({
                name: "WalletNetworkChanged",
            });
        });
        return () => subscription.remove();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleDismissClick = (0, react_1.useCallback)(({ hideReason }) => {
        setAlertMessage(null);
        setRoute({
            name: "WalletHome",
        });
        if (hideReason === "user-triggered") {
            emitter.emit("onHide", { hideReason });
        }
        if (hideReason === "wallet-navigation") {
            emitter.emit("onHide", { hideReason });
        }
        hide();
    }, [hide, emitter]);
    (0, react_1.useEffect)(() => {
        const close = (e) => {
            if (e.key === "Escape") {
                handleDismissClick({ hideReason: "user-triggered" });
            }
        };
        window.addEventListener("keydown", close);
        return () => window.removeEventListener("keydown", close);
    }, [handleDismissClick]);
    const handleWalletClick = async (module, qrCodeModal) => {
        setSelectedWallet(module);
        const { selectedWalletId } = selector.store.getState();
        if (selectedWalletId === module.id) {
            setRoute({
                name: "WalletConnected",
                params: {
                    module,
                },
            });
            return;
        }
        try {
            const { deprecated, available } = module.metadata;
            if (module.type === "injected" && !available) {
                setRoute({
                    name: "WalletNotInstalled",
                    params: { module: module },
                });
                return;
            }
            const wallet = await module.wallet();
            if (deprecated) {
                setAlertMessage(`${module.metadata.name} is deprecated. Please select another wallet.`);
                setRoute({
                    name: "AlertMessage",
                    params: {
                        module: module,
                    },
                });
                return;
            }
            if (wallet.type === "hardware") {
                setRoute({
                    name: "DerivationPath",
                    params: {
                        walletId: wallet.id || "ledger",
                    },
                });
                return;
            }
            setRoute({
                name: "WalletConnecting",
                params: { wallet: wallet },
            });
            if (wallet.type === "bridge") {
                const subscription = selector.on("uriChanged", ({ uri }) => {
                    setBridgeWalletUri(uri);
                    setRoute({
                        name: "ScanQRCode",
                        params: {
                            uri,
                            wallet,
                        },
                    });
                });
                await wallet.signIn({
                    contractId: options.contractId,
                    methodNames: options.methodNames,
                    qrCodeModal,
                });
                subscription.remove();
                handleDismissClick({ hideReason: "wallet-navigation" });
                return;
            }
            if (wallet.type === "browser") {
                await wallet.signIn({
                    contractId: options.contractId,
                    methodNames: options.methodNames,
                    successUrl: wallet.metadata.successUrl,
                    failureUrl: wallet.metadata.failureUrl,
                });
                handleDismissClick({ hideReason: "wallet-navigation" });
                return;
            }
            await wallet.signIn({
                contractId: options.contractId,
                methodNames: options.methodNames,
            });
            handleDismissClick({ hideReason: "wallet-navigation" });
        }
        catch (err) {
            const { name } = module.metadata;
            const message = err && typeof err === "object" && "message" in err
                ? err.message
                : "Something went wrong";
            setAlertMessage(`Failed to sign in with ${name}: ${message}`);
            setRoute({
                name: "AlertMessage",
                params: {
                    module: module,
                },
            });
        }
    };
    if (!visible) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: `nws-modal-wrapper ${getThemeClass(options?.theme)} ${visible ? "open" : ""}`, children: [(0, jsx_runtime_1.jsx)("div", { className: "nws-modal-overlay", onClick: () => {
                    handleDismissClick({ hideReason: "user-triggered" });
                } }), (0, jsx_runtime_1.jsxs)("div", { className: "nws-modal", children: [(0, jsx_runtime_1.jsxs)("div", { className: "modal-left", children: [(0, jsx_runtime_1.jsxs)("div", { className: "modal-left-title", children: [(0, jsx_runtime_1.jsx)("h2", { children: (0, core_1.translate)("modal.wallet.connectYourWallet") }), (0, jsx_runtime_1.jsx)("span", { className: "nws-remember-wallet", children: (0, core_1.translate)("modal.wallet.rememberWallet") }), (0, jsx_runtime_1.jsxs)("label", { className: "nws-switch", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: isChecked, onChange: handleSwitchChange }), (0, jsx_runtime_1.jsx)("span", { className: "nws-slider round" })] })] }), (0, jsx_runtime_1.jsx)(WalletOptions_1.WalletOptions, { handleWalletClick: (module) => {
                                    handleWalletClick(module, false);
                                }, selector: selector })] }), (0, jsx_runtime_1.jsx)("div", { className: "modal-right", children: (0, jsx_runtime_1.jsxs)("div", { className: "nws-modal-body", children: [route.name === "AlertMessage" && alertMessage && ((0, jsx_runtime_1.jsx)(AlertMessage_1.AlertMessage, { message: alertMessage, module: route.params?.module, onBack: (retry) => {
                                        if (retry) {
                                            handleWalletClick(selectedWallet, false);
                                        }
                                        setAlertMessage(null);
                                        setRoute({
                                            name: "WalletHome",
                                        });
                                    }, onCloseModal: () => handleDismissClick({ hideReason: "user-triggered" }) })), route.name === "DerivationPath" && ((0, jsx_runtime_1.jsx)(DerivationPath_1.DerivationPath, { selector: selector, options: options, onConnected: () => {
                                        handleDismissClick({ hideReason: "wallet-navigation" });
                                    }, params: route.params, onBack: () => setRoute({
                                        name: "WalletHome",
                                    }), onError: (message, wallet) => {
                                        const { modules } = selector.store.getState();
                                        const findModule = modules.find((module) => module.id === wallet.id);
                                        setAlertMessage(message);
                                        setRoute({
                                            name: "AlertMessage",
                                            params: {
                                                module: findModule,
                                            },
                                        });
                                    }, onCloseModal: () => handleDismissClick({ hideReason: "user-triggered" }) })), route.name === "WalletNetworkChanged" && ((0, jsx_runtime_1.jsx)(WalletNetworkChanged_1.WalletNetworkChanged, { selector: selector, onBack: () => setRoute({
                                        name: "WalletHome",
                                    }), onCloseModal: () => handleDismissClick({ hideReason: "user-triggered" }) })), route.name === "WalletNotInstalled" && ((0, jsx_runtime_1.jsx)(WalletNotInstalled_1.WalletNotInstalled, { module: route.params?.module, onBack: () => {
                                        setRoute({
                                            name: "WalletHome",
                                        });
                                    }, onCloseModal: () => handleDismissClick({ hideReason: "user-triggered" }) })), route.name === "WalletConnecting" && ((0, jsx_runtime_1.jsx)(WalletConnecting_1.WalletConnecting, { wallet: route.params?.wallet, onBack: () => {
                                        setRoute({
                                            name: "WalletHome",
                                        });
                                    }, onCloseModal: () => handleDismissClick({ hideReason: "user-triggered" }) })), route.name === "WalletHome" && ((0, jsx_runtime_1.jsx)(WalletHome_1.WalletHome, { selector: selector, onCloseModal: () => handleDismissClick({ hideReason: "user-triggered" }) })), route.name === "WalletConnected" && ((0, jsx_runtime_1.jsx)(WalletConnected_1.WalletConnected, { module: selectedWallet, onCloseModal: () => handleDismissClick({ hideReason: "user-triggered" }) })), route.name === "ScanQRCode" && ((0, jsx_runtime_1.jsx)(ScanQRCode_1.ScanQRCode, { handleOpenDefaultModal: () => {
                                        handleWalletClick(selectedWallet, true);
                                    }, onCloseModal: () => handleDismissClick({ hideReason: "user-triggered" }), uri: bridgeWalletUri, wallet: selectedWallet }))] }) })] })] }));
};
exports.Modal = Modal;
