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
          <div className="wallet-connected-success">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" rx="12" fill="#51BD7C" />
              <path
                d="M7.75 12.75L10 15.25L16.25 8.75"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Connection Successful</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
