"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.set = exports.get = void 0;
var get = function (k) {
    var v = localStorage.getItem(k);
    if ((v === null || v === void 0 ? void 0 : v.charAt(0)) !== '{') {
        return v;
    }
    try {
        return JSON.parse(v);
    }
    catch (e) {
        console.warn(e);
    }
};
exports.get = get;
var set = function (k, v) { return localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v)); };
exports.set = set;
var del = function (k) { return localStorage.removeItem(k); };
exports.del = del;
