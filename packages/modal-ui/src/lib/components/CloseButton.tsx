import React from "react";
import { CloseIcon } from "./icons/CloseIcon";

interface CloseButtonProps {
  onClick: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="close-button">
      <CloseIcon />
    </button>
  );
};
