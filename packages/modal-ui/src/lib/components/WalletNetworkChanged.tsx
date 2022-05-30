import React from "react";
import type { WalletSelector } from "@near-wallet-selector/core";

interface WalletNetworkChangedProps {
  selector: WalletSelector;
  onSwitchWallet: () => void;
  onDismiss: () => void;
}

export const WalletNetworkChanged: React.FC<WalletNetworkChangedProps> = ({
  selector,
  onSwitchWallet,
  onDismiss,
}) => {
  return (
    <div className="switch-network-message-wrapper">
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
      <div className="action-buttons">
        <button className="left-button" onClick={onDismiss}>
          Dismiss
        </button>
        <button className="right-button" onClick={onSwitchWallet}>
          Switch Wallet
        </button>
      </div>
    </div>
  );
};
