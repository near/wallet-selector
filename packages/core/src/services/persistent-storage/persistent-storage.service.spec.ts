import { PersistentStorage } from "./persistent-storage.service";
import { mock, mockReset } from "jest-mock-extended";

describe("PersistentStorage Unit Tests", () => {
  const prefix = "prefix";
  const key = "testKey";
  const value = "testValue";
  let storage: Storage;
  let persistentStorage: PersistentStorage;

  beforeAll(() => {
    storage = mock<Storage>();
    persistentStorage = new PersistentStorage(prefix, storage);
  });

  beforeEach(() => {
    // Reset the mock after the JS stack has cleared
    persistentStorage.clear();
    mockReset(storage);
  });

  it("should exist", () => {
    expect(PersistentStorage).toBeTruthy();
  });

  it("should instanciate as a singleton", () => {
    const persistentStorage2 = new PersistentStorage(prefix, storage);
    expect(persistentStorage).toBe(persistentStorage2);
  });

  it("should init properly", () => {
    const initPrefix = "init";
    const initKey = "testKey";
    const initValue = JSON.stringify("testValue");
    const initStorage = mock<Storage>({
      getItem: jest.fn().mockImplementation(() => initValue),
      length: 1,
      key: jest.fn().mockImplementation(() => `${initPrefix}:${initKey}`),
    });

    const initPersistantStorage = new PersistentStorage(
      initPrefix,
      initStorage
    );

    const found = initPersistantStorage.getItem(initKey);
    expect(found).toBe(JSON.parse(initValue));
    expect(initStorage.getItem).toHaveBeenCalledWith(
      `${initPrefix}:${initKey}`
    );
    expect(initPersistantStorage.length).toBe(1);
  });

  it("should set and get a value and sync to localstorage", () => {
    persistentStorage.setItem(key, value);
    const setValue = persistentStorage.getItem(key);
    expect(setValue).toBe(value);
    expect(storage.setItem).toHaveBeenCalledWith(
      `${prefix}:${key}`,
      JSON.stringify(value)
    );
    expect(storage.getItem).toBeCalledTimes(0);
  });

  it("should get storage size and it should replace values if key is repeated", () => {
    persistentStorage.setItem("test", "test");
    persistentStorage.setItem("test2", "test");
    persistentStorage.setItem("test3", "test");
    persistentStorage.setItem("test", "test");
    const size = persistentStorage.length;
    expect(size).toBe(3);
  });

  it("should clear the storage", () => {
    persistentStorage.setItem("test", "test");
    persistentStorage.setItem("test2", "test");
    persistentStorage.setItem("test3", "test");
    persistentStorage.clear();
    const size = persistentStorage.length;
    expect(size).toBe(0);
    expect(storage.clear).toBeCalledTimes(1);
  });

  it("should remove item", () => {
    const testKey = "testRemovalKey";
    const testValue = "testRemovalValue";
    persistentStorage.setItem(key, value);
    persistentStorage.setItem(testKey, testValue);
    persistentStorage.removeItem(testKey);
    expect(persistentStorage.getItem(testKey)).toBe(null);
    expect(persistentStorage.getItem(key)).toBe(value);
  });

  it("should set a prefix on storage", () => {
    persistentStorage.setItem(key, value);
    expect(storage.setItem).toBeCalledWith(
      `${prefix}:${key}`,
      JSON.stringify(value)
    );
  });

  it("should get a key", () => {
    persistentStorage.setItem(key, value);
    const existing = persistentStorage.key(0);
    expect(existing).toEqual(key);
  });
});
