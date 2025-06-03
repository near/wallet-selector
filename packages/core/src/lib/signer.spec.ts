import { setupWalletSelector } from "./wallet-selector";
import { WalletSelectorSigner } from "./signer";
import type { Account } from "./wallet";
import { PublicKey } from "near-api-js/lib/utils";

// Mock implementations for required modules
const _state: Record<string, string> = {};

global.localStorage = {
  getItem: jest.fn((key) => _state[key] || null),
  setItem: jest.fn((key, value) => {
    _state[key] = value;
  }),
  removeItem: jest.fn((key) => {
    delete _state[key];
  }),
  clear: jest.fn(() => {
    for (const key in _state) {
      delete _state[key];
    }
  }),
  get length() {
    return Object.keys(_state).length;
  },
  key: jest.fn((index) => Object.keys(_state)[index] || null),
};

describe("WalletSelectorSigner", () => {
  test("no modules specified", async () => {
    const selector = await setupWalletSelector({
      network: "testnet",
      allowMultipleSelectors: true,
      modules: [],
    });

    const signer = new WalletSelectorSigner(selector);

    expect(() => signer.getPublicKey()).rejects.toThrowError(
      "No wallet selected"
    );
  });

  test("getPublicKey throws an error as it's not implemented on the wallet", async () => {
    const selector = await setupWalletSelector({
      network: "testnet",
      allowMultipleSelectors: true,
      modules: [
        async () => {
          return {
            id: "test",
            metadata: {
              name: "Test Wallet",
              description: null,
              deprecated: false,
              iconUrl: "",
              available: true,
              runOnStartup: true,
              contractId: "contract.testnet",
            },
            type: "browser",
            init: async () => {
              return {
                signIn: async () => {
                  return [] as Array<Account>;
                },
                signOut: async () => {
                  void 0;
                },
                verifyOwner: async () => {
                  void 0;
                },
                signAndSendTransaction: async () => {
                  void 0;
                },
                signAndSendTransactions: async () => {
                  void 0;
                },
                getAccounts: async () => {
                  return [];
                },
              };
            },
          };
        },
      ],
    });

    // Activate the wallet
    const wallet = await selector.wallet("test");
    await wallet.signIn({ contractId: "contract.testnet", accounts: [] });
    selector.store.getState().selectedWalletId = "test";
    selector.store.getState().accounts = [
      { accountId: "user.testnet", active: true },
    ];

    const signer = new WalletSelectorSigner(selector);

    expect(() => signer.getPublicKey()).rejects.toThrowError(
      "getPublicKey isn't implemented by Test Wallet"
    );
  });

  test("getPublicKey returns corresponding key", async () => {
    const selector = await setupWalletSelector({
      network: "testnet",
      allowMultipleSelectors: true,
      modules: [
        async () => {
          return {
            id: "test",
            metadata: {
              name: "Test Wallet",
              description: null,
              deprecated: false,
              iconUrl: "",
              available: true,
              runOnStartup: true,
              contractId: "contract.testnet",
            },
            type: "browser",
            init: async () => {
              return {
                signIn: async () => {
                  return [] as Array<Account>;
                },
                signOut: async () => {
                  void 0;
                },
                verifyOwner: async () => {
                  void 0;
                },
                signAndSendTransaction: async () => {
                  void 0;
                },
                signAndSendTransactions: async () => {
                  void 0;
                },
                getAccounts: async () => {
                  return [];
                },
                getPublicKey: async (accountId) => {
                  switch (accountId) {
                    case "user.testnet":
                      return PublicKey.fromString(
                        "ed25519:Anu7LYDfpLtkP7E16LT9imXF694BdQaa9ufVkQiwTQxC"
                      );
                    case "user2.testnet":
                      return PublicKey.fromString(
                        "ed25519:Bpz2oUnMM8MM8trXmdAJW5sS1TtPkMot4cosa16ZeYFQ"
                      );
                    default:
                      throw new Error(
                        `The account ${accountId} isn't logged in the wallet`
                      );
                  }
                },
              };
            },
          };
        },
      ],
    });

    // Activate the wallet
    const wallet = await selector.wallet("test");
    await wallet.signIn({ contractId: "contract.testnet", accounts: [] });
    selector.store.getState().selectedWalletId = "test";
    selector.store.getState().accounts = [
      { accountId: "user.testnet", active: true },
    ];

    const signer = new WalletSelectorSigner(selector);

    const pk = await signer.getPublicKey();

    expect(pk.toString()).toBe(
      "ed25519:Anu7LYDfpLtkP7E16LT9imXF694BdQaa9ufVkQiwTQxC"
    );
  });
});
