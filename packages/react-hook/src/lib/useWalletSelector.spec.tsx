import React from "react";
import { renderHook } from "@testing-library/react";
import { useWalletSelector } from "./useWalletSelector";
import { WalletSelectorProvider } from "./WalletSelectorProvider";
import type { WalletSelectorParams } from "@near-wallet-selector/core";

describe("useWalletSelector", () => {
  const mockConfig: WalletSelectorParams = {
    network: "testnet",
    modules: [],
  };

  it("should throw an error when used outside of WalletSelectorProvider", () => {
    // Suppress console.error for this test since we expect an error
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    expect(() => {
      renderHook(() => useWalletSelector());
    }).toThrow(
      "useWalletSelector must be used within a <WalletSelectorProvider>"
    );

    consoleErrorSpy.mockRestore();
  });

  it("should return context value when used within WalletSelectorProvider", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <WalletSelectorProvider config={mockConfig}>
        {children}
      </WalletSelectorProvider>
    );

    const { result } = renderHook(() => useWalletSelector(), { wrapper });

    expect(result.current).toBeDefined();
    expect(result.current.walletSelector).toBeDefined();
    expect(result.current.signedAccountId).toBeNull();
    expect(result.current.wallet).toBeNull();
    expect(typeof result.current.signIn).toBe("function");
    expect(typeof result.current.signOut).toBe("function");
    expect(typeof result.current.viewFunction).toBe("function");
    expect(typeof result.current.callFunction).toBe("function");
    expect(typeof result.current.getBalance).toBe("function");
    expect(typeof result.current.getAccessKeys).toBe("function");
    expect(typeof result.current.signAndSendTransactions).toBe("function");
    expect(typeof result.current.signMessage).toBe("function");
    expect(typeof result.current.getAccount).toBe("function");
    expect(typeof result.current.verifyMessage).toBe("function");
    expect(typeof result.current.createSignedTransaction).toBe("function");
    expect(typeof result.current.signTransaction).toBe("function");
    expect(typeof result.current.getPublicKey).toBe("function");
    expect(typeof result.current.signNep413Message).toBe("function");
  });

  it("should provide walletSelector as a promise", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <WalletSelectorProvider config={mockConfig}>
        {children}
      </WalletSelectorProvider>
    );

    const walletSelector = renderHook(() => useWalletSelector(), { wrapper })
      .result.current;

    expect(walletSelector.walletSelector).toBeInstanceOf(Promise);

    if (walletSelector.walletSelector) {
      const selector = await walletSelector.walletSelector;
      expect(selector).toBeDefined();
      expect(typeof selector.wallet).toBe("function");
      expect(typeof selector.isSignedIn).toBe("function");
    }
  });
});
