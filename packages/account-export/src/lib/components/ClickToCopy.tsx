import React, { useState } from "react";
import { translate } from "@near-wallet-selector/core";

interface ClickToCopyProps {
  children: React.ReactNode;
  copy: string;
  onClick?: (e: string) => void;
  id?: string;
}

export const ClickToCopy: React.FC<ClickToCopyProps> = ({
  children,
  copy,
  onClick,
  id,
}) => {
  const [show, setShow] = useState(false);

  const handleCopy = () => {
    setShow(true);
    setTimeout(() => setShow(false), 2000);
    const input = document.createElement("textarea");
    input.innerHTML = copy;
    document.body.appendChild(input);
    input.select();
    const result = document.execCommand("copy");
    document.body.removeChild(input);
    if (onClick) {
      onClick(copy);
    }
    return result;
  };

  return (
    <button
      title={translate("component.clickToCopy.tooltip")}
      className="click-to-copy"
      onClick={handleCopy}
      {...{ id }}
    >
      {children}
      <div className={`copy-success${show ? " show" : ""}`}>
        {translate("component.clickToCopy.label")}
      </div>
    </button>
  );
};
