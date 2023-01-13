import React from "react";
import { ModalHeader } from "./ModalHeader";

interface NoInterfaceProps {
  src: string | undefined;
  name: string | undefined;
  alertMessage: string | null;
  onCloseModal: () => void;
  onBack: () => void;
}

export const NoInterface: React.FC<NoInterfaceProps> = ({
  src,
  name,
  alertMessage,
  onCloseModal,
  onBack,
}) => (
  <div className="account-export connecting-wrapper">
    <ModalHeader
      title="No interface found"
      onCloseModal={onCloseModal}
      onBack={onBack}
    />
    <div className="content">
      <div className="icon">
        <img src={src} alt={name} />
      </div>
      <h3 className="connecting-name">{name}</h3>
      <p>{alertMessage}</p>
    </div>
  </div>
);
