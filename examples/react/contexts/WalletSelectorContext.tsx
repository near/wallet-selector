import type { ReactNode } from "react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { map, distinctUntilChanged } from "rxjs";
import { setupWalletSelector } from "@near-wallet-selector/core";
import type { WalletSelector, AccountState } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import type { WalletSelectorModal } from "@near-wallet-selector/modal-ui";
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
import { setupNeth } from "@near-wallet-selector/neth";
import { setupOptoWallet } from "@near-wallet-selector/opto-wallet";
import { CONTRACT_ID } from "../constants";

declare global {
  interface Window {
    selector: WalletSelector;
    modal: WalletSelectorModal;
  }
}

interface WalletSelectorContextValue {
  selector: WalletSelector;
  modal: WalletSelectorModal;
  accounts: Array<AccountState>;
  accountId: string | null;
}

const WalletSelectorContext =
  React.createContext<WalletSelectorContextValue | null>(null);

export const WalletSelectorContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);
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
        setupNeth({
          gas: "300000000000000",
          bundle: false,
        }),
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
    const _modal = setupModal(_selector, { contractId: CONTRACT_ID });
    const state = _selector.store.getState();
    setAccounts(state.accounts);

    window.selector = _selector;
    window.modal = _modal;

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
    if (!selector) {
      return;
    }

    const subscription = selector.store.observable
      .pipe(
        map((state) => state.accounts),
        distinctUntilChanged()
      )
      .subscribe((nextAccounts) => {
        console.log("Accounts Update", nextAccounts);

        setAccounts(nextAccounts);
      });

    return () => subscription.unsubscribe();
  }, [selector]);

  if (!selector || !modal) {
    return null;
  }

  const accountId =
    accounts.find((account) => account.active)?.accountId || null;

  return (
    <WalletSelectorContext.Provider
      value={{
        selector,
        modal,
        accounts,
        accountId,
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
