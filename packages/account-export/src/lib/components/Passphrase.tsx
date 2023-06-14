import React, { Fragment, useEffect, useState } from "react";
import { generateSecretKey } from "../helpers";
import { translate } from "@near-wallet-selector/core";
import { ModalHeader } from "./ModalHeader";
import { ClickToCopy } from "./ClickToCopy";

export interface PassphraseProps {
  onNextStep: () => void;
  hasCopied: boolean;
  setHasCopied: (hasCopied: boolean) => void;
  onCloseModal: () => void;
  onBack: () => void;
  onPassphraseSave: (passphrase: string) => void;
}

export const Passphrase: React.FC<PassphraseProps> = ({
  onNextStep,
  hasCopied,
  setHasCopied,
  onCloseModal,
  onBack,
  onPassphraseSave,
}) => {
  const [secretKey, setSecretKey] = useState("");

  useEffect(() => {
    const key = generateSecretKey();
    setSecretKey(key);
  }, []);

  const onButtonClick = () => {
    onNextStep();
  };

  const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasCopied(e.target.checked);
    onPassphraseSave(secretKey);
  };

  return (
    <Fragment>
      <ModalHeader
        title={translate("modal.exportAccounts.getPassphrase.title")}
        onCloseModal={onCloseModal}
        onBack={onBack}
      />
      <div className="account-export">
        <div className="content">
          <h4 className="passphrase-title">
            {translate("modal.exportAccounts.getPassphrase.desc")}
          </h4>
          <ClickToCopy copy={secretKey} id="passphraseButton">
            <div className="passphrase-text">{secretKey}</div>
          </ClickToCopy>
          <label htmlFor="passphraseButton" className="passphrase-label">
            {translate("modal.exportAccounts.getPassphrase.label")}
          </label>
          <div className="filler" />
          <div className="passphrase-check-container">
            <div className="checkbox">
              <input
                onChange={onCheck}
                checked={hasCopied}
                type="checkbox"
                id="passphrase-check"
                name="passphrase-check"
                value="passphrase-check"
              />
              <label htmlFor="passphrase-check">
                <span className="label">
                  {translate("modal.exportAccounts.getPassphrase.checkLabel")}
                </span>
              </label>
            </div>
          </div>
          <button
            className="middleButton account-export-button"
            onClick={onButtonClick}
            disabled={!hasCopied}
          >
            {translate("modal.exportAccounts.getPassphrase.transferButton")}
          </button>
        </div>
      </div>
    </Fragment>
  );
};
