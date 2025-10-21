import React, { Fragment } from "react";
import { ConnectionResult } from "./ConnectionResult";
import { type ModuleState } from "@near-wallet-selector/core";
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
}) => {
  return (
    <Fragment>
      <ModalHeader title="" onCloseModal={() => onBack(false)} />
      <div className="alert-message connecting-wrapper connecting-wrapper-err">
        <div className="content">
          <div className="icon">
            <img src={module?.metadata.iconUrl} alt={module?.metadata.name} />
          </div>
          <h3 className="connecting-name">{module?.metadata.name}</h3>
          {message !== null && (
            <div className="connecting-message">
              <span>The connection was not successful, please try again.</span>
            </div>
          )}
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
