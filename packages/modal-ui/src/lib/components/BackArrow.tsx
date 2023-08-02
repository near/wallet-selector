import React from "react";
import { BackArrowIcon } from "./icons/BackArrowIcon";

interface BackArrowProps {
  onClick: () => void;
}

export const BackArrow: React.FC<BackArrowProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="back-button">
      <BackArrowIcon />
    </button>
  );
};
