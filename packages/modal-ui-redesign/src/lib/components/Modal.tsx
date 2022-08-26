import React, { useCallback, useEffect, useState } from "react";
import type { ModuleState, WalletSelector } from "@near-wallet-selector/core";

import type { ModalOptions, Theme } from "../modal.types";
import type { ModalRoute } from "./Modal.types";
import { WalletNetworkChanged } from "./WalletNetworkChanged";
import { WalletOptions } from "./WalletOptions";
import { AlertMessage } from "./AlertMessage";
import { CloseButton } from "./CloseButton";
import { DerivationPath } from "./DerivationPath";
import { WalletConnecting } from "./WalletConnecting";
import { WalletNotInstalled } from "./WalletNotInstalled";

import { BackArrow } from "./BackArrow";
import { WalletHome } from "./WalletHome";

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
    name: "WalletHome",
  });
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<ModuleState>();
  const [getWallet, setGetWallet] = useState(false);

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

  const handleWalletClick = async (module: ModuleState) => {
    setSelectedWallet(module);
    try {
      const { deprecated, available } = module.metadata;

      if (module.type === "injected" && !available) {
        setRoute({
          name: "WalletNotInstalled",
          params: { module: module },
        });
        return;
      }

      const wallet = await module.wallet();

      if (deprecated) {
        setAlertMessage(
          `${module.metadata.name} is deprecated. Please select another wallet.`
        );
        setRoute({
          name: "AlertMessage",
          params: {
            wallet: wallet,
          },
        });
        return;
      }

      setRoute({
        name: "WalletConnecting",
        params: { wallet: wallet },
      });

      if (wallet.type === "hardware") {
        setRoute({
          name: "DerivationPath",
          params: {
            walletId: selector.store.getState().selectedWalletId || "ledger",
          },
        });
        return;
      }

      await wallet.signIn({
        contractId: options.contractId,
        methodNames: options.methodNames,
      });

      handleDismissClick();
    } catch (err) {
      const { name } = module.metadata;

      const message =
        err instanceof Error ? err.message : "Something went wrong";

      const wallet = await module.wallet();

      setAlertMessage(`Failed to sign in with ${name}: ${message}`);
      setRoute({
        name: "AlertMessage",
        params: {
          wallet: wallet,
        },
      });
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`nws-modal-wrapper ${getThemeClass(options?.theme)} ${
        visible ? "open" : ""
      }`}
    >
      <div className="nws-modal-overlay" onClick={handleDismissClick} />
      <div className="nws-modal">
        <div className="nws-modal-left">
          <div className="nws-modal-header">
            <h2>Connect Your Wallet</h2>
          </div>
          <div className="nws-modal-body">
            {
              <WalletOptions
                handleWalletClick={handleWalletClick}
                selector={selector}
              />
            }
          </div>
        </div>
        <div className="nws-modal-right">
          {route.name === "WalletOptions" &&
            (getWallet ? (
              <div className={"nws-modal-header"}>
                <BackArrow
                  onClick={() => {
                    setGetWallet(!getWallet);
                  }}
                />
                <h3 className={"middleTitle"}>Get a Wallet</h3>
                <CloseButton onClick={handleDismissClick} />
              </div>
            ) : (
              <div className={"nws-modal-header"}>
                <h3 className={"middleTitle"}>What is a Wallet?</h3>
                <CloseButton onClick={handleDismissClick} />
              </div>
            ))}
          <div className={"nws-modal-body"}>
            {route.name === "AlertMessage" && alertMessage && (
              <AlertMessage
                message={alertMessage}
                wallet={route.params?.wallet}
                onBack={(retry) => {
                  if (retry) {
                    handleWalletClick(selectedWallet!);
                  }
                  setAlertMessage(null);
                  setRoute({
                    name: "WalletOptions",
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
                onError={(message, wallet) => {
                  setAlertMessage(message);
                  setRoute({
                    name: "AlertMessage",
                    params: {
                      wallet: wallet,
                    },
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
                  setRoute({
                    name: "WalletOptions",
                  });
                }}
              />
            )}
            {route.name === "WalletOptions" && (
              <WalletHome
                getWallet={getWallet}
                selector={selector}
                onClick={() => {
                  setGetWallet(!getWallet);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
