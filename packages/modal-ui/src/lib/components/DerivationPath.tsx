import React, { Fragment, useState } from "react";
import type {
  HardwareWallet,
  HardwareWalletAccount,
  Wallet,
  WalletSelector,
} from "@near-wallet-selector/core";
import type { ModalOptions } from "../modal.types";
import type { DerivationPathModalRouteParams } from "./Modal.types";
import HardwareWalletAccountsForm from "./HardwareWalletAccountsForm";
import { WalletConnecting } from "./WalletConnecting";
import { ModalHeader } from "./ModalHeader";
import { BackArrow } from "./BackArrow";
import { LedgerDeviceIcon } from "./LedgerDeviceIcon";
import { translate } from "../translate/translate";

interface DerivationPathProps {
  selector: WalletSelector;
  options: ModalOptions;
  onBack: () => void;
  onConnected: () => void;
  params: DerivationPathModalRouteParams;
  onError: (message: string, wallet: Wallet) => void;
  onCloseModal: () => void;
}

export type HardwareWalletAccountState = HardwareWalletAccount & {
  selected: boolean;
};

export type HardwareRoutes =
  | "EnterDerivationPath"
  | "SpecifyHDPath"
  | "NoAccountsFound"
  | "ChooseAccount"
  | "AddCustomAccountId"
  | "OverviewAccounts";

export const DEFAULT_DERIVATION_PATH = "44'/397'/0'/0'/1'";

