import React, { Fragment, useEffect, useState } from "react";

import { WalletState } from "../../store.types";
import { Wallet } from "../../wallet";
import { WalletSelector } from "../../wallet-selector.types";
import { ModalOptions, WalletSelectorModal } from "../modal.types";
import { ModalRouteName } from "./Modal.types";
import { logger } from "../../services";
import { errors } from "../../errors";

interface WalletOptionsProps {
  // TODO: Remove omit once modal is a separate package.
  selector: Omit<WalletSelector, keyof WalletSelectorModal>;
  options?: ModalOptions;
  setRouteName: (routeName: ModalRouteName) => void;
  setNotInstalledWallet: (wallet: Wallet | null) => void;
  setAlertMessage: (message: string | null) => void;
  hide: () => void;
}

export const WalletOptions: React.FC<WalletOptionsProps> = ({
  selector,
  options,
  setRouteName,
  setNotInstalledWallet,
  setAlertMessage,
  hide,
}) => {
  const [connecting, setConnecting] = useState(false);
  const [walletInfoVisible, setWalletInfoVisible] = useState(false);
  const [availableWallets, setAvailableWallets] = useState<Array<WalletState>>(
    []
  );

  const getAvailableWallets = async (wallets: Array<WalletState>) => {
    const result: Array<WalletState> = [];

    for (let i = 0; i < wallets.length; i += 1) {
      const wallet = selector.wallet(wallets[i].id);

      if (await wallet.isAvailable()) {
        result.push(wallets[i]);
      }
    }

    return result;
  };

  useEffect(() => {
    const subscription = selector.store.observable.subscribe((state) => {
      getAvailableWallets(state.wallets).then(setAvailableWallets);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWalletClick = (wallet: Wallet) => () => {
    if (connecting) {
      return;
    }

    if (wallet.type === "hardware") {
      return setRouteName("LedgerDerivationPath");
    }

    setConnecting(true);

    wallet
      .connect()
      .then(() => hide())
      .catch((err) => {
        if (errors.isWalletNotInstalledError(err)) {
          setNotInstalledWallet(wallet);
          return setRouteName("WalletNotInstalled");
        }

        logger.log(`Failed to select ${wallet.name}`);
        logger.error(err);

        setAlertMessage(
          `Failed to connect with ${wallet.name}: ${err.message}`
        );
      })
      .finally(() => setConnecting(false));
  };

  return (
    <Fragment>
      <div className="Modal-body Modal-select-wallet-option">
        <p className="Modal-description">
          {options?.description ||
            "Please select a wallet to connect to this dApp:"}
        </p>
        <ul
          className={
            "Modal-option-list " + (connecting ? "selection-process" : "")
          }
        >
          {availableWallets.reduce<Array<JSX.Element>>(
            (result, { id, selected }) => {
              const wallet = selector.wallet(id);

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
