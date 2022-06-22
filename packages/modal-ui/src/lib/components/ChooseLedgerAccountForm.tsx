import React from "react";
import { LedgerAccountState } from "./DerivationPath";

interface FormProps {
  ledgerAccounts: Array<LedgerAccountState>;
  onSubmit: (
    accounts: Array<LedgerAccountState>,
    e: React.FormEvent<HTMLFormElement>
  ) => void;
}

const ChooseLedgerAccountForm: React.FC<FormProps> = ({
  ledgerAccounts,
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
          onSubmit(ledgerAccounts, e);
        }}
      >
        <div>
          {ledgerAccounts.map((account, index) => {
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

export default ChooseLedgerAccountForm;
