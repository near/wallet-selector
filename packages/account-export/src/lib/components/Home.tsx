import React from "react";

import { ModalHeader } from "./ModalHeader";
import { translate } from "@near-wallet-selector/core";

interface HomeProps {
  onCloseModal: () => void;
}

export const Home: React.FC<HomeProps> = ({ onCloseModal }) => {
  return (
    <div className="wallet-home-wrapper">
      <div className="nws-modal-header-wrapper">
        <ModalHeader
          title={translate("modal.exportAccounts.transferYourAccounts")}
          onCloseModal={onCloseModal}
        />
      </div>
      <div className="wallet-info-wrapper what-wallet-hide">
        <div className="wallet-what">
          <svg
            width="56"
            height="57"
            viewBox="0 0 56 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="0.5"
              width="56"
              height="56"
              rx="12"
              fill="url(#paint0_radial_2563_17897)"
            />
            <g opacity="0.7">
              <path
                d="M23 43.5H16.3333C15.4493 43.5 14.6014 43.1488 13.9763 42.5237C13.3512 41.8986 13 41.0507 13 40.1667V16.8333C13 15.9493 13.3512 15.1014 13.9763 14.4763C14.6014 13.8512 15.4493 13.5 16.3333 13.5H23M34.6667 36.8333L43 28.5M43 28.5L34.6667 20.1667M43 28.5H23"
                stroke="#568FFC"
                strokeWidth="3.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <radialGradient
                id="paint0_radial_2563_17897"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(-3.5 79.5) rotate(-47.8271) scale(114.691 121.528)"
              >
                <stop stopColor="#112140" />
                <stop offset="1" stopColor="#1D5D72" />
              </radialGradient>
            </defs>
          </svg>
          {/* </div> */}
          <div className="content-side">
            <h3>{translate("modal.exportAccounts.chooseAWallet")}</h3>
            <p>{translate("modal.exportAccounts.selectAWallet")}</p>
          </div>
        </div>
        <div className="wallet-what">
          <svg
            width="56"
            height="57"
            viewBox="0 0 56 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="0.5"
              width="56"
              height="56"
              rx="12"
              fill="url(#paint0_radial_2563_17904)"
            />
            <g opacity="0.7">
              <path
                d="M13 28.5C13 20.2157 19.7157 13.5 28 13.5C36.2843 13.5 43 20.2157 43 28.5C43 29.4205 43.7462 30.1667 44.6667 30.1667C45.5871 30.1667 46.3333 29.4205 46.3333 28.5C46.3333 18.3748 38.1252 10.1667 28 10.1667C17.8748 10.1667 9.66667 18.3748 9.66667 28.5C9.66667 29.4205 10.4129 30.1667 11.3333 30.1667C12.2538 30.1667 13 29.4205 13 28.5Z"
                fill="#568FFC"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M38 28.5C38 31.0612 37.0372 33.3975 35.4537 35.1667H42.6434C43.8167 35.1667 44.6152 36.3476 44.0465 37.3738C40.9203 43.0147 34.9061 46.8333 28 46.8333C21.0939 46.8333 15.0796 43.0147 11.9535 37.3738C11.3848 36.3476 12.1833 35.1667 13.3566 35.1667H20.5463C18.9628 33.3975 18 31.0612 18 28.5C18 22.9771 22.4772 18.5 28 18.5C33.5228 18.5 38 22.9771 38 28.5ZM28 35.1667C31.6819 35.1667 34.6667 32.1819 34.6667 28.5C34.6667 24.8181 31.6819 21.8333 28 21.8333C24.3181 21.8333 21.3333 24.8181 21.3333 28.5C21.3333 32.1819 24.3181 35.1667 28 35.1667ZM16.8189 38.5H39.1811C36.4319 41.572 32.4397 43.5 28 43.5C23.5603 43.5 19.5681 41.572 16.8189 38.5Z"
                fill="#568FFC"
              />
            </g>
            <defs>
              <radialGradient
                id="paint0_radial_2563_17904"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(-3.5 79.5) rotate(-47.8271) scale(114.691 121.528)"
              >
                <stop stopColor="#112140" />
                <stop offset="1" stopColor="#1D5D72" />
              </radialGradient>
            </defs>
          </svg>
          <div className="content-side">
            <h3>{translate("modal.exportAccounts.selectYourAccounts")}</h3>
            <p>{translate("modal.exportAccounts.afterDecide")}</p>
          </div>
        </div>
        <div className="button-spacing" />
        <div className="middleContainer">
          <p>{translate("modal.exportAccounts.disclaimer")}</p>
        </div>
      </div>
    </div>
  );
};
