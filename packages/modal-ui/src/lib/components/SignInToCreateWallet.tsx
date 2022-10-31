import React, { useEffect, useState } from "react";
import { ModalHeader } from "./ModalHeader";
import Web3AuthLogo from "../images/web3auth-logo.svg";
import PlusIcon from "../images/plus.svg";
import MinusIcon from "../images/minus.svg";
import type {
  ModuleState,
  Wallet,
  Web3AuthLoginProvider,
  Web3AuthWallet,
} from "@near-wallet-selector/core";
import type { ModalRoute } from "./Modal.types";
import type { ModalOptions } from "../modal.types";
import { BackArrow } from "./BackArrow";

type SignInToCreateWalletProps = {
  onCloseModal: () => void;
  setAlertMessage: (message: string | null) => void;
  setRoute: (route: ModalRoute) => void;
  module: ModuleState<Wallet>;
  options: ModalOptions;
};

const loginProviders: Array<Web3AuthLoginProvider> = [
  "google",
  "facebook",
  "twitter",
  "reddit",
  "discord",
  "twitch",
  "apple",
  "line",
  "github",
  "kakao",
  "linkedin",
  "weibo",
  "wechat",
];

type ExistingAccount = {
  typeOfLogin: Web3AuthLoginProvider;
  email: string;
};

export const SignInToCreateWallet: React.FC<SignInToCreateWalletProps> = ({
  onCloseModal,
  setAlertMessage,
  setRoute,
  module,
  options,
}) => {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [email, setEmail] = useState("");
  const [existingAccount, setExistingAccount] =
    useState<ExistingAccount | null>(null);

  useEffect(() => {
    const storage = window.localStorage.getItem("openlogin_store");

    if (storage) {
      setExistingAccount(JSON.parse(storage));
    }
  }, []);

  function toggleShowMoreOptions() {
    setShowMoreOptions(!showMoreOptions);
  }

  async function onSignInHandler(
    provider: Web3AuthLoginProvider,
    emailValue?: string
  ) {
    try {
      const wallet = (await module.wallet()) as Web3AuthWallet;
      await wallet.signIn({
        contractId: options.contractId,
        methodNames: options.methodNames,
        loginProvider: provider,
        email: emailValue,
      });
      onCloseModal();
    } catch (err) {
      const { name } = module.metadata;

      const message =
        err instanceof Error ? err.message : "Something went wrong";

      setAlertMessage(`Failed to sign in with ${name}: ${message}`);
      setRoute({
        name: "AlertMessage",
        params: {
          module: module,
        },
      });
    }
  }

  function onEmailChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  return (
    <div className="web3auth-sign-in">
      <div className="nws-modal-header-wrapper">
        <BackArrow
          onClick={() => {
            setRoute({
              name: "WalletHome",
            });
          }}
        />
        <ModalHeader
          title={"Sign In to Create a Wallet"}
          onCloseModal={onCloseModal}
        />
      </div>
      <div className="web3auth-content">
        <div className="web3auth-options">
          <div className="web3auth-options-heading">Continue with</div>
          {showMoreOptions && existingAccount && (
            <div
              className="web3auth-continue-with-existing"
              onClick={() => {
                onSignInHandler(existingAccount.typeOfLogin);
              }}
            >
              <div className="web3auth-continue-with-existing-content">
                <div
                  className="web3auth-existing-image"
                  style={{
                    backgroundImage: `url('https://images.web3auth.io/login-${existingAccount.typeOfLogin}.svg')`,
                  }}
                ></div>
                <div>
                  <div>
                    Continue with existing{" "}
                    <span className="web3auth-existing-type-of-login">
                      {existingAccount.typeOfLogin}
                    </span>
                  </div>
                  <div className="web3auth-existing-email">
                    {existingAccount.email}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="web3auth-options-list">
            {(showMoreOptions
              ? loginProviders
              : loginProviders.slice(0, 4)
            ).map((provider, i) => {
              return (
                <div
                  key={i}
                  className="web3auth-option"
                  onClick={() => {
                    onSignInHandler(provider);
                  }}
                >
                  <img
                    src={`https://images.web3auth.io/login-${provider}.svg`}
                    style={
                      provider === "github"
                        ? {
                            filter: "brightness(0)", // Github icon is barely visible in dark mode
                          }
                        : undefined
                    }
                    alt={`${provider} icon`}
                  />
                </div>
              );
            })}
            <div
              className="web3auth-option-toggle"
              onClick={toggleShowMoreOptions}
            >
              <div>
                <img src={showMoreOptions ? MinusIcon : PlusIcon} alt="icon" />
                <span>{showMoreOptions ? "Less" : "More"}</span>
              </div>
            </div>
          </div>
          {!showMoreOptions && (
            <div className="web3auth-login-with-email">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={onEmailChangeHandler}
              />
              <button
                type="button"
                onClick={() => {
                  onSignInHandler("email_passwordless", email);
                }}
              >
                Continue with email
              </button>
            </div>
          )}
        </div>
        <div className="web3auth-info">
          <div className="web3auth-info-logo">
            <img src={Web3AuthLogo} alt="web3auth logo" />
          </div>
          <div className="web3auth-info-description">
            Web3Auth does not store any data related to your social logins.
          </div>
        </div>
      </div>
    </div>
  );
};
