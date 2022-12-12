import React from "react";

interface NoInterfaceProps {
  src: string | undefined;
  name: string | undefined;
  alertMessage: string | null;
}

export const NoInterface: React.FC<NoInterfaceProps> = ({
  src,
  name,
  alertMessage,
}) => (
  <div className="import-account connecting-wrapper">
    <div className="content">
      <div className="icon">
        <img src={src} alt={name} />
      </div>
      <h3 className="connecting-name">{name}</h3>
      <p>{alertMessage}</p>
    </div>
  </div>
);
