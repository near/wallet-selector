import React, { Fragment } from "react";
import { translate } from "@near-wallet-selector/core";
import { ModalHeader } from "../ModalHeader";
import type { ImportAccountData } from "./ImportAccount";
import LoadingIcon from "../../images/connecting-loader.png";

interface AccountSelectProps {
  onCloseModal: () => void;
  onBack: () => void;
  selectedAccounts: Array<string>;
  setSelectedAccounts: (accounts: Array<string>) => void;
  accountsWithDetail: Array<ImportAccountData>;
  disabledAccounts: Array<ImportAccountData>;
  onNextStep: () => void;
  isLoading: boolean;
}

export const AccountSelect: React.FC<AccountSelectProps> = ({
  onCloseModal,
  onBack,
  selectedAccounts,
  setSelectedAccounts,
  accountsWithDetail,
  disabledAccounts,
  onNextStep,
  isLoading,
}) => {
  const onAccountSelect = (accountId: string, checked: boolean) => {
    if (checked) {
      setSelectedAccounts([...selectedAccounts, accountId]);
    } else {
      setSelectedAccounts(
        selectedAccounts.filter(
          (existingAccountId: string) => existingAccountId !== accountId
        )
      );
    }
  };

  const onSelectAll = () => {
    if (selectedAccounts.length === accountsWithDetail.length) {
      setSelectedAccounts([]);
      return;
    }
    setSelectedAccounts(accountsWithDetail.map(({ accountId }) => accountId));
  };

  const selectLabel =
    selectedAccounts.length === accountsWithDetail.length
      ? translate("modal.importAccounts.selectAccounts.deselectAll")
      : translate("modal.importAccounts.selectAccounts.selectAll");

  return (
    <Fragment>
      <ModalHeader
        title={translate("modal.importAccounts.selectAccounts.title")}
        onCloseModal={onCloseModal}
        onBack={onBack}
      />
      <div className="import-account">
        <div className="content">
          {isLoading ? (
            <div className="connecting-details">
              <div className="spinner account-selection-spinner">
                <img src={LoadingIcon} alt="loading-icon" />
              </div>
            </div>
          ) : (
            <>
              <span className="account-select-all" onClick={onSelectAll}>
                {selectLabel}
              </span>
              <div className="account-selection">
                {accountsWithDetail.map(({ accountId }) => (
                  <div className="account-selection-row" key={accountId}>
                    <div className="checkbox">
                      <input
                        onChange={(e) => {
                          onAccountSelect(accountId, e.target.checked);
                        }}
                        checked={selectedAccounts.includes(accountId)}
                        type="checkbox"
                        id={accountId}
                        name={accountId}
                        value={accountId}
                      />
                      <label htmlFor={accountId}> {accountId}</label>
                    </div>
                  </div>
                ))}
              </div>
              <span className="account-unavailable">
                {translate("modal.importAccounts.selectAccounts.unavailable")}
              </span>
              <div className="account-selection">
                {disabledAccounts.map(({ accountId }) => (
                  <div className="account-selection-row" key={accountId}>
                    <div className="checkbox">
                      <input
                        onChange={(e) => {
                          onAccountSelect(accountId, e.target.checked);
                        }}
                        checked={selectedAccounts.includes(accountId)}
                        type="checkbox"
                        id={accountId}
                        name={accountId}
                        value={accountId}
                        disabled
                      />
                      <label htmlFor={accountId}> {accountId}</label>
                    </div>
                  </div>
                ))}
              </div>
              <div className="filler" />
              <button
                className="middleButton import-account-button"
                onClick={onNextStep}
                disabled={selectedAccounts.length === 0}
              >
                {translate("modal.importAccounts.selectAccounts.button")}
              </button>
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};
