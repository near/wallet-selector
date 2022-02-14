import React, {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "./Modal.styles";
import { getState, updateState } from "../state/State";
import ILedgerWallet from "../interfaces/ILedgerWallet";
import State from "../types/State";
import { logger } from "../services/logging.service";
import { DEFAULT_DERIVATION_PATH } from "../wallets/hardware/LedgerWallet";

declare global {
  // tslint:disable-next-line
  interface Window {
    updateWalletSelector: (state: State) => void;
  }
}

const getThemeClass = (theme: string | null) => {
  switch (theme) {
    case "dark":
      return "Modal-dark-theme";
    case "light":
      return "Modal-light-theme";
    default:
      return "";
  }
};

const Modal: React.FC = () => {
  const [state, setState] = useState(getState());
  const [walletInfoVisible, setWalletInfoVisible] = useState(false);
  const [ledgerError, setLedgerError] = useState("");
  const [ledgerAccountId, setLedgerAccountId] = useState("");
  const [ledgerDerivationPath, setLedgerDerivationPath] = useState(
    DEFAULT_DERIVATION_PATH
  );

  const defaultDescription = "Please select a wallet to connect to this dApp:";

  useEffect(() => {
    window.updateWalletSelector = (nextState) => {
      setState(nextState);
    };
  }, []);

  const handleDismissClick = () => {
    updateState((prevState) => ({
      ...prevState,
      showModal: false,
    }));

    setLedgerDerivationPath(DEFAULT_DERIVATION_PATH);
    setLedgerError("");
    setWalletInfoVisible(false);
  };

  const handleDismissOutsideClick = (e: MouseEvent) => {
    e.preventDefault();

    if (e.target === e.currentTarget) {
      handleDismissClick();
    }
  };

  const handleDerivationPathChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLedgerDerivationPath(e.target.value);
  };

  const handleAccountIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLedgerAccountId(e.target.value);
  };

  const handleConnectClick = useCallback(async () => {
    const wallet = state.walletProviders["ledgerwallet"] as ILedgerWallet;

    wallet.setDerivationPath(ledgerDerivationPath);
    wallet.setAccountId(ledgerAccountId);

    wallet.signIn().catch((err) => setLedgerError(`Error: ${err.message}`));
  }, [state.walletProviders, ledgerDerivationPath, ledgerAccountId]);

  return (
    <div style={{ display: state.showModal ? "block" : "none" }}>
      <style>{styles}</style>
      <div
        className={`Modal ${getThemeClass(state.options.theme)}`}
        onClick={handleDismissOutsideClick}
      >
        <div className="Modal-content">
          <div
            style={{ display: state.showWalletOptions ? "block" : "none" }}
            className="Modal-body Modal-select-wallet-option"
          >
            <p>
              {state.options.walletSelectorUI.description || defaultDescription}
            </p>
            <ul className="Modal-option-list">
              {state.options.wallets
                .map((walletId) => state.walletProviders[walletId])
                .filter((wallet) => wallet.getShowWallet())
                .map((wallet) => {
                  const { id, name, description, iconUrl } = wallet.getInfo();
                  const selected = state.signedInWalletId === id;

                  return (
                    <li
                      key={id}
                      id={id}
                      className={selected ? "selected-wallet" : ""}
                      onClick={() => {
                        wallet.walletSelected().catch((err) => {
                          logger.log(`Failed to select ${name}`);
                          logger.error(err);
                        });
                      }}
                    >
                      <div title={description}>
                        <img src={iconUrl} alt={name} />
                        <div>
                          <span>{name}</span>
                        </div>
                        {selected && (
                          <div className="selected-wallet-text">
                            <span>selected</span>
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div
            style={{
              display: state.showLedgerDerivationPath ? "block" : "none",
            }}
            className="Modal-body Modal-choose-ledger-derivation-path"
          >
            <p>
              Make sure your Ledger is plugged in, then enter an account id and
              derivation path to connect:
            </p>
            <div className="derivation-paths-list">
              <div className="account-id">
                <input
                  type="text"
                  placeholder="Account ID"
                  autoFocus={true}
                  value={ledgerAccountId}
                  onChange={handleAccountIdChange}
                />
              </div>
              <input
                type="text"
                className={ledgerError ? "input-error" : ""}
                placeholder="Derivation Path"
                value={ledgerDerivationPath}
                onChange={handleDerivationPathChange}
              />
              {ledgerError && <p className="error">{ledgerError}</p>}
            </div>
            <div className="derivation-paths--actions">
              <button className="left-button" onClick={handleDismissClick}>
                Dismiss
              </button>
              <button className="right-button" onClick={handleConnectClick}>
                Connect
              </button>
            </div>
          </div>
          <div
            style={{
              display: state.showSenderWalletNotInstalled ? "block" : "none",
            }}
            className="Modal-body Modal-wallet-not-installed"
          >
            <div className="icon-display">
              <img src="https://senderwallet.io/logo.png" alt="Sender Wallet" />
              <p>SenderWallet</p>
            </div>
            <p>
              You'll need to install SenderWallet to continue. After installing
              <span
                className="refresh-link"
                onClick={() => {
                  window.location.reload();
                }}
              >
                &nbsp;refresh the page.
              </span>
            </p>
            <div className="action-buttons">
              <button
                className="left-button"
                onClick={() => {
                  updateState((prevState) => ({
                    ...prevState,
                    showWalletOptions: true,
                    showSenderWalletNotInstalled: false,
                  }));
                }}
              >
                Back
              </button>
              <button
                className="right-button"
                onClick={() => {
                  window.open(
                    "https://chrome.google.com/webstore/detail/sender-wallet/epapihdplajcdnnkdeiahlgigofloibg",
                    "_blank"
                  );
                }}
              >
                Open SenderWallet
              </button>
            </div>
          </div>
          <div
            style={{ display: state.showSwitchNetwork ? "block" : "none" }}
            className="Modal-body Modal-switch-network-message"
          >
            <div className="header">
              <h2>You Must Change Networks</h2>
            </div>
            <div className="content">
              <p>
                We've detected that you need to change your wallet's network to
                <strong>{` ${state.options.networkId}`}</strong> for this dApp.
              </p>
              <p>
                Some wallets may not support changing networks. If you can not
                change networks you may consider switching to another wallet.
              </p>
            </div>
            <div className="actions">
              <button className="left-button" onClick={handleDismissClick}>
                Dismiss
              </button>
              <button
                className="right-button"
                onClick={() => {
                  updateState((prevState) => ({
                    ...prevState,
                    showWalletOptions: true,
                    showSwitchNetwork: false,
                  }));
                }}
              >
                Switch Wallet
              </button>
            </div>
          </div>
          {state.options.walletSelectorUI.explanation && (
            <div className="info">
              <span
                onClick={() => {
                  setWalletInfoVisible(!walletInfoVisible);
                }}
              >
                What is a Wallet?
              </span>
              <div
                className={`info-description ${
                  walletInfoVisible ? "show" : "hide"
                }-explanation`}
              >
                <p>{state.options.walletSelectorUI.explanation}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
