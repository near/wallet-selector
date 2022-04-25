import React from "react";
import { CloseButton } from "./CloseButton";

interface AlertModalProps {
  message: string;
  onClose: () => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({ message, onClose }) => {
  return (
    <div className="Modal-alert">
      <div className="Modal-alert-window">
        <div className="Modal-alert-close">
          <CloseButton onClick={onClose} />
        </div>
        <div className="Modal-alert-message">{message}</div>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};
