import React, { Fragment } from "react";
import { ModuleState } from "@near-wallet-selector/core";
import { ModalHeader } from "./ModalHeader";
import { BackArrow } from "./BackArrow";
import { translate } from "../translate/translate";

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
  onCloseModal,
}) => {
  return (
    <Fragment>
      <div className="nws-modal-header-wrapper">
        <BackArrow onClick={onBack} />
        <ModalHeader title="" onCloseModal={onCloseModal} />
      </div>
      <div className="wallet-not-installed-wrapper">
        <div className="wallet-data">
          <div className={`wallet-icon-box ${module.id}`}>
            <img src={module.metadata.iconUrl} alt={module.metadata.name} />
          </div>
          <p>{module.metadata.name}</p>
        </div>
        <p>
          {translate("install.You'll need to install")} {module.metadata.name}{" "}
          {translate("install.to continue. After installing")}
          <span
            className="refresh-link"
            onClick={() => window.location.reload()}
          >
            {" "}
            {translate("install.refresh the page.")}
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
            {translate("install.Open")} {module.metadata.name}
          </button>
        </div>
      </div>
    </Fragment>
  );
};
