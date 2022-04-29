import React, { Fragment, useEffect, useState } from "react";

import { WalletModuleState } from "../../store.types";
import { WalletSelector } from "../../wallet-selector.types";
import { ModalOptions, WalletSelectorModal } from "../modal.types";
import { logger } from "../../services";
import { errors } from "../../errors";

interface WalletOptionsProps {
  // TODO: Remove omit once modal is a separate package.
  selector: Omit<WalletSelector, keyof WalletSelectorModal>;
  options?: ModalOptions;
  onWalletNotInstalled: (module: WalletModuleState) => void;
  onConnectHardwareWallet: () => void;
  onConnected: () => void;
  onError: (message: string) => void;
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
  const [modules, setModules] = useState<Array<WalletModuleState>>([]);

  useEffect(() => {
    const subscription = selector.store.observable.subscribe((state) => {
      setModules(state.modules);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWalletClick = (module: WalletModuleState) => () => {
    if (connecting) {
      return;
    }

    if (module.type === "hardware") {
      return onConnectHardwareWallet();
    }

    setConnecting(true);

    selector
      .wallet(module.id)
      .connect()
      .then(() => onConnected())
      .catch((err) => {
        if (errors.isWalletNotInstalledError(err)) {
          return onWalletNotInstalled(module);
        }

        logger.log(`Failed to select ${module.name}`);
        logger.error(err);

        onError(`Failed to connect with ${module.name}: ${err.message}`);
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
            const { id, name, description, iconUrl } = module;
            const selected = module.id === selectedWalletId;

            result.push(
              <li
                key={id}
                id={id}
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
