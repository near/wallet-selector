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
import { getState, updateState } from "../state/State";
import { LOCAL_STORAGE_SELECTED_WALLET_ID } from "../constants";
import { storage } from "../services/persistent-storage.service";
import { logger } from "../services/logging.service";
import setupNearWallet from "../wallets/browser/NearWallet";
import setupSenderWallet from "../wallets/injected/SenderWallet";
import setupLedgerWallet from "../wallets/hardware/LedgerWallet";
import setupMetaMaskWallet from "../wallets/injected/MetaMaskWallet";
var WalletController = /** @class */ (function () {
    function WalletController(options, provider, emitter) {
        this.options = options;
        this.provider = provider;
        this.emitter = emitter;
        this.wallets = [];
    }
    WalletController.prototype.decorateWallets = function (wallets) {
        var _this = this;
        return wallets.map(function (wallet) {
            return __assign(__assign({}, wallet), { signIn: function (params) { return __awaiter(_this, void 0, void 0, function () {
                    var selectedWallet;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                selectedWallet = this.getSelectedWallet();
                                if (!selectedWallet) return [3 /*break*/, 2];
                                if (wallet.id === selectedWallet.id) {
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, selectedWallet.signOut()];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2: return [2 /*return*/, wallet.signIn(params)];
                        }
                    });
                }); } });
        });
    };
    WalletController.prototype.setupWalletModules = function () {
        var _this = this;
        return this.options.wallets
            .map(function (walletId) {
            switch (walletId) {
                case "near-wallet":
                    return setupNearWallet();
                case "sender-wallet":
                    return setupSenderWallet();
                case "ledger-wallet":
                    return setupLedgerWallet();
                case "metamask-wallet":
                    return setupMetaMaskWallet();
                default:
                    throw new Error("Invalid wallet id");
            }
        })
            .map(function (module) {
            return module({
                options: _this.options,
                provider: _this.provider,
                emitter: _this.emitter,
                logger: logger,
                storage: storage,
                updateState: updateState,
            });
        });
    };
    WalletController.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var selectedWalletId, wallet, signedIn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.wallets = this.decorateWallets(this.setupWalletModules());
                        selectedWalletId = storage.getItem(LOCAL_STORAGE_SELECTED_WALLET_ID);
                        wallet = this.getWallet(selectedWalletId);
                        if (!wallet) return [3 /*break*/, 3];
                        return [4 /*yield*/, wallet.init()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, wallet.isSignedIn()];
                    case 2:
                        signedIn = _a.sent();
                        if (signedIn) {
                            updateState(function (prevState) { return (__assign(__assign({}, prevState), { selectedWalletId: selectedWalletId })); });
                            return [2 /*return*/];
                        }
                        _a.label = 3;
                    case 3:
                        if (selectedWalletId) {
                            storage.removeItem(LOCAL_STORAGE_SELECTED_WALLET_ID);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    WalletController.prototype.getSelectedWallet = function () {
        var state = getState();
        var walletId = state.selectedWalletId;
        return this.getWallet(walletId);
    };
    WalletController.prototype.getWallet = function (walletId) {
        if (!walletId) {
            return null;
        }
        return this.wallets.find(function (x) { return x.id === walletId; }) || null;
    };
    WalletController.prototype.getWallets = function () {
        return this.wallets;
    };
    WalletController.prototype.signIn = function (_a) {
        var walletId = _a.walletId, accountId = _a.accountId, derivationPath = _a.derivationPath;
        return __awaiter(this, void 0, void 0, function () {
            var wallet;
            return __generator(this, function (_b) {
                wallet = this.getWallet(walletId);
                if (!wallet) {
                    throw new Error("Invalid wallet '".concat(walletId, "'"));
                }
                if (wallet.type === "hardware") {
                    if (!accountId) {
                        throw new Error("Invalid account id");
                    }
                    if (!derivationPath) {
                        throw new Error("Invalid derivation path");
                    }
                    return [2 /*return*/, wallet.signIn({ accountId: accountId, derivationPath: derivationPath })];
                }
                return [2 /*return*/, wallet.signIn()];
            });
        });
    };
    WalletController.prototype.signOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            var wallet;
            return __generator(this, function (_a) {
                wallet = this.getSelectedWallet();
                if (!wallet) {
                    return [2 /*return*/];
                }
                return [2 /*return*/, wallet.signOut()];
            });
        });
    };
    WalletController.prototype.isSignedIn = function () {
        var wallet = this.getSelectedWallet();
        if (!wallet) {
            return false;
        }
        return wallet.isSignedIn();
    };
    WalletController.prototype.getAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var wallet;
            return __generator(this, function (_a) {
                wallet = this.getSelectedWallet();
                if (!wallet) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, wallet.getAccount()];
            });
        });
    };
    return WalletController;
}());
export default WalletController;
