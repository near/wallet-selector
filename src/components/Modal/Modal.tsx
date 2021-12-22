import React from "react";
import styles from "./Modal.styles";

function Modal(props: any): JSX.Element {
  function handleCloseModal(event: any) {
    event.preventDefault();
    if (event.target === event.currentTarget) props.onClose();
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
              {props.options.wallets.map((wallet: string) => {
                if (!props.wallets.getWallet(wallet)) return null;
                return (
                  <li
                    key={props.wallets.getWallet(wallet).getName()}
                    onClick={() => {
                      props.wallets.getWallet(wallet).connect();
                    }}
                  >
                    <div
                      title={props.wallets.getWallet(wallet).getDescription()}
                    >
                      <img
                        src={props.wallets.getWallet(wallet).getIcon()}
                        alt={props.wallets.getWallet(wallet).getName()}
                      />
                      <span>{props.wallets.getWallet(wallet).getName()}</span>
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
