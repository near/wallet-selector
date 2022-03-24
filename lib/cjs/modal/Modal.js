"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Modal_styles_1 = __importDefault(require("./Modal.styles"));
var State_1 = require("../state/State");
var logging_service_1 = require("../services/logging.service");
var constants_1 = require("../constants");
var getThemeClass = function (theme) {
    switch (theme) {
        case "dark":
            return "Modal-dark-theme";
        case "light":
            return "Modal-light-theme";
        default:
            return "";
    }
};
var Modal = function (_a) {
    var _b, _c;
    var options = _a.options, wallets = _a.wallets;
    var _d = (0, react_1.useState)((0, State_1.getState)()), state = _d[0], setState = _d[1];
    var _e = (0, react_1.useState)(false), walletInfoVisible = _e[0], setWalletInfoVisible = _e[1];
    var _f = (0, react_1.useState)(""), ledgerError = _f[0], setLedgerError = _f[1];
    var _g = (0, react_1.useState)(""), ledgerAccountId = _g[0], setLedgerAccountId = _g[1];
    var _h = (0, react_1.useState)(constants_1.DEFAULT_DERIVATION_PATH), ledgerDerivationPath = _h[0], setLedgerDerivationPath = _h[1];
    var _j = (0, react_1.useState)(false), isLoading = _j[0], setIsLoading = _j[1];
    (0, react_1.useEffect)(function () {
        window.updateWalletSelector = function (nextState) {
            setState(nextState);
        };
    }, []);
    var resetState = function () {
        setWalletInfoVisible(false);
        setLedgerError("");
        setLedgerAccountId("");
        setLedgerDerivationPath(constants_1.DEFAULT_DERIVATION_PATH);
        setIsLoading(false);
    };
    var handleDismissClick = function () {
        if (isLoading) {
            return;
        }
        (0, State_1.updateState)(function (prevState) { return (__assign(__assign({}, prevState), { showModal: false })); });
        resetState();
    };
    var handleDismissOutsideClick = function (e) {
        e.preventDefault();
        if (e.target === e.currentTarget) {
            handleDismissClick();
        }
    };
    var handleDerivationPathChange = function (e) {
        setLedgerDerivationPath(e.target.value);
    };
    var handleAccountIdChange = function (e) {
        setLedgerAccountId(e.target.value);
    };
    var handleWalletClick = function (wallet) { return function () {
        // console.log(wallet)
        if (wallet.type === "hardware") {
            return (0, State_1.updateState)(function (prevState) { return (__assign(__assign({}, prevState), { showWalletOptions: false, showLedgerDerivationPath: true })); });
        }
        wallet.signIn().catch(function (err) {
            logging_service_1.logger.log("Failed to select ".concat(wallet.name));
            logging_service_1.logger.error(err);
        });
    }; };
    var handleConnectClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        var wallet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    wallet = wallets.find(function (x) { return x.id === "ledger-wallet"; });
                    return [4 /*yield*/, wallet
                            .signIn({
                            accountId: ledgerAccountId,
                            derivationPath: ledgerDerivationPath,
                        })
                            .catch(function (err) { return setLedgerError("Error: ".concat(err.message)); })];
                case 1:
                    _a.sent();
                    resetState();
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1.default.createElement("div", { style: { display: state.showModal ? "block" : "none" } },
        react_1.default.createElement("style", null, Modal_styles_1.default),
        react_1.default.createElement("div", { className: "Modal ".concat(getThemeClass((_b = options.ui) === null || _b === void 0 ? void 0 : _b.theme)), onClick: handleDismissOutsideClick },
            react_1.default.createElement("div", { className: "Modal-content" },
                react_1.default.createElement("div", { className: "Modal-header" },
                    react_1.default.createElement("h2", null, "Connect Wallet"),
                    react_1.default.createElement("button", { onClick: handleDismissClick },
                        react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24", viewBox: "0 0 24 24", width: "24", fill: "#A7A7A7" },
                            react_1.default.createElement("path", { d: "M0 0h24v24H0z", fill: "none" }),
                            react_1.default.createElement("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" })))),
                react_1.default.createElement("div", { style: { display: state.showWalletOptions ? "block" : "none" }, className: "Modal-body Modal-select-wallet-option" },
                    react_1.default.createElement("p", { className: "Modal-description" }, ((_c = options.ui) === null || _c === void 0 ? void 0 : _c.description) ||
                        "Please select a wallet to connect to this dApp:"),
                    react_1.default.createElement("ul", { className: "Modal-option-list" }, wallets
                        .filter(function (wallet) { return wallet.isAvailable(); })
                        .map(function (wallet) {
                        var id = wallet.id, name = wallet.name, description = wallet.description, iconUrl = wallet.iconUrl;
                        var selected = state.selectedWalletId === id;
                        return (react_1.default.createElement("li", { key: id, id: id, className: selected ? "selected-wallet" : "", onClick: selected ? undefined : handleWalletClick(wallet) },
                            react_1.default.createElement("div", { title: description || "" },
                                react_1.default.createElement("img", { src: iconUrl, alt: name }),
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement("span", null, name)),
                                selected && (react_1.default.createElement("div", { className: "selected-wallet-text" },
                                    react_1.default.createElement("span", null, "selected"))))));
                    }))),
                react_1.default.createElement("div", { style: {
                        display: state.showLedgerDerivationPath ? "block" : "none",
                    }, className: "Modal-body Modal-choose-ledger-derivation-path" },
                    react_1.default.createElement("p", null, "Make sure your Ledger is plugged in, then enter an account id and derivation path to connect:"),
                    react_1.default.createElement("div", { className: "derivation-paths-list" },
                        react_1.default.createElement("div", { className: "account-id" },
                            react_1.default.createElement("input", { type: "text", placeholder: "Account ID", autoFocus: true, value: ledgerAccountId, onChange: handleAccountIdChange, readOnly: isLoading })),
                        react_1.default.createElement("input", { type: "text", className: ledgerError ? "input-error" : "", placeholder: "Derivation Path", value: ledgerDerivationPath, onChange: handleDerivationPathChange, readOnly: isLoading }),
                        ledgerError && react_1.default.createElement("p", { className: "error" }, ledgerError)),
                    react_1.default.createElement("div", { className: "derivation-paths--actions" },
                        react_1.default.createElement("button", { className: "left-button", onClick: handleDismissClick, disabled: isLoading }, "Dismiss"),
                        react_1.default.createElement("button", { className: "right-button", onClick: handleConnectClick, disabled: isLoading }, isLoading ? "Connecting..." : "Connect"))),
                react_1.default.createElement("div", { style: {
                        display: state.showSenderWalletNotInstalled ? "block" : "none",
                    }, className: "Modal-body Modal-wallet-not-installed" },
                    react_1.default.createElement("div", { className: "icon-display" },
                        react_1.default.createElement("img", { src: "https://senderwallet.io/logo.png", alt: "Sender Wallet" }),
                        react_1.default.createElement("p", null, "SenderWallet")),
                    react_1.default.createElement("p", null,
                        "You'll need to install SenderWallet to continue. After installing",
                        react_1.default.createElement("span", { className: "refresh-link", onClick: function () {
                                window.location.reload();
                            } }, "\u00A0refresh the page.")),
                    react_1.default.createElement("div", { className: "action-buttons" },
                        react_1.default.createElement("button", { className: "left-button", onClick: function () {
                                (0, State_1.updateState)(function (prevState) { return (__assign(__assign({}, prevState), { showWalletOptions: true, showSenderWalletNotInstalled: false })); });
                            } }, "Back"),
                        react_1.default.createElement("button", { className: "right-button", onClick: function () {
                                window.open("https://chrome.google.com/webstore/detail/sender-wallet/epapihdplajcdnnkdeiahlgigofloibg", "_blank");
                            } }, "Open SenderWallet"))),
                react_1.default.createElement("div", { style: { display: state.showSwitchNetwork ? "block" : "none" }, className: "Modal-body Modal-switch-network-message" },
                    react_1.default.createElement("div", { className: "header" },
                        react_1.default.createElement("h2", null, "You Must Change Networks")),
                    react_1.default.createElement("div", { className: "content" },
                        react_1.default.createElement("p", null,
                            "We've detected that you need to change your wallet's network to",
                            react_1.default.createElement("strong", null, " ".concat(options.networkId)),
                            " for this dApp."),
                        react_1.default.createElement("p", null, "Some wallets may not support changing networks. If you can not change networks you may consider switching to another wallet.")),
                    react_1.default.createElement("div", { className: "actions" },
                        react_1.default.createElement("button", { className: "left-button", onClick: handleDismissClick }, "Dismiss"),
                        react_1.default.createElement("button", { className: "right-button", onClick: function () {
                                (0, State_1.updateState)(function (prevState) { return (__assign(__assign({}, prevState), { showWalletOptions: true, showSwitchNetwork: false })); });
                            } }, "Switch Wallet"))),
                react_1.default.createElement("div", { className: "info" },
                    react_1.default.createElement("span", { onClick: function () {
                            setWalletInfoVisible(!walletInfoVisible);
                        } }, "What is a Wallet?"),
                    react_1.default.createElement("div", { className: "info-description ".concat(walletInfoVisible ? "show" : "hide", "-explanation") },
                        react_1.default.createElement("p", null, "Wallets are used to send, receive and store digital assets. There are different types of wallets. They can be an extension added to your browser, a hardware device plugged into your computer, web-based or an app on your mobile device.")))))));
};
exports.default = Modal;
