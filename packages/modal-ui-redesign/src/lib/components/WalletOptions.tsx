import React, { useEffect, useState } from "react";
import type { WalletSelector, ModuleState } from "@near-wallet-selector/core";

import { SingleWallet } from "./SingleWallet";

interface WalletOptionsProps {
  selector: WalletSelector;
  activeModule: ModuleState | null;
  setActiveModule: (module: ModuleState) => void;
  handleWalletClick: (module: ModuleState) => void;
}

export const WalletOptions: React.FC<WalletOptionsProps> = ({
  selector,
  activeModule,
  setActiveModule,
  handleWalletClick,
}) => {
  const [modules, setModules] = useState<Array<ModuleState>>([]);

  useEffect(() => {
    const subscription = selector.store.observable.subscribe((state) => {
      state.modules.sort((current, next) => {
        if (current.metadata.deprecated === next.metadata.deprecated) {
          return 0;
        }

        return current.metadata.deprecated ? 1 : -1;
      });
      state.modules.forEach((module) => {
        if (module.id === state.selectedWalletId) {
          setActiveModule(module);
        }
      });

      setModules(state.modules);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="wallet-options-wrapper">
      <ul className={"options-list"}>
        {modules.reduce<Array<JSX.Element>>((result, module, key) => {
          const { name, description, iconUrl, deprecated } = module.metadata;
          const selected = module.id === activeModule?.id;
          result.push(
            <SingleWallet
              id={module.id}
              iconUrl={iconUrl}
              title={name}
              description={description}
              key={key}
              isLocationSidebar={true}
              selected={selected ? "selected-wallet" : ""}
              deprecated={deprecated ? " deprecated-wallet" : ""}
              onClick={() => {
                handleWalletClick(module);
              }}
            />
          );

          return result;
        }, [])}
      </ul>
    </div>
  );
};
