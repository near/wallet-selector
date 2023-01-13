import React, { Fragment } from "react";
import type { ModuleState } from "@near-wallet-selector/core";
import { ModalHeader } from "./ModalHeader";

interface AlertMessageProps {
  message: string | null;
  module?: ModuleState;
  onBack: () => void;
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
      <ModalHeader title="" onCloseModal={onCloseModal} onBack={onBack} />
      <div className="alert-message connecting-wrapper connecting-wrapper-err">
        <div className="content">
          <div className="icon">
            <img src={module?.metadata.iconUrl} alt={module?.metadata.name} />
          </div>
          <h3 className="connecting-name">{module?.metadata.name}</h3>
          <h4>{message}</h4>
        </div>
      </div>
    </Fragment>
  );
};
