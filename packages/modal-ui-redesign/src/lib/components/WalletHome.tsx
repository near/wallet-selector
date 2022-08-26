import React from "react";
import { WhatWallet } from "./WhatWallet";
import Icon from "../images/black-white.jpg";
import { ModuleState } from "@near-wallet-selector/core";

interface WalletHomeProps {
  getWallet: boolean;
  onClick: () => void;
  getThreeWallets: Array<ModuleState>;
}

export const WalletHome: React.FC<WalletHomeProps> = ({
  getWallet,
  getThreeWallets,
  onClick,
}) => {
  return (
    <div>
      {getWallet ? (
        <div>
          {getThreeWallets.map((module) => {
            const { iconUrl, name, description } = module.metadata;
            return (
              <div className={`single-wallet`} key={module.id}>
                <div className={"icon"}>
                  <img src={iconUrl} alt={name} />
                </div>
                <div className={"content"}>
                  <div className={"title"}>{name}</div>
                  <div className={"description"}>{description}</div>
                </div>
                <div className={"button-get"}>
                  <button className={"get-wallet"}>Get</button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <WhatWallet
            title="Secure & Manage Your Digital Assets"
            description="Safely store and transfer your crypto and NFTs."
            icon={Icon}
          />
          <WhatWallet
            title="Log In to Any NEAR App"
            description="No need to create new accounts or credentials. Connect your wallet and you are good to go!"
            icon={Icon}
          />
          <button className={"middleButton"} onClick={onClick}>
            Get a Wallet
          </button>
        </div>
      )}
    </div>
  );
};
