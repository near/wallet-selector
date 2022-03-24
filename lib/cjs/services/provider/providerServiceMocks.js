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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createViewAccountResponseMock = exports.createViewAccessKeyResponseMock = exports.createFunctionCallResponseMock = exports.createQueryResponseMock = void 0;
var createQueryResponseMock = function () { return ({
    block_height: 0,
    block_hash: "",
}); };
exports.createQueryResponseMock = createQueryResponseMock;
var createFunctionCallResponseMock = function (data) { return (__assign(__assign({}, (0, exports.createQueryResponseMock)()), { result: JSON.stringify(data)
        .split("")
        .map(function (x) { return x.charCodeAt(0); }), logs: [] })); };
exports.createFunctionCallResponseMock = createFunctionCallResponseMock;
var createViewAccessKeyResponseMock = function () { return (__assign(__assign({}, (0, exports.createQueryResponseMock)()), { nonce: 0, permission: "FullAccess" })); };
exports.createViewAccessKeyResponseMock = createViewAccessKeyResponseMock;
var createViewAccountResponseMock = function () { return (__assign(__assign({}, (0, exports.createQueryResponseMock)()), { amount: "0", code_hash: "11111111111111111111111111111111", locked: "0", storage_paid_at: 0, storage_usage: 0 })); };
exports.createViewAccountResponseMock = createViewAccountResponseMock;
