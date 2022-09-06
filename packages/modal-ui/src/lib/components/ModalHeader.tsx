import React from "react";
import { CloseButton } from "./CloseButton";

interface ModalHeaderProps {
  title: string;
  onCloseModal: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  onCloseModal,
}) => {
  return (
    <div className="nws-modal-header">
      <h3 className="middleTitle">{title}</h3>
      <CloseButton onClick={onCloseModal} />
    </div>
  );
};
