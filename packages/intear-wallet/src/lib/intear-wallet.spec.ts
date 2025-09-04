/* eslint-disable @nx/enforce-module-boundaries */
import * as nearAPI from "near-api-js";
import { setupIntearWallet } from "./intear-wallet";
import { mockWallet } from "../../../core/src/lib/testUtils";
import type {
  InjectedWallet,
  SignMessageParams,
} from "@near-wallet-selector/core";
import { functionCall } from "near-api-js/lib/transaction";

global.TextEncoder = jest.fn().mockImplementation(() => ({
  encode: jest.fn().mockReturnValue(new Uint8Array([1, 2, 3])),
}));

global.TextDecoder = jest.fn().mockImplementation(() => ({
  decode: jest.fn().mockReturnValue("mocked-decoded-text"),
}));

describe("IntearWallet", () => {
  let originalWindow: typeof window;
  let mockPopup: {
    closed: boolean;
    close: jest.Mock<unknown, []>;
    postMessage: jest.Mock<unknown, [unknown, string]>;
  };
  let mockIframe: {
    src: string;
    style: {
      position: string;
      inset: string;
      width: string;
      height: string;
      border: string;
      zIndex: string;
    };
    contentWindow: {
      postMessage: jest.Mock<unknown, [unknown, string]>;
    };
    remove: jest.Mock<unknown, []>;
  };
  let mockAddEventListener: jest.SpyInstance<
    ReturnType<typeof window.addEventListener>,
    Parameters<typeof window.addEventListener>
  >;
  let mockCreateElement: jest.SpyInstance;
  let mockAppendChild: jest.SpyInstance;
  let wallet: InjectedWallet;
  let originalLocalStorage: Storage;
  let messageCallback: (event: { data: unknown; origin: string }) => void;

  beforeEach(async () => {
    originalWindow = { ...window };
    originalLocalStorage = window.localStorage;

    mockPopup = {
      closed: false,
      close: jest.fn(),
      postMessage: jest.fn(),
    };
    window.open = jest.fn().mockReturnValue(mockPopup);

    mockIframe = {
      src: "",
      style: {
        position: "",
        inset: "",
        width: "",
        height: "",
        border: "",
        zIndex: "",
      },
      contentWindow: {
        postMessage: jest.fn(),
      },
      remove: jest.fn(),
    };
    mockCreateElement = jest
      .spyOn(document, "createElement")
      .mockReturnValue(mockIframe as unknown as HTMLElement);
    mockAppendChild = jest
      .spyOn(document.body, "appendChild")
      .mockImplementation(() => mockIframe as unknown as HTMLElement);

    messageCallback = jest.fn<void, [{ data: unknown; origin: string }]>();
    mockAddEventListener = jest
      .spyOn(window, "addEventListener")
      .mockImplementation((event, callback) => {
        if (event === "message") {
          messageCallback = callback as unknown as (event: {
            data: unknown;
            origin: string;
          }) => void;
        }
      });

    const mockLocalStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      length: 0,
      key: jest.fn(),
    };
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
      writable: true,
    });

    const result = await mockWallet<InjectedWallet>(setupIntearWallet());
    wallet = result.wallet;
  });

  afterEach(() => {
    window.open = originalWindow.open;
    window.localStorage = originalLocalStorage;
    mockAddEventListener.mockRestore();
    mockCreateElement.mockRestore();
    mockAppendChild.mockRestore();
    jest.clearAllMocks();
  });

  describe("signIn", () => {
    it("should create an iframe for sign in", async () => {
      wallet.signIn({
        contractId: "test.near",
        methodNames: ["test_method"],
      });

      expect(document.createElement).toHaveBeenCalledWith("iframe");
      expect(mockIframe.src).toContain("wallet-connector-iframe.html");
      expect(document.body.appendChild).toHaveBeenCalledWith(mockIframe);
    });

    it("should handle postMessage communication from iframe", async () => {
      const promise = wallet.signIn({
        contractId: "test.near",
        methodNames: ["test_method"],
      });

      messageCallback({
        data: { type: "ready" },
        origin: "https://wallet.intear.tech",
      });
      // Give scheduler a chance to process the message
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(mockIframe.contentWindow.postMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "signIn",
          data: expect.objectContaining({ contractId: "test.near" }),
        }),
        "https://wallet.intear.tech"
      );

      messageCallback({
        data: {
          type: "connected",
          accounts: [{ accountId: "test.near", publicKey: "ed25519:test" }],
          functionCallKeyAdded: true,
          logoutKey: nearAPI.KeyPair.fromRandom("ed25519")
            .getPublicKey()
            .toString(),
        },
        origin: "https://wallet.intear.tech",
      });

      await expect(promise).resolves.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            accountId: "test.near",
            publicKey: "ed25519:test",
          }),
        ])
      );
    });

    it("should handle iframe closure", async () => {
      const promise = wallet.signIn({
        contractId: "test.near",
      });

      messageCallback({
        data: { type: "ready" },
        origin: "https://wallet.intear.tech",
      });
      // Give scheduler a chance to process the message
      await new Promise((resolve) => setTimeout(resolve, 0));

      messageCallback({
        data: {
          type: "close",
          message: "User cancelled",
        },
        origin: "https://wallet.intear.tech",
      });

      await expect(promise).rejects.toThrow("User cancelled");
      expect(mockIframe.remove).toHaveBeenCalled();
    });
  });

  describe("signAndSendTransactions", () => {
    it("should open a popup for transaction approval", async () => {
      window.localStorage.getItem = jest.fn().mockReturnValue(
        JSON.stringify({
          accounts: [{ accountId: "test.near" }],
          key: nearAPI.KeyPair.fromRandom("ed25519").toString(),
        })
      );

      wallet.signAndSendTransactions({
        transactions: [
          {
            receiverId: "app.near",
            actions: [functionCall("test", {}, BigInt("100"), BigInt("0"))],
          },
        ],
      });

      expect(window.open).toHaveBeenCalledWith(
        expect.stringContaining("/send-transactions"),
        "_blank",
        expect.any(String)
      );
    });

    it("should handle postMessage communication from transactions popup", async () => {
      window.localStorage.getItem = jest.fn().mockReturnValue(
        JSON.stringify({
          accounts: [{ accountId: "test.near" }],
          key: nearAPI.KeyPair.fromRandom("ed25519").toString(),
        })
      );

      const promise = wallet.signAndSendTransactions({
        transactions: [
          {
            receiverId: "app.near",
            actions: [functionCall("test", {}, BigInt("100"), BigInt("0"))],
          },
        ],
      });

      messageCallback({
        data: { type: "ready" },
        origin: "https://wallet.intear.tech",
      });
      // Give scheduler a chance to process the message
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(mockPopup.postMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "signAndSendTransactions",
          data: expect.objectContaining({ accountId: "test.near" }),
        }),
        "https://wallet.intear.tech"
      );

      messageCallback({
        data: { type: "sent", outcomes: [new Map()] },
        origin: "https://wallet.intear.tech",
      });

      await expect(promise).resolves.toHaveLength(1);
    });

    it("should handle transactions popup closure", async () => {
      window.localStorage.getItem = jest.fn().mockReturnValue(
        JSON.stringify({
          accounts: [{ accountId: "test.near" }],
          key: nearAPI.KeyPair.fromRandom("ed25519").toString(),
        })
      );

      const transactionPromise = wallet.signAndSendTransactions({
        transactions: [
          {
            receiverId: "app.near",
            actions: [functionCall("test", {}, BigInt("100"), BigInt("0"))],
          },
        ],
      });

      mockPopup.closed = true;

      await expect(transactionPromise).rejects.toThrow("Popup closed");
    });
  });

  describe("signMessage", () => {
    const signMessageParams: SignMessageParams = {
      message: "Test message for signing",
      recipient: "test.near",
      nonce: Buffer.alloc(32),
      callbackUrl: "https://example.com/callback",
    };

    it("should open a popup for message signing", async () => {
      window.localStorage.getItem = jest.fn().mockReturnValue(
        JSON.stringify({
          accounts: [{ accountId: "test.near" }],
          key: nearAPI.KeyPair.fromRandom("ed25519").toString(),
        })
      );

      wallet.signMessage!(signMessageParams);

      expect(window.open).toHaveBeenCalledWith(
        expect.stringContaining("/sign-message"),
        "_blank",
        expect.any(String)
      );
    });

    it("should handle postMessage communication from sign-message popup", async () => {
      window.localStorage.getItem = jest.fn().mockReturnValue(
        JSON.stringify({
          accounts: [{ accountId: "test.near" }],
          key: nearAPI.KeyPair.fromRandom("ed25519").toString(),
        })
      );

      const promise = wallet.signMessage!(signMessageParams);

      messageCallback({
        data: { type: "ready" },
        origin: "https://wallet.intear.tech",
      });
      // Give scheduler a chance to process the message
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(mockPopup.postMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "signMessage",
          data: expect.objectContaining({ accountId: "test.near" }),
        }),
        "https://wallet.intear.tech"
      );

      messageCallback({
        data: {
          type: "signed",
          signature: {
            signature: "ed25519:base64signature",
            publicKey: "ed25519:publickey",
          },
        },
        origin: "https://wallet.intear.tech",
      });

      await expect(promise).resolves.toEqual(
        expect.objectContaining({
          publicKey: "ed25519:publickey",
          signature: expect.any(String),
        })
      );
    });

    it("should handle sign-message popup closure", async () => {
      window.localStorage.getItem = jest.fn().mockReturnValue(
        JSON.stringify({
          accounts: [{ accountId: "test.near" }],
          key: nearAPI.KeyPair.fromRandom("ed25519").toString(),
        })
      );

      const signMessagePromise = wallet.signMessage!(signMessageParams);

      mockPopup.closed = true;

      await expect(signMessagePromise).rejects.toThrow("Popup closed");
    });
  });

  describe("signOut", () => {
    it("should remove storage and notify logout bridge service", async () => {
      const mockSavedData = {
        accounts: [{ accountId: "test.near" }],
        key: nearAPI.KeyPair.fromRandom("ed25519").toString(),
        contractId: "test.near",
        methodNames: [],
        logoutKey: nearAPI.KeyPair.fromRandom("ed25519")
          .getPublicKey()
          .toString(),
      };
      window.localStorage.getItem = jest
        .fn()
        .mockReturnValue(JSON.stringify(mockSavedData));
      window.localStorage.removeItem = jest.fn();
      window.fetch = jest.fn().mockResolvedValue({ ok: true });
      await wallet.signOut();
      expect(window.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/logout_app/testnet"),
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: expect.any(String),
        })
      );
      expect(window.localStorage.removeItem).toHaveBeenCalledWith(
        "_intear_wallet_connected_account"
      );
    });

    it("should do nothing if there is no saved data", async () => {
      window.localStorage.getItem = jest.fn().mockReturnValue(null);
      window.fetch = jest.fn();
      window.localStorage.removeItem = jest.fn();
      await wallet.signOut();
      expect(window.fetch).not.toHaveBeenCalled();
      expect(window.localStorage.removeItem).not.toHaveBeenCalled();
    });
  });
});
