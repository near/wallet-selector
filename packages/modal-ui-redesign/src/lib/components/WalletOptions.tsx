import React, { useEffect, useState } from "react";
import type { WalletSelector, ModuleState } from "@near-wallet-selector/core";

interface WalletOptionsProps {
  selector: WalletSelector;
  handleWalletClick: (module: ModuleState) => void;
}

export const WalletOptions: React.FC<WalletOptionsProps> = ({
  selector,
  handleWalletClick,
}) => {
  const [modules, setModules] = useState<Array<ModuleState>>([]);
  const [activeWalletId, setActiveWalletId] = useState("");

  useEffect(() => {
    const subscription = selector.store.observable.subscribe((state) => {
      state.modules.sort((current, next) => {
        if (current.metadata.deprecated === next.metadata.deprecated) {
          return 0;
        }

        return current.metadata.deprecated ? 1 : -1;
      });

      const { selectedWalletId } = selector.store.getState();
      if (selectedWalletId) {
        setActiveWalletId(selectedWalletId);
      }

      setModules(state.modules);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="wallet-options-wrapper">
      <ul className="options-list">
        {modules.reduce<Array<JSX.Element>>((result, module, index) => {
          const { selectedWalletId } = selector.store.getState();
          const { name, description, iconUrl, deprecated } = module.metadata;
          const selected = module.id === selectedWalletId;

          result.push(
            <li
              className={`single-wallet ${
                activeWalletId === module.id ? "selected-wallet" : ""
              } ${selected ? "connected-wallet" : ""} ${
                deprecated ? "deprecated-wallet" : ""
              } sidebar`}
              key={module.id}
              onClick={() => {
                if (module.id === modules[index].id) {
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
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.95215 16.3536L10.2152 5.85657C10.9531 4.38481 13.0538 4.38519 13.7912 5.85723L19.0494 16.3543C19.7156 17.6841 18.7486 19.25 17.2612 19.25H6.74001C5.25228 19.25 4.28535 17.6835 4.95215 16.3536Z"
                      stroke="#E6B73E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 10V12"
                      stroke="#E6B73E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.5 16C12.5 16.2761 12.2761 16.5 12 16.5C11.7239 16.5 11.5 16.2761 11.5 16C11.5 15.7239 11.7239 15.5 12 15.5C12.2761 15.5 12.5 15.7239 12.5 16Z"
                      stroke="#E6B73E"
                    />
                  </svg>
                </div>
              )}
            </li>
          );

          return result;
        }, [])}
      </ul>
    </div>
  );
};
