import React from "react";
import { CloseButton } from "./CloseButton";

interface ModalHeaderProps {
  title: string;
  isOpen: boolean;
  onCloseModal: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  isOpen,
  onCloseModal,
}) => {
  const additionalClasses = isOpen ? "-open" : "";
  return (
    <div className="nws-modal-header">
      <h3 className={`middleTitle ${additionalClasses}`}>{title}</h3>
      <CloseButton onClick={onCloseModal} />
    </div>
  );
};
