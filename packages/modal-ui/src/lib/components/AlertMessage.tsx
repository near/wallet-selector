import React from "react";
import { ConnectionResult } from "./ConnectionResult";
import type { ModuleState } from "@near-wallet-selector/core";

interface AlertMessageProps {
  message: string;
  onBack: (module: ModuleState) => void;
}


export const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  onBack,
}) => {
  return (
    <div className={"alert-message"}>
      <ConnectionResult err={message !== null} />
    </div>
  );
};
