import React from "react";
import { Wallet } from "@near-wallet-selector/core";

interface WalletConnectingProps {
  wallet: Wallet | undefined;
  onBack: () => void;
}

export const WalletConnecting: React.FC<WalletConnectingProps> = ({
  wallet,
  onBack,
}) => {
  return (
    <div className="connecting-wrapper">
      <div className="content">
        <div className="spinner" id={wallet?.id}>
          <div className="icon">
            <img src={wallet?.metadata.iconUrl} alt="" />
          </div>
        </div>
        <span>Connecting...</span>
      </div>
      <div className="action-buttons">
        <button className="left-button" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
};
