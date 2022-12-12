import React, { useCallback, useEffect, useState } from "react";
import type { ModuleState, WalletSelector } from "@near-wallet-selector/core";

import type { ImportModalOptions, Theme } from "../../modal.types";
import type { ModalRoute } from "../Modal.types";
import { WalletNetworkChanged } from "../WalletNetworkChanged";
import { WalletList } from "./WalletList";
import { AlertMessage } from "../AlertMessage";
import { DerivationPath } from "../DerivationPath";

import { WalletNotInstalled } from "../WalletNotInstalled";

import { Home } from "./Home";
import { translate } from "@near-wallet-selector/core";
import { ImportAccount } from "./ImportAccount";

interface ImportModalProps {
  selector: WalletSelector;
  options: ImportModalOptions;
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

export const ImportModal: React.FC<ImportModalProps> = ({
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

  const onBackHome = () => {
    setRoute({
      name: "WalletHome",
    });
  };

  useEffect(() => {
    setRoute({
      name: "WalletHome",
    });

    const { selectedWalletId, modules } = selector.store.getState();
    if (selectedWalletId) {
      const module = modules.find((m) => m.id === selectedWalletId);
      setSelectedWallet(module);
    }
    // eslint-disable-next-line
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
    onBackHome();
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
    setAlertMessage(null);
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
        name: "ImportAccounts",
        params: {
          module: module,
        },
      });
      return;
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

  const handleWarning = useCallback(() => {
    setAlertMessage(
      `${selectedWallet?.metadata.name} ${translate(
        "modal.importAccounts.warning"
      )}`
    );
  }, [selectedWallet?.metadata.name]);

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
            <h2>{translate("modal.importAccounts.chooseAWallet")}</h2>
          </div>
          <WalletList
            handleWalletClick={(module) => {
              handleWalletClick(module);
            }}
            selector={selector}
          />
        </div>
        <div className="modal-right">
          <div className="nws-modal-body import-account-body">
            {route.name === "AlertMessage" && alertMessage && (
              <AlertMessage
                message={alertMessage}
                module={route.params?.module}
                onBack={(retry) => {
                  if (retry) {
                    handleWalletClick(selectedWallet!);
                  }
                  setAlertMessage(null);
                  onBackHome();
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
                onBack={() => onBackHome()}
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
                onBack={() => onBackHome()}
                onCloseModal={handleDismissClick}
              />
            )}
            {route.name === "WalletNotInstalled" && (
              <WalletNotInstalled
                module={route.params?.module!}
                onBack={() => {
                  onBackHome();
                }}
                onCloseModal={handleDismissClick}
              />
            )}
            {route.name === "WalletHome" && (
              <Home onCloseModal={handleDismissClick} />
            )}
            {route.name === "ImportAccounts" && (
              <ImportAccount
                module={route.params?.module}
                alertMessage={alertMessage}
                onCloseModal={handleDismissClick}
                onWarning={handleWarning}
                onBack={onBackHome}
                selector={selector}
                accounts={options.accounts}
                wallet={selectedWallet!}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
