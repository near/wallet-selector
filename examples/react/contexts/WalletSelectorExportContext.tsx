import type { ReactNode } from "react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { map, distinctUntilChanged } from "rxjs";
import { setupWalletSelector } from "@near-wallet-selector/core";
import type { WalletSelector, AccountState } from "@near-wallet-selector/core";
import { setupExportSelectorModal } from "@near-wallet-selector/account-export";
import type { WalletSelectorModal } from "@near-wallet-selector/account-export";
import { setupDefaultWallets } from "@near-wallet-selector/default-wallets";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import { setupMathWallet } from "@near-wallet-selector/math-wallet";
import { setupNightly } from "@near-wallet-selector/nightly";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupWelldoneWallet } from "@near-wallet-selector/welldone-wallet";
import { setupNightlyConnect } from "@near-wallet-selector/nightly-connect";
import { setupNearFi } from "@near-wallet-selector/nearfi";
import { setupWalletConnect } from "@near-wallet-selector/wallet-connect";
import { setupCoin98Wallet } from "@near-wallet-selector/coin98-wallet";
import { setupOptoWallet } from "@near-wallet-selector/opto-wallet";
import { Loading } from "../components/Loading";

declare global {
  interface Window {
    importSelector: WalletSelector;
    ExportModal: WalletSelectorModal;
  }
}

interface ExportAccountSelectorContextValue {
  importSelector: WalletSelector;
  ExportModal: WalletSelectorModal;
  accounts: Array<AccountState>;
  accountId: string | null;
}

const ExportAccountSelectorContext =
  React.createContext<ExportAccountSelectorContextValue | null>(null);

export const ExportAccountSelectorContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [importSelector, setSelector] = useState<WalletSelector | null>(null);
  const [ExportModal, setModal] = useState<WalletSelectorModal | null>(null);
  const [accounts, setAccounts] = useState<Array<AccountState>>([]);

  const init = useCallback(async () => {
    const _selector = await setupWalletSelector({
      network: "testnet",
      debug: true,
      modules: [
        ...(await setupDefaultWallets()),
        setupNearWallet(),
        setupSender(),
        setupMathWallet(),
        setupNightly(),
        setupMeteorWallet(),
        setupWelldoneWallet(),
        setupHereWallet(),
        setupCoin98Wallet(),
        setupNearFi(),
        setupOptoWallet(),
        setupWalletConnect({
          projectId: "c4f79cc...",
          metadata: {
            name: "NEAR Wallet Selector",
            description: "Example dApp used by NEAR Wallet Selector",
            url: "https://github.com/near/wallet-selector",
            icons: ["https://avatars.githubusercontent.com/u/37784886"],
          },
        }),
        setupNightlyConnect({
          url: "wss://relay.nightly.app/app",
          appMetadata: {
            additionalInfo: "",
            application: "NEAR Wallet Selector",
            description: "Example dApp used by NEAR Wallet Selector",
            icon: "https://near.org/wp-content/uploads/2020/09/cropped-favicon-192x192.png",
          },
        }),
      ],
    });
    /**
     * Insert list of accounts to be imported here
     * accounts: [{ accountId: "test.testnet", privateKey: "ed25519:..."}, ...]
     */
    const _modal = setupExportSelectorModal(_selector, {
      accounts: [],
      onComplete: (completedAccounts) => {
        console.log("Transfer Completed: ", completedAccounts);
      },
    });
    const state = _selector.store.getState();
    setAccounts(state.accounts);

    window.importSelector = _selector;
    window.ExportModal = _modal;

    setSelector(_selector);
    setModal(_modal);
  }, []);

  useEffect(() => {
    init().catch((err) => {
      console.error(err);
      alert("Failed to initialise wallet selector");
    });
  }, [init]);

  useEffect(() => {
    if (!importSelector) {
      return;
    }

    const subscription = importSelector.store.observable
      .pipe(
        map((state) => state.accounts),
        distinctUntilChanged()
      )
      .subscribe((nextAccounts) => {
        setAccounts(nextAccounts);
      });

    return () => subscription.unsubscribe();
  }, [importSelector]);

  if (!importSelector || !ExportModal) {
    return <Loading />;
  }

  const accountId =
    accounts.find((account) => account.active)?.accountId || null;

  return (
    <ExportAccountSelectorContext.Provider
      value={{
        importSelector,
        ExportModal,
        accounts,
        accountId,
      }}
    >
      {children}
    </ExportAccountSelectorContext.Provider>
  );
};

export function useExportAccountSelector() {
  const context = useContext(ExportAccountSelectorContext);

  if (!context) {
    throw new Error(
      "useExportAccountSelector must be used within a ExportAccountSelectorContextProvider"
    );
  }

  return context;
}
