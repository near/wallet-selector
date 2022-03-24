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
import isMobile from "is-mobile";
import { senderWalletIcon } from "../icons";
function setupSenderWallet() {
    return function SenderWallet(_a) {
        var options = _a.options, provider = _a.provider, emitter = _a.emitter, logger = _a.logger, updateState = _a.updateState;
        var wallet;
        var isInstalled = function () {
            var _a;
            return !!((_a = window.near) === null || _a === void 0 ? void 0 : _a.isSender);
        };
        var timeout = function (ms) {
            return new Promise(function (resolve) { return setTimeout(resolve, ms); });
        };
        var isValidActions = function (actions) {
            return actions.every(function (x) { return x.type === "FunctionCall"; });
        };
        var transformActions = function (actions) {
            var validActions = isValidActions(actions);
            if (!validActions) {
                throw new Error("Only 'FunctionCall' actions types are supported by Sender Wallet");
            }
            return actions.map(function (x) { return x.params; });
        };
        return {
            id: "sender-wallet",
            type: "injected",
            name: "Sender Wallet",
            description: null,
            iconUrl: senderWalletIcon,
            isAvailable: function () {
                if (!isInstalled()) {
                    return false;
                }
                if (isMobile()) {
                    return false;
                }
                return true;
            },
            init: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, timeout(200)];
                            case 1:
                                _a.sent();
                                if (!isInstalled()) {
                                    throw new Error("Wallet not installed");
                                }
                                wallet = window.near;
                                wallet.on("accountChanged", function (newAccountId) { return __awaiter(_this, void 0, void 0, function () {
                                    var e_1;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                logger.log("SenderWallet:onAccountChange", newAccountId);
                                                _a.label = 1;
                                            case 1:
                                                _a.trys.push([1, 4, , 5]);
                                                return [4 /*yield*/, this.signOut()];
                                            case 2:
                                                _a.sent();
                                                return [4 /*yield*/, this.signIn()];
                                            case 3:
                                                _a.sent();
                                                return [3 /*break*/, 5];
                                            case 4:
                                                e_1 = _a.sent();
                                                logger.log("Failed to change account ".concat(e_1.message));
                                                return [3 /*break*/, 5];
                                            case 5: return [2 /*return*/];
                                        }
                                    });
                                }); });
                                wallet.on("rpcChanged", function (response) {
                                    if (options.networkId !== response.rpc.networkId) {
                                        updateState(function (prevState) { return (__assign(__assign({}, prevState), { showModal: true, showWalletOptions: false, showSwitchNetwork: true })); });
                                    }
                                });
                                return [2 /*return*/];
                        }
                    });
                });
            },
            signIn: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var accessKey;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!isInstalled()) {
                                    return [2 /*return*/, updateState(function (prevState) { return (__assign(__assign({}, prevState), { showWalletOptions: false, showSenderWalletNotInstalled: true })); })];
                                }
                                if (!!wallet) return [3 /*break*/, 2];
                                return [4 /*yield*/, this.init()];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2: return [4 /*yield*/, wallet.requestSignIn({
                                    contractId: options.contract.contractId,
                                    methodNames: options.contract.methodNames,
                                })];
                            case 3:
                                accessKey = (_a.sent()).accessKey;
                                if (!accessKey) {
                                    throw new Error("Failed to sign in");
                                }
                                updateState(function (prevState) { return (__assign(__assign({}, prevState), { showModal: false, selectedWalletId: _this.id })); });
                                emitter.emit("signIn");
                                return [2 /*return*/];
                        }
                    });
                });
            },
            isSignedIn: function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, wallet.isSignedIn()];
                    });
                });
            },
            signOut: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var res;
                    return __generator(this, function (_a) {
                        res = wallet.signOut();
                        if (!res) {
                            throw new Error("Failed to sign out");
                        }
                        updateState(function (prevState) { return (__assign(__assign({}, prevState), { selectedWalletId: null })); });
                        emitter.emit("signOut");
                        return [2 /*return*/];
                    });
                });
            },
            getAccount: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var signedIn, accountId, account;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.isSignedIn()];
                            case 1:
                                signedIn = _a.sent();
                                if (!signedIn) {
                                    return [2 /*return*/, null];
                                }
                                accountId = wallet.getAccountId();
                                return [4 /*yield*/, provider.viewAccount({ accountId: accountId })];
                            case 2:
                                account = _a.sent();
                                return [2 /*return*/, {
                                        accountId: accountId,
                                        balance: account.amount,
                                    }];
                        }
                    });
                });
            },
            signAndSendTransaction: function (_a) {
                var receiverId = _a.receiverId, actions = _a.actions;
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        logger.log("SenderWallet:signAndSendTransaction", {
                            receiverId: receiverId,
                            actions: actions,
                        });
                        return [2 /*return*/, wallet
                                .signAndSendTransaction({
                                receiverId: receiverId,
                                actions: transformActions(actions),
                            })
                                .then(function (res) {
                                var _a;
                                if (res.error) {
                                    throw new Error(res.error);
                                }
                                // Shouldn't happen but avoids inconsistent responses.
                                if (!((_a = res.response) === null || _a === void 0 ? void 0 : _a.length)) {
                                    throw new Error("Invalid response");
                                }
                                return res.response[0];
                            })];
                    });
                });
            },
        };
    };
}
export default setupSenderWallet;
