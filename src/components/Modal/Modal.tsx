import React, { useState } from "react";
import styles from "./Modal.styles";
import modalHelper from "../../modal-helper";

function Modal(props: any): JSX.Element {
  const [ledgerDerivationPath] = useState("44'/397'/0'/0'/0'");
  const [ledgerCustomDerivationPath, setLedgerCustomDerivationPath] =
    useState("44'/397'/0'/0'/0'");
  const [ledgerWalletError, setLedgerWalletError] = useState("");
  const [useCustomDerivationPath, setUseCustomDerivationPath] = useState(false);

  function handleCloseModal(event: any) {
    event.preventDefault();
    if (event.target === event.currentTarget) onCloseModalHandler();
  }

  function onCloseModalHandler() {
    modalHelper.hideModal();
    setUseCustomDerivationPath(false);
    setLedgerCustomDerivationPath("44'/397'/0'/0'/0'");
    setLedgerWalletError("");
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

  function onUseCustomPathHandler() {
    setUseCustomDerivationPath(true);
  }

  function onUseDefaultDerivationPathHandler() {
    setUseCustomDerivationPath(false);
    setLedgerWalletError("");
  }

  function onCustomDerivationPathChangeHandler(event: any) {
    setLedgerCustomDerivationPath(event.target.value);
  }

  return (
    <div>
      <style>{styles}</style>
      <div
        className={`Modal ${getThemeClass(props.options.theme)}`}
        onClick={handleCloseModal}
      >
        <div className="Modal-content">
          <div className="Modal-body Modal-select-wallet-option">
            <p>Please select a wallet to connect to this dapp:</p>
            <ul className="Modal-option-list">
              {props.options.wallets.map((wallet: string) => {
                if (!props.wallets.getWallet(wallet)) return null;
                return (
                  <li
                    key={props.wallets.getWallet(wallet).getName()}
                    onClick={() => {
                      props.wallets.getWallet(wallet).walletSelected();
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
          <div className="Modal-body Modal-choose-ledger-derivation-path">
            <p>
              Make sure your Ledger is plugged in, then select a derivation path
              to connect your accounts:
            </p>
            <div className="derivation-paths-list">
              <button
                className={
                  !useCustomDerivationPath ? "path-option-highlighted" : ""
                }
                onClick={onUseDefaultDerivationPathHandler}
              >
                NEAR - 44'/397'/0'/0'/0'
              </button>
              {!useCustomDerivationPath && (
                <button
                  className={
                    useCustomDerivationPath ? "path-option-highlighted" : ""
                  }
                  onClick={onUseCustomPathHandler}
                >
                  Custom Path
                </button>
              )}
              {useCustomDerivationPath && (
                <input
                  className={ledgerWalletError ? "input-error" : ""}
                  type="text"
                  placeholder="custom derivation path"
                  value={ledgerCustomDerivationPath}
                  onChange={onCustomDerivationPathChangeHandler}
                />
              )}
              {ledgerWalletError && (
                <p className="error">{ledgerWalletError}</p>
              )}
            </div>
            <div className="derivation-paths--actions">
              <button className="dismiss" onClick={onCloseModalHandler}>
                Dismiss
              </button>
              <button
                className="connect"
                onClick={async () => {
                  let derivationPath = ledgerDerivationPath;
                  if (useCustomDerivationPath) {
                    derivationPath = ledgerCustomDerivationPath;
                  }

                  try {
                    props.wallets
                      .getWallet("ledgerwallet")
                      .setDerivationPath(derivationPath);
                    await props.wallets.getWallet("ledgerwallet").connect();
                  } catch (e) {
                    setLedgerWalletError(`Error: ${e.message}`);
                  }
                }}
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
