import React from "react";

interface WhatRow {
  title: string;
  description: string;
  icon: string;
}

export const WhatWallet: React.FC<WhatRow> = ({ title, description, icon }) => {
  return (
    <div className="wallet-what">
      <div className="icon-side">
        <img src={icon} alt="icon" />
      </div>
      <div className="content-side">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
