import React from "react";
import { ModalHeader } from "./ModalHeader";
import Web3AuthLogo from "../images/web3auth-logo.svg";
import MinusCircleIcon from "../images/minus-circle.svg";
import PlusIcon from "../images/plus.svg";

type SignInToCreateWalletProps = {
  onCloseModal: () => void;
};

export const SignInToCreateWallet: React.FC<SignInToCreateWalletProps> = ({
  onCloseModal,
}) => {
  return (
    <div className="web3auth-sign-in">
      <ModalHeader
        title={"Sign In to Create a Wallet"}
        onCloseModal={onCloseModal}
      />
      <div className="web3auth-content">
        <div className="web3auth-options">
          <div className="web3auth-options-heading">Continue with</div>
          <div className="web3auth-options-list">
            <div className="web3auth-option">
              <img
                src={`https://images.web3auth.io/login-google.svg`}
                alt={`google icon`}
              />
            </div>
            <div className="web3auth-option">
              <img
                src={`https://images.web3auth.io/login-google.svg`}
                alt={`google icon`}
              />
            </div>
            <div className="web3auth-option">
              <img
                src={`https://images.web3auth.io/login-google.svg`}
                alt={`google icon`}
              />
            </div>
            <div className="web3auth-option">
              <img
                src={`https://images.web3auth.io/login-google.svg`}
                alt={`google icon`}
              />
            </div>
            <div className="web3auth-option-toggle">
              <div>
                <img src={PlusIcon} alt="plus icon" />
                <span>More</span>
              </div>
            </div>
          </div>
          <div className="web3auth-login-with-email">
            <input type="email" placeholder="Enter your email" />
            <button type="button">Continue with email</button>
          </div>
        </div>
        <div className="web3auth-info">
          <div className="web3auth-info-logo">
            <img src={Web3AuthLogo} alt="web3auth logo" />
          </div>
          <div className="web3auth-info-description">
            Web3Auth does not store any data related to your social logins.
          </div>
          <div className="web3auth-info-action">
            <span>View less social login options</span>
            <img src={MinusCircleIcon} alt="minus in circle" />
          </div>
        </div>
      </div>
    </div>
  );
};
