import { JsonStorage } from "./json-storage.service";
import type { StorageService } from "./storage.service.types";

describe("JsonStorage", () => {
  let mockStorage: jest.Mocked<StorageService>;
  let jsonStorage: JsonStorage;

  beforeEach(() => {
    mockStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };
  });

  describe("constructor", () => {
    it("should create instance with string namespace", () => {
      jsonStorage = new JsonStorage(mockStorage, "my-namespace");
      expect(jsonStorage).toBeInstanceOf(JsonStorage);
    });

    it("should create instance with array namespace", () => {
      jsonStorage = new JsonStorage(mockStorage, ["level1", "level2"]);
      expect(jsonStorage).toBeInstanceOf(JsonStorage);
    });
  });

  describe("getItem", () => {
    beforeEach(() => {
      jsonStorage = new JsonStorage(mockStorage, "test-namespace");
    });

    it("should get and parse JSON item correctly", async () => {
      const testData = { name: "test", value: 123 };
      mockStorage.getItem.mockResolvedValue(JSON.stringify(testData));

      const result = await jsonStorage.getItem<typeof testData>("my-key");

      expect(result).toEqual(testData);
      expect(mockStorage.getItem).toHaveBeenCalledWith("test-namespace:my-key");
    });

    it("should return null when item does not exist", async () => {
      mockStorage.getItem.mockResolvedValue(null);

      const result = await jsonStorage.getItem("non-existent");

      expect(result).toBeNull();
      expect(mockStorage.getItem).toHaveBeenCalledWith(
        "test-namespace:non-existent"
      );
    });

    it("should handle namespace prefixing correctly", async () => {
      mockStorage.getItem.mockResolvedValue('{"test": true}');

      await jsonStorage.getItem("my-key");

      expect(mockStorage.getItem).toHaveBeenCalledWith("test-namespace:my-key");
    });

    it("should handle array namespace correctly", async () => {
      jsonStorage = new JsonStorage(mockStorage, ["level1", "level2"]);
      mockStorage.getItem.mockResolvedValue('{"test": true}');

      await jsonStorage.getItem("my-key");

      expect(mockStorage.getItem).toHaveBeenCalledWith("level1:level2:my-key");
    });
  });

  describe("setItem", () => {
    beforeEach(() => {
      jsonStorage = new JsonStorage(mockStorage, "test-namespace");
    });

    it("should set item with JSON serialization", async () => {
      const testData = { name: "test", value: 123, nested: { key: "value" } };

      await jsonStorage.setItem("my-key", testData);

      expect(mockStorage.setItem).toHaveBeenCalledWith(
        "test-namespace:my-key",
        JSON.stringify(testData)
      );
    });

    it("should handle different data types", async () => {
      await jsonStorage.setItem("string-key", "test-string");
      expect(mockStorage.setItem).toHaveBeenCalledWith(
        "test-namespace:string-key",
        JSON.stringify("test-string")
      );

      await jsonStorage.setItem("number-key", 42);
      expect(mockStorage.setItem).toHaveBeenCalledWith(
        "test-namespace:number-key",
        JSON.stringify(42)
      );

      await jsonStorage.setItem("array-key", [1, 2, 3]);
      expect(mockStorage.setItem).toHaveBeenCalledWith(
        "test-namespace:array-key",
        JSON.stringify([1, 2, 3])
      );
    });

    it("should handle namespace prefixing", async () => {
      const testData = { value: "test" };

      await jsonStorage.setItem("my-key", testData);

      expect(mockStorage.setItem).toHaveBeenCalledWith(
        "test-namespace:my-key",
        JSON.stringify(testData)
      );
    });
  });

  describe("removeItem", () => {
    beforeEach(() => {
      jsonStorage = new JsonStorage(mockStorage, "test-namespace");
    });

    it("should remove item correctly", async () => {
      mockStorage.removeItem.mockResolvedValue();

      await jsonStorage.removeItem("my-key");

      expect(mockStorage.removeItem).toHaveBeenCalledWith(
        "test-namespace:my-key"
      );
    });

    it("should handle namespace prefixing", async () => {
      await jsonStorage.removeItem("my-key");

      expect(mockStorage.removeItem).toHaveBeenCalledWith(
        "test-namespace:my-key"
      );
    });

    it("should handle array namespace correctly", async () => {
      jsonStorage = new JsonStorage(mockStorage, ["level1", "level2"]);

      await jsonStorage.removeItem("my-key");

      expect(mockStorage.removeItem).toHaveBeenCalledWith(
        "level1:level2:my-key"
      );
    });
  });

  describe("namespace handling", () => {
    it("should use colon as delimiter", () => {
      jsonStorage = new JsonStorage(mockStorage, ["a", "b", "c"]);
      mockStorage.getItem.mockResolvedValue('{"test": true}');

      jsonStorage.getItem("key");

      expect(mockStorage.getItem).toHaveBeenCalledWith("a:b:c:key");
    });

    it("should handle single string namespace", () => {
      jsonStorage = new JsonStorage(mockStorage, "single-namespace");
      mockStorage.getItem.mockResolvedValue('{"test": true}');

      jsonStorage.getItem("key");

      expect(mockStorage.getItem).toHaveBeenCalledWith("single-namespace:key");
    });
  });
});
