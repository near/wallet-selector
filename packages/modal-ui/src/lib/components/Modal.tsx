import React, { useCallback, useEffect, useState } from "react";
import type { ModuleState, WalletSelector } from "@near-wallet-selector/core";

import type { ModalOptions, Theme } from "../modal.types";
import type { ModalRoute } from "./Modal.types";
import { WalletNetworkChanged } from "./WalletNetworkChanged";
import { WalletOptions } from "./WalletOptions";
import { AlertMessage } from "./AlertMessage";
import { DerivationPath } from "./DerivationPath";
import { WalletConnecting } from "./WalletConnecting";
import { WalletNotInstalled } from "./WalletNotInstalled";

import { WalletHome } from "./WalletHome";
import { WalletConnected } from "./WalletConnected";

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

  useEffect(() => {
    setRoute({
      name: "WalletHome",
    });

    const { selectedWalletId, modules } = selector.store.getState();
    if (selectedWalletId) {
      const module = modules.find((m) => m.id === selectedWalletId);
      setSelectedWallet(module);
      setRoute({
        name: "WalletConnected",
        params: {
          module,
        },
      });
    }
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
      name: "WalletHome",
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

    const { selectedWalletId } = selector.store.getState();
    if (selectedWalletId === module.id) {
      setRoute({
        name: "WalletConnected",
        params: {
          module,
        },
      });
      return;
    }

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
            module: module,
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
            walletId: wallet.id || "ledger",
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

      setAlertMessage(`Failed to sign in with ${name}: ${message}`);
      setRoute({
        name: "AlertMessage",
        params: {
          module: module,
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
        <div className="modal-left">
          <div className="modal-left-title">
            <h2>Connect Your Wallet</h2>
          </div>
          <WalletOptions
            handleWalletClick={handleWalletClick}
            selector={selector}
          />
        </div>
        <div className="modal-right">
          <div className="nws-modal-body">
            {route.name === "AlertMessage" && alertMessage && (
              <AlertMessage
                message={alertMessage}
                module={route.params?.module}
                onBack={(retry) => {
                  if (retry) {
                    handleWalletClick(selectedWallet!);
                  }
                  setAlertMessage(null);
                  setRoute({
                    name: "WalletHome",
                  });
                }}
                onCloseModal={handleDismissClick}
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
                    name: "WalletHome",
                  })
                }
                onError={(message, wallet) => {
                  const { modules } = selector.store.getState();
                  const findModule = modules.find(
                    (module) => module.id === wallet.id
                  );

                  setAlertMessage(message);
                  setRoute({
                    name: "AlertMessage",
                    params: {
                      module: findModule!,
                    },
                  });
                }}
                onCloseModal={handleDismissClick}
              />
            )}
            {route.name === "WalletNetworkChanged" && (
              <WalletNetworkChanged
                selector={selector}
                onBack={() =>
                  setRoute({
                    name: "WalletHome",
                  })
                }
                onCloseModal={handleDismissClick}
              />
            )}
            {route.name === "WalletNotInstalled" && (
              <WalletNotInstalled
                module={route.params?.module!}
                onBack={() => {
                  setRoute({
                    name: "WalletHome",
                  });
                }}
                onCloseModal={handleDismissClick}
              />
            )}
            {route.name === "WalletConnecting" && (
              <WalletConnecting
                wallet={route.params?.wallet}
                onBack={() => {
                  setRoute({
                    name: "WalletHome",
                  });
                }}
                onCloseModal={handleDismissClick}
              />
            )}
            {route.name === "WalletHome" && (
              <WalletHome
                selector={selector}
                onCloseModal={handleDismissClick}
              />
            )}
            {route.name === "WalletConnected" && (
              <WalletConnected
                module={selectedWallet!}
                onCloseModal={handleDismissClick}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
