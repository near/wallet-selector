import React from "react";
import type { ModuleState } from "@near-wallet-selector/core";
import { ModalHeader } from "./ModalHeader";
import { translate } from "@near-wallet-selector/core";

interface WalletNotInstalledProps {
  module: ModuleState & {
    metadata: {
      downloadUrl?: string;
    };
  };
  onBack: () => void;
  onCloseModal: () => void;
}

export const WalletNotInstalled: React.FC<WalletNotInstalledProps> = ({
  module,
  onBack,
}) => {
  return (
    <div className="wallet-not-installed-wrapper">
      <ModalHeader title="" onCloseModal={onBack} />
      <div className="wallet-data">
        <div className={`wallet-icon-box ${module.id}`}>
          <img src={module.metadata.iconUrl} alt={module.metadata.name} />
        </div>
        <h2>{module.metadata.name}</h2>
      </div>
      <p>
        {translate("modal.install.youllNeedToInstall")} {module.metadata.name}
        {translate("modal.install.toContinueAfterInstalling")}
        <span className="refresh-link" onClick={() => window.location.reload()}>
          {" "}
          {translate("modal.install.refreshThePage")}
        </span>
      </p>
      <div className="action-buttons">
        <button
          className="middleButton"
          onClick={() => {
            if (module.type !== "injected") {
              return;
            }

            window.open(module.metadata.downloadUrl, "_blank");
          }}
        >
          {translate("modal.install.open")} {module.metadata.name}
        </button>
      </div>
    </div>
  );
};
