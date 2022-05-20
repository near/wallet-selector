import React, { useCallback, useEffect, useState } from "react";
import { WalletSelector } from "@near-wallet-selector/core";

import { ModalOptions, Theme } from "../modal.types";
import { ModalRouteName } from "./Modal.types";
import { LedgerDerivationPath } from "./LedgerDerivationPath";
import { WalletNetworkChanged } from "./WalletNetworkChanged";
import { WalletOptions } from "./WalletOptions";
import { AlertMessage } from "./AlertMessage";
import { CloseButton } from "./CloseButton";
import styles from "./Modal.styles";

interface ModalProps {
  selector: WalletSelector;
  options: ModalOptions;
  visible: boolean;
  hide: () => void;
}

const getThemeClass = (theme?: Theme) => {
  switch (theme) {
    case "dark":
      return "dark-theme";
    case "light":
      return "light-theme";
    default:
      return "";
  }
};

export const Modal: React.FC<ModalProps> = ({
  selector,
  options,
  visible,
  hide,
}) => {
  const [routeName, setRouteName] = useState<ModalRouteName>("WalletOptions");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    setRouteName("WalletOptions");
  }, [visible]);

  useEffect(() => {
    const subscription = selector.on("networkChanged", ({ networkId }) => {
      // Switched back to the correct network.
      if (networkId === selector.options.network.networkId) {
        return handleDismissClick();
      }

      setRouteName("WalletNetworkChanged");
    });

    return () => subscription.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDismissClick = useCallback(() => {
    setAlertMessage(null);
    setRouteName("WalletOptions");
    hide();
  }, [hide]);

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleDismissClick();
      }
    };
    window.addEventListener("keydown", close);

    return () => window.removeEventListener("keydown", close);
  }, [handleDismissClick]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`modal-wrapper ${getThemeClass(options?.theme)} ${
        visible ? "open" : ""
      }`}
    >
      <style>{styles}</style>
      <div className="modal-overlay" onClick={handleDismissClick} />
      <div className="modal">
        <div className="modal-header">
          <h2>Connect Wallet</h2>
          <CloseButton onClick={handleDismissClick} />
        </div>
        <div className="modal-body">
          {routeName === "AlertMessage" && alertMessage && (
            <AlertMessage
              message={alertMessage}
              onBack={() => {
                setAlertMessage(null);
                setRouteName("WalletOptions");
              }}
            />
          )}
          {routeName === "WalletOptions" && (
            <WalletOptions
              selector={selector}
              options={options}
              onConnectHardwareWallet={() => {
                setRouteName("LedgerDerivationPath");
              }}
              onConnected={handleDismissClick}
              onError={(err) => {
                setAlertMessage(err.message);
                setRouteName("AlertMessage");
              }}
            />
          )}
          {routeName === "LedgerDerivationPath" && (
            <LedgerDerivationPath
              selector={selector}
              options={options}
              onConnected={handleDismissClick}
              onBack={() => setRouteName("WalletOptions")}
            />
          )}
          {routeName === "WalletNetworkChanged" && (
            <WalletNetworkChanged
              selector={selector}
              onSwitchWallet={() => setRouteName("WalletOptions")}
              onDismiss={handleDismissClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};
