"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.PersistentStorage = void 0;
var constants_1 = require("../constants");
var PersistentStorage = /** @class */ (function () {
    function PersistentStorage(prefix, storage) {
        if (prefix === void 0) { prefix = constants_1.PACKAGE_NAME; }
        if (storage === void 0) { storage = window === null || window === void 0 ? void 0 : window.localStorage; }
        this.prefix = prefix;
        this.storage = storage;
        this.map = new Map();
        if (!storage) {
            throw new Error("No storage available");
        }
        if (PersistentStorage.instances.has(prefix)) {
            return PersistentStorage.instances.get(prefix);
        }
        PersistentStorage.instances.set(prefix, this);
        this.init();
    }
    PersistentStorage.prototype.init = function () {
        for (var i = 0; i < this.storage.length; i++) {
            var key = this.storage.key(i);
            if (key === null || key === void 0 ? void 0 : key.startsWith("".concat(this.prefix, ":"))) {
                var value = this.storage.getItem(key);
                if (value) {
                    this.map.set(key.replace("".concat(this.prefix, ":"), ""), value);
                }
            }
        }
    };
    PersistentStorage.prototype.clear = function () {
        this.map.clear();
        this.storage.clear();
    };
    PersistentStorage.prototype.getItem = function (key) {
        var value = this.map.get(key);
        return typeof value !== "undefined" ? JSON.parse(value) : null;
    };
    PersistentStorage.prototype.key = function (index) {
        return Object.keys(Object.fromEntries(this.map))[index] || null;
    };
    PersistentStorage.prototype.setItem = function (key, value) {
        var valueToString = JSON.stringify(value);
        this.map.set(key, valueToString);
        this.storage.setItem("".concat(this.prefix, ":").concat(key), valueToString);
    };
    PersistentStorage.prototype.removeItem = function (key) {
        this.map.delete(key);
        this.storage.removeItem("".concat(this.prefix, ":").concat(key));
    };
    Object.defineProperty(PersistentStorage.prototype, "length", {
        get: function () {
            return this.map.size;
        },
        enumerable: false,
        configurable: true
    });
    PersistentStorage.instances = new Map();
    return PersistentStorage;
}());
exports.PersistentStorage = PersistentStorage;
exports.storage = new PersistentStorage();
