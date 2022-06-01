import React, { ChangeEvent, KeyboardEventHandler, useState } from "react";
import type { Wallet, WalletSelector } from "@near-wallet-selector/core";
import type { ModalOptions } from "../modal.types";

interface LedgerDerivationPathProps {
  selector: WalletSelector;
  options: ModalOptions;
  onBack: () => void;
  onConnecting: (wallet: Wallet) => void;
  onConnected: () => void;
  onError: (message: string) => void;
}

export const DEFAULT_DERIVATION_PATH = "44'/397'/0'/0'/1'";

export const LedgerDerivationPath: React.FC<LedgerDerivationPathProps> = ({
  selector,
  options,
  onBack,
  onConnecting,
  onConnected,
  onError,
}) => {
  const [ledgerError, setLedgerError] = useState("");
  const [ledgerDerivationPath, setLedgerDerivationPath] = useState(
    DEFAULT_DERIVATION_PATH
  );

  const handleDerivationPathChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLedgerDerivationPath(e.target.value);
  };

  const handleConnectClick = async () => {
    // TODO: Can't assume "ledger" once we implement more hardware wallets.
    const wallet = await selector.wallet("ledger");
    onConnecting(wallet);
    if (wallet.type !== "hardware") {
      return;
    }

    return wallet
      .signIn({
        contractId: options.contractId,
        methodNames: options.methodNames,
        derivationPaths: [ledgerDerivationPath],
      })
      .then(() => onConnected())
      .catch((err) => {
        onError(`Error: ${err.message}`);
        setLedgerError(`Error: ${err.message}`);
      });
  };

  const handleEnterClick: KeyboardEventHandler<HTMLInputElement> = async (
    e
  ) => {
    if (e.key === "Enter") {
      await handleConnectClick();
    }
  };

  return (
    <div className="ledger-derivation-path-wrapper">
      <p>
        Make sure your Ledger is plugged in, then enter an account id to
        connect:
      </p>
      <div className="derivation-path-list">
        <input
          type="text"
          className={ledgerError ? "input-error" : ""}
          placeholder="Derivation Path"
          value={ledgerDerivationPath}
          onChange={handleDerivationPathChange}
          onKeyPress={handleEnterClick}
        />
        {ledgerError && <p className="error">{ledgerError}</p>}
      </div>
      <div className="action-buttons">
        <button className="left-button" onClick={onBack}>
          Back
        </button>
        <button className="right-button" onClick={handleConnectClick}>
          Connect
        </button>
      </div>
    </div>
  );
};
