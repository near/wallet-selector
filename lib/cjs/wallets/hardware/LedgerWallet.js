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
var errors_1 = require("near-api-js/lib/utils/errors");
var is_mobile_1 = __importDefault(require("is-mobile"));
var LedgerClient_1 = __importDefault(require("./LedgerClient"));
var actions_1 = require("../actions");
var constants_1 = require("../../constants");
var icons_1 = require("../icons");
function setupLedgerWallet() {
    return function LedgerWallet(_a) {
        var _this = this;
        var provider = _a.provider, emitter = _a.emitter, logger = _a.logger, storage = _a.storage, updateState = _a.updateState;
        var client;
        var subscriptions = {};
        var state = { authData: null };
        var debugMode = false;
        var signOut = function () { return __awaiter(_this, void 0, void 0, function () {
            var key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        for (key in subscriptions) {
                            subscriptions[key].remove();
                        }
                        storage.removeItem(constants_1.LOCAL_STORAGE_LEDGER_WALLET_AUTH_DATA);
                        if (!client) return [3 /*break*/, 2];
                        return [4 /*yield*/, client.disconnect()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        updateState(function (prevState) { return (__assign(__assign({}, prevState), { selectedWalletId: null })); });
                        emitter.emit("signOut");
                        state.authData = null;
                        client = null;
                        return [2 /*return*/];
                }
            });
        }); };
        var getClient = function () { return __awaiter(_this, void 0, void 0, function () {
            var ledgerClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (client) {
                            return [2 /*return*/, client];
                        }
                        ledgerClient = new LedgerClient_1.default();
                        return [4 /*yield*/, ledgerClient.connect()];
                    case 1:
                        _a.sent();
                        ledgerClient.setScrambleKey("NEAR");
                        subscriptions.disconnect = ledgerClient.on("disconnect", function (err) {
                            logger.error(err);
                            signOut();
                        });
                        if (debugMode) {
                            subscriptions.logs = ledgerClient.listen(function (data) {
                                logger.log("LedgerWallet:init:logs", data);
                            });
                        }
                        client = ledgerClient;
                        return [2 /*return*/, ledgerClient];
                }
            });
        }); };
        var validate = function (_a) {
            var accountId = _a.accountId, derivationPath = _a.derivationPath;
            return __awaiter(_this, void 0, void 0, function () {
                var ledgerClient, publicKey, accessKey, err_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            logger.log("LedgerWallet:validate", { accountId: accountId, derivationPath: derivationPath });
                            return [4 /*yield*/, getClient()];
                        case 1:
                            ledgerClient = _b.sent();
                            return [4 /*yield*/, ledgerClient.getPublicKey({
                                    derivationPath: derivationPath,
                                })];
                        case 2:
                            publicKey = _b.sent();
                            logger.log("LedgerWallet:validate:publicKey", { publicKey: publicKey });
                            _b.label = 3;
                        case 3:
                            _b.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, provider.viewAccessKey({
                                    accountId: accountId,
                                    publicKey: publicKey,
                                })];
                        case 4:
                            accessKey = _b.sent();
                            logger.log("LedgerWallet:validate:accessKey", { accessKey: accessKey });
                            if (accessKey.permission !== "FullAccess") {
                                throw new Error("Public key requires 'FullAccess' permission");
                            }
                            return [2 /*return*/, {
                                    publicKey: publicKey,
                                    accessKey: accessKey,
                                }];
                        case 5:
                            err_1 = _b.sent();
                            if (err_1 instanceof errors_1.TypedError && err_1.type === "AccessKeyDoesNotExist") {
                                return [2 /*return*/, {
                                        publicKey: publicKey,
                                        accessKey: null,
                                    }];
                            }
                            throw err_1;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        return {
            id: "ledger-wallet",
            type: "hardware",
            name: "Ledger Wallet",
            description: null,
            iconUrl: icons_1.ledgerWalletIcon,
            isAvailable: function () {
                if (!LedgerClient_1.default.isSupported()) {
                    return false;
                }
                if ((0, is_mobile_1.default)()) {
                    return false;
                }
                return true;
            },
            init: function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        state.authData = storage.getItem(constants_1.LOCAL_STORAGE_LEDGER_WALLET_AUTH_DATA);
                        return [2 /*return*/];
                    });
                });
            },
            signIn: function (_a) {
                var accountId = _a.accountId, derivationPath = _a.derivationPath;
                return __awaiter(this, void 0, void 0, function () {
                    var _b, publicKey, accessKey, authData;
                    var _this = this;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, this.isSignedIn()];
                            case 1:
                                if (_c.sent()) {
                                    return [2 /*return*/];
                                }
                                if (!accountId) {
                                    throw new Error("Invalid account id");
                                }
                                if (!derivationPath) {
                                    throw new Error("Invalid derivation path");
                                }
                                return [4 /*yield*/, validate({
                                        accountId: accountId,
                                        derivationPath: derivationPath,
                                    })];
                            case 2:
                                _b = _c.sent(), publicKey = _b.publicKey, accessKey = _b.accessKey;
                                if (!accessKey) {
                                    throw new Error("Public key is not registered with the account '".concat(accountId, "'."));
                                }
                                authData = {
                                    accountId: accountId,
                                    derivationPath: derivationPath,
                                    publicKey: publicKey,
                                };
                                storage.setItem(constants_1.LOCAL_STORAGE_LEDGER_WALLET_AUTH_DATA, authData);
                                state.authData = authData;
                                updateState(function (prevState) { return (__assign(__assign({}, prevState), { showModal: false, selectedWalletId: _this.id })); });
                                emitter.emit("signIn");
                                return [2 /*return*/];
                        }
                    });
                });
            },
            signOut: signOut,
            isSignedIn: function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, !!state.authData];
                    });
                });
            },
            getAccount: function () {
                var _a;
                return __awaiter(this, void 0, void 0, function () {
                    var signedIn, accountId, account;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, this.isSignedIn()];
                            case 1:
                                signedIn = _b.sent();
                                accountId = (_a = state.authData) === null || _a === void 0 ? void 0 : _a.accountId;
                                if (!signedIn || !accountId) {
                                    return [2 /*return*/, null];
                                }
                                return [4 /*yield*/, provider.viewAccount({ accountId: accountId })];
                            case 2:
                                account = _b.sent();
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
                    var _b, accountId, derivationPath, publicKey, ledgerClient, _c, block, accessKey, transaction, serializedTx, signature, signedTx;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                logger.log("LedgerWallet:signAndSendTransaction", {
                                    receiverId: receiverId,
                                    actions: actions,
                                });
                                if (!state.authData) {
                                    throw new Error("Not signed in");
                                }
                                _b = state.authData, accountId = _b.accountId, derivationPath = _b.derivationPath, publicKey = _b.publicKey;
                                return [4 /*yield*/, getClient()];
                            case 1:
                                ledgerClient = _d.sent();
                                return [4 /*yield*/, Promise.all([
                                        provider.block({ finality: "final" }),
                                        provider.viewAccessKey({ accountId: accountId, publicKey: publicKey }),
                                    ])];
                            case 2:
                                _c = _d.sent(), block = _c[0], accessKey = _c[1];
                                logger.log("LedgerWallet:signAndSendTransaction:block", block);
                                logger.log("LedgerWallet:signAndSendTransaction:accessKey", accessKey);
                                transaction = near_api_js_1.transactions.createTransaction(accountId, near_api_js_1.utils.PublicKey.from(publicKey), receiverId, accessKey.nonce + 1, (0, actions_1.transformActions)(actions), near_api_js_1.utils.serialize.base_decode(block.header.hash));
                                serializedTx = near_api_js_1.utils.serialize.serialize(near_api_js_1.transactions.SCHEMA, transaction);
                                return [4 /*yield*/, ledgerClient.sign({
                                        data: serializedTx,
                                        derivationPath: derivationPath,
                                    })];
                            case 3:
                                signature = _d.sent();
                                signedTx = new near_api_js_1.transactions.SignedTransaction({
                                    transaction: transaction,
                                    signature: new near_api_js_1.transactions.Signature({
                                        keyType: transaction.publicKey.keyType,
                                        data: signature,
                                    }),
                                });
                                return [2 /*return*/, provider.sendTransaction(signedTx)];
                        }
                    });
                });
            },
        };
    };
}
exports.default = setupLedgerWallet;
