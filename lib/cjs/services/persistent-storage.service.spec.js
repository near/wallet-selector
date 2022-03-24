"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var persistent_storage_service_1 = require("./persistent-storage.service");
var jest_mock_extended_1 = require("jest-mock-extended");
describe("PersistentStorage Unit Tests", function () {
    var prefix = "prefix";
    var key = "testKey";
    var value = "testValue";
    var storage;
    var persistentStorage;
    beforeAll(function () {
        storage = (0, jest_mock_extended_1.mock)();
        persistentStorage = new persistent_storage_service_1.PersistentStorage(prefix, storage);
    });
    beforeEach(function () {
        // Reset the mock after the JS stack has cleared
        persistentStorage.clear();
        (0, jest_mock_extended_1.mockReset)(storage);
    });
    it("should exist", function () {
        expect(persistent_storage_service_1.PersistentStorage).toBeTruthy();
    });
    it("should instanciate as a singleton", function () {
        var persistentStorage2 = new persistent_storage_service_1.PersistentStorage(prefix, storage);
        expect(persistentStorage).toBe(persistentStorage2);
    });
    it("should init properly", function () {
        var initPrefix = "init";
        var initKey = "testKey";
        var initValue = JSON.stringify("testValue");
        var initStorage = (0, jest_mock_extended_1.mock)({
            getItem: jest.fn().mockImplementation(function () { return initValue; }),
            length: 1,
            key: jest.fn().mockImplementation(function () { return "".concat(initPrefix, ":").concat(initKey); }),
        });
        var initPersistantStorage = new persistent_storage_service_1.PersistentStorage(initPrefix, initStorage);
        var found = initPersistantStorage.getItem(initKey);
        expect(found).toBe(JSON.parse(initValue));
        expect(initStorage.getItem).toHaveBeenCalledWith("".concat(initPrefix, ":").concat(initKey));
        expect(initPersistantStorage.length).toBe(1);
    });
    it("should set and get a value and sync to localstorage", function () {
        persistentStorage.setItem(key, value);
        var setValue = persistentStorage.getItem(key);
        expect(setValue).toBe(value);
        expect(storage.setItem).toHaveBeenCalledWith("".concat(prefix, ":").concat(key), JSON.stringify(value));
        expect(storage.getItem).toBeCalledTimes(0);
    });
    it("should get storage size and it should replace values if key is repeated", function () {
        persistentStorage.setItem("test", "test");
        persistentStorage.setItem("test2", "test");
        persistentStorage.setItem("test3", "test");
        persistentStorage.setItem("test", "test");
        var size = persistentStorage.length;
        expect(size).toBe(3);
    });
    it("should clear the storage", function () {
        persistentStorage.setItem("test", "test");
        persistentStorage.setItem("test2", "test");
        persistentStorage.setItem("test3", "test");
        persistentStorage.clear();
        var size = persistentStorage.length;
        expect(size).toBe(0);
        expect(storage.clear).toBeCalledTimes(1);
    });
    it("should remove item", function () {
        var testKey = "testRemovalKey";
        var testValue = "testRemovalValue";
        persistentStorage.setItem(key, value);
        persistentStorage.setItem(testKey, testValue);
        persistentStorage.removeItem(testKey);
        expect(persistentStorage.getItem(testKey)).toBe(null);
        expect(persistentStorage.getItem(key)).toBe(value);
    });
    it("should set a prefix on storage", function () {
        persistentStorage.setItem(key, value);
        expect(storage.setItem).toBeCalledWith("".concat(prefix, ":").concat(key), JSON.stringify(value));
    });
    it("should get a key", function () {
        persistentStorage.setItem(key, value);
        var existing = persistentStorage.key(0);
        expect(existing).toEqual(key);
    });
});
