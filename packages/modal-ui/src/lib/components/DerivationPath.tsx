import React, { ChangeEvent, KeyboardEventHandler, useState } from "react";
import type { WalletSelector } from "@near-wallet-selector/core";
import type { ModalOptions } from "../modal.types";
import type { DerivationPathModalRouteParams } from "./Modal.types";

interface DerivationPathProps {
  selector: WalletSelector;
  options: ModalOptions;
  onBack: () => void;
  onConnected: () => void;
  params: DerivationPathModalRouteParams;
}

export const DEFAULT_DERIVATION_PATH = "44'/397'/0'/0'/1'";

export const DerivationPath: React.FC<DerivationPathProps> = ({
  selector,
  options,
  onBack,
  onConnected,
  params,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [derivationPath, setDerivationPath] = useState(DEFAULT_DERIVATION_PATH);

  const handleDerivationPathChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDerivationPath(e.target.value);
  };

  const handleConnectClick = async () => {
    setIsLoading(true);
    const wallet = await selector.wallet(params.walletId);

    if (wallet.type !== "hardware") {
      return;
    }

    setIsLoading(true);

    return wallet
      .signIn({
        contractId: options.contractId,
        methodNames: options.methodNames,
        derivationPaths: [derivationPath],
      })
      .then(() => onConnected())
      .catch((err) => setError(`Error: ${err.message}`))
      .finally(() => setIsLoading(false));
  };

  const handleEnterClick: KeyboardEventHandler<HTMLInputElement> = async (
    e
  ) => {
    if (e.key === "Enter") {
      await handleConnectClick();
    }
  };

  return (
    <div className="derivation-path-wrapper">
      <p>
        Make sure your device is plugged in, then enter an account id to
        connect:
      </p>
      <div className="derivation-path-list">
        <input
          type="text"
          className={error ? "input-error" : ""}
          placeholder="Derivation Path"
          value={derivationPath}
          onChange={handleDerivationPathChange}
          readOnly={isLoading}
          onKeyPress={handleEnterClick}
        />
        {error && <p className="error">{error}</p>}
      </div>
      <div className="action-buttons">
        <button className="left-button" disabled={isLoading} onClick={onBack}>
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
