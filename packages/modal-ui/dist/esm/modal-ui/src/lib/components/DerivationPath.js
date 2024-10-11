import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment, useState } from "react";
import HardwareWalletAccountsForm from "./HardwareWalletAccountsForm";
import { WalletConnecting } from "./WalletConnecting";
import { ModalHeader } from "./ModalHeader";
import { BackArrow } from "./BackArrow";
import { LedgerDeviceIcon } from "./icons/LedgerDeviceIcon";
import { translate } from "@near-wallet-selector/core";
import { UpArrowIcon } from "./icons/UpArrowIcon";
import { DownArrowIcon } from "./icons/DownArrowIcon";
const DEFAULT_DERIVATION_PATH = "44'/397'/0'/0'/1'";
export const DerivationPath = ({ selector, options, onBack, onConnected, params, onError, onCloseModal, }) => {
    const [route, setRoute] = useState("EnterDerivationPath");
    const [derivationPath, setDerivationPath] = useState(DEFAULT_DERIVATION_PATH);
    const [customDerivationPath, setCustomDerivationPath] = useState(1);
    const [accounts, setAccounts] = useState([]);
    const [selectedAccounts, setSelectedAccounts] = useState([]);
    const [hardwareWallet, setHardwareWallet] = useState();
    const [customAccountId, setCustomAccountId] = useState("");
    const [connecting, setConnecting] = useState(false);
    const initalHeaderTitle = translate("modal.ledger.connectWithLedger");
    const [headerTitle, setHeaderTitle] = useState(initalHeaderTitle);
    const getAccountIds = async (publicKey) => {
        const response = await fetch(`${selector.options.network.indexerUrl}/publicKey/ed25519:${publicKey}/accounts`);
        if (!response.ok) {
            throw new Error("Failed to get account id from public key");
        }
        const accountIds = await response.json();
        if (!Array.isArray(accountIds) || !accountIds.length) {
            return [];
        }
        return accountIds;
    };
    const resolveAccounts = async (wallet) => {
        const publicKey = await wallet.getPublicKey(derivationPath);
        try {
            const accountIds = await getAccountIds(publicKey);
            return accountIds.map((accountId, index) => {
                return {
                    derivationPath,
                    publicKey,
                    accountId,
                    selected: index === 0,
                };
            });
        }
        catch (e) {
            return null;
        }
    };
    const handleValidateAccount = async () => {
        const wallet = await selector.wallet(params.walletId);
        if (wallet.type !== "hardware") {
            return;
        }
        setConnecting(true);
        setHardwareWallet(wallet);
        try {
            const resolvedAccounts = await resolveAccounts(wallet);
            if (!resolvedAccounts) {
                setRoute("AddCustomAccountId");
                return;
            }
            const noAccounts = resolvedAccounts.length === 0;
            const multipleAccounts = resolvedAccounts.length > 1;
            if (noAccounts) {
                setHeaderTitle(translate("modal.ledger.noAccountsFound"));
                setRoute("NoAccountsFound");
                return;
            }
            setAccounts(resolvedAccounts);
            if (!multipleAccounts) {
                setSelectedAccounts(resolvedAccounts);
                setRoute("OverviewAccounts");
            }
            else {
                setHeaderTitle(translate("modal.ledger.selectYourAccounts"));
                setRoute("ChooseAccount");
            }
        }
        catch (err) {
            setConnecting(false);
            const message = err && typeof err === "object" && "message" in err
                ? err.message
                : "Something went wrong";
            onError(message, wallet);
        }
        finally {
            setConnecting(false);
        }
    };
    const handleAddCustomAccountId = async () => {
        try {
            setConnecting(true);
            const publicKey = await hardwareWallet.getPublicKey(derivationPath);
            const accountList = [
                {
                    derivationPath: derivationPath,
                    publicKey,
                    accountId: customAccountId,
                    selected: true,
                },
            ];
            setAccounts(accountList);
            setSelectedAccounts(accountList);
            setHeaderTitle(translate("modal.ledger.connecting1Account"));
            setRoute("OverviewAccounts");
        }
        catch (err) {
            setConnecting(false);
            const message = err && typeof err === "object" && "message" in err
                ? err.message
                : "Something went wrong";
            onError(message, hardwareWallet);
        }
        finally {
            setConnecting(false);
        }
    };
    const handleSignIn = () => {
        const mapAccounts = selectedAccounts.map((account) => {
            return {
                derivationPath: account.derivationPath,
                publicKey: account.publicKey,
                accountId: account.accountId,
            };
        });
        return hardwareWallet
            .signIn({
            contractId: options.contractId,
            methodNames: options.methodNames,
            accounts: mapAccounts,
        })
            .then(() => onConnected())
            .catch((err) => {
            onError(`Error: ${err.message}`, hardwareWallet);
        });
    };
    const handleOnBackButtonClick = () => {
        if (route === "SpecifyHDPath" ||
            route === "NoAccountsFound" ||
            route === "ChooseAccount") {
            setHeaderTitle(translate("modal.ledger.connectWithLedger"));
            setRoute("EnterDerivationPath");
        }
        if (route === "OverviewAccounts") {
            setHeaderTitle(translate("modal.ledger.selectYourAccounts"));
            setRoute("ChooseAccount");
        }
    };
    if (connecting) {
        return (_jsx("div", { className: "derivation-path-wrapper", children: _jsx(WalletConnecting, { wallet: hardwareWallet, onBack: () => {
                    setConnecting(false);
                }, onCloseModal: onCloseModal }) }));
    }
    return (_jsxs(Fragment, { children: [_jsxs("div", { className: "nws-modal-header-wrapper", children: [(route === "SpecifyHDPath" ||
                        route === "NoAccountsFound" ||
                        route === "ChooseAccount" ||
                        route === "OverviewAccounts") && (_jsx(BackArrow, { onClick: handleOnBackButtonClick })), _jsx(ModalHeader, { title: headerTitle, onCloseModal: onCloseModal })] }), _jsxs("div", { className: "derivation-path-wrapper", children: [route === "EnterDerivationPath" && (_jsxs("div", { className: "enter-derivation-path", children: [_jsx("div", { className: "ledger-image", children: _jsx(LedgerDeviceIcon, {}) }), _jsxs("div", { className: "ledger-description", children: [_jsx("p", { children: translate("modal.ledger.makeSureYourLedger") }), _jsx("p", { className: "specify-path", onClick: () => {
                                            setHeaderTitle(translate("modal.ledger.specifyHDPath"));
                                            setRoute("SpecifyHDPath");
                                        }, children: translate("modal.ledger.specifyHDPath") })] }), _jsx("div", { className: "action-buttons", children: _jsx("button", { className: "middleButton", onClick: handleValidateAccount, children: translate("modal.ledger.continue") }) })] })), route === "SpecifyHDPath" && (_jsxs("div", { className: "specify-path-wrapper", children: [_jsxs("div", { className: "change-path-wrapper", children: [_jsx("div", { className: "display-path", children: _jsx("span", { children: derivationPath.slice(0, -2) }) }), _jsxs("div", { className: "change-path", children: [_jsx("div", { className: "path-value", children: _jsx("span", { children: customDerivationPath }) }), _jsxs("div", { className: "buttons-wrapper", children: [_jsx("button", { onClick: () => {
                                                            const newValue = customDerivationPath + 1;
                                                            const path = derivationPath.slice(0, -2);
                                                            setDerivationPath(`${path}${newValue}'`);
                                                            setCustomDerivationPath(newValue);
                                                        }, children: _jsx(UpArrowIcon, {}) }), _jsx("button", { onClick: () => {
                                                            const newValue = customDerivationPath - 1;
                                                            if (newValue < 0) {
                                                                return;
                                                            }
                                                            const path = derivationPath.slice(0, -2);
                                                            setDerivationPath(`${path}${newValue}'`);
                                                            setCustomDerivationPath(newValue);
                                                        }, children: _jsx(DownArrowIcon, {}) })] })] })] }), _jsx("p", { className: "path-description", children: translate("modal.ledger.enterYourPreferredHDPath") }), _jsx("p", { className: "what-link", children: _jsx("a", { href: "https://www.ledger.com/academy/crypto/what-are-hierarchical-deterministic-hd-wallets", target: "_blank", children: "What's this?" }) }), _jsx("div", { className: "action-buttons", children: _jsx("button", { className: "middleButton", onClick: handleValidateAccount, children: translate("modal.ledger.scan") }) })] })), route === "NoAccountsFound" && (_jsx("div", { className: "no-accounts-found-wrapper", children: _jsxs("p", { children: [translate("modal.ledger.cantFindAnyAccount"), " ", _jsx("a", { href: `https://${selector.options.network.networkId === "testnet"
                                        ? "testnet"
                                        : "app"}.mynearwallet.com/create`, target: "_blank", children: "MyNearWallet" }), " ", translate("modal.ledger.orConnectAnAnotherLedger")] }) })), route === "ChooseAccount" && (_jsx(HardwareWalletAccountsForm, { accounts: accounts, onSelectedChanged: (index, selected) => {
                            setAccounts((prevAccounts) => {
                                const updateAccounts = prevAccounts.map((account, idx) => {
                                    const selectedValue = index === idx ? selected : account.selected;
                                    return {
                                        ...account,
                                        selected: selectedValue,
                                    };
                                });
                                return [...updateAccounts];
                            });
                        }, onSubmit: (acc, e) => {
                            e.preventDefault();
                            const selectedAcc = acc.filter((account) => account.selected);
                            setSelectedAccounts(selectedAcc);
                            const numberOfAccounts = selectedAcc.length;
                            setHeaderTitle(`${translate("modal.ledger.connecting")} ${numberOfAccounts} ${translate("modal.ledger.ofAccounts")}`);
                            setRoute("OverviewAccounts");
                        }, onChangeRoute: (newRoute) => {
                            if (newRoute === "SpecifyHDPath") {
                                setHeaderTitle(translate("modal.ledger.specifyHDPath"));
                            }
                            setRoute(newRoute);
                        } })), route === "AddCustomAccountId" && (_jsxs("div", { className: "enter-custom-account", children: [_jsx("p", { children: translate("modal.ledger.failedToAutomatically") }), _jsx("div", { className: "input-wrapper", children: _jsx("input", { type: "text", placeholder: "Account ID", value: customAccountId, onChange: (e) => {
                                        setCustomAccountId(e.target.value);
                                    } }) }), _jsx("div", { className: "action-buttons", children: _jsx("button", { className: "middleButton", onClick: handleAddCustomAccountId, children: translate("ledger.Continue") }) })] })), route === "OverviewAccounts" && (_jsxs("div", { className: "overview-wrapper", children: [_jsx("p", { children: translate("modal.ledger.overviewTheListOfAuthorized") }), _jsx("div", { className: "accounts", children: selectedAccounts.map((account, index) => (_jsx("div", { children: _jsx("div", { className: "account", children: _jsx("span", { children: account.accountId }) }) }, account.accountId))) }), _jsx("div", { className: "action-buttons", children: _jsx("button", { className: "middleButton", onClick: handleSignIn, disabled: accounts.length === 0, children: translate("modal.ledger.finish") }) })] }))] })] }));
};
