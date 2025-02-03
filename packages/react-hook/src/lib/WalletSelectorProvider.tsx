import { createContext, useState, useEffect } from "react";
import type {
  Wallet,
  WalletSelector,
  WalletSelectorParams,
} from "@near-wallet-selector/core";
import { setupWalletSelector } from "@near-wallet-selector/core";
import type { WalletSelectorModal } from "@near-wallet-selector/modal-ui";
import { setupModal } from "@near-wallet-selector/modal-ui";

export type setupParams = WalletSelectorParams & { createAccessKeyFor?: string };

export type WalletSelectorProviderValue = {
  walletSelector: WalletSelector | null;
  modal: WalletSelectorModal | null;
  signedAccountId: string | null;
  wallet: Wallet | null;
};

export const WalletSelectorContext = createContext<
  WalletSelectorProviderValue | undefined
>(undefined);

export function WalletSelectorProvider({
  children,
  config,
}: {
  children: React.ReactNode;
  config: setupParams;
}) {
  const [walletSelector, setSelector] = useState<WalletSelector | null>(null);
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);
  const [signedAccountId, setSignedAccountId] = useState<string | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);

  useEffect(() => {
    (async () => {
      setupWalletSelector(config).then((ws) => {
        const modalInstance = setupModal(ws, {
          contractId: config.createAccessKeyFor || "",
        });

        ws.store.observable.subscribe(async (state) => {
          const signedAccount = state?.accounts.find(
            (account) => account.active
          )?.accountId;
          setSignedAccountId(signedAccount || "");
          if (signedAccount) {
            setWallet(await ws.wallet());
          }
        });
        setSelector(walletSelector);
        setModal(modalInstance);
      });
    })();
  }, []);

  return (
    <WalletSelectorContext.Provider
      value={{ walletSelector, modal, signedAccountId, wallet }}
    >
      {children}
    </WalletSelectorContext.Provider>
  );
}
