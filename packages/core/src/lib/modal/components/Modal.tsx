import React, { MouseEvent, useCallback, useEffect, useState } from "react";

import { Wallet } from "../../wallet";
import { WalletSelectorModal, ModalOptions, Theme } from "../modal.types";
import { WalletSelector } from "../../wallet-selector.types";
import { ModalRouteName } from "./Modal.types";
import { LedgerDerivationPath } from "./LedgerDerivationPath";
import { WalletNotInstalled } from "./WalletNotInstalled";
import { WalletNetworkChanged } from "./WalletNetworkChanged";
import { WalletOptions } from "./WalletOptions";
import { AlertModal } from "./AlertModal";
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
        return hide();
      }

      setRouteName("WalletNetworkChanged");
    });

    return () => subscription.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDismissClick = useCallback(() => {
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
      {alertMessage && (
        <AlertModal
          message={alertMessage}
          onClose={() => setAlertMessage(null)}
        />
      )}
      <div className="Modal" onClick={handleDismissOutsideClick}>
        <div className="Modal-content">
          <div className="Modal-header">
            <h2>Connect Wallet</h2>
            <CloseButton onClick={handleDismissClick} />
          </div>
          {routeName === "WalletOptions" && (
            <WalletOptions
              selector={selector}
              options={options}
              setRouteName={setRouteName}
              setNotInstalledWallet={setNotInstalledWallet}
              setAlertMessage={setAlertMessage}
              hide={hide}
            />
          )}
          {routeName === "LedgerDerivationPath" && (
            <LedgerDerivationPath
              selector={selector}
              setRouteName={setRouteName}
              hide={hide}
            />
          )}
          {routeName === "WalletNotInstalled" && notInstalledWallet && (
            <WalletNotInstalled
              notInstalledWallet={notInstalledWallet}
              setNotInstalledWallet={setNotInstalledWallet}
              setRouteName={setRouteName}
            />
          )}
          {routeName === "WalletNetworkChanged" && (
            <WalletNetworkChanged
              selector={selector}
              setRouteName={setRouteName}
              handleDismissClick={handleDismissClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};
