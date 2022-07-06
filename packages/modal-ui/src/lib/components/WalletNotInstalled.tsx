import React from "react";
import { ModuleState } from "@near-wallet-selector/core";

interface WalletNotInstalledProps {
  module: ModuleState & {
    metadata: {
      downloadUrl?: string;
    };
  };
  onBack: () => void;
}

export const WalletNotInstalled: React.FC<WalletNotInstalledProps> = ({
  module,
  onBack,
}) => {
  return (
    <div className="wallet-not-installed-wrapper">
      <div className="wallet-data">
        <div className={`wallet-icon-box ${module.id}`}>
          <img src={module.metadata.iconUrl} alt={module.metadata.name} />
        </div>
        <p>{module.metadata.name}</p>
      </div>
      <p>
        {`You'll need to install ${module.metadata.name} to continue. After installing`}
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
            if (module.type !== "injected") {
              return;
            }

            window.open(module.metadata.downloadUrl, "_blank");
          }}
        >
          {`Open ${module.metadata.name}`}
        </button>
      </div>
    </div>
  );
};
