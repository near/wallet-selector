import React, { useEffect, useState } from "react";
import { WhatWallet } from "./WhatWallet";
import Icon from "../images/black-white.jpg";
import {
  InjectedWallet,
  ModuleState,
  WalletSelector,
} from "@near-wallet-selector/core";
import { ModalHeader } from "./ModalHeader";
import { BackArrow } from "./BackArrow";
import { translate } from "@near-wallet-selector/core";

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
        return item.type !== "bridge" && item.type !== "hardware";
      };

      const filteredModules = state.modules.filter(filterByType).slice(0, 3);

      setModules(filteredModules);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToWallet = (module: ModuleState) => {
    const { networkId } = selector.options.network;
    let url = "";

    if (module.type === "injected") {
      url = (module as ModuleState<InjectedWallet>).metadata.downloadUrl;
    }

    // TODO: improve links to wallets other than injected type.
    if (module.id === "my-near-wallet") {
      const subdomain = networkId === "testnet" ? "testnet" : "app";
      url = `https://${subdomain}.mynearwallet.com`;
    }

    if (module.id === "near-wallet") {
      const subdomain = networkId === "testnet" ? "testnet." : "";
      url = `https://wallet.${subdomain}near.org`;
    }

    if (
      (url === "" && module.type === "bridge") ||
      module.type === "hardware"
    ) {
      return;
    }

    window.open(url, "_blank");
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
            const { iconUrl, name, description } = module.metadata;
            return (
              <div className="single-wallet-get" key={module.id}>
                <div className="icon">
                  <img src={iconUrl} alt={name} />
                </div>
                <div className="content">
                  <div className="title">{name}</div>
                  <div className="description">{description}</div>
                </div>
                <div className="button-get">
                  <button
                    className="get-wallet"
                    onClick={() => {
                      goToWallet(module);
                    }}
                  >
                    Get
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {route === "WalletInfo" && (
        <>
          <div className="wallet-info-wrapper what-wallet-hide">
            <WhatWallet
              title={translate("modal.wallet.secure&Manage")}
              description={translate("modal.wallet.safelyStore")}
              icon={Icon}
            />
            <WhatWallet
              title={translate("modal.wallet.logInToAny")}
              description={translate("modal.wallet.noNeedToCreate")}
              icon={Icon}
            />
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
        </>
      )}
    </div>
  );
};
