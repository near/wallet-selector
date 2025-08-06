import React from "react";

interface BackArrowProps {
  onClick: () => void;
}

export const BackArrow: React.FC<BackArrowProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="back-button">
      <svg
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 13L1 7L7 1"
          stroke="#6494EE"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
