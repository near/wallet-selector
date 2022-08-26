import React from "react";
import { ConnectionResult } from "./ConnectionResult";
import type { Wallet } from "@near-wallet-selector/core";

interface AlertMessageProps {
  message: string;
  wallet?: Wallet;
  onBack: (retry: boolean) => void;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  wallet,
  onBack,
}) => {
  return (
    <div className="alert-message connecting-wrapper">
      <div className="content">
        <div className="icon">
          <img src={wallet?.metadata.iconUrl} alt={wallet?.metadata.name} />
        </div>
        <h3 className="connecting-name">{wallet?.metadata.name}</h3>
        <div className="connecting-details">
          <ConnectionResult
            err={message !== null}
            onRetry={() => {
              onBack(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};
