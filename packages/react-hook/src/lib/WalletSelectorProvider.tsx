import { createContext, useState, useEffect } from "react";
import { Wallet, WalletSelector, WalletSelectorParams, setupWalletSelector } from "@near-wallet-selector/core";
import { WalletSelectorModal, setupModal } from "@near-wallet-selector/modal-ui";

type setupParams = WalletSelectorParams & { createAccessKeyFor?: string };

type WalletSelectorProviderValue = {
  walletSelector: WalletSelector | null;
  modal: WalletSelectorModal | null,
  signedAccountId: string | null,
  wallet: Wallet | null
}

export const WalletSelectorContext = createContext<WalletSelectorProviderValue | undefined>(undefined);

export function WalletSelectorProvider({ children, config }: { children: React.ReactNode, config: setupParams }) {
  const [walletSelector, setSelector] = useState<WalletSelector | null>(null);
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);
  const [signedAccountId, setSignedAccountId] = useState<string | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);

  useEffect(() => {
    setupWalletSelector(config)
      .then(
        ws => {
          const modalInstance = setupModal(ws, { contractId: config.createAccessKeyFor || "" });

          ws.store.observable.subscribe(async (state) => {
            const signedAccount = state?.accounts.find(account => account.active)?.accountId;
            setSignedAccountId(signedAccount || '');
            signedAccount && setWallet(await ws.wallet());
          });
          setSelector(walletSelector);
          setModal(modalInstance);
        }
      )
  }, []);

  return (
    <WalletSelectorContext.Provider value={{ walletSelector, modal, signedAccountId, wallet }}>
      {children}
    </WalletSelectorContext.Provider>
  );
}


