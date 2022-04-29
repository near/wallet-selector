import React, { MouseEvent, useCallback, useEffect, useState } from "react";

import { Wallet } from "../../packages/core/src/lib/wallet";
import { WalletSelectorModal, ModalOptions, Theme } from "../modal.types";
import { WalletSelector } from "../../packages/core/src/lib/wallet-selector.types";
import { ModalRouteName } from "./Modal.types";
import { LedgerDerivationPath } from "./LedgerDerivationPath";
import { WalletNotInstalled } from "./WalletNotInstalled";
import { WalletNetworkChanged } from "./WalletNetworkChanged";
import { WalletOptions } from "./WalletOptions";
import { AlertMessage } from "./AlertMessage";
import { CloseButton } from "./CloseButton";
import styles from "./Modal.styles";

interface ModalProps {
  // TODO: Remove omit once modal is a separate package.
  selector: Omit<WalletSelector, keyof WalletSelectorModal>;
  options?: ModalOptions;
  visible: boolean;
  hide: () => void;
}

const getThemeClass = (theme?: Theme) => {
  switch (theme) {
    case "dark":
      return "Modal-dark-theme";
    case "light":
      return "Modal-light-theme";
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
  const [notInstalledWallet, setNotInstalledWallet] = useState<Wallet | null>(
    null
  );
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
    setNotInstalledWallet(null);
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

  const handleDismissOutsideClick = (e: MouseEvent) => {
    e.preventDefault();

    if (e.target === e.currentTarget) {
      handleDismissClick();
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div className={getThemeClass(options?.theme)}>
      <style>{styles}</style>
      <div className="Modal" onClick={handleDismissOutsideClick}>
        <div className="Modal-content">
          <div className="Modal-header">
            <h2>Connect Wallet</h2>
            <CloseButton onClick={handleDismissClick} />
          </div>
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
              onWalletNotInstalled={(wallet) => {
                setNotInstalledWallet(wallet);
                return setRouteName("WalletNotInstalled");
              }}
              onConnectHardwareWallet={() => {
                setRouteName("LedgerDerivationPath");
              }}
              onConnected={handleDismissClick}
              onError={(message) => {
                setAlertMessage(message);
                setRouteName("AlertMessage");
              }}
            />
          )}
          {routeName === "LedgerDerivationPath" && (
            <LedgerDerivationPath
              selector={selector}
              onConnected={handleDismissClick}
              onBack={() => setRouteName("WalletOptions")}
            />
          )}
          {routeName === "WalletNotInstalled" && notInstalledWallet && (
            <WalletNotInstalled
              notInstalledWallet={notInstalledWallet}
              onBack={() => {
                setNotInstalledWallet(null);
                setRouteName("WalletOptions");
              }}
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
