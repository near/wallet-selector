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
import { mock } from "jest-mock-extended";
import { transactions, utils } from "near-api-js";
import BN from "bn.js";
var createGetVersionResponseMock = function () {
    return Buffer.from([1, 1, 6, 144, 0]);
};
var createGetPublicKeyResponseMock = function () {
    return Buffer.from([
        226, 125, 56, 106, 199, 195, 73, 246, 10, 249, 57, 121, 249, 233, 201, 22,
        102, 15, 131, 165, 129, 76, 109, 40, 170, 241, 102, 140, 43, 133, 200, 31,
        144, 0,
    ]);
};
var createTransactionMock = function () {
    var actions = [
        transactions.functionCall("addMessage", { text: "test" }, new BN(utils.format.parseNearAmount("0.00000000003")), new BN(utils.format.parseNearAmount("0"))),
    ];
    return transactions.createTransaction("test.testnet", utils.PublicKey.from("GF7tLvSzcxX4EtrMFtGvGTb2yUj2DhL8hWzc97BwUkyC"), "guest-book.testnet", 76068360000003, actions, utils.serialize.base_decode("DMgHVMag7MAmtEC17Dpvso5DgvqqYcHzrTpTrA86FG7t"));
};
var createLedgerClient = function (params) {
    if (params === void 0) { params = {}; }
    var client = mock(params.client);
    var transport = mock(params.transport);
    jest.mock("@ledgerhq/hw-transport-webhid", function () {
        return __assign(__assign({}, client), { create: function () { return transport; } });
    });
    var _a = require("./LedgerClient"), LedgerClient = _a.default, CLA = _a.CLA, INS_SIGN = _a.INS_SIGN, INS_GET_APP_VERSION = _a.INS_GET_APP_VERSION, INS_GET_PUBLIC_KEY = _a.INS_GET_PUBLIC_KEY, P1_LAST = _a.P1_LAST, P1_IGNORE = _a.P1_IGNORE, P2_IGNORE = _a.P2_IGNORE, networkId = _a.networkId, parseDerivationPath = _a.parseDerivationPath;
    return {
        client: new LedgerClient(),
        transport: transport,
        parseDerivationPath: parseDerivationPath,
        constants: {
            CLA: CLA,
            INS_SIGN: INS_SIGN,
            INS_GET_APP_VERSION: INS_GET_APP_VERSION,
            INS_GET_PUBLIC_KEY: INS_GET_PUBLIC_KEY,
            P1_LAST: P1_LAST,
            P1_IGNORE: P1_IGNORE,
            P2_IGNORE: P2_IGNORE,
            networkId: networkId,
        },
    };
};
afterEach(function () {
    jest.resetModules();
});
describe("getVersion", function () {
    it("returns the current version", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, client, transport, constants, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = createLedgerClient({
                        transport: {
                            send: jest.fn().mockResolvedValue(createGetVersionResponseMock()),
                        },
                    }), client = _a.client, transport = _a.transport, constants = _a.constants;
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, client.getVersion()];
                case 2:
                    result = _b.sent();
                    expect(transport.send).toHaveBeenCalledWith(constants.CLA, constants.INS_GET_APP_VERSION, constants.P1_IGNORE, constants.P2_IGNORE);
                    expect(result).toEqual("1.1.6");
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("getPublicKey", function () {
    it("returns the public key", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, client, transport, constants, parseDerivationPath, derivationPath, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = createLedgerClient({
                        transport: {
                            send: jest.fn().mockResolvedValue(createGetPublicKeyResponseMock()),
                        },
                    }), client = _a.client, transport = _a.transport, constants = _a.constants, parseDerivationPath = _a.parseDerivationPath;
                    derivationPath = "44'/397'/0'/0'/1'";
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, client.getPublicKey({
                            derivationPath: derivationPath,
                        })];
                case 2:
                    result = _b.sent();
                    expect(transport.send).toHaveBeenCalledWith(constants.CLA, constants.INS_GET_PUBLIC_KEY, constants.P1_IGNORE, constants.networkId, parseDerivationPath(derivationPath));
                    expect(result).toEqual("GF7tLvSzcxX4EtrMFtGvGTb2yUj2DhL8hWzc97BwUkyC");
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("sign", function () {
    it("returns the signature", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, client, transport, constants, transaction, data, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = createLedgerClient({
                        transport: {
                            send: jest.fn().mockResolvedValue(Buffer.from([1, 2, 3])),
                        },
                    }), client = _a.client, transport = _a.transport, constants = _a.constants;
                    transaction = createTransactionMock();
                    data = utils.serialize.serialize(transactions.SCHEMA, transaction);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, client.sign({
                            data: data,
                            derivationPath: "44'/397'/0'/0'/1'",
                        })];
                case 2:
                    result = _b.sent();
                    expect(transport.send).toHaveBeenCalledWith(constants.CLA, constants.INS_GET_APP_VERSION, constants.P1_IGNORE, constants.P2_IGNORE);
                    expect(transport.send).toHaveBeenCalledWith(constants.CLA, constants.INS_SIGN, constants.P1_IGNORE, constants.P2_IGNORE, expect.any(Buffer));
                    expect(transport.send).toHaveBeenCalledWith(constants.CLA, constants.INS_SIGN, constants.P1_LAST, constants.P2_IGNORE, expect.any(Buffer));
                    expect(transport.send).toHaveBeenCalledTimes(3);
                    expect(result).toEqual(Buffer.from([1]));
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("on", function () {
    it("add event to transport", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, client, transport, event, listener;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = createLedgerClient(), client = _a.client, transport = _a.transport;
                    event = "connect";
                    listener = jest.fn();
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, client.on(event, listener)];
                case 2:
                    _b.sent();
                    expect(transport.on).toHaveBeenCalledWith(event, listener);
                    expect(transport.on).toHaveBeenCalledTimes(1);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("off", function () {
    it("remove event from transport", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, client, transport, event, listener;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = createLedgerClient(), client = _a.client, transport = _a.transport;
                    event = "connect";
                    listener = jest.fn();
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, client.off(event, listener)];
                case 2:
                    _b.sent();
                    expect(transport.off).toHaveBeenCalledWith(event, listener);
                    expect(transport.off).toHaveBeenCalledTimes(1);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("setScrambleKey", function () {
    it("run setScrambleKey function", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, client, transport, scrambleKey;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = createLedgerClient({
                        transport: {
                            setScrambleKey: jest.fn(),
                        },
                    }), client = _a.client, transport = _a.transport;
                    scrambleKey = "NEAR";
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, client.setScrambleKey(scrambleKey)];
                case 2:
                    _b.sent();
                    expect(transport.setScrambleKey).toHaveBeenCalledWith(scrambleKey);
                    expect(transport.setScrambleKey).toHaveBeenCalledTimes(1);
                    return [2 /*return*/];
            }
        });
    }); });
});
