import { translate } from "@near-wallet-selector/core";
import React from "react";
import { ModalHeader } from "./ModalHeader";

interface CompleteProps {
  onComplete: () => void;
  onCloseModal: () => void;
  onBack: () => void;
}

export const Complete: React.FC<CompleteProps> = ({
  onComplete,
  onBack,
  onCloseModal,
}) => {
  const onClick = () => {
    onComplete();
    onCloseModal();
  };

  return (
    <>
      <ModalHeader
        title={translate("modal.exportAccounts.complete.title")}
        onCloseModal={onCloseModal}
        onBack={onBack}
      />
      <h4 className="complete-desc">
        {translate("modal.exportAccounts.complete.desc")}
      </h4>

      <button className="middleButton" onClick={onClick}>
        {translate("modal.exportAccounts.complete.button")}
      </button>
    </>
  );
};
