import { createContext,  useState, useEffect } from "react";
import { Wallet, WalletSelector, WalletSelectorParams, setupWalletSelector as setupWS } from "@near-wallet-selector/core";
import { WalletSelectorModal, setupModal } from "@near-wallet-selector/modal-ui";

type WalletSelectorProviderValue = {
  walletSelector: WalletSelector|null;
  modal: WalletSelectorModal|null, 
  signedAccountId: string|null,
  wallet: Wallet|null
}
type setupParams = WalletSelectorParams & { createAccessKeyFor?: string };

export const WalletSelectorContext = createContext<WalletSelectorProviderValue|undefined>(undefined);

export function WalletSelectorProvider({ children, config}: { children: React.ReactNode, config: setupParams }) {
  const [selector, setSelector] = useState<WalletSelector|null>(null);
  const [modal, setModal] = useState<WalletSelectorModal|null>(null);
  const [signedAccountId, setSignedAccountId] = useState<string|null>(null);
  const [wallet, setWallet] = useState<Wallet|null>(null);

  useEffect(() => {
    async function setup() {
      const walletSelector = await setupWS(config);
      const modalInstance = setupModal(walletSelector, { contractId: config.createAccessKeyFor || "" });
      const isSignedIn = walletSelector.isSignedIn();

      walletSelector.store.observable.subscribe(async (state) => {
        const signedAccount = state?.accounts.find(account => account.active)?.accountId;
        setSignedAccountId(signedAccount || '');
        setWallet(signedAccount?await walletSelector.wallet():null);
      });
      setSelector(walletSelector);
      setModal(modalInstance);
    }

    setup();
  }, [config]);

  useEffect(() => {},[])
  return (
    <WalletSelectorContext.Provider value={{ walletSelector: selector, modal, signedAccountId,wallet }}>
      {children}
    </WalletSelectorContext.Provider>
  );
}


