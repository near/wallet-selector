import React from "react";
import { wallets } from "../../providers/wallets";
import styles from "./Modal.styles";
import { isUserLoggedIn } from "../../providers";

function Modal(props: any): JSX.Element {
  function handleCloseModal(event: any) {
    event.preventDefault();
    if (event.target === event.currentTarget) props.onClose();
    props.loggedIn(isUserLoggedIn);
  }

  function getThemeClass(theme: string) {
    let themeClass = "";
    switch (theme) {
      case "dark":
        themeClass = "Modal-dark-theme";
        break;
      case "light":
        themeClass = "Modal-light-theme";
        break;
      default:
        themeClass = "";
        break;
    }
    return themeClass;
  }

  return (
    <div>
      <style>{styles}</style>
      <div
        className={`Modal ${getThemeClass(props.options.theme)}`}
        onClick={handleCloseModal}
      >
        <div className="Modal-content">
          <div className="Modal-body">
            <p>Please select a wallet to connect to this dapp:</p>
            <ul className="Modal-option-list">
              {props.options.providers.map((provider: string) => {
                if (!wallets.getWallet(provider)) return null;
                return (
                  <li
                    key={wallets.getWallet(provider).getName()}
                    onClick={() => {
                      wallets.getWallet(provider).connect();
                    }}
                  >
                    <div title={wallets.getWallet(provider).getDescription()}>
                      <img
                        src={wallets.getWallet(provider).getIcon()}
                        alt={wallets.getWallet(provider).getName()}
                      />
                      <span>{wallets.getWallet(provider).getName()}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
