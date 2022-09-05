import React, { Fragment } from "react";
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
    <Fragment>
      <ModalHeader title="" onCloseModal={onCloseModal} />
      <div className="alert-message connecting-wrapper">
        <div className="content">
          <div className="icon">
            <img src={module?.metadata.iconUrl} alt={module?.metadata.name} />
          </div>
          <h3 className="connecting-name">{module?.metadata.name}</h3>
          <ConnectionResult
            module={module!}
            message={message}
            err={message !== null}
            onRetry={() => {
              onBack(true);
            }}
          />
        </div>
      </div>
    </Fragment>
  );
};
