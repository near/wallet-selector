import React from "react";
import { ConnectionResult } from "./ConnectionResult";
import type { ModuleState } from "@near-wallet-selector/core";
import { ModalHeader } from "./ModalHeader";

interface AlertMessageProps {
  message: string;
  module?: ModuleState;
  onBack: (retry: boolean) => void;
  onCloseModal: () => void;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  module,
  onBack,
  onCloseModal,
}) => {
  return (
    <div className="alert-message connecting-wrapper">
      <ModalHeader title={" "} onCloseModal={onCloseModal} />
      <div className="content" style={{ marginTop: "91px" }}>
        <div className="icon">
          <img src={module?.metadata.iconUrl} alt={module?.metadata.name} />
        </div>
        <h3 className="connecting-name">{module?.metadata.name}</h3>
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
