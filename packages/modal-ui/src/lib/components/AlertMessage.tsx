import React from "react";

interface AlertMessageProps {
  message: string;
  onBack: () => void;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  onBack,
}) => {
  return (
    <div className="alert-message-wrapper">
      <p>{message}</p>
      <div className="action-buttons">
        <button className="left-button" onClick={onBack}>
          OK
        </button>
      </div>
    </div>
  );
};
