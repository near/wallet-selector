import React, { useContext, useEffect, useState } from "react";
import NearWalletSelector, { AccountInfo } from "@near-wallet-selector/core";

interface WalletSelectorContextValue {
  selector: NearWalletSelector;
  accounts: Array<AccountInfo>;
  accountId: string | null;
  setAccountId: (accountId: string) => void;
}

const WalletSelectorContext =
  React.createContext<WalletSelectorContextValue | null>(null);

export const WalletSelectorContextProvider: React.FC = ({ children }) => {
  const [selector, setSelector] = useState<NearWalletSelector | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<Array<AccountInfo>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    NearWalletSelector.init({
      wallets: ["near-wallet", "sender-wallet", "ledger-wallet", "math-wallet"],
      network: "testnet",
      contractId: "guest-book.testnet",
    })
      .then((instance) => {
        return instance.getAccounts().then(async (initAccounts) => {
          let initAccountId = localStorage.getItem("accountId");

          // Ensure the accountId in storage is still valid.
          if (
            initAccountId &&
            !initAccounts.some((x) => x.accountId === initAccountId)
          ) {
            initAccountId = null;
            localStorage.removeItem("accountId");
          }

          // Assume the first account if one hasn't been selected.
          if (!initAccountId && initAccounts.length) {
            initAccountId = initAccounts[0].accountId;
            localStorage.setItem("accountId", initAccountId);
          }

          if (initAccountId) {
            setAccountId(initAccountId);
          }

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore-next-line
          window.selector = instance;
          setSelector(instance);

          setAccounts(initAccounts);
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to initialise wallet selector");
      });
  }, []);

  useEffect(() => {
    if (!selector) {
      return;
    }

    const subscription = selector.on("signIn", () => {
      setLoading(true);

      selector.getAccounts().then(async (signInAccounts) => {
        // Assume the first account.
        const signInAccountId = signInAccounts[0].accountId;

        localStorage.setItem("accountId", signInAccountId);
        setAccountId(signInAccountId);
        setAccounts(signInAccounts);
        setLoading(false);
      });
    });

    return () => subscription.remove();
  }, [selector]);

  useEffect(() => {
    if (!selector) {
      return;
    }

    const subscription = selector.on("signOut", () => {
      setAccountId(null);
      setAccounts([]);
    });

    return () => subscription.remove();
  }, [selector]);

  if (!selector || loading) {
    return null;
  }

  return (
    <WalletSelectorContext.Provider
      value={{
        selector,
        accounts,
        accountId,
        setAccountId,
      }}
    >
      {children}
    </WalletSelectorContext.Provider>
  );
};

export function useWalletSelector() {
  const context = useContext(WalletSelectorContext);

  if (!context) {
    throw new Error(
      "useWalletSelector must be used within a WalletSelectorContextProvider"
    );
  }

  return context;
}
