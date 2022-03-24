"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var near_api_js_1 = require("near-api-js");
var ProviderService = /** @class */ (function () {
    function ProviderService(url) {
        this.provider = new near_api_js_1.providers.JsonRpcProvider(url);
    }
    ProviderService.prototype.parseCodeResult = function (res) {
        return JSON.parse(Buffer.from(res.result).toString());
    };
    ProviderService.prototype.encodeArgs = function (args) {
        return Buffer.from(JSON.stringify(args)).toString("base64");
    };
    ProviderService.prototype.query = function (params) {
        return this.provider.query(params);
    };
    ProviderService.prototype.callFunction = function (_a) {
        var _this = this;
        var accountId = _a.accountId, methodName = _a.methodName, _b = _a.args, args = _b === void 0 ? {} : _b, _c = _a.finality, finality = _c === void 0 ? "optimistic" : _c;
        return this.query({
            request_type: "call_function",
            finality: finality,
            account_id: accountId,
            method_name: methodName,
            args_base64: this.encodeArgs(args),
        }).then(function (res) { return _this.parseCodeResult(res); });
    };
    ProviderService.prototype.viewAccessKey = function (_a) {
        var accountId = _a.accountId, publicKey = _a.publicKey;
        return this.query({
            request_type: "view_access_key",
            finality: "final",
            account_id: accountId,
            public_key: publicKey,
        });
    };
    ProviderService.prototype.viewAccount = function (_a) {
        var accountId = _a.accountId;
        return this.query({
            request_type: "view_account",
            finality: "final",
            account_id: accountId,
        });
    };
    ProviderService.prototype.block = function (reference) {
        return this.provider.block(reference);
    };
    ProviderService.prototype.sendTransaction = function (signedTransaction) {
        return this.provider.sendTransaction(signedTransaction);
    };
    return ProviderService;
}());
exports.default = ProviderService;
