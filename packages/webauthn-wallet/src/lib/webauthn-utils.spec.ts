/* eslint-disable @typescript-eslint/no-explicit-any*/
import {
  createKey,
  getKeys,
  isPassKeyAvailable,
  isDeviceSupported,
  PasskeyProcessCanceled,
} from "./webauthn-utils";

// Mock the crypto API
const mockCredential = {
  rawId: new Uint8Array(32).buffer,
  id: "test-credential-id",
  type: "public-key",
  response: {
    userHandle: new TextEncoder().encode("test-user.testnet"),
    authenticatorData: new ArrayBuffer(0),
    signature: new ArrayBuffer(0),
    clientDataJSON: new ArrayBuffer(0),
  } as unknown as AuthenticatorAssertionResponse,
};

describe("webauthn-utils", () => {
  beforeAll(() => {
    // Mock crypto.subtle.digest
    if (!global.crypto) {
      (global as any).crypto = {};
    }
    if (!global.crypto.subtle) {
      (global.crypto as any).subtle = {};
    }
    (global.crypto.subtle as any).digest = jest
      .fn()
      .mockResolvedValue(new Uint8Array(32).buffer);

    // Mock crypto.getRandomValues
    global.crypto.getRandomValues = jest.fn((arr: any) => {
      if (arr && "length" in arr) {
        for (let i = 0; i < arr.length; i++) {
          arr[i] = Math.floor(Math.random() * 256);
        }
      }
      return arr;
    }) as any;
  });

  describe("PasskeyProcessCanceled", () => {
    it("should create custom error", () => {
      const error = new PasskeyProcessCanceled("User cancelled");

      expect(error.name).toBe("PasskeyProcessCanceled");
      expect(error.message).toBe("User cancelled");
      expect(error instanceof Error).toBe(true);
    });
  });

  describe("isPassKeyAvailable", () => {
    it("should return false when PublicKeyCredential is not available", async () => {
      // Save original
      const original = (global as any).PublicKeyCredential;
      delete (global as any).PublicKeyCredential;

      const result = await isPassKeyAvailable();

      expect(result).toBe(false);

      // Restore
      (global as any).PublicKeyCredential = original;
    });

    it("should return true when PublicKeyCredential is available", async () => {
      // Mock PublicKeyCredential
      (global as any).PublicKeyCredential = {
        isUserVerifyingPlatformAuthenticatorAvailable: jest
          .fn()
          .mockResolvedValue(true),
      };

      const result = await isPassKeyAvailable();

      expect(result).toBe(true);
    });

    it("should return false when isUserVerifyingPlatformAuthenticatorAvailable is not available", async () => {
      (global as any).PublicKeyCredential = {};

      const result = await isPassKeyAvailable();

      expect(result).toBe(false);
    });
  });

  describe("isDeviceSupported", () => {
    it("should return true when passkey is available", async () => {
      (global as any).PublicKeyCredential = {
        isUserVerifyingPlatformAuthenticatorAvailable: jest
          .fn()
          .mockResolvedValue(true),
      };

      const result = await isDeviceSupported();

      expect(result).toBe(true);
    });

    it("should return false when passkey is not available", async () => {
      const original = (global as any).PublicKeyCredential;
      delete (global as any).PublicKeyCredential;

      const result = await isDeviceSupported();

      expect(result).toBe(false);

      // Restore
      (global as any).PublicKeyCredential = original;
    });

    it("should return false when error occurs", async () => {
      (global as any).PublicKeyCredential = {
        isUserVerifyingPlatformAuthenticatorAvailable: jest
          .fn()
          .mockRejectedValue(new Error("Test error")),
      };

      const result = await isDeviceSupported();

      expect(result).toBe(false);
    });
  });

  describe("createKey", () => {
    beforeEach(() => {
      // Mock window.location
      Object.defineProperty(window, "location", {
        value: { hostname: "localhost" },
        writable: true,
      });
    });

    it("should throw error when WebAuthn is not supported", async () => {
      // Mock navigator without credentials
      const originalNavigator = global.navigator;
      Object.defineProperty(global, "navigator", {
        value: {},
        writable: true,
        configurable: true,
      });

      await expect(createKey("test-user.testnet")).rejects.toThrow(
        "WebAuthn is not supported in this browser"
      );

      // Restore
      Object.defineProperty(global, "navigator", {
        value: originalNavigator,
        writable: true,
        configurable: true,
      });
    });

    it("should create keypair when credential is created successfully", async () => {
      // Mock navigator.credentials
      Object.defineProperty(global.navigator, "credentials", {
        value: {
          create: jest.fn().mockResolvedValue(mockCredential),
        },
        writable: true,
        configurable: true,
      });

      // Mock crypto.getRandomValues
      global.crypto.getRandomValues = jest.fn((arr) => arr);

      const keyPair = await createKey("test-user.testnet");

      expect(keyPair).toBeDefined();
      expect(keyPair.getPublicKey()).toBeDefined();
      expect(typeof keyPair.getPublicKey().toString()).toBe("string");
    });

    it("should throw PasskeyProcessCanceled when user cancels", async () => {
      const notAllowedError = new Error("User cancelled");
      notAllowedError.name = "NotAllowedError";

      Object.defineProperty(global.navigator, "credentials", {
        value: {
          create: jest.fn().mockRejectedValue(notAllowedError),
        },
        writable: true,
        configurable: true,
      });

      await expect(createKey("test-user.testnet")).rejects.toThrow(
        PasskeyProcessCanceled
      );
    });

    it("should throw PasskeyProcessCanceled when credential is null", async () => {
      Object.defineProperty(global.navigator, "credentials", {
        value: {
          create: jest.fn().mockResolvedValue(null),
        },
        writable: true,
        configurable: true,
      });

      await expect(createKey("test-user.testnet")).rejects.toThrow(
        PasskeyProcessCanceled
      );
    });

    it("should store credential data when storage is provided", async () => {
      const mockStorage = {
        getItem: jest.fn(),
        setItem: jest.fn().mockResolvedValue(undefined),
        removeItem: jest.fn(),
      };

      Object.defineProperty(global.navigator, "credentials", {
        value: {
          create: jest.fn().mockResolvedValue(mockCredential),
        },
        writable: true,
        configurable: true,
      });

      const keyPair = await createKey("test-user.testnet", mockStorage);

      expect(mockStorage.setItem).toHaveBeenCalledWith(
        "webauthn_credential_test-user.testnet",
        expect.objectContaining({
          publicKey: expect.any(String),
        })
      );
      expect(keyPair).toBeDefined();
    });
  });

  describe("getKeys", () => {
    it("should throw error when WebAuthn is not supported", async () => {
      const originalNavigator = global.navigator;
      Object.defineProperty(global, "navigator", {
        value: {},
        writable: true,
        configurable: true,
      });

      await expect(getKeys("test-user.testnet")).rejects.toThrow(
        "WebAuthn is not supported in this browser"
      );

      // Restore
      Object.defineProperty(global, "navigator", {
        value: originalNavigator,
        writable: true,
        configurable: true,
      });
    });

    it("should return array of keypairs when credential is retrieved", async () => {
      Object.defineProperty(global.navigator, "credentials", {
        value: {
          get: jest.fn().mockResolvedValue(mockCredential),
        },
        writable: true,
        configurable: true,
      });

      global.crypto.getRandomValues = jest.fn((arr) => arr);

      const keys = await getKeys("test-user.testnet");

      expect(Array.isArray(keys)).toBe(true);
      expect(keys.length).toBe(1);
      expect(keys[0].getPublicKey()).toBeDefined();
    });

    it("should throw PasskeyProcessCanceled when user cancels", async () => {
      const notAllowedError = new Error("User cancelled");
      notAllowedError.name = "NotAllowedError";

      Object.defineProperty(global.navigator, "credentials", {
        value: {
          get: jest.fn().mockRejectedValue(notAllowedError),
        },
        writable: true,
        configurable: true,
      });

      await expect(getKeys("test-user.testnet")).rejects.toThrow(
        PasskeyProcessCanceled
      );
    });

    it("should throw PasskeyProcessCanceled when accountId is missing", async () => {
      Object.defineProperty(global.navigator, "credentials", {
        value: {
          get: jest.fn().mockResolvedValue({
            rawId: new Uint8Array(32).buffer,
            response: {
              userHandle: new Uint8Array(0), // Empty user handle will result in empty accountId
              authenticatorData: new ArrayBuffer(0),
              signature: new ArrayBuffer(0),
              clientDataJSON: new ArrayBuffer(0),
            },
          }),
        },
        writable: true,
        configurable: true,
      });

      await expect(getKeys("test-user.testnet")).rejects.toThrow(
        PasskeyProcessCanceled
      );
    });
  });
});
