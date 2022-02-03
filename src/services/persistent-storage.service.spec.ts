import { PersistentStorage } from "./persistent-storage.service";
import { mock, mockReset } from "jest-mock-extended";
import { defer } from "../utils/HelperFunctions";

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

  afterEach(async () => {
    // Reset the mock after the JS stack has cleared
    await defer(() => {});
    mockReset(storage);
    await persistentStorage.clear();
    await defer(() => {});
  });

  it("should exist", () => {
    expect(PersistentStorage).toBeTruthy();
  });

  it("should instanciate as a singleton", () => {
    const persistentStorage2 = new PersistentStorage(prefix, storage);
    expect(persistentStorage).toBe(persistentStorage2);
  });

  it('should init properly', async () => {
    const initPrefix = "init";
    const initKey = "testKey";
    const initValue = "testValue";
    const initStorage = mock<Storage>({
      getItem: jest.fn().mockImplementation(() => initValue),
      length: 1,
      key: jest.fn().mockImplementation(() => `${initPrefix}${initKey}`),
    });

    const initPersistantStorage = new PersistentStorage(initPrefix, initStorage);

    const found = await initPersistantStorage.getItem(initKey);
    expect(found).toBe(initValue);
    expect(initStorage.getItem).toHaveBeenCalledWith(`${initPrefix}${initKey}`);
    expect(initPersistantStorage.length).toBe(1);

  });

  it("should set and get a value and sync to localstorage", async () => {
    await persistentStorage.setItem(key, value);
    const setValue = await persistentStorage.getItem(key);
    expect(setValue).toBe(value);
  });

  it("should defer setting the value to localstorage until after the JS stack has cleared (performance first)", async () => {
    await persistentStorage.setItem(key, value);
    expect(storage.setItem).toBeCalledTimes(0);
    await defer(() => {});
    expect(storage.setItem).toBeCalledTimes(1);
  });

  it("should not retrieve value from the localstorage", async () => {
    await persistentStorage.setItem(key, value);
    const found = await persistentStorage.getItem(key);
    expect(found).toBe(value);
    expect(storage.getItem).toBeCalledTimes(0);
    await defer(() => {});
    expect(storage.getItem).toBeCalledTimes(0);
  });

  it("should get storage size and it should replace values if key is repeated", async () => {
    await persistentStorage.setItem("test", "test");
    await persistentStorage.setItem("test2", "test");
    await persistentStorage.setItem("test3", "test");
    await persistentStorage.setItem("test", "test");
    const size = persistentStorage.length;
    expect(size).toBe(3);
  });

  it("should clear the storage", async () => {
    await persistentStorage.setItem("test", "test");
    await persistentStorage.setItem("test2", "test");
    await persistentStorage.setItem("test3", "test");
    await persistentStorage.clear();
    const size = persistentStorage.length;
    expect(size).toBe(0);
  });

  it("should remove item", async () => {
    const testKey = "testRemovalKey";
    const testValue = "testRemovalValue";
    await persistentStorage.setItem(key, value);
    await persistentStorage.setItem(testKey, testValue);
    await persistentStorage.removeItem(testKey);
    expect(await persistentStorage.getItem(testKey)).toBe(null);
    expect(await persistentStorage.getItem(key)).toBe(value);
  });

  it('should set a prefix on storage', async () => {
    await persistentStorage.setItem(key, value);
    await defer(() => {});
    expect(storage.setItem).toBeCalledWith(`${prefix}${key}`, value);
  });

  it('should get a key', async () => {
    await persistentStorage.setItem(key, value);
    const existing = await persistentStorage.key(0);
    expect(existing).toEqual(key);
  });
});
