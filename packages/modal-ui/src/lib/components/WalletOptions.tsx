import React, { useEffect, useState } from "react";
import type {
  WalletSelector,
  ModuleState,
  Wallet,
} from "@near-wallet-selector/core";
import { WarningIcon } from "./icons/WarningIcon";

interface WalletOptionsProps {
  selector: WalletSelector;
  handleWalletClick: (module: ModuleState) => void;
}

export const WalletOptions: React.FC<WalletOptionsProps> = ({
  selector,
  handleWalletClick,
}) => {
  const [modules, setModules] = useState<Array<ModuleState>>([]);
  const [recentModules, setRecentModules] = useState<Array<ModuleState>>([]);
  const [moreModules, setMoreModules] = useState<Array<ModuleState>>([]);
  const [activeWalletId, setActiveWalletId] = useState("");

  useEffect(() => {
    const subscription = selector.store.observable.subscribe((state) => {
      const { selectedWalletId } = selector.store.getState();
      if (selectedWalletId) {
        setActiveWalletId(selectedWalletId);
      }

      const wallets = state.modules.filter(
        (module) =>
          !(module.type === "instant-link" && selectedWalletId !== module.id)
      );

      if (selector.options.optimizeWalletOrder) {
        state.modules.sort((current, next) => {
          if (current.metadata.deprecated === next.metadata.deprecated) {
            return 0;
          }

          return current.metadata.deprecated ? 1 : -1;
        });

        state.modules.sort((current, next) => {
          if (next.metadata.available === current.metadata.available) {
            return 0;
          }

          return next.metadata.available ? 1 : -1;
        });

        const moreWallets: Array<ModuleState<Wallet>> = [];
        const recentlySignedInWallets: Array<ModuleState<Wallet>> = [];

        wallets.forEach((module) => {
          if (
            selector.store
              .getState()
              .recentlySignedInWallets.includes(module.id)
          ) {
            recentlySignedInWallets.push(module);
          } else {
            moreWallets.push(module);
          }
        });

        setRecentModules(recentlySignedInWallets);
        setMoreModules(moreWallets);
      }
      if (selector.options.randomizeWalletOrder) {
        setModules(wallets.sort(() => Math.random() - 0.5));
      } else {
        setModules(wallets);
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { recentlySignedInWallets } = selector.store.getState();
    if (recentlySignedInWallets.length) {
      setActiveWalletId(recentlySignedInWallets[0]);
    }
  }, [selector.store]);

  function renderOptionsList(modulesToRender: Array<ModuleState<Wallet>>) {
    return modulesToRender.reduce<Array<JSX.Element>>(
      (result, module, index) => {
        const { selectedWalletId } = selector.store.getState();
        const { name, description, iconUrl, deprecated } = module.metadata;
        const selected = module.id === selectedWalletId;

        result.push(
          <li
            tabIndex={0}
            className={`single-wallet ${
              activeWalletId === module.id ? "selected-wallet" : ""
            } ${selected ? "connected-wallet" : ""} ${
              deprecated ? "deprecated-wallet" : ""
            } sidebar ${module.id}`}
            key={module.id}
            onClick={() => {
              if (
                selector.options.network.networkId === "testnet" &&
                module.id === "here-wallet"
              ) {
                alert("Here Wallet is not supported on testnet");
                return;
              }
              if (module.id === modulesToRender[index].id) {
                setActiveWalletId(module.id!);
              }
              return handleWalletClick(module);
            }}
          >
            <div className="icon">
              <img src={iconUrl} alt={name} />
            </div>
            <div className="content">
              <div className="title">{name}</div>
              <div className="description">{description}</div>
            </div>
            {deprecated && (
              <div className="warning-triangle">
                <WarningIcon />
              </div>
            )}
          </li>
        );

        return result;
      },
      []
    );
  }

  return (
    <div>
      {selector.options.optimizeWalletOrder &&
      selector.store.getState().recentlySignedInWallets.length > 0 ? (
        <div className="wallet-options-wrapper">
          <div className="options-list-section-recent">
            <div className="options-list-section-header">Recent</div>
            <div className="options-list more-options-list-content">
              {renderOptionsList(recentModules)}
            </div>
          </div>
          <div className="options-list-section-more">
            <div className="options-list-section-header">More</div>
            <div className="options-list more-options-list-content">
              {renderOptionsList(moreModules)}
            </div>
          </div>
        </div>
      ) : (
        <div className="wallet-options-wrapper">
          <div className="options-list">{renderOptionsList(modules)}</div>
        </div>
      )}
    </div>
  );
};
