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
import { ethers } from "ethers";
import * as nearAPI from 'near-api-js';
import { generateSeedPhrase } from 'near-seed-phrase';
import { get, set, del } from './store';
var Near = nearAPI.Near, Account = nearAPI.Account, KeyPair = nearAPI.KeyPair, _a = nearAPI.utils, PublicKey = _a.PublicKey, parseNearAmount = _a.format.parseNearAmount, _b = nearAPI.keyStores, InMemoryKeyStore = _b.InMemoryKeyStore, BrowserLocalStorageKeyStore = _b.BrowserLocalStorageKeyStore;
var CONTRACT_ID = 'neth.testnet';
var MAP_ACCOUNT_ID = 'map.neth.testnet';
var APP_KEY_SECRET = '__APP_KEY_SECRET';
var APP_KEY_ACCOUNT_ID = '__APP_KEY_ACCOUNT_ID';
var gas = '100000000000000';
var networkId = "testnet";
var nodeUrl = "https://rpc.testnet.near.org";
var walletUrl = "https://wallet.testnet.near.org";
var keyStore = new BrowserLocalStorageKeyStore();
var near = new Near({
    networkId: networkId,
    nodeUrl: nodeUrl,
    walletUrl: walletUrl,
    deps: { keyStore: keyStore },
});
var connection = near.connection;
var contractAccount = new Account(connection, CONTRACT_ID);
/// for NEAR keys we need 64 chars hex for publicKey WITHOUT 0x
var pub2hex = function (publicKey) { return ethers.utils.hexlify(PublicKey.fromString(publicKey).data).substring(2); };
var obj2hex = function (obj) { return ethers.utils.hexlify(ethers.utils.toUtf8Bytes(JSON.stringify(obj))).substring(2); };
/// ethereum
var appKeyPayload = function (accountId, appKeyNonce) { return ({
    WARNING: "Creating key for: ".concat(accountId),
    nonce: appKeyNonce,
    description: "ONLY sign this on apps you trust! This key CAN use up to 1 N for transactions.",
}); };
var unlimitedKeyPayload = function (accountId) { return ({
    WARNING: "ACCESS TO NEAR ACCOUNT: ".concat(accountId),
    description: "ONLY sign on this website: ".concat('https://example.com'),
}); };
var domain = {
    name: "NETH",
    version: "1",
    // chainId: 1, // aurora
    chainId: 1313161554, // aurora
};
/// helper gens the args for each call
var ethSignJson = function (signer, json) { return __awaiter(void 0, void 0, void 0, function () {
    var types, sig;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                types = {
                    Transaction: []
                };
                Object.entries(json).forEach(function (_a) {
                    var k = _a[0], v = _a[1];
                    types.Transaction.push({
                        type: 'string',
                        name: k,
                    });
                });
                if (json.actions)
                    json.actions = JSON.stringify(json.actions);
                return [4 /*yield*/, signer._signTypedData(domain, types, json)];
            case 1:
                sig = _a.sent();
                return [2 /*return*/, { sig: sig, msg: json }];
        }
    });
}); };
var keyPairFromEthSig = function (signer, json) { return __awaiter(void 0, void 0, void 0, function () {
    var sig, sigHash;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ethSignJson(signer, json)];
            case 1:
                sig = (_a.sent()).sig;
                sigHash = ethers.utils.id(sig);
                /// use 32 bytes of entropy from hash of signature to create NEAR keyPair
                return [2 /*return*/, generateSeedPhrase(sigHash.substring(2, 34))];
        }
    });
}); };
export var getEthereum = function () { return __awaiter(void 0, void 0, void 0, function () {
    var provider, accounts, signer;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                provider = new ethers.providers.Web3Provider(window.ethereum);
                return [4 /*yield*/, provider.listAccounts()];
            case 1:
                accounts = _b.sent();
                if (!(accounts.length === 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, provider.send("eth_requestAccounts", [])];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                signer = provider.getSigner();
                _a = { signer: signer };
                return [4 /*yield*/, signer.getAddress()];
            case 4: return [2 /*return*/, (_a.ethAddress = _b.sent(), _a)];
        }
    });
}); };
/// near
// part of "install" / connection step
export var hasAppKey = function (accountId) { return __awaiter(void 0, void 0, void 0, function () {
    var account, accessKeys;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                account = new Account(connection, accountId);
                return [4 /*yield*/, account.getAccessKeys()];
            case 1:
                accessKeys = _a.sent();
                return [2 /*return*/, accessKeys.some(function (k) {
                        var _a, _b;
                        var functionCallPermission = (_b = (_a = k === null || k === void 0 ? void 0 : k.access_key) === null || _a === void 0 ? void 0 : _a.permission) === null || _b === void 0 ? void 0 : _b.FunctionCall;
                        return functionCallPermission.allowance !== null && functionCallPermission.method_names[0] === 'execute';
                    })];
        }
    });
}); };
export var getAccount = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, getNear()];
    });
}); };
export var signIn = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, getNear()];
    });
}); };
export var signOut = function () { return __awaiter(void 0, void 0, void 0, function () {
    var accountId;
    return __generator(this, function (_a) {
        accountId = get(APP_KEY_ACCOUNT_ID);
        if (!accountId) {
            return [2 /*return*/, console.warn('already signed out')];
        }
        del(APP_KEY_SECRET);
        del(APP_KEY_ACCOUNT_ID);
        return [2 /*return*/, { accountId: accountId }];
    });
}); };
export var isSignedIn = function () {
    return !!get(APP_KEY_SECRET) || !!get(APP_KEY_ACCOUNT_ID);
};
export var getNear = function () { return __awaiter(void 0, void 0, void 0, function () {
    var secretKey, accountId, _a, account, keyPair;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                secretKey = get(APP_KEY_SECRET);
                accountId = get(APP_KEY_ACCOUNT_ID);
                if (!(!secretKey || !accountId)) return [3 /*break*/, 3];
                _a = getAppKey;
                return [4 /*yield*/, getEthereum()];
            case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
            case 2:
                _b.sent();
                return [2 /*return*/, getNear()];
            case 3:
                account = new Account(connection, accountId);
                keyPair = KeyPair.fromString(secretKey);
                keyStore.setKey(networkId, accountId, keyPair);
                return [2 /*return*/, { account: account, accountId: accountId, keyPair: keyPair, secretKey: secretKey }];
        }
    });
}); };
export var getAppKey = function (_a) {
    var signer = _a.signer, eth_address = _a.ethAddress;
    return __awaiter(void 0, void 0, void 0, function () {
        var accountId, appKeyNonce, _b, _c, publicKey, secretKey, account, keyPair;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, contractAccount.viewFunction(MAP_ACCOUNT_ID, 'get_near', { eth_address: eth_address })];
                case 1:
                    accountId = _d.sent();
                    _b = parseInt;
                    return [4 /*yield*/, contractAccount.viewFunction(accountId, 'get_app_key_nonce')];
                case 2:
                    appKeyNonce = _b.apply(void 0, [_d.sent(), 16]).toString();
                    return [4 /*yield*/, keyPairFromEthSig(signer, appKeyPayload(accountId, appKeyNonce))];
                case 3:
                    _c = _d.sent(), publicKey = _c.publicKey, secretKey = _c.secretKey;
                    account = new Account(connection, accountId);
                    keyPair = KeyPair.fromString(secretKey);
                    keyStore.setKey(networkId, accountId, keyPair);
                    set(APP_KEY_SECRET, secretKey);
                    set(APP_KEY_ACCOUNT_ID, account.accountId);
                    return [2 /*return*/, { publicKey: publicKey, secretKey: secretKey, account: account }];
            }
        });
    });
};
export var signAndSendTransaction = function (_a) {
    var receiverId = _a.receiverId, actions = _a.actions;
    return __awaiter(void 0, void 0, void 0, function () {
        var signer, _b, account, accountId, nonce, _c, args, res;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, getEthereum()];
                case 1:
                    signer = (_d.sent()).signer;
                    return [4 /*yield*/, getNear()];
                case 2:
                    _b = _d.sent(), account = _b.account, accountId = _b.accountId;
                    actions = convertActions(actions, accountId, receiverId);
                    _c = parseInt;
                    return [4 /*yield*/, account.viewFunction(accountId, 'get_nonce')];
                case 3:
                    nonce = _c.apply(void 0, [_d.sent(), 16]).toString();
                    return [4 /*yield*/, ethSignJson(signer, {
                            receiver_id: receiverId,
                            nonce: nonce,
                            actions: actions
                        })];
                case 4:
                    args = _d.sent();
                    return [4 /*yield*/, account.functionCall({
                            contractId: accountId,
                            methodName: 'execute',
                            args: args,
                            gas: gas,
                        })];
                case 5:
                    res = _d.sent();
                    return [2 /*return*/, res];
            }
        });
    });
};
/// helpers
export var convertActions = function (actions, accountId, receiverId) { return actions.map(function (_action) {
    var type, params;
    if (_action.type) {
        type = _action.type;
        params = _action.params;
    }
    else {
        type = _action.enum;
        params = _action[type];
    }
    var gas = params.gas, publicKey = params.publicKey, methodName = params.methodName, args = params.args, deposit = params.deposit, accessKey = params.accessKey, code = params.code;
    var action = {
        type: type[0].toUpperCase() + type.substr(1),
        gas: (gas && gas.toString()) || undefined,
        public_key: (publicKey && pub2hex(publicKey)) || undefined,
        method_name: methodName,
        args: (args && obj2hex(args)) || undefined,
        code: (code && obj2hex(code)) || undefined,
        amount: (deposit && deposit.toString()) || undefined,
        permission: undefined,
    };
    if (accessKey) {
        if (receiverId === accountId) {
            action.allowance = parseNearAmount('1');
            action.method_names = 'execute';
            action.receiver_id = accountId;
        }
        else if (accessKey.permission.enum === 'functionCall') {
            var _a = accessKey.permission.functionCall, receiverId_1 = _a.receiverId, methodNames = _a.methodNames, allowance = _a.allowance;
            action.receiver_id = receiverId_1;
            action.allowance = (allowance && allowance.toString()) || parseNearAmount('0.25');
            action.method_names = methodNames.join(',');
        }
    }
    return action;
}); };
