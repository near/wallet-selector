import React from "react";
import { Wallet } from "@near-wallet-selector/core";

interface WalletNotInstalledProps {
  wallet: Wallet;
  onBack: () => void;
}

export const WalletNotInstalled: React.FC<WalletNotInstalledProps> = ({
  wallet,
  onBack,
}) => {
  return (
    <div className="wallet-not-installed-wrapper">
      <div className="wallet-data">
        <div className="wallet-icon-box">
          <img src={wallet.metadata.iconUrl} alt={wallet.metadata.name} />
        </div>
        <p>{wallet.metadata.name}</p>
      </div>
      <p>
        {`You'll need to install ${wallet.metadata.name} to continue. After installing`}
        <span className="refresh-link" onClick={() => window.location.reload()}>
          &nbsp;refresh the page.
        </span>
      </p>
      <div className="action-buttons">
        <button className="left-button" onClick={onBack}>
          Back
        </button>
        <button
          className="right-button"
          onClick={() => {
            if (wallet.type !== "injected") {
              return;
            }

            window.open(wallet.metadata.downloadUrl, "_blank");
          }}
        >
          {`Open ${wallet.metadata.name}`}
        </button>
      </div>
    </div>
  );
};
