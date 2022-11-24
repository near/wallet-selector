import type { WalletSelector } from "@near-wallet-selector/core";
import { walletModuleNetworks } from "@near-wallet-selector/core";
import React, { useState } from "react";

interface ChangeNetworkProps {
  selector: WalletSelector;
}

export const ChangeNetwork: React.FC<ChangeNetworkProps> = ({ selector }) => {
  const [showOptions, setShowOptions] = useState(false);

  function renderNetworkOption(networkId: string) {
    return (
      <div
        className={`network-option ${
          selector.getOptions().network.networkId === networkId
            ? networkId === "mainnet"
              ? "mainnet"
              : "other"
            : ""
        }-network`}
      >
        {networkId === "mainnet" ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2345_15104)">
              <path
                d="M8.00016 1.3335L1.3335 4.66683L8.00016 8.00016L14.6668 4.66683L8.00016 1.3335Z"
                stroke="#00BF89"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.3335 11.3335L8.00016 14.6668L14.6668 11.3335"
                stroke="#00BF89"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.3335 8L8.00016 11.3333L14.6668 8"
                stroke="#00BF89"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_2345_15104">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.6665 12L14.6665 8L10.6665 4"
              stroke="#C1C1C1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.3335 4L1.3335 8L5.3335 12"
              stroke="#C1C1C1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        <span>{networkId}</span>
      </div>
    );
  }

  function toggleShowOptions() {
    setShowOptions(!showOptions);
  }

  function changeNetwork(networkId: string) {
    selector.setActiveNetwork(networkId);
  }

  return (
    <div className="change-network">
      <div className="change-network-title">Change Network</div>
      <div className="change-network-selected" onClick={toggleShowOptions}>
        {renderNetworkOption(selector.getOptions().network.networkId)}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.75 8.75L14.25 12L10.75 15.25"
            stroke="#C1C1C1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {showOptions && (
        <div className="change-network-options">
          {walletModuleNetworks.map((network, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  changeNetwork(network.options.network.networkId);
                }}
              >
                {renderNetworkOption(network.options.network.networkId)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
