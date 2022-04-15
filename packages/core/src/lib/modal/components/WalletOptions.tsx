import React, { Fragment, useEffect, useState } from "react";
import { errors } from "../../errors";
import { logger } from "../../services";
import { Wallet } from "../../wallet";
import { WalletSelector } from "../../wallet-selector.types";
import { ModalOptions, WalletSelectorModal } from "../modal.types";
import { ModalRouteName } from "./Modal";

interface WalletOptionsProps {
  // TODO: Remove omit once modal is a separate package.
  selector: Omit<WalletSelector, keyof WalletSelectorModal>;
  options?: ModalOptions;
  walletInfoVisible: boolean;
  setWalletInfoVisible: (visible: boolean) => void;
  setRouteName: (routeName: ModalRouteName) => void;
  setNotInstalledWallet: (wallet: Wallet | null) => void;
}

export const WalletOptions: React.FC<WalletOptionsProps> = ({
  selector,
  options,
  walletInfoVisible,
  setWalletInfoVisible,
  setRouteName,
  setNotInstalledWallet,
}) => {
  const [wallets, setWallets] = useState(selector.store.getState().wallets);

  useEffect(() => {
    const subscription = selector.store.observable.subscribe((state) => {
      setWallets(state.wallets);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <Fragment>
      <div className="Modal-body Modal-select-wallet-option">
        <p className="Modal-description">
          {options?.description ||
            "Please select a wallet to connect to this dApp:"}
        </p>
        <ul className="Modal-option-list">
          {wallets.reduce<Array<JSX.Element>>((result, { id, selected }) => {
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
                onClick={selected ? undefined : handleWalletClick(wallet)}
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
          }, [])}
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
            Wallets are used to send, receive and store digital assets. There
            are different types of wallets. They can be an extension added to
            your browser, a hardware device plugged into your computer,
            web-based or an app on your mobile device.
          </p>
        </div>
      </div>
    </Fragment>
  );
};
