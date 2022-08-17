import React from "react";

// @refresh reset
interface SingleWalletProps {
  id: string;
  iconUrl: string;
  title: string;
  description: string | null;
  key: number;
  isLocationSidebar: boolean;
  selected: string;
  deprecated: string;
  onClick: () => void;
}

export const SingleWallet: React.FC<SingleWalletProps> = ({
    id,
  iconUrl,
  title,
  description,
  key,
  selected,
  deprecated,
  isLocationSidebar,
  onClick,
}) => {
  return (
    <div
      className={`single-wallet ${selected} ${deprecated} ${
        isLocationSidebar ? "sidebar" : ""
      } `}
      key={key}
      data-id={id}
      onClick={selected ? undefined : onClick}
    >
      <div className={"icon"}>
        <img src={iconUrl} alt={title} />
      </div>
      <div className={"content"}>
        <div className={"title"}>{title}</div>
        <div className={"description"}>{description}</div>
      </div>
      {!isLocationSidebar ? (
        <div className={"button-get"}>
          <button className={"get-wallet"}>Get</button>
        </div>
      ) : null}
    </div>
  );
};
