import React from "react";
import type { ModuleState } from "@near-wallet-selector/core";
import { translate } from "@near-wallet-selector/core";

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
    <div className="connection connecting-details">
      {err ? (
        <div className="error-wrapper">
          <div className="error">
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5001 18.3333C15.1025 18.3333 18.8334 14.6023 18.8334 9.99996C18.8334 5.39759 15.1025 1.66663 10.5001 1.66663C5.89771 1.66663 2.16675 5.39759 2.16675 9.99996C2.16675 14.6023 5.89771 18.3333 10.5001 18.3333Z"
                stroke="#CE5A6F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13 7.5L8 12.5"
                stroke="#CE5A6F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 7.5L13 12.5"
                stroke="#CE5A6F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {translate("modal.wallet.connectionFailed")}
          </div>
          <p>{message}</p>
          {module?.metadata.available && (
            <button onClick={onRetry}>{translate("modal.ledger.retry")}</button>
          )}
        </div>
      ) : (
        <div className="success">
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.8333 9.2333V9.99997C18.8323 11.797 18.2504 13.5455 17.1744 14.9848C16.0984 16.4241 14.586 17.477 12.8628 17.9866C11.1395 18.4961 9.29768 18.4349 7.61202 17.8121C5.92636 17.1894 4.48717 16.0384 3.50909 14.5309C2.53101 13.0233 2.06645 11.24 2.18469 9.4469C2.30293 7.65377 2.99763 5.94691 4.16519 4.58086C5.33275 3.21482 6.91061 2.26279 8.66345 1.86676C10.4163 1.47073 12.2502 1.65192 13.8916 2.3833"
              stroke="#4FD98F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.8333 3.33337L10.5 11.675L8 9.17504"
              stroke="#4FD98F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {translate("modal.wallet.connectionSuccessful")}
        </div>
      )}
    </div>
  );
};
