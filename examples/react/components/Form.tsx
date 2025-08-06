import type { FormEventHandler } from "react";
import React from "react";
import Big from "big.js";

import type { Account } from "../interfaces";

interface FormProps {
  account: Account;
  onSubmit: FormEventHandler;
}

const Form: React.FC<FormProps> = ({ account, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <fieldset id="fieldset">
        <p>Sign the guest book, {account.account_id}!</p>
        <p className="highlight">
          <label htmlFor="message">Message:</label>
          <input autoComplete="off" autoFocus id="message" required />
        </p>
        <p>
          <label htmlFor="donation">Donation (optional):</label>
          <input
            autoComplete="off"
            defaultValue={"0"}
            id="donation"
            max={Big(account.amount)
              .div(10 ** 24)
              .toString()}
            min="0"
            step="0.01"
            type="number"
          />
          <span title="NEAR Tokens">Ⓝ</span>
        </p>
        <p>
          <label htmlFor="multiple">Multiple Transactions:</label>
          <input id="multiple" type="checkbox" />
        </p>
        <button type="submit">Sign</button>
      </fieldset>
    </form>
  );
};

export default Form;
