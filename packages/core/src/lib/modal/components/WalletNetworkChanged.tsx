import React from "react";
import { WalletSelector } from "../../wallet-selector.types";
import { WalletSelectorModal } from "../modal.types";
import { ModalRouteName } from "./Modal";

interface WalletNetworkChangedProps {
  // TODO: Remove omit once modal is a separate package.
  selector: Omit<WalletSelector, keyof WalletSelectorModal>;
  setRouteName: (routeName: ModalRouteName) => void;
  handleDismissClick: () => void;
}

export const WalletNetworkChanged: React.FC<WalletNetworkChangedProps> = ({
  selector,
  setRouteName,
  handleDismissClick,
}) => {
  return (
    <div className="Modal-body Modal-switch-network-message">
      <div className="header">
        <h2>You Must Change Networks</h2>
      </div>
      <div className="content">
        <p>
          We've detected that you need to change your wallet's network to
          <strong>{` ${selector.options.network.networkId}`}</strong> for this
          dApp.
        </p>
        <p>
          Some wallets may not support changing networks. If you can not change
          networks you may consider switching to another wallet.
        </p>
      </div>
      <div className="actions">
        <button className="left-button" onClick={handleDismissClick}>
          Dismiss
        </button>
        <button
          className="right-button"
          onClick={() => setRouteName("WalletOptions")}
        >
          Switch Wallet
        </button>
      </div>
    </div>
  );
};
