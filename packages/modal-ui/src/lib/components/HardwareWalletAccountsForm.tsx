import React from "react";
import type { HardwareWalletAccountState } from "./DerivationPath";

interface FormProps {
  hardwareWalletAccounts: Array<HardwareWalletAccountState>;
  onSubmit: (
    accounts: Array<HardwareWalletAccountState>,
    e: React.FormEvent<HTMLFormElement>
  ) => void;
}

const HardwareWalletAccountsForm: React.FC<FormProps> = ({
  hardwareWalletAccounts,
  onSubmit,
}) => {
  return (
    <div className="choose-ledger-account-form-wrapper">
      <p>
        Multiple accounts found. Please choose an account per derivation path.
      </p>
      <form
        className="form"
        onSubmit={(e) => {
          onSubmit(hardwareWalletAccounts, e);
        }}
      >
        <div>
          {hardwareWalletAccounts.map((account, index) => {
            return (
              <div key={index} className="form-control">
                <label>{account.derivationPath}</label>
                <select
                  disabled={account.accountIds.length === 1}
                  onChange={(e) => {
                    account.selectedAccountId = e.target.value;
                  }}
                >
                  {account.accountIds.map((accountId) => {
                    return (
                      <option key={accountId} value={accountId}>
                        {accountId}
                      </option>
                    );
                  })}
                </select>
              </div>
            );
          })}

          <div className="action-buttons">
            <button className="right-button" type="submit">
              Connect
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HardwareWalletAccountsForm;
