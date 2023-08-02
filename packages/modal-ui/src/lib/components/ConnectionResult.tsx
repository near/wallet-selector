import React from "react";
import type { ModuleState } from "@near-wallet-selector/core";
import { translate } from "@near-wallet-selector/core";
import { ConnectionErrorIcon } from "./icons/ConnectionErrorIcon";
import { ConnectionSuccessIcon } from "./icons/ConnectionSuccessIcon";

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
            <ConnectionErrorIcon />
            {translate("modal.wallet.connectionFailed")}
          </div>
          <p>{message}</p>
          {module?.metadata.available && (
            <button onClick={onRetry}>{translate("modal.ledger.retry")}</button>
          )}
        </div>
      ) : (
        <div className="success">
          <ConnectionSuccessIcon />
          {translate("modal.wallet.connectionSuccessful")}
        </div>
      )}
    </div>
  );
};
