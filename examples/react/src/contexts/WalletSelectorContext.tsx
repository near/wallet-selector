import React, { useContext, useEffect, useState } from "react";
import NearWalletSelector from "near-wallet-selector";
import { AccountView } from "near-api-js/lib/providers/provider";
import { providers } from "near-api-js";
import { Account } from "../interfaces";

interface WalletSelectorContextValue {
  selector: NearWalletSelector;
  account: Account | null;
}

const WalletSelectorContext = React.createContext<WalletSelectorContextValue | null>(null);

export const WalletSelectorContextProvider: React.FC = ({ children }) => {
  const [selector, setSelector] = useState<NearWalletSelector | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getAccount = (nodeUrl: string, accountId: string): Promise<Account> => {
    const provider = new providers.JsonRpcProvider({ url: nodeUrl });

    return provider.query<AccountView>({
      request_type: "view_account",
      finality: "final",
      account_id: accountId,
    })
      .then((data) => ({
        ...data,
        account_id: accountId,
      }));
  }

  useEffect(() => {
    NearWalletSelector.init({
      wallets: ["near-wallet", "sender-wallet", "ledger-wallet", "math-wallet"],
      networkId: "testnet",
      contractId: "guest-book.testnet",
    })
      .then((instance) => {
        return instance.getAccounts()
          .then(async (accounts) => {
            let accountId = localStorage.getItem("accountId");

            // Ensure the accountId in storage is still valid.
            if (accountId && !accounts.some((x) => x.accountId === accountId)) {
              accountId = null;
              localStorage.removeItem("accountId");
            }

            // Assume the first account if one hasn't been selected.
            if (!accountId && accounts.length) {
              accountId = accounts[0].accountId;
              localStorage.setItem("accountId", accountId);
            }

            if (accountId) {
              const { nodeUrl } = instance.network;
              setAccount(await getAccount(nodeUrl, accountId));
            }

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore-next-line
            window.selector = instance;
            setSelector(instance);
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

      selector.getAccounts()
        .then(async (accounts) => {
          // Assume the first account.
          const accountId = accounts[0].accountId;
          localStorage.setItem("accountId", accountId);

          const { nodeUrl } = selector.network;
          setAccount(await getAccount(nodeUrl, accountId));
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
      setAccount(null);
    });

    return () => subscription.remove();
  }, [selector]);

  if (!selector || loading) {
    return null;
  }

  return (
    <WalletSelectorContext.Provider value={{ selector, account }}>
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
