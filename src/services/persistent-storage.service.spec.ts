import { PersistentStorage } from "./persistent-storage.service";
import { mock, mockReset } from "jest-mock-extended";
import { defer } from "../utils/HelperFunctions";

describe("PersistentStorage Unit Tests", () => {
  let storage: Storage;
  let persistentStorage: PersistentStorage;

  beforeAll(() => {
    storage = mock<Storage>();
    persistentStorage = new PersistentStorage("testing", storage);
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
    const persistentStorage2 = new PersistentStorage("testing", storage);
    expect(persistentStorage).toBe(persistentStorage2);
  });

  it('should init properly', async () => {
    const initStorage = mock<Storage>({
      getItem: jest.fn().mockImplementation(() => "testValue"),
      length: 1,
      key: jest.fn().mockImplementation(() => "inittestKey"),
    });

    const initPersistantStorage = new PersistentStorage("init", initStorage);

    const value = await initPersistantStorage.getItem("testKey");
    expect(value).toBe("testValue");
    expect(initStorage.getItem).toHaveBeenCalledWith("inittestKey");
    expect(initPersistantStorage.length).toBe(1);

  });

  it("should set and get a value and sync to localstorage", async () => {
    await persistentStorage.setItem("test", "test");
    const setValue = await persistentStorage.getItem("test");
    expect(setValue).toBe("test");
  });

  it("should defer setting the value to localstorage until after the JS stack has cleared (performance first)", async () => {
    await persistentStorage.setItem("test", "test");
    expect(storage.setItem).toBeCalledTimes(0);
    await defer(() => {});
    expect(storage.setItem).toBeCalledTimes(1);
  });

  it("should not retrieve value from the localstorage", async () => {
    await persistentStorage.setItem("test", "test");
    const value = await persistentStorage.getItem("test");
    expect(value).toBe("test");
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
    await persistentStorage.setItem("test", "test");
    await persistentStorage.setItem("test2", "test");
    await persistentStorage.removeItem("test2");
    expect(await persistentStorage.getItem('test2')).toBe(null);
    expect(await persistentStorage.getItem('test')).toBe('test');
  });

  it('should set a prefix on storage', async () => {
    await persistentStorage.setItem('test', 'test');
    await defer(() => {});
    expect(storage.setItem).toBeCalledWith('testingtest', 'test');
  });

  it('should get a key', async () => {
    await persistentStorage.setItem('test', 'test');
    const key = await persistentStorage.key(0);
    expect(key).toEqual('test');
  });
});