export const DerivationPath: React.FC<DerivationPathProps> = ({
  selector,
  options,
  onBack,
  onConnected,
  params,
  onError,
  onCloseModal,
}) => {
  const [route, setRoute] = useState<HardwareRoutes>("EnterDerivationPath");
  const [derivationPath, setDerivationPath] = useState<string>(
    DEFAULT_DERIVATION_PATH
  );
  const [customDerivationPath, setCustomDerivationPath] = useState(1);
  const [accounts, setAccounts] = useState<Array<HardwareWalletAccountState>>(
    []
  );
  const [selectedAccounts, setSelectedAccounts] = useState<
    Array<HardwareWalletAccountState>
  >([]);

  const [hardwareWallet, setHardwareWallet] = useState<Wallet>();
  const [customAccountId, setCustomAccountId] = useState("");
  const [connecting, setConnecting] = useState(false);

  const initalHeaderTitle = translate("ledger.Connect with Ledger");
  const [headerTitle, setHeaderTitle] = useState(initalHeaderTitle);

  const getAccountIds = async (publicKey: string): Promise<Array<string>> => {
    const response = await fetch(
      `${selector.options.network.indexerUrl}/publicKey/ed25519:${publicKey}/accounts`
    );

    if (!response.ok) {
      throw new Error("Failed to get account id from public key");
    }

    const accountIds = await response.json();

    if (!Array.isArray(accountIds) || !accountIds.length) {
      return [];
    }

    return accountIds;
  };

  const resolveAccounts = async (
    wallet: Wallet
  ): Promise<Array<HardwareWalletAccountState> | null> => {
    const publicKey = await (wallet as HardwareWallet).getPublicKey(
      derivationPath
    );
    try {
      const accountIds = await getAccountIds(publicKey);

      return accountIds.map((accountId, index) => {
        return {
          derivationPath,
          publicKey,
          accountId,
          selected: index === 0,
        };
      });
    } catch (e) {
      return null;
    }
  };

  const handleValidateAccount = async () => {
    const wallet = await selector.wallet(params.walletId);

    if (wallet.type !== "hardware") {
      return;
    }

    setConnecting(true);
    setHardwareWallet(wallet);

    try {
      const resolvedAccounts = await resolveAccounts(wallet);
      if (!resolvedAccounts) {
        setRoute("AddCustomAccountId");
        return;
      }
      const noAccounts = resolvedAccounts.length === 0;
      const multipleAccounts = resolvedAccounts.length > 1;

      if (noAccounts) {
        setHeaderTitle(translate("ledger.No Accounts Found"));
        setRoute("NoAccountsFound");
        return;
      }
      setAccounts(resolvedAccounts);

      if (!multipleAccounts) {
        setRoute("OverviewAccounts");
      } else {
        setHeaderTitle(translate("ledger.Select Your Accounts"));
        setRoute("ChooseAccount");
      }
    } catch (err) {
      setConnecting(false);
      const message =
        err instanceof Error ? err.message : "Something went wrong";

      onError(message, wallet);
    } finally {
      setConnecting(false);
    }
  };

  const handleAddCustomAccountId = async () => {
    try {
      setConnecting(true);

      const publicKey = await (hardwareWallet as HardwareWallet).getPublicKey(
        derivationPath
      );
      const accountList = [
        {
          derivationPath: derivationPath,
          publicKey,
          accountId: customAccountId,
          selected: true,
        },
      ];
      setAccounts(accountList);
      setSelectedAccounts(accountList);
      setHeaderTitle(translate("ledger.Connecting 1 Account"));
      setRoute("OverviewAccounts");
    } catch (err) {
      setConnecting(false);
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      onError(message, hardwareWallet!);
    } finally {
      setConnecting(false);
    }
  };

  const handleSignIn = () => {
    const mapAccounts = selectedAccounts.map(
      (account: HardwareWalletAccount) => {
        return {
          derivationPath: account.derivationPath,
          publicKey: account.publicKey,
          accountId: account.accountId,
        };
      }
    );

    return hardwareWallet!
      .signIn({
        contractId: options.contractId,
        methodNames: options.methodNames,
        accounts: mapAccounts,
      })
      .then(() => onConnected())
      .catch((err) => {
        onError(`Error: ${err.message}`, hardwareWallet!);
      });
  };

  const handleOnBackButtonClick = () => {
    if (
      route === "SpecifyHDPath" ||
      route === "NoAccountsFound" ||
      route === "ChooseAccount"
    ) {
      setHeaderTitle(translate("ledger.Connect with Ledger"));
      setRoute("EnterDerivationPath");
    }

    if (route === "OverviewAccounts") {
      setHeaderTitle(translate("ledger.Select Your Accounts"));
      setRoute("ChooseAccount");
    }
  };

  if (connecting) {
    return (
      <div className="derivation-path-wrapper">
        <WalletConnecting
          wallet={hardwareWallet}
          onBack={() => {
            setConnecting(false);
          }}
          onCloseModal={onCloseModal}
        />
      </div>
    );
  }

  return (
    <Fragment>
      <div className="nws-modal-header-wrapper">
        {(route === "SpecifyHDPath" ||
          route === "NoAccountsFound" ||
          route === "ChooseAccount" ||
          route === "OverviewAccounts") && (
          <BackArrow onClick={handleOnBackButtonClick} />
        )}
        <ModalHeader title={headerTitle} onCloseModal={onCloseModal} />
      </div>
      <div className="derivation-path-wrapper">
        {route === "EnterDerivationPath" && (
          <div className="enter-derivation-path">
            <div className="ledger-image">
              <LedgerDeviceIcon />
            </div>
            <div className="ledger-description">
              <p>{translate("ledger.Make sure your Ledger")}</p>
              <p
                className="specify-path"
                onClick={() => {
                  setHeaderTitle(translate("ledger.Specify HD Path"));
                  setRoute("SpecifyHDPath");
                }}
              >
                {translate("ledger.Specify HD Path")}
              </p>
            </div>
            <div className="action-buttons">
              <button className="middleButton" onClick={handleValidateAccount}>
                {translate("ledger.Continue")}
              </button>
            </div>
          </div>
        )}

        {route === "SpecifyHDPath" && (
          <div className="specify-path-wrapper">
            <div className="change-path-wrapper">
              <div className="display-path">
                <span>{derivationPath.slice(0, -2)}</span>
              </div>
              <div className="change-path">
                <div className="path-value">
                  <span>{customDerivationPath}</span>
                </div>
                <div className="buttons-wrapper">
                  <button
                    onClick={() => {
                      const newValue = customDerivationPath + 1;
                      const path = derivationPath.slice(0, -2);
                      setDerivationPath(`${path}${newValue}'`);
                      setCustomDerivationPath(newValue);
                    }}
                  >
                    <svg
                      width="10"
                      height="7"
                      viewBox="0 0 10 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 5.4762L5 1.4762L1 5.4762"
                        stroke="#4F7CD1"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => {
                      const newValue = customDerivationPath - 1;

                      if (newValue < 0) {
                        return;
                      }

                      const path = derivationPath.slice(0, -2);
                      setDerivationPath(`${path}${newValue}'`);
                      setCustomDerivationPath(newValue);
                    }}
                  >
                    <svg
                      width="10"
                      height="7"
                      viewBox="0 0 10 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1.52382L5 5.52382L9 1.52382"
                        stroke="#4F7CD1"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <p className="path-description">
              {translate("ledger.Enter your preferred HD path")}
            </p>
            <p className="what-link">
              <a
                href="https://www.ledger.com/academy/crypto/what-are-hierarchical-deterministic-hd-wallets"
                target="_blank"
              >
                What's this?
              </a>
            </p>
            <div className="action-buttons">
              <button className="middleButton" onClick={handleValidateAccount}>
                {translate("ledger.Scan")}
              </button>
            </div>
          </div>
        )}

        {route === "NoAccountsFound" && (
          <div className="no-accounts-found-wrapper">
            <p>
              {translate("ledger.Can't find any account")}{" "}
              <a
                href={`https://${
                  selector.options.network.networkId === "testnet"
                    ? "testnet"
                    : "app"
                }.mynearwallet.com/create`}
                target="_blank"
              >
                MyNearWallet
              </a>{" "}
              {translate("ledger.or connect an another Ledger.")}
            </p>
          </div>
        )}

        {route === "ChooseAccount" && (
          <HardwareWalletAccountsForm
            accounts={accounts}
            onSelectedChanged={(index, selected) => {
              setAccounts((prevAccounts) => {
                const updateAccounts = prevAccounts.map((account, idx) => {
                  const selectedValue =
                    index === idx ? selected : account.selected;
                  return {
                    ...account,
                    selected: selectedValue,
                  };
                });
                return [...updateAccounts];
              });
            }}
            onSubmit={(acc, e) => {
              e.preventDefault();
              const selectedAcc = acc.filter((account) => account.selected);
              setSelectedAccounts(selectedAcc);

              const numberOfAccounts = selectedAcc.length;
              setHeaderTitle(
                `${translate(
                  "ledger.Connecting"
                )} ${numberOfAccounts} ${translate("ledger.of Accounts")}`
              );
              setRoute("OverviewAccounts");
            }}
            onChangeRoute={(newRoute) => {
              if (newRoute === "SpecifyHDPath") {
                setHeaderTitle(translate("ledger.Specify HD Path"));
              }
              setRoute(newRoute);
            }}
          />
        )}
        {route === "AddCustomAccountId" && (
          <div className="enter-custom-account">
            <p>{translate("ledger.Failed to automatically")}</p>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Account ID"
                value={customAccountId}
                onChange={(e) => {
                  setCustomAccountId(e.target.value);
                }}
              />
            </div>
            <div className="action-buttons">
              <button
                className="middleButton"
                onClick={handleAddCustomAccountId}
              >
                {translate("ledger.Continue")}
              </button>
            </div>
          </div>
        )}
        {route === "OverviewAccounts" && (
          <div className="overview-wrapper">
            <p>{translate("ledger.Overview the list of authorized")}</p>
            <div className="accounts">
              {selectedAccounts.map((account, index) => (
                <div key={account.accountId}>
                  <div className="account">
                    <span>{account.accountId}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="action-buttons">
              <button
                className="middleButton"
                onClick={handleSignIn}
                disabled={accounts.length === 0}
              >
                {translate("ledger.Finish")}
              </button>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};
