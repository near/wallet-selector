import { WalletManager } from "./wallet-manager";
import { setupWalletSelector } from "./wallet-selector";
import type {
  WalletSelector,
  WalletSelectorParams,
} from "./wallet-selector.types";

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

jest.mock("./wallet-selector", () => {
  const originalModule = jest.requireActual("./wallet-selector");
  return {
    ...originalModule,
    setupWalletSelector: jest.fn(),
  };
});

describe("WalletManager", () => {
  let isSelectorResolved: boolean;

  beforeEach(() => {
    jest.clearAllMocks();

    isSelectorResolved = false;
  });

  it("waits for selector to be resolved before getAccountId returns a result", async () => {
    const mockedSetupWalletSelector =
      setupWalletSelector as jest.MockedFunction<typeof setupWalletSelector>;

    mockedSetupWalletSelector.mockImplementationOnce(async () => {
      await new Promise((res) => setTimeout(res, 100));

      isSelectorResolved = true;

      return {
        isSignedIn() {
          return true;
        },
        store: {
          getState() {
            return { accounts: [{ accountId: "test" }] };
          },
        },
      } as WalletSelector;
    });

    const wallet = new WalletManager({} as WalletSelectorParams);
    expect(isSelectorResolved).toBe(false);

    const accountId = await wallet.getAccountId();

    expect(isSelectorResolved).toBe(true);
    expect(accountId).toBe("test");
  });
});
