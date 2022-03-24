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
var near_api_js_1 = require("near-api-js");
var config_1 = __importDefault(require("../../config"));
var actions_1 = require("../actions");
var constants_1 = require("../../constants");
var icons_1 = require("../icons");
function setupNearWallet() {
    return function NearWallet(_a) {
        var options = _a.options, emitter = _a.emitter, logger = _a.logger, storage = _a.storage, updateState = _a.updateState;
        var keyStore;
        var wallet;
        return {
            id: "near-wallet",
            type: "browser",
            name: "NEAR Wallet",
            description: null,
            iconUrl: icons_1.nearWalletIcon,
            isAvailable: function () {
                return true;
            },
            init: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var localStorageKeyStore, near;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                localStorageKeyStore = new near_api_js_1.keyStores.BrowserLocalStorageKeyStore();
                                return [4 /*yield*/, (0, near_api_js_1.connect)(__assign(__assign({ keyStore: localStorageKeyStore }, (0, config_1.default)(options.networkId)), { headers: {} }))];
                            case 1:
                                near = _a.sent();
                                wallet = new near_api_js_1.WalletConnection(near, "near_app");
                                keyStore = localStorageKeyStore;
                                if (!!wallet.isSignedIn()) return [3 /*break*/, 3];
                                return [4 /*yield*/, localStorageKeyStore.clear()];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            },
            // We don't emit "signIn" or update state as we can't guarantee the user will
            // actually sign in. Best we can do is temporarily set it as selected and
            // validate on initialise.
            signIn: function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
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
                                _a.sent();
                                storage.setItem(constants_1.LOCAL_STORAGE_SELECTED_WALLET_ID, this.id);
                                return [2 /*return*/];
                        }
                    });
                });
            },
            signOut: function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!wallet) {
                                    return [2 /*return*/];
                                }
                                wallet.signOut();
                                return [4 /*yield*/, keyStore.clear()];
                            case 1:
                                _a.sent();
                                updateState(function (prevState) { return (__assign(__assign({}, prevState), { selectedWalletId: null })); });
                                emitter.emit("signOut");
                                return [2 /*return*/];
                        }
                    });
                });
            },
            isSignedIn: function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (!wallet) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, wallet.isSignedIn()];
                    });
                });
            },
            getAccount: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var signedIn, accountId, state;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.isSignedIn()];
                            case 1:
                                signedIn = _a.sent();
                                if (!signedIn) {
                                    return [2 /*return*/, null];
                                }
                                accountId = wallet.getAccountId();
                                return [4 /*yield*/, wallet.account().state()];
                            case 2:
                                state = _a.sent();
                                return [2 /*return*/, {
                                        accountId: accountId,
                                        balance: state.amount,
                                    }];
                        }
                    });
                });
            },
            signAndSendTransaction: function (_a) {
                var receiverId = _a.receiverId, actions = _a.actions;
                return __awaiter(this, void 0, void 0, function () {
                    var account;
                    return __generator(this, function (_b) {
                        logger.log("NearWallet:signAndSendTransaction", {
                            receiverId: receiverId,
                            actions: actions,
                        });
                        account = wallet.account();
                        // @ts-ignore
                        // near-api-js marks this method as protected.
                        return [2 /*return*/, account.signAndSendTransaction({
                                receiverId: receiverId,
                                actions: (0, actions_1.transformActions)(actions),
                            })];
                    });
                });
            },
        };
    };
}
exports.default = setupNearWallet;
