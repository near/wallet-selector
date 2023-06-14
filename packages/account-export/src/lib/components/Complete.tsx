import { translate } from "@near-wallet-selector/core";
import React from "react";
import { ModalHeader } from "./ModalHeader";

interface CompleteProps {
  onComplete: () => void;
  onCloseModal: () => void;
  onBack: () => void;
  onStartOver: () => void;
}

export const Complete: React.FC<CompleteProps> = ({
  onComplete,
  onBack,
  onCloseModal,
  onStartOver,
}) => {
  const onClick = () => {
    onComplete();
    onCloseModal();
  };

  return (
    <>
      <div className="nws-modal-header-wrapper">
        <ModalHeader
          title={translate("modal.exportAccounts.complete.title")}
          onCloseModal={onCloseModal}
          onBack={onBack}
        />
      </div>
      <div className="complete-desc">
        <h4 className="content">
          {translate("modal.exportAccounts.complete.descOne")}
        </h4>
        <h4 className="content">
          {translate("modal.exportAccounts.complete.descTwo")}
        </h4>
      </div>

      <button
        className="middleButton account-export-button secondary"
        onClick={onStartOver}
      >
        {translate("modal.exportAccounts.complete.startOverButton")}
      </button>
      <button className="middleButton account-export-button" onClick={onClick}>
        {translate("modal.exportAccounts.complete.button")}
      </button>
    </>
  );
};
