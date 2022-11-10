import React from "react";

interface WhatRow {
  title: string;
  description: string;
  icon: string;
  iconLight: string;
}

export const WhatWallet: React.FC<WhatRow> = ({ title, description, icon, iconLight }) => {
  return (
    <div className="wallet-what">
      <div className={"icon-side"}>
        <img src={icon} className={"display-dark"} alt={"icon"} />
        <img src={iconLight} className={"display-light"} alt={"icon"} />
      </div>
      <div className="content-side">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
