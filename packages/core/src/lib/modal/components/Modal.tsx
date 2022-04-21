import React, { MouseEvent, useEffect, useState } from "react";
import { Wallet } from "../../wallet";
import { WalletSelectorModal, ModalOptions, Theme } from "../modal.types";
import { WalletSelector } from "../../wallet-selector.types";
import styles from "./Modal.styles";
import { LedgerDerivationPath } from "./LedgerDerivationPath";
import { WalletNotInstalled } from "./WalletNotInstalled";
import { WalletNetworkChanged } from "./WalletNetworkChanged";
import { WalletOptions } from "./WalletOptions";

interface ModalProps {
  // TODO: Remove omit once modal is a separate package.
  selector: Omit<WalletSelector, keyof WalletSelectorModal>;
  options?: ModalOptions;
  visible: boolean;
  hide: () => void;
}

export type ModalRouteName =
  | "WalletOptions"
  | "LedgerDerivationPath"
  | "WalletNotInstalled"
  | "WalletNetworkChanged";

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
  const [walletInfoVisible, setWalletInfoVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [routeName, setRouteName] = useState<ModalRouteName>("WalletOptions");
  const [notInstalledWallet, setNotInstalledWallet] = useState<Wallet | null>(
    null
  );

  useEffect(() => {
    setRouteName("WalletOptions");
    setWalletInfoVisible(false);
    setIsLoading(false);
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

  const handleDismissClick = () => {
    if (isLoading) {
      return;
    }

    setRouteName("WalletOptions");
    hide();
  };

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
    <div>
      <style>{styles}</style>
      <div
        className={`Modal ${getThemeClass(options?.theme)}`}
        onClick={handleDismissOutsideClick}
      >
        <div className="Modal-content">
          <div className="Modal-header">
            <h2>Connect Wallet</h2>
            <button onClick={handleDismissClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                fill="#A7A7A7"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </div>
          {routeName === "WalletOptions" && (
            <WalletOptions
              selector={selector}
              options={options}
              walletInfoVisible={walletInfoVisible}
              setWalletInfoVisible={setWalletInfoVisible}
              setRouteName={setRouteName}
              setNotInstalledWallet={setNotInstalledWallet}
              hide={hide}
            />
          )}
          {routeName === "LedgerDerivationPath" && (
            <LedgerDerivationPath
              selector={selector}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
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
