import React, { useCallback, useEffect, useState } from "react";
import type { WalletSelector } from "@near-wallet-selector/core";

import type { ModalOptions, Theme } from "../modal.types";
import type { ModalRoute } from "./Modal.types";
import { WalletNetworkChanged } from "./WalletNetworkChanged";
import { WalletOptions } from "./WalletOptions";
import { AlertMessage } from "./AlertMessage";
import { CloseButton } from "./CloseButton";
import { DerivationPath } from "./DerivationPath";
import { WalletConnecting } from "./WalletConnecting";
import { WalletNotInstalled } from "./WalletNotInstalled";

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
  const [route, setRoute] = useState<ModalRoute>({
    name: "WalletOptions",
  });
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    setRoute({
      name: "WalletOptions",
    });
  }, [visible]);

  useEffect(() => {
    const subscription = selector.on("networkChanged", ({ networkId }) => {
      // Switched back to the correct network.
      if (networkId === selector.options.network.networkId) {
        return handleDismissClick();
      }

      setRoute({
        name: "WalletNetworkChanged",
      });
    });

    return () => subscription.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDismissClick = useCallback(() => {
    setAlertMessage(null);
    setRoute({
      name: "WalletOptions",
    });
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
      className={`nws-modal-wrapper ${getThemeClass(options?.theme)} ${
        visible ? "open" : ""
      }`}
    >
      <div className="modal-overlay" onClick={handleDismissClick} />
      <div className="modal">
        <div className="modal-header">
          <h2>Connect Wallet</h2>
          <CloseButton onClick={handleDismissClick} />
        </div>
        <div className="modal-body">
          {route.name === "AlertMessage" && alertMessage && (
            <AlertMessage
              message={alertMessage}
              onBack={() => {
                setAlertMessage(null);
                setRoute({
                  name: "WalletOptions",
                });
              }}
            />
          )}
          {route.name === "WalletOptions" && (
            <WalletOptions
              selector={selector}
              options={options}
              onWalletNotInstalled={(module) => {
                setRoute({
                  name: "WalletNotInstalled",
                  params: { module: module },
                });
              }}
              onConnectHardwareWallet={() => {
                setRoute({
                  name: "DerivationPath",
                  params: {
                    walletId:
                      selector.store.getState().selectedWalletId || "ledger",
                  },
                });
              }}
              onConnecting={(wallet) => {
                setRoute({
                  name: "WalletConnecting",
                  params: { wallet: wallet },
                });
              }}
              onConnected={handleDismissClick}
              onError={(err) => {
                setAlertMessage(err.message);
                setRoute({
                  name: "AlertMessage",
                });
              }}
            />
          )}
          {route.name === "DerivationPath" && (
            <DerivationPath
              selector={selector}
              options={options}
              onConnected={handleDismissClick}
              params={route.params}
              onBack={() =>
                setRoute({
                  name: "WalletOptions",
                })
              }
              onError={(message) => {
                setAlertMessage(message);
                setRoute({
                  name: "AlertMessage",
                });
              }}
            />
          )}
          {route.name === "WalletNetworkChanged" && (
            <WalletNetworkChanged
              selector={selector}
              onSwitchWallet={() =>
                setRoute({
                  name: "WalletOptions",
                })
              }
              onDismiss={handleDismissClick}
            />
          )}
          {route.name === "WalletNotInstalled" && (
            <WalletNotInstalled
              module={route.params?.module!}
              onBack={() => {
                setRoute({
                  name: "WalletOptions",
                });
              }}
            />
          )}
          {route.name === "WalletConnecting" && (
            <WalletConnecting
              wallet={route.params?.wallet}
              onBack={() => {
                setRoute({ name: "WalletOptions" });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
