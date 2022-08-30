import React from "react";
import type {
  HardwareRoutes,
  HardwareWalletAccountState,
} from "./DerivationPath";

interface FormProps {
  accounts: Array<HardwareWalletAccountState>;
  onSelectedChanged: (index: number, selected: boolean) => void;
  onSubmit: (
    accounts: Array<HardwareWalletAccountState>,
    e: React.FormEvent<HTMLFormElement>
  ) => void;
  onChangeRoute: (route: HardwareRoutes) => void;
}

const HardwareWalletAccountsForm: React.FC<FormProps> = ({
  accounts,
  onSelectedChanged,
  onSubmit,
  onChangeRoute,
}) => {
  return (
    <div className="choose-ledger-account-form-wrapper">
      <p>
        We found {accounts.length} accounts on your device. Select the
        account(s) you wish to connect.
      </p>
      <div className="button-wrapper">
        <button
          onClick={() => {
            onChangeRoute("SpecifyHDPath");
          }}
        >
          HD.../0
        </button>
      </div>
      <form
        className="form"
        onSubmit={(e) => {
          onSubmit(accounts, e);
        }}
      >
        <div>
          <div className="nws-form-control">
            {accounts.map((account, index) => (
              <div key={index} className="account">
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
              className="middleButton"
              type="submit"
              disabled={!accounts.some((x) => x.selected)}
            >
              Connect
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HardwareWalletAccountsForm;
