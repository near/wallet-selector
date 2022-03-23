import React, { useContext, useEffect, useState } from "react";
import NearWalletSelector, { AccountInfo } from "near-wallet-selector";

interface WalletSelectorContextValue {
  selector: NearWalletSelector;
  accounts: Array<AccountInfo>;
  accountId: string | null;
  setAccountId: (accountId: string) => void;
}

const WalletSelectorContext = React.createContext<WalletSelectorContextValue | null>(null);

export const WalletSelectorContextProvider: React.FC = ({ children }) => {
  const [selector, setSelector] = useState<NearWalletSelector | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<Array<AccountInfo>>([]);

  const syncAccountId = (
    currentAccountId: string | null,
    currentAccounts: Array<AccountInfo>
  ) => {
    let newAccountId = currentAccountId;

    // Ensure the accountId in storage is still valid.
    if (newAccountId && !currentAccounts.some((x) => x.accountId === newAccountId)) {
      newAccountId = null;
      localStorage.removeItem("accountId");
    }

    // Assume the first account if one hasn't been selected.
    if (!newAccountId && currentAccounts.length) {
      newAccountId = currentAccounts[0].accountId;
      localStorage.setItem("accountId", newAccountId);
    }

    setAccountId(newAccountId);
  }

  useEffect(() => {
    NearWalletSelector.init({
      wallets: ["near-wallet", "sender-wallet", "ledger-wallet", "math-wallet", "wallet-connect"],
      networkId: "testnet",
      contractId: "guest-book.testnet",
    })
      .then((instance) => {
        const accounts = instance.getAccounts();
        syncAccountId(localStorage.getItem("accountId"), accounts);
        setAccounts(accounts);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore-next-line
        window.selector = instance;
        setSelector(instance);
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

    const subscription = selector.on("accountsChanged", ({ accounts }) => {
      syncAccountId(accountId, accounts);
      setAccounts(accounts);
    });

    return () => subscription.remove();
  }, [selector, accountId]);

  if (!selector) {
    return null;
  }

  return (
    <WalletSelectorContext.Provider value={{
      selector,
      accounts,
      accountId,
      setAccountId
    }}>
      {children}
    </WalletSelectorContext.Provider>
  )
}

export function useWalletSelector() {
  const context = useContext(WalletSelectorContext);

  if (!context) {
    throw new Error("useWalletSelector must be used within a WalletSelectorContextProvider");
  }

  return context;
}
