import React, { ChangeEvent, useState } from "react";
import { DEFAULT_DERIVATION_PATH } from "../../constants";
import { WalletSelectorModal } from "../modal.types";
import { WalletSelector } from "../../wallet-selector.types";
import { ModalRouteName } from "./Modal";

interface LedgerDerivationPathProps {
  // TODO: Remove omit once modal is a separate package.
  selector: Omit<WalletSelector, keyof WalletSelectorModal>;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setRouteName: (routeName: ModalRouteName) => void;
  hide: () => void;
}

export const LedgerDerivationPath: React.FC<LedgerDerivationPathProps> = ({
  selector,
  isLoading,
  setIsLoading,
  setRouteName,
  hide,
}) => {
  const [ledgerError, setLedgerError] = useState("");
  const [ledgerDerivationPath, setLedgerDerivationPath] = useState(
    DEFAULT_DERIVATION_PATH
  );

  const handleDerivationPathChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLedgerDerivationPath(e.target.value);
  };

  const handleConnectClick = async () => {
    setIsLoading(true);
    // TODO: Can't assume "ledger" once we implement more hardware wallets.
    const wallet = selector.wallet("ledger");

    if (wallet.type !== "hardware") {
      return;
    }

    setIsLoading(true);

    const response = await wallet
      .connect({ derivationPath: ledgerDerivationPath })
      .catch((err) => {
        setLedgerError(`Error: ${err.message}`);
        setIsLoading(false);
      });

    if (response) {
      hide();
    }
  };

  return (
    <div className="Modal-body Modal-choose-ledger-derivation-path">
      <p>
        Make sure your Ledger is plugged in, then enter an account id to
        connect:
      </p>
      <div className="derivation-paths-list">
        <input
          type="text"
          className={ledgerError ? "input-error" : ""}
          placeholder="Derivation Path"
          value={ledgerDerivationPath}
          onChange={handleDerivationPathChange}
          readOnly={isLoading}
        />
        {ledgerError && <p className="error">{ledgerError}</p>}
      </div>
      <div className="derivation-paths--actions">
        <button
          className="left-button"
          disabled={isLoading}
          onClick={() => {
            setLedgerError("");
            setLedgerDerivationPath(DEFAULT_DERIVATION_PATH);
            setRouteName("WalletOptions");
          }}
        >
          Back
        </button>
        <button
          className="right-button"
          onClick={handleConnectClick}
          disabled={isLoading}
        >
          {isLoading ? "Connecting..." : "Connect"}
        </button>
      </div>
    </div>
  );
};
