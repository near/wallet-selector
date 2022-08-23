import React from "react";
import type { HardwareWalletAccountState } from "./DerivationPath";

interface FormProps {
  accounts: Array<HardwareWalletAccountState>;
  onSelectedChanged: (index: number, selected: boolean) => void;
  onSubmit: (
    accounts: Array<HardwareWalletAccountState>,
    e: React.FormEvent<HTMLFormElement>
  ) => void;
}

const HardwareWalletAccountsForm: React.FC<FormProps> = ({
  accounts,
  onSelectedChanged,
  onSubmit,
}) => {
  return (
    <div className="choose-ledger-account-form-wrapper">
      <p>
        We found {accounts.length} accounts on your device. Select the
        account(s) you wish to connect.
      </p>
      <form
        className="form"
        onSubmit={(e) => {
          onSubmit(accounts, e);
        }}
      >
        <div>
          <div className="nws-form-control">
            {accounts.map((account, index) => (
              <div key={index}>
                <input
                  onChange={(e) => {
                    onSelectedChanged(index, e.target.checked);
                  }}
                  checked={account.selected}
                  type="checkbox"
                  id={account.accountId}
                  name={account.accountId}
                  value={account.accountId}
                />
                <label htmlFor={account.accountId}> {account.accountId}</label>
                <br />
              </div>
            ))}
          </div>

          <div className="action-buttons">
            <button
              className="right-button"
              type="submit"
              disabled={!accounts.some((x) => x.selected)}
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HardwareWalletAccountsForm;
