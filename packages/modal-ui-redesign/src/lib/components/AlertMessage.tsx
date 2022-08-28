import React from "react";
import { ConnectionResult } from "./ConnectionResult";
import type { Wallet } from "@near-wallet-selector/core";
import { ModalHeader } from "./ModalHeader";

interface AlertMessageProps {
  message: string;
  wallet?: Wallet;
  onBack: (retry: boolean) => void;
  onCloseModal: () => void;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  wallet,
  onBack,
  onCloseModal,
}) => {
  return (
    <div className="alert-message connecting-wrapper">
      <ModalHeader title={" "} onCloseModal={onCloseModal} />
      <div className="content" style={{ marginTop: "91px" }}>
        <div className="icon">
          <img src={wallet?.metadata.iconUrl} alt={wallet?.metadata.name} />
        </div>
        <h3 className="connecting-name">{wallet?.metadata.name}</h3>
        <div className="connecting-details">
          <ConnectionResult
            err={message !== null}
            onRetry={() => {
              onBack(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};
