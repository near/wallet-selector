import React, { KeyboardEventHandler, useState } from "react";
import type {
  HardwareWallet,
  Wallet,
  WalletSelector,
} from "@near-wallet-selector/core";
import type { ModalOptions } from "../modal.types";
import type { DerivationPathModalRouteParams } from "./Modal.types";
import type { HardwareWalletAccount } from "@near-wallet-selector/core";
import HardwareWalletAccountsForm from "./HardwareWalletAccountsForm";
import { WalletConnecting } from "./WalletConnecting";

interface DerivationPathProps {
  selector: WalletSelector;
  options: ModalOptions;
  onBack: () => void;
  onConnected: () => void;
  params: DerivationPathModalRouteParams;
  onError: (message: string) => void;
}

export type HardwareWalletAccountState = HardwareWalletAccount & {
  selected: boolean;
};

type HardwareRoutes =
  | "EnterDerivationPath"
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
}) => {
  const [route, setRoute] = useState<HardwareRoutes>("EnterDerivationPath");
  const [derivationPath, setDerivationPath] = useState(DEFAULT_DERIVATION_PATH);
  const [accounts, setAccounts] = useState<Array<HardwareWalletAccountState>>(
    []
  );
  const [hardwareWallet, setHardwareWallet] = useState<Wallet>();
  const [customAccountId, setCustomAccountId] = useState("");
  const [connecting, setConnecting] = useState(false);

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
      const foundAccounts: Array<HardwareWalletAccountState> = [];

      for (let i = 0; i < accountIds.length; i++) {
        const selected = i === 0;
        foundAccounts.push({
          derivationPath,
          publicKey,
          accountId: accountIds[i],
          selected,
        });
      }
      setAccounts(foundAccounts);

      return foundAccounts;
    } catch (e) {
      return null;
    }
  };

  const handleSignIn = () => {
    const mapAccounts = accounts.map((account: HardwareWalletAccount) => {
      return {
        derivationPath: account.derivationPath,
        publicKey: account.publicKey,
        accountId: account.accountId,
      };
    });

    return hardwareWallet!
      .signIn({
        contractId: options.contractId,
        methodNames: options.methodNames,
        accounts: mapAccounts,
      })
      .then(() => onConnected())
      .catch((err) => {
        onError(`Error: ${err.message}`);
      });
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

      const multipleAccounts = resolvedAccounts.length > 1;

      if (!multipleAccounts) {
        setRoute("OverviewAccounts");
      } else {
        setConnecting(false);
        setRoute("ChooseAccount");
      }
    } catch (err) {
      setConnecting(false);
      const message =
        err instanceof Error ? err.message : "Something went wrong";

      onError(message);
    } finally {
      setConnecting(false);
    }
  };
  const handleEnterClick: KeyboardEventHandler<HTMLInputElement> = async (
    e
  ) => {
    if (e.key === "Enter") {
      await handleValidateAccount();
    }
  };

  const handleAddCustomAccountId = async () => {
    try {
      setConnecting(true);

      const publicKey = await (hardwareWallet as HardwareWallet).getPublicKey(
        derivationPath
      );
      setAccounts([
        {
          derivationPath: derivationPath,
          publicKey,
          accountId: customAccountId,
          selected: true,
        },
      ]);
      setRoute("OverviewAccounts");
    } catch (err) {
      setConnecting(false);
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      onError(message);
    } finally {
      setConnecting(false);
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
        />
      </div>
    );
  }

  return (
    <div className="derivation-path-wrapper">
      {route === "EnterDerivationPath" && (
        <div className="enter-derivation-path">
          <div>
            <p>
              Make sure your device is plugged in, then enter a derivation path
              to connect:
            </p>
            <input
              type="text"
              placeholder="Derivation Path"
              value={derivationPath}
              onChange={(e) => {
                setDerivationPath(e.target.value);
              }}
              onKeyPress={handleEnterClick}
            />
          </div>
          <div className="action-buttons">
            <button className="left-button" onClick={onBack}>
              Back
            </button>
            <button className="right-button" onClick={handleValidateAccount}>
              Continue
            </button>
          </div>
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
            setAccounts((prevAccounts) => {
              const selectedAccounts = prevAccounts.filter(
                (account) => account.selected
              );

              return [...selectedAccounts];
            });
            setRoute("OverviewAccounts");
          }}
        />
      )}
      {route === "AddCustomAccountId" && (
        <div className="enter-custom-account">
          <p>Failed to automatically find account id. Provide it manually:</p>
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
            <button className="right-button" onClick={handleAddCustomAccountId}>
              Continue
            </button>
          </div>
        </div>
      )}
      {route === "OverviewAccounts" && (
        <div className="overview-wrapper">
          <div className="overview-header">
            <h4>Accounts</h4>
          </div>
          {accounts.map((account, index) => (
            <div key={account.accountId}>
              <div className="account">
                <span>{account.accountId}</span>
              </div>
            </div>
          ))}

          <div className="action-buttons">
            <button
              className="right-button"
              onClick={handleSignIn}
              disabled={accounts.length === 0}
            >
              Connect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
