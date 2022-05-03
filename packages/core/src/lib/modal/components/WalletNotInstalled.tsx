import React from "react";

import { Wallet } from "../../wallet/wallet.types";

interface WalletNotInstalledProps {
  notInstalledWallet: Wallet;
  onBack: () => void;
}

export const WalletNotInstalled: React.FC<WalletNotInstalledProps> = ({
  notInstalledWallet,
  onBack,
}) => {
  return (
    <div className="Modal-body Modal-wallet-not-installed">
      <div className={`icon-display ${notInstalledWallet.id}`}>
        <img
          src={notInstalledWallet.metadata.iconUrl}
          alt={notInstalledWallet.metadata.name}
        />
        <p>{notInstalledWallet.metadata.name}</p>
      </div>
      <p>
        {`You'll need to install ${notInstalledWallet.metadata.name} to continue. After installing`}
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
            if (notInstalledWallet.type !== "injected") {
              return;
            }

            window.open(notInstalledWallet.metadata.downloadUrl, "_blank");
          }}
        >
          {`Open ${notInstalledWallet.metadata.name}`}
        </button>
      </div>
    </div>
  );
};
