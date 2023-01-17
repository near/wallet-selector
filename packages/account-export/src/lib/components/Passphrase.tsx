import React, { Fragment, useEffect, useState } from "react";
import generator from "generate-password";
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
    const key = generator.generate({
      length: 32,
      numbers: true,
      strict: true,
      lowercase: true,
      uppercase: true,
      symbols: true,
    });
    setSecretKey(key);
  }, []);

  const onButtonClick = () => {
    onPassphraseSave(secretKey);
    onNextStep();
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
          <div className="checkbox">
            <input
              onChange={(e) => setHasCopied(e.target.checked)}
              checked={hasCopied}
              type="checkbox"
              id="passphrase-check"
              name="passphrase-check"
              value="passphrase-check"
            />
            <label htmlFor="passphrase-check">
              {translate("modal.exportAccounts.getPassphrase.checkLabel")}
            </label>
          </div>
          <button
            className="middleButton account-export-button"
            onClick={onButtonClick}
            disabled={!hasCopied}
          >
            {translate("modal.exportAccounts.getPassphrase.button")}
          </button>
        </div>
      </div>
    </Fragment>
  );
};
