import React, { ChangeEvent, KeyboardEventHandler, useState } from "react";
import type { Wallet, WalletSelector } from "@near-wallet-selector/core";
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

export interface HardwareWalletAccountState {
  derivationPath: string;
  publicKey: string;
  accountIds: Array<string>;
  selectedAccountId: string;
}

export const DEFAULT_DERIVATION_PATH = "44'/397'/0'/0'/1'";

export const DerivationPath: React.FC<DerivationPathProps> = ({
  selector,
  options,
  onBack,
  onConnected,
  params,
  onError,
}) => {
  const [derivationPaths, setDerivationPaths] = useState<
    Array<{ path: string }>
  >([{ path: DEFAULT_DERIVATION_PATH }]);

  const [hardwareWalletAccounts, setHardwareWalletAccounts] = useState<
    Array<HardwareWalletAccountState>
  >([]);

  const [showMultipleAccountsSelect, setShowMultipleAccountsSelect] =
    useState<boolean>(false);

  const [connecting, setConnecting] = useState<boolean>(false);
  const [hardwareWallet, setHardwareWallet] = useState<Wallet>();

  const handleDerivationPathAdd = () => {
    setDerivationPaths((prevDerivationPaths) => {
      return [...prevDerivationPaths, { path: "" }];
    });
  };

  const handleDerivationPathRemove = (index: number) => {
    setDerivationPaths((prevDerivationPaths) => {
      prevDerivationPaths.splice(index, 1);
      return [...prevDerivationPaths];
    });
  };

  const handleDerivationPathChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setDerivationPaths((prevDerivationPaths) => {
      prevDerivationPaths[index].path = e.target.value;
      return [...prevDerivationPaths];
    });
  };

  const getAccountIdsFromPublicKey = async (
    publicKey: string
  ): Promise<Array<string>> => {
    const response = await fetch(
      `${selector.options.network.indexerUrl}/publicKey/ed25519:${publicKey}/accounts`
    );

    if (!response.ok) {
      throw new Error("Failed to get account id from public key");
    }

    const accountIds = await response.json();

    if (!Array.isArray(accountIds) || !accountIds.length) {
      throw new Error(
        "Failed to find account linked for public key: " + publicKey
      );
    }

    return accountIds;
  };

  const resolveAccounts = async (wallet: Wallet) => {
    const accounts: Array<HardwareWalletAccountState> = [];

    for (let i = 0; i < derivationPaths.length; i += 1) {
      const derivationPath = derivationPaths[i].path;

      if (wallet.type === "hardware") {
        const publicKey = await wallet.getPublicKey(derivationPath);
        const accountIds = await getAccountIdsFromPublicKey(publicKey);

        accounts.push({
          derivationPath,
          publicKey,
          accountIds,
          selectedAccountId: accountIds[0],
        });
      }
    }
    return accounts;
  };

  const signIn = (
    wallet: Wallet,
    contractId: string,
    methodNames: Array<string> | undefined,
    accounts: Array<HardwareWalletAccount>
  ) => {
    return wallet
      .signIn({
        contractId,
        methodNames,
        accounts,
      })
      .then(() => onConnected())
      .catch((err) => {
        onError(`Error: ${err.message}`);
      });
  };

  const handleConnectClick = async () => {
    const wallet = await selector.wallet(params.walletId);

    if (wallet.type !== "hardware") {
      return;
    }

    setConnecting(true);
    setHardwareWallet(wallet);

    try {
      const accounts = await resolveAccounts(wallet);
      const multipleAccounts = accounts.some((x) => x.accountIds.length > 1);

      if (!multipleAccounts) {
        const mapAccounts = accounts.map((account) => {
          return {
            derivationPath: account.derivationPath,
            publicKey: account.publicKey,
            accountId: account.accountIds[0],
          };
        });

        return signIn(
          wallet,
          options.contractId,
          options.methodNames,
          mapAccounts
        );
      } else {
        setConnecting(false);

        setHardwareWalletAccounts(accounts);
        setShowMultipleAccountsSelect(true);
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

  const handleMultipleAccountsSignIn = async (
    accounts: Array<HardwareWalletAccount>
  ) => {
    await signIn(
      hardwareWallet!,
      options.contractId,
      options.methodNames,
      accounts
    );
  };

  const handleAccountChange = (
    derivationPath: string,
    selectedAccountId: string
  ) => {
    setHardwareWalletAccounts((accounts) => {
      const mapAccounts = accounts.map((account) => {
        const selectedId =
          derivationPath === account.derivationPath
            ? selectedAccountId
            : account.selectedAccountId;
        return {
          ...account,
          selectedAccountId: selectedId,
        };
      });
      return [...mapAccounts];
    });
  };

  const handleEnterClick: KeyboardEventHandler<HTMLInputElement> = async (
    e
  ) => {
    if (e.key === "Enter") {
      await handleConnectClick();
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
      {showMultipleAccountsSelect ? (
        <HardwareWalletAccountsForm
          hardwareWalletAccounts={hardwareWalletAccounts}
          onAccountChanged={(derivationPath, selectedAccountId) => {
            handleAccountChange(derivationPath, selectedAccountId);
          }}
          onSubmit={(accounts, e) => {
            e.preventDefault();
            const mapAccounts = accounts.map((account) => {
              return {
                derivationPath: account.derivationPath,
                publicKey: account.publicKey,
                accountId: account.selectedAccountId,
              };
            });
            handleMultipleAccountsSignIn(mapAccounts);
          }}
        />
      ) : (
        <div>
          <p>
            Make sure your device is plugged in, then enter an account id to
            connect:
          </p>
          <div className="derivation-path-list">
            {derivationPaths.map((path, index) => {
              return (
                <div key={index}>
                  <input
                    type="text"
                    placeholder="Derivation Path"
                    value={index === 0 ? derivationPaths[0].path : path.path}
                    onChange={(e) => {
                      handleDerivationPathChange(index, e);
                    }}
                    onKeyPress={handleEnterClick}
                  />

                  {index !== 0 && (
                    <button
                      type="button"
                      title="Remove"
                      onClick={() => handleDerivationPathRemove(index)}
                    >
                      -
                    </button>
                  )}
                  {index === derivationPaths.length - 1 && (
                    <button
                      title="Add"
                      type="button"
                      onClick={() => handleDerivationPathAdd()}
                    >
                      +
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <div className="action-buttons">
            <button className="left-button" onClick={onBack}>
              Back
            </button>
            <button className="right-button" onClick={handleConnectClick}>
              Connect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
