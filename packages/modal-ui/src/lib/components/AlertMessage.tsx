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
    <div className="Modal-body Modal-alert-message">
      <p>{message}</p>
      <div className="action-buttons">
        <button className="left" onClick={onBack}>
          OK
        </button>
      </div>
    </div>
  );
};
