import React, { Fragment } from "react";
import type { ModuleState } from "@near-wallet-selector/core";
import { CloseButton } from "./CloseButton";
import { translate } from "@near-wallet-selector/core";
import { ConnectionSuccessIcon } from "./icons/ConnectionSuccessIcon";

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
        <h3 className="middleTitle">{``}</h3>
        <CloseButton onClick={onCloseModal} />
      </div>
      <div className="connecting-wrapper">
        <div className="content">
          <div className="icon">
            <div className={"green-dot"}></div>
            <img src={module?.metadata.iconUrl} alt={module?.metadata.name} />
          </div>
          <h3 className="connecting-name">{module?.metadata.name}</h3>
          <div className="wallet-connected-success">
            <ConnectionSuccessIcon />
            <span>{translate("modal.wallet.connectionSuccessful")}</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
