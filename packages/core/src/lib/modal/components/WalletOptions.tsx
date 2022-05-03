import React, { Fragment, useEffect, useState } from "react";

import { Wallet, WalletModule } from "../../wallet/wallet.types";
import { WalletSelector } from "../../wallet-selector.types";
import { ModalOptions, WalletSelectorModal } from "../modal.types";
import { logger } from "../../services";
import { errors } from "../../errors";

interface WalletOptionsProps {
  // TODO: Remove omit once modal is a separate package.
  selector: Omit<WalletSelector, keyof WalletSelectorModal>;
  options?: ModalOptions;
  onWalletNotInstalled: (wallet: Wallet) => void;
  onConnectHardwareWallet: () => void;
  onConnected: () => void;
  onError: (error: Error) => void;
}

export const WalletOptions: React.FC<WalletOptionsProps> = ({
  selector,
  options,
  onWalletNotInstalled,
  onError,
  onConnectHardwareWallet,
  onConnected,
}) => {
  const [connecting, setConnecting] = useState(false);
  const [walletInfoVisible, setWalletInfoVisible] = useState(false);
  const [modules, setModules] = useState<Array<WalletModule>>([]);

  useEffect(() => {
    const subscription = selector.store.observable.subscribe((state) => {
      setModules(state.modules);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWalletClick = (module: WalletModule) => async () => {
    if (connecting) {
      return;
    }

    setConnecting(true);

    const wallet = await module.wallet();

    if (wallet.type === "hardware") {
      return onConnectHardwareWallet();
    }

    wallet
      .connect()
      .then(() => onConnected())
      .catch((err) => {
        if (errors.isWalletNotInstalledError(err)) {
          return onWalletNotInstalled(wallet);
        }

        const { name } = wallet.metadata;

        logger.log(`Failed to select ${name}`);
        logger.error(err);

        onError(new Error(`Failed to connect with ${name}: ${err.message}`));
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
          {modules.reduce<Array<JSX.Element>>((result, module) => {
            const { selectedWalletId } = selector.store.getState();
            const { name, description, iconUrl } = module.metadata;
            const selected = module.id === selectedWalletId;

            result.push(
              <li
                key={module.id}
                id={module.id}
                className={selected ? "selected-wallet" : ""}
                onClick={selected ? undefined : handleWalletClick(module)}
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
