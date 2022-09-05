import React, { Fragment } from "react";
import { ModuleState } from "@near-wallet-selector/core";
import { CloseButton } from "./CloseButton";

interface WalletConnectedProps {
  module: ModuleState;
  onCloseModal: () => void;
}

export const WalletConnected: React.FC<WalletConnectedProps> = ({
  module,
  onCloseModal,
}) => {
  return (
    <Fragment>
      <div className="nws-modal-header">
        <div>
          <span className="connected-flag">Connected</span>
        </div>
        <CloseButton onClick={onCloseModal} />
      </div>
      <div className="connecting-wrapper">
        <div className="content">
          <div className="icon">
            <img src={module?.metadata.iconUrl} alt={module?.metadata.name} />
          </div>
          <h3 className="connecting-name">{module?.metadata.name}</h3>
        </div>
      </div>
    </Fragment>
  );
};
