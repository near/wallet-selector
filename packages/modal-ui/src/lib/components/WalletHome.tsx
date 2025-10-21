import React, { useEffect, useState } from "react";

import type {
  BrowserWallet,
  InjectedWallet,
  ModuleState,
  WalletSelector,
} from "@near-wallet-selector/core";
import { BackArrow } from "./BackArrow";
import { translate } from "@near-wallet-selector/core";
import { QRIcon } from "./icons/QRIcon";
import { LinkIcon } from "./icons/LinkIcon";
import { WalletIcon } from "./icons/WalletIcon";

interface WalletHomeProps {
  selector: WalletSelector;
}

type WalletHomeRoutes = "WalletInfo" | "GetWallets";

export const WalletHome: React.FC<WalletHomeProps> = ({ selector }) => {
  const [modules, setModules] = useState<Array<ModuleState>>([]);
  const [route, setRoute] = useState<WalletHomeRoutes>("WalletInfo");

  useEffect(() => {
    const subscription = selector.store.observable.subscribe((state) => {
      const filterByType = (item: { type: string }) => {
        return (
          item.type !== "bridge" &&
          item.type !== "hardware" &&
          item.type !== "instant-link"
        );
      };

      const filteredModules = state.modules.filter(filterByType);

      setModules(filteredModules);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getWalletUrl = (module: ModuleState) => {
    let url = "";

    if (module.type === "injected") {
      url = (module as ModuleState<InjectedWallet>).metadata.downloadUrl;
    }

    if (module.type === "browser") {
      url = (module as ModuleState<BrowserWallet>).metadata.walletUrl;
    }

    return url;
  };

  return (
    <div className="wallet-home-wrapper">
      {route === "GetWallets" && (
        <div className="nws-modal-header-wrapper">
          <BackArrow
            onClick={() => {
              setRoute("WalletInfo");
            }}
          />
        </div>
      )}
      {route === "GetWallets" && (
        <div className="get-wallet-wrapper">
          {modules.map((module) => {
            const { iconUrl, name } = module.metadata;
            const qrIcon = ["nearfi", "here-wallet"].includes(module.id);
            const hereWalletType = module.id === "here-wallet" ? "mobile" : "";
            const walletUrl = getWalletUrl(module);
            return (
              <div
                tabIndex={0}
                className={`single-wallet-get ${module.id}`}
                key={module.id}
                onClick={() => {
                  if (walletUrl) {
                    window.open(walletUrl, "_blank");
                  }
                }}
              >
                <div className={"small-icon"}>
                  {qrIcon && walletUrl && <QRIcon />}
                  {!qrIcon && walletUrl && <LinkIcon />}
                </div>
                <div className="icon">
                  <img src={iconUrl} alt={name} />
                </div>
                <div className="content">
                  <div className="title">{name}</div>
                  <div className="type">
                    {translate(
                      `modal.walletTypes.${hereWalletType || module.type}`
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {route === "WalletInfo" && (
        <div className="wallet-info-wrapper">
          <div className="info">
            <WalletIcon />
            <p>
              Wallets let you store digital assets like crypto, and log into
              apps on NEAR.
            </p>
            <p>Please select a wallet on the left, or</p>
            <p
              className="button"
              onClick={() => {
                setRoute("GetWallets");
              }}
            >
              Create a new wallet
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
