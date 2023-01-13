import React, { useCallback, useEffect, useState } from "react";
import type { ModuleState, WalletSelector } from "@near-wallet-selector/core";

import type { ExportSelectorOptions, Theme, ModalRoute } from "../index.types";
import { WalletList } from "./WalletList";
import { AlertMessage } from "./AlertMessage";

import { WalletNotInstalled } from "./WalletNotInstalled";

import { Home } from "./Home";
import { translate } from "@near-wallet-selector/core";
import { ExportAccount } from "./ExportAccount";

interface ExportSelectorProps {
  selector: WalletSelector;
  options: ExportSelectorOptions;
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

export const ExportSelector: React.FC<ExportSelectorProps> = ({
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
        name: "ExportAccounts",
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
    if (selectedWallet) {
      setAlertMessage(
        `${selectedWallet?.metadata.name} ${translate(
          "modal.exportAccounts.warning"
        )}`
      );
      setRoute({
        name: "AlertMessage",
        params: {
          module: selectedWallet,
        },
      });
    }
  }, [selectedWallet]);

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
            <h2>{translate("modal.exportAccounts.chooseAWallet")}</h2>
          </div>
          <WalletList
            handleWalletClick={(module) => {
              handleWalletClick(module);
            }}
            selector={selector}
          />
        </div>
        <div className="modal-right">
          <div className="nws-modal-body account-export-body">
            {route.name === "AlertMessage" && alertMessage && (
              <AlertMessage
                message={alertMessage}
                module={route.params?.module}
                onBack={() => {
                  setAlertMessage(null);
                  onBackHome();
                }}
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
            {route.name === "ExportAccounts" && (
              <ExportAccount
                module={route.params?.module}
                alertMessage={alertMessage}
                onCloseModal={handleDismissClick}
                onWarning={handleWarning}
                onBack={onBackHome}
                selector={selector}
                accounts={options.accounts}
                wallet={selectedWallet!}
                onComplete={options?.onComplete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
