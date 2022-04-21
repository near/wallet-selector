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
        <div className="Modal-alert-close">
          <button onClick={close}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              fill="#A7A7A7"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>
        <div className="Modal-alert-message">{message}</div>
        <button onClick={close}>OK</button>
      </div>
    </div>
  );
};
