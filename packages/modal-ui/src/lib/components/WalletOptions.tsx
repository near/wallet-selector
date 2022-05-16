import React, { Fragment, useEffect, useState } from "react";
import { WalletSelector, ModuleState } from "@near-wallet-selector/core";

import { ModalOptions, WalletSelectorModal } from "../modal.types";

interface WalletOptionsProps {
  // TODO: Remove omit once modal is a separate package.
  selector: Omit<WalletSelector, keyof WalletSelectorModal>;
  options?: ModalOptions;
  onConnectHardwareWallet: () => void;
  onConnected: () => void;
  onError: (error: Error) => void;
}

export const WalletOptions: React.FC<WalletOptionsProps> = ({
  selector,
  options,
  onError,
  onConnectHardwareWallet,
  onConnected,
}) => {
  const [connecting, setConnecting] = useState(false);
  const [walletInfoVisible, setWalletInfoVisible] = useState(false);
  const [modules, setModules] = useState<Array<ModuleState>>([]);

  useEffect(() => {
    const subscription = selector.store.observable.subscribe((state) => {
      setModules(state.modules);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWalletClick = (module: ModuleState) => async () => {
    if (connecting) {
      return;
    }

    try {
      setConnecting(true);
      const wallet = await module.wallet();

      if (wallet.type === "hardware") {
        return onConnectHardwareWallet();
      }

      await wallet.connect();
      onConnected();
    } catch (err) {
      const { name } = module.metadata;

      console.log(`Failed to select ${name}`);
      console.error(err);

      const message =
        err instanceof Error ? err.message : "Something went wrong";

      onError(new Error(`Failed to connect with ${name}: ${message}`));
    } finally {
      setConnecting(false);
    }
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
