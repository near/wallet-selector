import React from "react";
import type { ModuleState } from "@near-wallet-selector/core";
import { translate } from "@near-wallet-selector/core";
import { ConnectionErrorIcon } from "./icons/ConnectionErrorIcon";
import { ConnectionSuccessIcon } from "./icons/ConnectionSuccessIcon";
import { RetryIcon } from "./icons/RetryIcon";

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
          {module?.metadata.available && (
            <button className="loading-dots" onClick={onRetry}>
              <RetryIcon />
              {translate("modal.ledger.retry")}
            </button>
          )}
          <div className="error-floating">
            <div className="error">
              <ConnectionErrorIcon />
              {translate("modal.wallet.connectionFailed")}
            </div>
            <p>{message}</p>
          </div>
        </div>
      ) : (
        <div className="success">
          <button className="loading-dots" onClick={onRetry}>
            {translate("modal.wallet.connectionSuccessful")}
            <ConnectionSuccessIcon />
          </button>
        </div>
      )}
    </div>
  );
};
