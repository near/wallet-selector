import React, { useEffect, useState } from "react";

import type {
  BrowserWallet,
  InjectedWallet,
  ModuleState,
  WalletSelector,
} from "@near-wallet-selector/core";
import { ModalHeader } from "./ModalHeader";
import { BackArrow } from "./BackArrow";
import { translate } from "@near-wallet-selector/core";
import { QRIcon } from "./icons/QRIcon";
import { LinkIcon } from "./icons/LinkIcon";
import { KeyIcon } from "./icons/KeyIcon";
import { FolderIcon } from "./icons/FolderIcon";

interface WalletHomeProps {
  selector: WalletSelector;
  onCloseModal: () => void;
}

type WalletHomeRoutes = "WalletInfo" | "GetWallets";

export const WalletHome: React.FC<WalletHomeProps> = ({
  selector,
  onCloseModal,
}) => {
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
      <div className="nws-modal-header-wrapper">
        {route === "GetWallets" && (
          <BackArrow
            onClick={() => {
              setRoute("WalletInfo");
            }}
          />
        )}
        <ModalHeader
          title={
            route === "GetWallets"
              ? translate("modal.wallet.getAWallet")
              : translate("modal.wallet.whatIsAWallet")
          }
          onCloseModal={onCloseModal}
        />
      </div>
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
        <>
          <div className="wallet-info-wrapper what-wallet-hide">
            <div className="wallet-what">
              <div className={"icon-side"}>
                <KeyIcon />
              </div>
              <div className="content-side">
                <h3>{translate("modal.wallet.secureAndManage")}</h3>
                <p>{translate("modal.wallet.safelyStore")}</p>
              </div>
            </div>
            <div className="wallet-what">
              <div className={"icon-side"}>
                <FolderIcon />
              </div>
              <div className="content-side">
                <h3>{translate("modal.wallet.logInToAny")}</h3>
                <p>{translate("modal.wallet.noNeedToCreate")}</p>
              </div>
            </div>
            <div className="button-spacing" />
            <button
              className="middleButton"
              onClick={() => {
                setRoute("GetWallets");
              }}
            >
              {translate("modal.wallet.getAWallet")}
            </button>
          </div>
          <div className="what-wallet-mobile">
            <p>{translate("modal.wallet.useAWallet")}</p>
            <button
              className="middleButton"
              onClick={() => {
                setRoute("GetWallets");
              }}
            >
              {translate("modal.wallet.getAWallet")}
            </button>
          </div>
          <div className="lang-selector-wrapper">
            <select className="lang-selector" name="lang">
              <option value="en">English</option>
              <option value="es">Spanish</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
};
