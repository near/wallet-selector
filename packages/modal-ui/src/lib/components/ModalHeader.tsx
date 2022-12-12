import React from "react";
import { BackArrow } from "./BackArrow";
import { CloseButton } from "./CloseButton";

interface ModalHeaderProps {
  title: string;
  onCloseModal: () => void;
  onBack?: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  onCloseModal,
  onBack,
}) => {
  const additionalClasses = title === "Get a Wallet" ? " -open" : "";
  return (
    <div className="nws-modal-header">
      {onBack && <BackArrow onClick={onBack} />}
      <h3 className={`middleTitle ${additionalClasses}`}>{title}</h3>
      <CloseButton onClick={onCloseModal} />
    </div>
  );
};
