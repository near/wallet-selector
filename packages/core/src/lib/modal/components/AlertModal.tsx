import React from "react";

interface AlertModalProps {
  message: string;
  setAlertMessage: (message: string | null) => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  message,
  setAlertMessage,
}) => {
  const close = () => {
    setAlertMessage(null);
  };

  return (
    <div className="Modal-alert">
      <div className="Modal-alert-window">
        <div className="Modal-alert-message">{message}</div>
        <button onClick={close}>OK</button>
      </div>
    </div>
  );
};
