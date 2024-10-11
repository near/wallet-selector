"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DerivationPath = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const HardwareWalletAccountsForm_1 = __importDefault(require("./HardwareWalletAccountsForm"));
const WalletConnecting_1 = require("./WalletConnecting");
const ModalHeader_1 = require("./ModalHeader");
const BackArrow_1 = require("./BackArrow");
const LedgerDeviceIcon_1 = require("./icons/LedgerDeviceIcon");
const core_1 = require("@near-wallet-selector/core");
const UpArrowIcon_1 = require("./icons/UpArrowIcon");
const DownArrowIcon_1 = require("./icons/DownArrowIcon");
const DEFAULT_DERIVATION_PATH = "44'/397'/0'/0'/1'";
const DerivationPath = ({ selector, options, onBack, onConnected, params, onError, onCloseModal, }) => {
    const [route, setRoute] = (0, react_1.useState)("EnterDerivationPath");
    const [derivationPath, setDerivationPath] = (0, react_1.useState)(DEFAULT_DERIVATION_PATH);
    const [customDerivationPath, setCustomDerivationPath] = (0, react_1.useState)(1);
    const [accounts, setAccounts] = (0, react_1.useState)([]);
    const [selectedAccounts, setSelectedAccounts] = (0, react_1.useState)([]);
    const [hardwareWallet, setHardwareWallet] = (0, react_1.useState)();
    const [customAccountId, setCustomAccountId] = (0, react_1.useState)("");
    const [connecting, setConnecting] = (0, react_1.useState)(false);
    const initalHeaderTitle = (0, core_1.translate)("modal.ledger.connectWithLedger");
    const [headerTitle, setHeaderTitle] = (0, react_1.useState)(initalHeaderTitle);
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
                setHeaderTitle((0, core_1.translate)("modal.ledger.noAccountsFound"));
                setRoute("NoAccountsFound");
                return;
            }
            setAccounts(resolvedAccounts);
            if (!multipleAccounts) {
                setSelectedAccounts(resolvedAccounts);
                setRoute("OverviewAccounts");
            }
            else {
                setHeaderTitle((0, core_1.translate)("modal.ledger.selectYourAccounts"));
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
            setHeaderTitle((0, core_1.translate)("modal.ledger.connecting1Account"));
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
            setHeaderTitle((0, core_1.translate)("modal.ledger.connectWithLedger"));
            setRoute("EnterDerivationPath");
        }
        if (route === "OverviewAccounts") {
            setHeaderTitle((0, core_1.translate)("modal.ledger.selectYourAccounts"));
            setRoute("ChooseAccount");
        }
    };
    if (connecting) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "derivation-path-wrapper", children: (0, jsx_runtime_1.jsx)(WalletConnecting_1.WalletConnecting, { wallet: hardwareWallet, onBack: () => {
                    setConnecting(false);
                }, onCloseModal: onCloseModal }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "nws-modal-header-wrapper", children: [(route === "SpecifyHDPath" ||
                        route === "NoAccountsFound" ||
                        route === "ChooseAccount" ||
                        route === "OverviewAccounts") && ((0, jsx_runtime_1.jsx)(BackArrow_1.BackArrow, { onClick: handleOnBackButtonClick })), (0, jsx_runtime_1.jsx)(ModalHeader_1.ModalHeader, { title: headerTitle, onCloseModal: onCloseModal })] }), (0, jsx_runtime_1.jsxs)("div", { className: "derivation-path-wrapper", children: [route === "EnterDerivationPath" && ((0, jsx_runtime_1.jsxs)("div", { className: "enter-derivation-path", children: [(0, jsx_runtime_1.jsx)("div", { className: "ledger-image", children: (0, jsx_runtime_1.jsx)(LedgerDeviceIcon_1.LedgerDeviceIcon, {}) }), (0, jsx_runtime_1.jsxs)("div", { className: "ledger-description", children: [(0, jsx_runtime_1.jsx)("p", { children: (0, core_1.translate)("modal.ledger.makeSureYourLedger") }), (0, jsx_runtime_1.jsx)("p", { className: "specify-path", onClick: () => {
                                            setHeaderTitle((0, core_1.translate)("modal.ledger.specifyHDPath"));
                                            setRoute("SpecifyHDPath");
                                        }, children: (0, core_1.translate)("modal.ledger.specifyHDPath") })] }), (0, jsx_runtime_1.jsx)("div", { className: "action-buttons", children: (0, jsx_runtime_1.jsx)("button", { className: "middleButton", onClick: handleValidateAccount, children: (0, core_1.translate)("modal.ledger.continue") }) })] })), route === "SpecifyHDPath" && ((0, jsx_runtime_1.jsxs)("div", { className: "specify-path-wrapper", children: [(0, jsx_runtime_1.jsxs)("div", { className: "change-path-wrapper", children: [(0, jsx_runtime_1.jsx)("div", { className: "display-path", children: (0, jsx_runtime_1.jsx)("span", { children: derivationPath.slice(0, -2) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "change-path", children: [(0, jsx_runtime_1.jsx)("div", { className: "path-value", children: (0, jsx_runtime_1.jsx)("span", { children: customDerivationPath }) }), (0, jsx_runtime_1.jsxs)("div", { className: "buttons-wrapper", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => {
                                                            const newValue = customDerivationPath + 1;
                                                            const path = derivationPath.slice(0, -2);
                                                            setDerivationPath(`${path}${newValue}'`);
                                                            setCustomDerivationPath(newValue);
                                                        }, children: (0, jsx_runtime_1.jsx)(UpArrowIcon_1.UpArrowIcon, {}) }), (0, jsx_runtime_1.jsx)("button", { onClick: () => {
                                                            const newValue = customDerivationPath - 1;
                                                            if (newValue < 0) {
                                                                return;
                                                            }
                                                            const path = derivationPath.slice(0, -2);
                                                            setDerivationPath(`${path}${newValue}'`);
                                                            setCustomDerivationPath(newValue);
                                                        }, children: (0, jsx_runtime_1.jsx)(DownArrowIcon_1.DownArrowIcon, {}) })] })] })] }), (0, jsx_runtime_1.jsx)("p", { className: "path-description", children: (0, core_1.translate)("modal.ledger.enterYourPreferredHDPath") }), (0, jsx_runtime_1.jsx)("p", { className: "what-link", children: (0, jsx_runtime_1.jsx)("a", { href: "https://www.ledger.com/academy/crypto/what-are-hierarchical-deterministic-hd-wallets", target: "_blank", children: "What's this?" }) }), (0, jsx_runtime_1.jsx)("div", { className: "action-buttons", children: (0, jsx_runtime_1.jsx)("button", { className: "middleButton", onClick: handleValidateAccount, children: (0, core_1.translate)("modal.ledger.scan") }) })] })), route === "NoAccountsFound" && ((0, jsx_runtime_1.jsx)("div", { className: "no-accounts-found-wrapper", children: (0, jsx_runtime_1.jsxs)("p", { children: [(0, core_1.translate)("modal.ledger.cantFindAnyAccount"), " ", (0, jsx_runtime_1.jsx)("a", { href: `https://${selector.options.network.networkId === "testnet"
                                        ? "testnet"
                                        : "app"}.mynearwallet.com/create`, target: "_blank", children: "MyNearWallet" }), " ", (0, core_1.translate)("modal.ledger.orConnectAnAnotherLedger")] }) })), route === "ChooseAccount" && ((0, jsx_runtime_1.jsx)(HardwareWalletAccountsForm_1.default, { accounts: accounts, onSelectedChanged: (index, selected) => {
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
                            setHeaderTitle(`${(0, core_1.translate)("modal.ledger.connecting")} ${numberOfAccounts} ${(0, core_1.translate)("modal.ledger.ofAccounts")}`);
                            setRoute("OverviewAccounts");
                        }, onChangeRoute: (newRoute) => {
                            if (newRoute === "SpecifyHDPath") {
                                setHeaderTitle((0, core_1.translate)("modal.ledger.specifyHDPath"));
                            }
                            setRoute(newRoute);
                        } })), route === "AddCustomAccountId" && ((0, jsx_runtime_1.jsxs)("div", { className: "enter-custom-account", children: [(0, jsx_runtime_1.jsx)("p", { children: (0, core_1.translate)("modal.ledger.failedToAutomatically") }), (0, jsx_runtime_1.jsx)("div", { className: "input-wrapper", children: (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Account ID", value: customAccountId, onChange: (e) => {
                                        setCustomAccountId(e.target.value);
                                    } }) }), (0, jsx_runtime_1.jsx)("div", { className: "action-buttons", children: (0, jsx_runtime_1.jsx)("button", { className: "middleButton", onClick: handleAddCustomAccountId, children: (0, core_1.translate)("ledger.Continue") }) })] })), route === "OverviewAccounts" && ((0, jsx_runtime_1.jsxs)("div", { className: "overview-wrapper", children: [(0, jsx_runtime_1.jsx)("p", { children: (0, core_1.translate)("modal.ledger.overviewTheListOfAuthorized") }), (0, jsx_runtime_1.jsx)("div", { className: "accounts", children: selectedAccounts.map((account, index) => ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("div", { className: "account", children: (0, jsx_runtime_1.jsx)("span", { children: account.accountId }) }) }, account.accountId))) }), (0, jsx_runtime_1.jsx)("div", { className: "action-buttons", children: (0, jsx_runtime_1.jsx)("button", { className: "middleButton", onClick: handleSignIn, disabled: accounts.length === 0, children: (0, core_1.translate)("modal.ledger.finish") }) })] }))] })] }));
};
exports.DerivationPath = DerivationPath;
