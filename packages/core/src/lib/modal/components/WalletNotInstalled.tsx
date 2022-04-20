import React from "react";
import { ModalRouteName } from "./Modal";
import { Wallet } from "../../wallet";

interface WalletNotInstalledProps {
  notInstalledWallet: Wallet;
  setNotInstalledWallet: (wallet: Wallet | null) => void;
  setRouteName: (routeName: ModalRouteName) => void;
}

export const WalletNotInstalled: React.FC<WalletNotInstalledProps> = ({
  notInstalledWallet,
  setNotInstalledWallet,
  setRouteName,
}) => {
  return (
    <div className="Modal-body Modal-wallet-not-installed">
      <div className={`icon-display ${notInstalledWallet.id}`}>
        <img src={notInstalledWallet.iconUrl} alt={notInstalledWallet.name} />
        <p>{notInstalledWallet.name}</p>
      </div>
      <p>
        {`You'll need to install ${notInstalledWallet.name} to continue. After installing`}
        <span
          className="refresh-link"
          onClick={() => {
            window.location.reload();
          }}
        >
          &nbsp;refresh the page.
        </span>
      </p>
      <div className="action-buttons">
        <button
          className="left-button"
          onClick={() => {
            setNotInstalledWallet(null);
            setRouteName("WalletOptions");
          }}
        >
          Back
        </button>
        <button
          className="right-button"
          onClick={() => {
            if (notInstalledWallet.type !== "injected") {
              return;
            }

            window.open(notInstalledWallet.getDownloadUrl(), "_blank");
          }}
        >
          {`Open ${notInstalledWallet.name}`}
        </button>
      </div>
    </div>
  );
};
