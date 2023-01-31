import React, { useEffect, useState } from "react";

import type {
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

      const filteredModules = state.modules.filter(filterByType);

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

    if (module.id === "opto-wallet") {
      const subdomain = networkId === "testnet" ? "app.testnet" : "app";
      url = `https://${subdomain}.optowallet.com`;
    }

    if (module.id === "near-wallet") {
      const subdomain = networkId === "testnet" ? "testnet." : "";
      url = `https://wallet.${subdomain}near.org`;
    }

    if (module.id === "here-wallet") {
      url = "https://herewallet.app/";
    }

    if (
      (url === "" && module.type === "bridge") ||
      module.type === "hardware"
    ) {
      return;
    }

    window.open(url, "_blank");
  };

  const getTypeNameAndIcon = (
    walletId: string,
    type: string
  ): { typeFullName: string; qrIcon: boolean } => {
    switch (type) {
      case "injected":
        if (walletId === "nearfi") {
          return {
            typeFullName: "Wallet Extension",
            qrIcon: true,
          };
        }

        if (walletId === "here-wallet") {
          return {
            typeFullName: "Mobile Wallet",
            qrIcon: true,
          };
        }

        return {
          typeFullName: "Wallet Extension",
          qrIcon: false,
        };
      case "browser":
        if (walletId === "here-wallet") {
          return {
            typeFullName: "Web Wallet",
            qrIcon: true,
          };
        }

        return {
          typeFullName: "Web Wallet",
          qrIcon: false,
        };
      default:
        return {
          typeFullName: "Web Wallet",
          qrIcon: false,
        };
    }
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
            const { type, id } = module;
            const { typeFullName, qrIcon } = getTypeNameAndIcon(id, type);
            return (
              <div
                tabIndex={0}
                className={`single-wallet-get ${module.id}`}
                key={module.id}
                onClick={() => {
                  goToWallet(module);
                }}
              >
                <div className={"small-icon"}>
                  {qrIcon && (
                    <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.22224 1.33334H1.44446V6.66668H7.22224V1.33334Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.8889 1.33334H10.1111V6.66668H15.8889V1.33334Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.22224 9.33334H1.44446V14.6667H7.22224V9.33334Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.1111 13.1429V14.6667H15.8889M10.1111 9.33334V10.8572H12.5873V9.33334H15.8889V12.381"
                        stroke="#4C5155"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <rect
                        x="3.61108"
                        y="3.33334"
                        width="1.44444"
                        height="1.33333"
                        fill="#4C5155"
                      />
                      <rect
                        x="3.61108"
                        y="11.3333"
                        width="1.44444"
                        height="1.33333"
                        fill="#4C5155"
                      />
                      <rect
                        x="12.2778"
                        y="3.33334"
                        width="1.44445"
                        height="1.33333"
                        fill="#4C5155"
                      />
                    </svg>
                  )}
                  {!qrIcon && (
                    <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 8.66667V12.6667C13 13.0203 12.8478 13.3594 12.577 13.6095C12.3061 13.8595 11.9387 14 11.5556 14H3.61113C3.22804 14 2.86064 13.8595 2.58975 13.6095C2.31887 13.3594 2.16669 13.0203 2.16669 12.6667V5.33333C2.16669 4.97971 2.31887 4.64057 2.58975 4.39052C2.86064 4.14048 3.22804 4 3.61113 4H7.94447"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.8333 2H15.1666V6"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.22223 9.33333L15.1667 2"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <div className="icon">
                  <img src={iconUrl} alt={name} />
                </div>
                <div className="content">
                  <div className="title">{name}</div>
                  <div className="type">{typeFullName}</div>
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
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33.5 1.83325L30.1666 5.16658M17.4818 17.8514C19.1406 19.5103 20.1666 21.8019 20.1666 24.3333C20.1666 29.3959 16.0626 33.4999 11 33.4999C5.93735 33.4999 1.8333 29.3959 1.8333 24.3333C1.8333 19.2706 5.93735 15.1666 11 15.1666C13.5313 15.1666 15.8229 16.1926 17.4818 17.8514ZM17.4818 17.8514L24.3333 10.9999M24.3333 10.9999L29.3333 15.9999L35.1666 10.1666L30.1666 5.16658M24.3333 10.9999L30.1666 5.16658"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <div className="content-side">
                <h3>{translate("modal.wallet.secureAndManage")}</h3>
                <p>{translate("modal.wallet.safelyStore")}</p>
              </div>
            </div>
            <div className="wallet-what">
              <div className={"icon-side"}>
                <svg
                  width="40"
                  height="41"
                  viewBox="0 0 40 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="28.3333"
                    cy="23.8333"
                    r="1.66667"
                    fill="currentColor"
                  ></circle>
                  <path
                    d="M35 12.1667H7C5.89543 12.1667 5 11.2712 5 10.1667V7.5C5 6.39543 5.89543 5.5 7 5.5H31.6667"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M35 12.1667V35.5H7C5.89543 35.5 5 34.6046 5 33.5V8.83334"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
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
