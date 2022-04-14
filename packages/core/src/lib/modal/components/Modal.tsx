import React, {
  ChangeEvent,
  Fragment,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { Wallet } from "../../wallet";
import { logger } from "../../services";
import { DEFAULT_DERIVATION_PATH } from "../../constants";
import { WalletSelectorModal, ModalOptions, Theme } from "../modal.types";
import { WalletSelector } from "../../wallet-selector.types";
import { errors } from "../../errors";
import styles from "./Modal.styles";

interface ModalProps {
  // TODO: Remove omit once modal is a separate package.
  selector: Omit<WalletSelector, keyof WalletSelectorModal>;
  options?: ModalOptions;
  visible: boolean;
  hide: () => void;
}

type ModalRouteName =
  | "WalletOptions"
  | "LedgerDerivationPath"
  | "WalletNotInstalled"
  | "WalletNetworkChanged";

const getThemeClass = (theme?: Theme) => {
  switch (theme) {
    case "dark":
      return "Modal-dark-theme";
    case "light":
      return "Modal-light-theme";
    default:
      return "";
  }
};

export const Modal: React.FC<ModalProps> = ({
  selector,
  options,
  visible,
  hide,
}) => {
  const [wallets, setWallets] = useState(selector.store.getState().wallets);
  const [walletInfoVisible, setWalletInfoVisible] = useState(false);
  const [ledgerError, setLedgerError] = useState("");
  const [ledgerAccountId, setLedgerAccountId] = useState("");
  const [ledgerDerivationPath, setLedgerDerivationPath] = useState(
    DEFAULT_DERIVATION_PATH
  );
  const [isLoading, setIsLoading] = useState(false);
  const [routeName, setRouteName] = useState<ModalRouteName>("WalletOptions");
  const [notInstalledWallet, setNotInstalledWallet] = useState<Wallet | null>(
    null
  );

  useEffect(() => {
    setRouteName("WalletOptions");
    setWalletInfoVisible(false);
    setLedgerError("");
    setLedgerAccountId("");
    setLedgerDerivationPath(DEFAULT_DERIVATION_PATH);
    setIsLoading(false);
  }, [visible]);

  useEffect(() => {
    const subscription = selector.store.observable.subscribe((state) => {
      setWallets(state.wallets);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const subscription = selector.on("networkChanged", ({ networkId }) => {
      // Switched back to the correct network.
      if (networkId === selector.options.network.networkId) {
        return hide();
      }

      setRouteName("WalletNetworkChanged");
    });

    return () => subscription.remove();
  });

  const handleDismissClick = () => {
    if (isLoading) {
      return;
    }

    hide();
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

  const handleWalletClick = (wallet: Wallet) => () => {
    if (wallet.type === "hardware") {
      return setRouteName("LedgerDerivationPath");
    }

    wallet.connect().catch((err) => {
      if (errors.isWalletNotInstalledError(err)) {
        setNotInstalledWallet(wallet);
        return setRouteName("WalletNotInstalled");
      }

      logger.log(`Failed to select ${wallet.name}`);
      logger.error(err);

      alert(`Failed to sign in with ${wallet.name}: ${err.message}`);
    });
  };

  const handleConnectClick = async () => {
    setIsLoading(true);
    // TODO: Can't assume "ledger" once we implement more hardware wallets.
    const wallet = selector.wallet("ledger");

    if (wallet.type !== "hardware") {
      return;
    }

    setIsLoading(true);

    await wallet
      .connect({
        accountId: ledgerAccountId,
        derivationPath: ledgerDerivationPath,
      })
      .catch((err) => {
        setLedgerError(`Error: ${err.message}`);
        setIsLoading(false);
      });
  };

  if (!visible) {
    return null;
  }

  return (
    <div>
      <style>{styles}</style>
      <div
        className={`Modal ${getThemeClass(options?.theme)}`}
        onClick={handleDismissOutsideClick}
      >
        <div className="Modal-content">
          <div className="Modal-header">
            <h2>Connect Wallet</h2>
            <button onClick={handleDismissClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                fill="#A7A7A7"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </div>
          {routeName === "WalletOptions" && (
            <Fragment>
              <div className="Modal-body Modal-select-wallet-option">
                <p className="Modal-description">
                  {options?.description ||
                    "Please select a wallet to connect to this dApp:"}
                </p>
                <ul className="Modal-option-list">
                  {wallets.reduce<Array<JSX.Element>>(
                    (result, { id, selected }) => {
                      const wallet = selector.wallet(id);

                      if (!wallet.isAvailable()) {
                        return result;
                      }

                      const { name, description, iconUrl } = wallet;

                      result.push(
                        <li
                          key={id}
                          id={id}
                          className={selected ? "selected-wallet" : ""}
                          onClick={
                            selected ? undefined : handleWalletClick(wallet)
                          }
                        >
                          <div title={description || ""}>
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

                      return result;
                    },
                    []
                  )}
                </ul>
              </div>
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
                  <p>
                    Wallets are used to send, receive and store digital assets.
                    There are different types of wallets. They can be an
                    extension added to your browser, a hardware device plugged
                    into your computer, web-based or an app on your mobile
                    device.
                  </p>
                </div>
              </div>
            </Fragment>
          )}
          {routeName === "LedgerDerivationPath" && (
            <div className="Modal-body Modal-choose-ledger-derivation-path">
              <p>
                Make sure your Ledger is plugged in, then enter an account id
                and derivation path to connect:
              </p>
              <div className="derivation-paths-list">
                <div className="account-id">
                  <input
                    type="text"
                    className={ledgerError ? "input-error" : ""}
                    placeholder="Account ID"
                    autoFocus={true}
                    value={ledgerAccountId}
                    onChange={handleAccountIdChange}
                    readOnly={isLoading}
                  />
                </div>
                <input
                  type="text"
                  className={ledgerError ? "input-error" : ""}
                  placeholder="Derivation Path"
                  value={ledgerDerivationPath}
                  onChange={handleDerivationPathChange}
                  readOnly={isLoading}
                />
                {ledgerError && <p className="error">{ledgerError}</p>}
              </div>
              <div className="derivation-paths--actions">
                <button
                  className="left-button"
                  disabled={isLoading}
                  onClick={() => {
                    setLedgerError("");
                    setLedgerAccountId("");
                    setLedgerDerivationPath(DEFAULT_DERIVATION_PATH);
                    setRouteName("WalletOptions");
                  }}
                >
                  Back
                </button>
                <button
                  className="right-button"
                  onClick={handleConnectClick}
                  disabled={isLoading}
                >
                  {isLoading ? "Connecting..." : "Connect"}
                </button>
              </div>
            </div>
          )}
          {routeName === "WalletNotInstalled" && notInstalledWallet && (
            <div className="Modal-body Modal-wallet-not-installed">
              <div className={`icon-display ${notInstalledWallet.id}`}>
                <img
                  src={notInstalledWallet.iconUrl}
                  alt={notInstalledWallet.name}
                />
                <p>{notInstalledWallet.name}</p>
              </div>
              <p>
                {`You'll need to install ${notInstalledWallet.name} to continue. After installing`}
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
                    setNotInstalledWallet(null);
                    setRouteName("WalletOptions");
                  }}
                >
                  Back
                </button>
                <button
                  className="right-button"
                  onClick={() => {
                    if (notInstalledWallet.type !== "injected") {
                      return;
                    }

                    window.open(notInstalledWallet.getDownloadUrl(), "_blank");
                  }}
                >
                  {`Open ${notInstalledWallet.name}`}
                </button>
              </div>
            </div>
          )}
          {routeName === "WalletNetworkChanged" && (
            <div className="Modal-body Modal-switch-network-message">
              <div className="header">
                <h2>You Must Change Networks</h2>
              </div>
              <div className="content">
                <p>
                  We've detected that you need to change your wallet's network
                  to
                  <strong>{` ${selector.options.network.networkId}`}</strong>{" "}
                  for this dApp.
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
                  onClick={() => setRouteName("WalletOptions")}
                >
                  Switch Wallet
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
