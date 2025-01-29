import { useState, useCallback } from "react";

import type { WalletSelector, WalletSelectorParams } from "@near-wallet-selector/core";
import type { WalletSelectorModal } from "@near-wallet-selector/modal-ui";

import { setupWalletSelector as setupWS } from "@near-wallet-selector/core";
// import { setupModal } from "@near-wallet-selector/modal-ui";

type setupParams = WalletSelectorParams & { createAccessKeyFor: string };

export function useWalletSelector() {

  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);
  const [signedAccountId, setSignedAccountId] = useState<string | null>(null);

  const setupWalletSelector = async (walletSelectorParams: setupParams) => {
    setupWS(walletSelectorParams)
      .then(
        walletSelector => {
          // const modal = setupModal(walletSelector, { contractId: walletSelectorParams.createAccessKeyFor || "" });
          walletSelector.subscribeOnAccountChange((accountId) => setSignedAccountId(accountId));
          setSelector(walletSelector);
          // setModal(modal);
        }
      )
  };

  return { setupWalletSelector, walletSelector: selector, modal, signedAccountId };

}