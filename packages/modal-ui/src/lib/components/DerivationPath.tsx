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
  const [derivationPaths, setDerivationPaths] = useState<
    Array<{ path: string }>
  >([{ path: DEFAULT_DERIVATION_PATH }]);

  const handleDerivationPathAdd = () => {
    setDerivationPaths([...derivationPaths, { path: "" }]);
  };

  const handleDerivationPathRemove = (index: number) => {
    const newPaths = [...derivationPaths];
    newPaths.splice(index, 1);
    setDerivationPaths(newPaths);
  };

  const handleDerivationPathChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newPaths = [...derivationPaths];
    newPaths[index].path = e.target.value;
    setDerivationPaths(newPaths);
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
        derivationPaths: derivationPaths.map((d) => d.path),
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
        {derivationPaths.map((path, index) => {
          return (
            <div key={index}>
              <input
                type="text"
                placeholder="Derivation Path"
                value={index === 0 ? derivationPaths[0].path : path.path}
                onChange={(e) => {
                  handleDerivationPathChange(index, e);
                }}
                onKeyPress={handleEnterClick}
              />

              {index !== 0 && (
                <button
                  type="button"
                  title="Remove"
                  onClick={() => handleDerivationPathRemove(index)}
                >
                  -
                </button>
              )}
              {index === derivationPaths.length - 1 && (
                <button
                  title="Add"
                  type="button"
                  onClick={() => handleDerivationPathAdd()}
                >
                  +
                </button>
              )}
            </div>
          );
        })}
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
