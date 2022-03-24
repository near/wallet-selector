"use strict";
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
var ProviderService_1 = __importDefault(require("./ProviderService"));
var jest_mock_extended_1 = require("jest-mock-extended");
var near_api_js_1 = require("near-api-js");
var providerServiceMocks_1 = require("./providerServiceMocks");
var defaults = {
    url: "https://rpc.testnet.near.org",
};
var setup = function (url) {
    var provider = (0, jest_mock_extended_1.mock)();
    jest.spyOn(near_api_js_1.providers, "JsonRpcProvider").mockImplementation(function () { return provider; });
    return {
        provider: provider,
        service: new ProviderService_1.default(url),
    };
};
afterEach(function () {
    jest.resetAllMocks();
});
describe("query", function () {
    it("forwards params to the near-api-js JsonRpcProvider", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, service, provider, params;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = setup(defaults.url), service = _a.service, provider = _a.provider;
                    params = {
                        request_type: "call_function",
                        finality: "final",
                        account_id: "accountId",
                        method_name: "methodName",
                        args_base64: "e30=",
                    };
                    provider.query.mockResolvedValue((0, providerServiceMocks_1.createQueryResponseMock)());
                    return [4 /*yield*/, service.query(params)];
                case 1:
                    _b.sent();
                    expect(provider.query).toHaveBeenCalledWith(params);
                    return [2 /*return*/];
            }
        });
    }); });
    it("correctly parses the response", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, service, provider, data, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = setup(defaults.url), service = _a.service, provider = _a.provider;
                    data = (0, providerServiceMocks_1.createQueryResponseMock)();
                    provider.query.mockResolvedValue(data);
                    return [4 /*yield*/, service.query({
                            request_type: "call_function",
                            finality: "final",
                            account_id: "accountId",
                            method_name: "methodName",
                            args_base64: "e30=",
                        })];
                case 1:
                    response = _b.sent();
                    expect(response).toEqual(data);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("callFunction", function () {
    it("forwards params to the near-api-js JsonRpcProvider", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, service, provider, params;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = setup(defaults.url), service = _a.service, provider = _a.provider;
                    params = {
                        accountId: "accountId",
                        methodName: "methodName",
                        args: {},
                        finality: "final",
                    };
                    provider.query.mockResolvedValue((0, providerServiceMocks_1.createFunctionCallResponseMock)([]));
                    return [4 /*yield*/, service.callFunction(params)];
                case 1:
                    _b.sent();
                    expect(provider.query).toHaveBeenCalledWith({
                        request_type: "call_function",
                        finality: params.finality,
                        account_id: params.accountId,
                        method_name: params.methodName,
                        args_base64: Buffer.from(JSON.stringify(params.args)).toString("base64"),
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("correctly parses the response", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, service, provider, data, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = setup(defaults.url), service = _a.service, provider = _a.provider;
                    data = [];
                    provider.query.mockResolvedValue((0, providerServiceMocks_1.createFunctionCallResponseMock)(data));
                    return [4 /*yield*/, service.callFunction({
                            accountId: "accountId",
                            methodName: "methodName",
                            args: {},
                        })];
                case 1:
                    response = _b.sent();
                    expect(response).toEqual(data);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("viewAccessKey", function () {
    it("forwards params to the near-api-js JsonRpcProvider", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, service, provider, params;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = setup(defaults.url), service = _a.service, provider = _a.provider;
                    params = {
                        accountId: "accountId",
                        publicKey: "publicKey",
                    };
                    provider.query.mockResolvedValue((0, providerServiceMocks_1.createViewAccessKeyResponseMock)());
                    return [4 /*yield*/, service.viewAccessKey(params)];
                case 1:
                    _b.sent();
                    expect(provider.query).toHaveBeenCalledWith({
                        request_type: "view_access_key",
                        finality: "final",
                        account_id: params.accountId,
                        public_key: params.publicKey,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("correctly parses the response", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, service, provider, data, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = setup(defaults.url), service = _a.service, provider = _a.provider;
                    data = (0, providerServiceMocks_1.createViewAccessKeyResponseMock)();
                    provider.query.mockResolvedValue(data);
                    return [4 /*yield*/, service.viewAccessKey({
                            accountId: "accountId",
                            publicKey: "publicKey",
                        })];
                case 1:
                    response = _b.sent();
                    expect(response).toEqual(data);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("viewAccount", function () {
    it("forwards params to the near-api-js JsonRpcProvider", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, service, provider, params;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = setup(defaults.url), service = _a.service, provider = _a.provider;
                    params = {
                        accountId: "accountId",
                    };
                    provider.query.mockResolvedValue((0, providerServiceMocks_1.createViewAccountResponseMock)());
                    return [4 /*yield*/, service.viewAccount(params)];
                case 1:
                    _b.sent();
                    expect(provider.query).toHaveBeenCalledWith({
                        request_type: "view_account",
                        finality: "final",
                        account_id: params.accountId,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("correctly parses the response", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, service, provider, data, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = setup(defaults.url), service = _a.service, provider = _a.provider;
                    data = (0, providerServiceMocks_1.createViewAccountResponseMock)();
                    provider.query.mockResolvedValue(data);
                    return [4 /*yield*/, service.viewAccount({ accountId: "accountId" })];
                case 1:
                    response = _b.sent();
                    expect(response).toEqual(data);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("block", function () {
    it("forwards params to the near-api-js JsonRpcProvider", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, service, provider, reference;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = setup(defaults.url), service = _a.service, provider = _a.provider;
                    reference = {};
                    provider.block.mockResolvedValue({});
                    return [4 /*yield*/, service.block(reference)];
                case 1:
                    _b.sent();
                    expect(provider.block).toHaveBeenCalledWith(reference);
                    return [2 /*return*/];
            }
        });
    }); });
    it("correctly parses the response", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, service, provider, reference, data, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = setup(defaults.url), service = _a.service, provider = _a.provider;
                    reference = {};
                    data = {};
                    provider.block.mockResolvedValue(data);
                    return [4 /*yield*/, service.block(reference)];
                case 1:
                    response = _b.sent();
                    expect(response).toEqual(data);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("sendTransaction", function () {
    it("forwards params to the near-api-js JsonRpcProvider", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, service, provider, signedTransaction;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = setup(defaults.url), service = _a.service, provider = _a.provider;
                    signedTransaction = {};
                    provider.sendTransaction.mockResolvedValue({});
                    return [4 /*yield*/, service.sendTransaction(signedTransaction)];
                case 1:
                    _b.sent();
                    expect(provider.sendTransaction).toHaveBeenCalledWith(signedTransaction);
                    return [2 /*return*/];
            }
        });
    }); });
    it("correctly parses the response", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, service, provider, signedTransaction, data, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = setup(defaults.url), service = _a.service, provider = _a.provider;
                    signedTransaction = {};
                    data = {};
                    provider.sendTransaction.mockResolvedValue(data);
                    return [4 /*yield*/, service.sendTransaction(signedTransaction)];
                case 1:
                    response = _b.sent();
                    expect(response).toEqual(data);
                    return [2 /*return*/];
            }
        });
    }); });
});
