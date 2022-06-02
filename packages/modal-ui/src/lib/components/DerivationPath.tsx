import React, { ChangeEvent, KeyboardEventHandler, useState } from "react";
import type { Wallet, WalletSelector } from "@near-wallet-selector/core";
import type { ModalOptions } from "../modal.types";
import type { DerivationPathModalRouteParams } from "./Modal.types";

interface DerivationPathProps {
  selector: WalletSelector;
  options: ModalOptions;
  onBack: () => void;
  onConnecting: (wallet: Wallet) => void;
  onConnected: () => void;
  params: DerivationPathModalRouteParams;
  onError: (message: string) => void;
}

export const DEFAULT_DERIVATION_PATH = "44'/397'/0'/0'/1'";

export const DerivationPath: React.FC<DerivationPathProps> = ({
  selector,
  options,
  onBack,
  onConnecting,
  onConnected,
  params,
  onError,
}) => {
  const [derivationPath, setDerivationPath] = useState(DEFAULT_DERIVATION_PATH);

  const handleDerivationPathChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDerivationPath(e.target.value);
  };

  const handleConnectClick = async () => {
    const wallet = await selector.wallet(params.walletId);
    onConnecting(wallet);

    if (wallet.type !== "hardware") {
      return;
    }

    return wallet
      .signIn({
        contractId: options.contractId,
        methodNames: options.methodNames,
        derivationPaths: [derivationPath],
      })
      .then(() => onConnected())
      .catch((err) => {
        onError(`Error: ${err.message}`);
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
    <div className="derivation-path-wrapper">
      <p>
        Make sure your device is plugged in, then enter an account id to
        connect:
      </p>
      <div className="derivation-path-list">
        <input
          type="text"
          placeholder="Derivation Path"
          value={derivationPath}
          onChange={handleDerivationPathChange}
          onKeyPress={handleEnterClick}
        />
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
