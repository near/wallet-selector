import { WebStorageService } from "./web-storage.service";

describe("WebStorageService", () => {
  let storageService: WebStorageService;
  let mockLocalStorage: Storage;

  beforeEach(() => {
    mockLocalStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      length: 0,
      key: jest.fn(),
    };

    Object.defineProperty(global, "localStorage", {
      value: mockLocalStorage,
      writable: true,
      configurable: true,
    });

    storageService = new WebStorageService();
  });

  afterEach(() => {
    // @ts-expect-error - Removing for cleanup
    delete global.localStorage;
  });

  describe("getItem", () => {
    it("should get item from localStorage", async () => {
      (mockLocalStorage.getItem as jest.Mock).mockReturnValue("test-value");

      const result = await storageService.getItem("test-key");

      expect(result).toBe("test-value");
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith("test-key");
    });

    it("should return null when item does not exist", async () => {
      (mockLocalStorage.getItem as jest.Mock).mockReturnValue(null);

      const result = await storageService.getItem("non-existent");

      expect(result).toBeNull();
    });

    it("should return null when localStorage is undefined (server-side)", async () => {
      // @ts-expect-error - Intentionally removing for test
      delete global.localStorage;

      storageService = new WebStorageService();

      const result = await storageService.getItem("test-key");

      expect(result).toBeNull();
    });
  });

  describe("setItem", () => {
    it("should set item to localStorage", async () => {
      await storageService.setItem("test-key", "test-value");

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "test-key",
        "test-value"
      );
    });

    it("should handle different value types", async () => {
      await storageService.setItem("string-key", "value");
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "string-key",
        "value"
      );

      await storageService.setItem("number-key", "123");
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "number-key",
        "123"
      );
    });

    it("should not throw error when localStorage is undefined (server-side)", async () => {
      // @ts-expect-error - Intentionally removing for test
      delete global.localStorage;

      storageService = new WebStorageService();

      await expect(
        storageService.setItem("test-key", "test-value")
      ).resolves.toBeUndefined();
    });
  });

  describe("removeItem", () => {
    it("should remove item from localStorage", async () => {
      await storageService.removeItem("test-key");

      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("test-key");
    });

    it("should not throw error when localStorage is undefined (server-side)", async () => {
      // @ts-expect-error - Intentionally removing for test
      delete global.localStorage;

      storageService = new WebStorageService();

      await expect(
        storageService.removeItem("test-key")
      ).resolves.toBeUndefined();
    });
  });

  describe("async behavior", () => {
    it("should return promises that resolve correctly", async () => {
      (mockLocalStorage.getItem as jest.Mock).mockReturnValue("async-value");

      const promise = storageService.getItem("test-key");

      expect(promise).toBeInstanceOf(Promise);
      const result = await promise;
      expect(result).toBe("async-value");
    });

    it("should handle async setItem correctly", async () => {
      const promise = storageService.setItem("test-key", "test-value");

      expect(promise).toBeInstanceOf(Promise);
      await promise;
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
    });
  });
});
