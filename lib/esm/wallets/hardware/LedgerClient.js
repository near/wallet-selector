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
import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import { listen } from "@ledgerhq/logs";
import { utils } from "near-api-js";
// Further reading regarding APDU Ledger API:
// - https://gist.github.com/Wollac/49f0c4e318e42f463b8306298dfb4f4a
// - https://github.com/LedgerHQ/app-near/blob/master/workdir/app-near/src/constants.h
export var CLA = 0x80; // Always the same for Ledger.
export var INS_SIGN = 0x02; // Sign
export var INS_GET_PUBLIC_KEY = 0x04; // Get Public Key
export var INS_GET_APP_VERSION = 0x06; // Get App Version
export var P1_LAST = 0x80; // End of Bytes to Sign (finalize)
export var P1_MORE = 0x00; // More bytes coming
export var P1_IGNORE = 0x00;
export var P2_IGNORE = 0x00;
// Converts BIP32-compliant derivation path to a Buffer.
// More info here: https://github.com/LedgerHQ/ledger-live-common/blob/master/docs/derivation.md
export function parseDerivationPath(derivationPath) {
    var parts = derivationPath.split("/");
    return Buffer.concat(parts
        .map(function (part) {
        return part.endsWith("'")
            ? Math.abs(parseInt(part.slice(0, -1))) | 0x80000000
            : Math.abs(parseInt(part));
    })
        .map(function (i32) {
        return Buffer.from([
            (i32 >> 24) & 0xff,
            (i32 >> 16) & 0xff,
            (i32 >> 8) & 0xff,
            i32 & 0xff,
        ]);
    }));
}
// TODO: Understand what this is exactly. What's so special about 87?
export var networkId = "W".charCodeAt(0);
// TODO: Needs a method to assert whether we're connected.
var LedgerClient = /** @class */ (function () {
    function LedgerClient() {
        var _this = this;
        this.connect = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, TransportWebHID.create()];
                    case 1:
                        _a.transport = _b.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.disconnect = function () {
            return _this.transport.close();
        };
        this.listen = function (callback) {
            var unsubscribe = listen(callback);
            return {
                remove: function () { return unsubscribe(); },
            };
        };
        this.setScrambleKey = function (key) {
            _this.transport.setScrambleKey(key);
        };
        this.on = function (event, callback) {
            _this.transport.on(event, callback);
            return {
                remove: function () { return _this.transport.off(event, callback); },
            };
        };
        this.off = function (event, callback) {
            _this.transport.off(event, callback);
        };
        this.getVersion = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, _a, major, minor, patch;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.transport.send(CLA, INS_GET_APP_VERSION, P1_IGNORE, P2_IGNORE)];
                    case 1:
                        res = _b.sent();
                        _a = Array.from(res), major = _a[0], minor = _a[1], patch = _a[2];
                        return [2 /*return*/, "".concat(major, ".").concat(minor, ".").concat(patch)];
                }
            });
        }); };
        this.getPublicKey = function (_a) {
            var derivationPath = _a.derivationPath;
            return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.transport.send(CLA, INS_GET_PUBLIC_KEY, P2_IGNORE, networkId, parseDerivationPath(derivationPath))];
                        case 1:
                            res = _b.sent();
                            return [2 /*return*/, utils.serialize.base_encode(res.subarray(0, -2))];
                    }
                });
            });
        };
        this.sign = function (_a) {
            var data = _a.data, derivationPath = _a.derivationPath;
            return __awaiter(_this, void 0, void 0, function () {
                var CHUNK_SIZE, allData, offset, isLastChunk, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: 
                        // NOTE: getVersion call resets state to avoid starting from partially filled buffer
                        return [4 /*yield*/, this.getVersion()];
                        case 1:
                            // NOTE: getVersion call resets state to avoid starting from partially filled buffer
                            _b.sent();
                            CHUNK_SIZE = 123;
                            allData = Buffer.concat([
                                parseDerivationPath(derivationPath),
                                Buffer.from(data),
                            ]);
                            offset = 0;
                            _b.label = 2;
                        case 2:
                            if (!(offset < allData.length)) return [3 /*break*/, 5];
                            isLastChunk = offset + CHUNK_SIZE >= allData.length;
                            return [4 /*yield*/, this.transport.send(CLA, INS_SIGN, isLastChunk ? P1_LAST : P1_MORE, P2_IGNORE, Buffer.from(allData.subarray(offset, offset + CHUNK_SIZE)))];
                        case 3:
                            response = _b.sent();
                            if (isLastChunk) {
                                return [2 /*return*/, Buffer.from(response.subarray(0, -2))];
                            }
                            _b.label = 4;
                        case 4:
                            offset += CHUNK_SIZE;
                            return [3 /*break*/, 2];
                        case 5: throw new Error("Invalid data or derivation path");
                    }
                });
            });
        };
    }
    // Not using TransportWebHID.isSupported as it's chosen to use a Promise...
    LedgerClient.isSupported = function () {
        var _a;
        return !!((_a = window.navigator) === null || _a === void 0 ? void 0 : _a.hid);
    };
    return LedgerClient;
}());
export default LedgerClient;
