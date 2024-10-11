import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from "react";
import { WalletNetworkChanged } from "./WalletNetworkChanged";
import { WalletOptions } from "./WalletOptions";
import { AlertMessage } from "./AlertMessage";
import { DerivationPath } from "./DerivationPath";
import { WalletConnecting } from "./WalletConnecting";
import { WalletNotInstalled } from "./WalletNotInstalled";
import { WalletHome } from "./WalletHome";
import { WalletConnected } from "./WalletConnected";
import { ScanQRCode } from "./ScanQRCode";
import { translate, allowOnlyLanguage } from "@near-wallet-selector/core";
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
export const Modal = ({ selector, options, visible, hide, emitter, }) => {
    const [route, setRoute] = useState({
        name: "WalletHome",
    });
    const [alertMessage, setAlertMessage] = useState(null);
    const [selectedWallet, setSelectedWallet] = useState();
    const [bridgeWalletUri, setBridgeWalletUri] = useState();
    const { rememberRecentWallets } = selector.store.getState();
    const [isChecked, setIsChecked] = useState(rememberRecentWallets === "enabled");
    const handleSwitchChange = () => {
        setIsChecked((prevIsChecked) => !prevIsChecked);
        selector.setRememberRecentWallets();
    };
    useEffect(() => {
        setRoute({
            name: "WalletHome",
        });
        allowOnlyLanguage(selector.options.languageCode);
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
    useEffect(() => {
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
    const handleDismissClick = useCallback(({ hideReason }) => {
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
    useEffect(() => {
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
    return (_jsxs("div", { className: `nws-modal-wrapper ${getThemeClass(options?.theme)} ${visible ? "open" : ""}`, children: [_jsx("div", { className: "nws-modal-overlay", onClick: () => {
                    handleDismissClick({ hideReason: "user-triggered" });
                } }), _jsxs("div", { className: "nws-modal", children: [_jsxs("div", { className: "modal-left", children: [_jsxs("div", { className: "modal-left-title", children: [_jsx("h2", { children: translate("modal.wallet.connectYourWallet") }), _jsx("span", { className: "nws-remember-wallet", children: translate("modal.wallet.rememberWallet") }), _jsxs("label", { className: "nws-switch", children: [_jsx("input", { type: "checkbox", checked: isChecked, onChange: handleSwitchChange }), _jsx("span", { className: "nws-slider round" })] })] }), _jsx(WalletOptions, { handleWalletClick: (module) => {
                                    handleWalletClick(module, false);
                                }, selector: selector })] }), _jsx("div", { className: "modal-right", children: _jsxs("div", { className: "nws-modal-body", children: [route.name === "AlertMessage" && alertMessage && (_jsx(AlertMessage, { message: alertMessage, module: route.params?.module, onBack: (retry) => {
                                        if (retry) {
                                            handleWalletClick(selectedWallet, false);
                                        }
                                        setAlertMessage(null);
                                        setRoute({
                                            name: "WalletHome",
                                        });
                                    }, onCloseModal: () => handleDismissClick({ hideReason: "user-triggered" }) })), route.name === "DerivationPath" && (_jsx(DerivationPath, { selector: selector, options: options, onConnected: () => {
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
                                    }, onCloseModal: () => handleDismissClick({ hideReason: "user-triggered" }) })), route.name === "WalletNetworkChanged" && (_jsx(WalletNetworkChanged, { selector: selector, onBack: () => setRoute({
                                        name: "WalletHome",
                                    }), onCloseModal: () => handleDismissClick({ hideReason: "user-triggered" }) })), route.name === "WalletNotInstalled" && (_jsx(WalletNotInstalled, { module: route.params?.module, onBack: () => {
                                        setRoute({
                                            name: "WalletHome",
                                        });
                                    }, onCloseModal: () => handleDismissClick({ hideReason: "user-triggered" }) })), route.name === "WalletConnecting" && (_jsx(WalletConnecting, { wallet: route.params?.wallet, onBack: () => {
                                        setRoute({
                                            name: "WalletHome",
                                        });
                                    }, onCloseModal: () => handleDismissClick({ hideReason: "user-triggered" }) })), route.name === "WalletHome" && (_jsx(WalletHome, { selector: selector, onCloseModal: () => handleDismissClick({ hideReason: "user-triggered" }) })), route.name === "WalletConnected" && (_jsx(WalletConnected, { module: selectedWallet, onCloseModal: () => handleDismissClick({ hideReason: "user-triggered" }) })), route.name === "ScanQRCode" && (_jsx(ScanQRCode, { handleOpenDefaultModal: () => {
                                        handleWalletClick(selectedWallet, true);
                                    }, onCloseModal: () => handleDismissClick({ hideReason: "user-triggered" }), uri: bridgeWalletUri, wallet: selectedWallet }))] }) })] })] }));
};
