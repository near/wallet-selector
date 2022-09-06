import React from "react";
import { ModuleState } from "@near-wallet-selector/core";

interface ConnectionResultProps {
  module: ModuleState;
  message: string;
  err: boolean;
  onRetry: () => void;
}

export const ConnectionResult: React.FC<ConnectionResultProps> = ({
  module,
  message,
  err,
  onRetry,
}) => {
  return (
    <div className="connection">
      {err ? (
        <div className="error-wrapper">
          <div className="error">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http:/*www.w3.org/2000/svg"
            >
              */ <rect width="24" height="24" rx="12" fill="#CE5A6F" />
              <path
                d="M17.25 6.75L6.75 17.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.75 6.75L17.25 17.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Connection Failed</span>
          </div>
          <p>{message}</p>
          {module?.metadata.available && (
            <button onClick={onRetry}>Retry</button>
          )}
        </div>
      ) : (
        <div className="success">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="12" fill="#51BD7C" />
            <path
              d="M7.75 12.75L10 15.25L16.25 8.75"
              stroke="#232323"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Connection Successful
        </div>
      )}
    </div>
  );
};
