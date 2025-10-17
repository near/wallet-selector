import { createKey, getKeys, isPassKeyAvailable } from "./webauthn-utils";
import type { KeyPair } from "@near-js/crypto";
import type { SelectorInit, BiometricAccount } from "./types";
import { KeyPairSigner } from "@near-js/signers";
import {
  isValidAccountId,
  WebAuthnWalletError,
  ERROR_CODES,
  STORAGE_KEYS,
} from "./utils";
import { SignInModal, TransactionModal, MessageSigningModal, DelegateActionModal } from "./components";
import { FinalExecutionOutcome, SignedTransaction, Transaction } from "@near-wallet-selector/core";
import { signTransactions } from "@near-wallet-selector/wallet-utils";
import { PublicKey } from "@near-js/crypto";

const WebAuthnWallet: SelectorInit = async ({
  options,
  store,
  logger,
  emitter,
  provider,
  storage,
  relayerUrl,
}) => {
  // Check WebAuthn support
  if (!(await isPassKeyAvailable())) {
    throw new WebAuthnWalletError(
      ERROR_CODES.WEBAUTHN_NOT_SUPPORTED,
      "WebAuthn is not supported in this browser"
    );
  }

  let currentAccount: BiometricAccount | null = null;
  let currentKeyPair: KeyPair | null = null;

  // Try to restore previous session
  const restoredAccount = await storage.getItem<BiometricAccount>(
    STORAGE_KEYS.ACCOUNT
  );
  if (restoredAccount) {
    currentAccount = restoredAccount;
  }

  async function checkAccountExists(accountId: string): Promise<boolean> {
    try {
      const account = await provider.query({
        request_type: "view_account",
        finality: "final",
        account_id: accountId,
      });
      return !!account;
    } catch (error) {
      return false;
    }
  }

  async function findValidKey(
    accountId: string,
    possibleKeys: Array<KeyPair>
  ): Promise<string | null> {
    try {
      const account = await provider.query({
        request_type: "view_access_key_list",
        finality: "final",
        account_id: accountId,
      }) as any;

      for (const possibleKey of possibleKeys) {
        const keyExists = account.keys.some(
          (key: { public_key: string }) =>
            key.public_key === possibleKey.getPublicKey().toString()
        );
        if (keyExists) {
          return possibleKey.getPublicKey().toString();
        }
      }

      return null;
    } catch (error) {
      logger.error("Error finding valid key:", error);
      return null;
    }
  }

  async function createAccountViaRelayer(
    accountId: string,
    publicKey: string
  ): Promise<void> {
    if (!relayerUrl) {
      throw new WebAuthnWalletError(
        ERROR_CODES.RELAYER_ERROR,
        "Relayer URL not configured. Cannot create account."
      );
    }

    try {
      const response = await fetch(`${relayerUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountId,
          publicKey,
        }),
      });

      if (!response.ok) {
        throw new Error(`Relayer error: ${response.statusText}`);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error("Account creation failed");
      }

      logger.log("Account created successfully:", accountId);
    } catch (error) {
      logger.error("Relayer error:", error);
      throw new WebAuthnWalletError(
        ERROR_CODES.RELAYER_ERROR,
        "Failed to create account via relayer",
        error
      );
    }
  }

  async function promptForAccountId(previousAccounts: BiometricAccount[]): Promise<{ accountId: string; usingExistingAccount: boolean }> {
    return new Promise((resolve, reject) => {
      const modal = new SignInModal({
        networkId: options.network.networkId,
        previousAccounts,
        onSubmit: async (accountId, usingExistingAccount = false) => {
          resolve({ accountId, usingExistingAccount });
          modal.close();
        },
        onClose: () => {
          reject(new WebAuthnWalletError(
            ERROR_CODES.USER_CANCELLED,
            'User closed sign-in modal'
          ));
        },
      });
      modal.show();
    });
  }

  async function addAccountToList(account: BiometricAccount): Promise<void> {
    const currentList = await storage.getItem<BiometricAccount[]>(
      STORAGE_KEYS.ACCOUNTS_LIST
    ) || [];

    // Check if account already exists (update it)
    const existingIndex = currentList.findIndex(
      acc => acc.accountId === account.accountId
    );

    if (existingIndex >= 0) {
      currentList[existingIndex] = account;
    } else {
      currentList.push(account);
    }

    await storage.setItem(STORAGE_KEYS.ACCOUNTS_LIST, currentList);
  }

  async function getKeyPairForSigning(): Promise<KeyPair> {
    if (!currentAccount) {
      throw new WebAuthnWalletError(
        ERROR_CODES.ACCOUNT_NOT_FOUND,
        "No account signed in"
      );
    }

    if (currentKeyPair) {
      return currentKeyPair;
    }

    const keys = await getKeys(currentAccount.accountId, storage);
    const validKey = await findValidKey(currentAccount.accountId, keys);

    if (!validKey) {
      throw new WebAuthnWalletError(
        ERROR_CODES.ACCOUNT_NOT_FOUND,
        'No valid key found for this account'
      );
    }

    const foundKey = keys.find((k: KeyPair) => k.getPublicKey().toString() === validKey);
    if (!foundKey) {
      throw new WebAuthnWalletError(
        ERROR_CODES.ACCOUNT_NOT_FOUND,
        'Could not retrieve biometric key'
      );
    }

    currentKeyPair = foundKey;
    return foundKey;
  }

  async function signTransactionWithBiometric(
    transactions: Array<Transaction>,
  ): Promise<SignedTransaction[]> {
    try {
      const keyPair = await getKeyPairForSigning();
      const signer = new KeyPairSigner(keyPair);
      const signedTransactions = await signTransactions(transactions, signer, options.network);
      return signedTransactions;
    } catch (error) {
      logger.error("Transaction signing error:", error);
      throw error;
    }
  }

  return {
    async signIn({ contractId, methodNames }) {
      logger.log("WebAuthnWallet:signIn", { contractId, methodNames });

      try {
        // Get list of previously used accounts
        const previousAccounts = await storage.getItem<BiometricAccount[]>(
          STORAGE_KEYS.ACCOUNTS_LIST
        ) || [];

        let { accountId, usingExistingAccount } = await promptForAccountId(previousAccounts);

        if (!isValidAccountId(accountId) && !usingExistingAccount) {
          throw new WebAuthnWalletError(
            ERROR_CODES.INVALID_ACCOUNT_ID,
            "Invalid account ID format"
          );
        }

        // If user selected from the list of previous accounts
        if (usingExistingAccount) {
          logger.log("Signing in with previously used account...");

          // Get keys with biometric authentication
          const keys = await getKeys(accountId, storage);
          accountId = previousAccounts.find((acc) => acc.publicKey === keys[0].getPublicKey().toString())?.accountId || "";

          // Verify the account still exists on chain
          const accountExists = await checkAccountExists(accountId);
          if (!accountExists) {
            throw new WebAuthnWalletError(
              ERROR_CODES.ACCOUNT_NOT_FOUND,
              "Account not found on chain"
            );
          }

          const validKey = await findValidKey(accountId, keys);

          if (!validKey) {
            throw new WebAuthnWalletError(
              ERROR_CODES.ACCOUNT_NOT_FOUND,
              "No valid key found for this account"
            );
          }
          // Store the KeyPair for transaction signing
          currentKeyPair = keys.find((k: KeyPair) =>
            k.getPublicKey().toString() === validKey
          ) || null;

          currentAccount = {
            accountId,
            publicKey: validKey,
          };
        } else {
          // New account or manually entered account
          const accountExists = await checkAccountExists(accountId);

          if (accountExists) {
            logger.log("Account exists, signing in...");

            const keys = await getKeys(accountId, storage) as any;
            const validKey = await findValidKey(accountId, keys);

            if (!validKey) {
              throw new WebAuthnWalletError(
                ERROR_CODES.ACCOUNT_NOT_FOUND,
                "No valid key found for this account"
              );
            }

            // Store the KeyPair for transaction signing
            currentKeyPair = keys.find((k: KeyPair) =>
              k.getPublicKey().toString() === validKey
            );

            currentAccount = {
              accountId,
              publicKey: validKey,
            };
          } else {
            logger.log("Account does not exist, creating new account...");

            const keyPair = await createKey(accountId, storage);
            const publicKey = keyPair.getPublicKey().toString();

            await createAccountViaRelayer(accountId, publicKey);

            // Store the KeyPair for transaction signing
            currentKeyPair = keyPair;

            currentAccount = {
              accountId,
              publicKey,
            };
          }
        }

        // Store current account and add to accounts list
        await storage.setItem(STORAGE_KEYS.ACCOUNT, currentAccount);
        await addAccountToList(currentAccount);

        emitter.emit("signedIn", {
          contractId,
          methodNames: methodNames || [],
          accounts: [currentAccount],
        });

        return [currentAccount];
      } catch (error) {
        logger.error("Sign in error:", error);

        if (
          error instanceof Error &&
          (error.name === "NotAllowedError" || error.name === "AbortError")
        ) {
          throw new WebAuthnWalletError(
            ERROR_CODES.USER_CANCELLED,
            "User cancelled biometric authentication"
          );
        }

        throw error;
      }
    },

    async signOut() {
      logger.log("WebAuthnWallet:signOut");

      currentAccount = null;
      currentKeyPair = null;
      await storage.removeItem(STORAGE_KEYS.ACCOUNT);

      emitter.emit("signedOut", null);
    },


    async getAccounts() {
      logger.log("WebAuthnWallet:getAccounts");
      return currentAccount ? [currentAccount] : [];
    },

    async signAndSendTransaction({ signerId, receiverId, actions }) {
      logger.log("WebAuthnWallet:signAndSendTransaction", {
        signerId,
        receiverId,
        actions,
      });

      if (!currentAccount) {
        throw new WebAuthnWalletError(
          ERROR_CODES.ACCOUNT_NOT_FOUND,
          "No account signed in"
        );
      }

      const { contract } = store.getState();
      const finalReceiverId = receiverId || contract?.contractId;

      if (!finalReceiverId) {
        throw new Error("No receiver ID specified");
      }

      if (signerId && signerId !== currentAccount.accountId) {
        throw new Error(
          `Signed in as ${currentAccount.accountId}, cannot sign for ${signerId}`
        );
      }

      return new Promise((resolve, reject) => {
        const modal = new TransactionModal({
          transactions: [{
            receiverId: finalReceiverId,
            actions,
          }],
          onApprove: async () => {
            try {
              if (!currentAccount) {
                throw new WebAuthnWalletError(
                  ERROR_CODES.ACCOUNT_NOT_FOUND,
                  "Account signed out during transaction"
                );
              }

              const signedTx = await signTransactionWithBiometric([{
                signerId: currentAccount.accountId,
                receiverId: finalReceiverId,
                actions,
              }]);

              const result = await provider.sendTransaction(signedTx[0]);

              resolve(result);
              modal.close();
            } catch (error) {
              reject(error);
              modal.close();
            }
          },
          onReject: () => {
            reject(
              new WebAuthnWalletError(
                ERROR_CODES.USER_CANCELLED,
                "User rejected transaction"
              )
            );
          },
          onClose: () => {
            reject(
              new WebAuthnWalletError(
                ERROR_CODES.USER_CANCELLED,
                "User closed transaction modal"
              )
            );
          },
        });
        modal.show();
      });
    },

    async signAndSendTransactions(params): Promise<Array<FinalExecutionOutcome>> {
      logger.log("WebAuthnWallet:signAndSendTransactions", params);

      if (!currentAccount) {
        throw new WebAuthnWalletError(
          ERROR_CODES.ACCOUNT_NOT_FOUND,
          "No account signed in"
        );
      }

      return new Promise((resolve, reject) => {
        const modal = new TransactionModal({
          transactions: params.transactions.map(tx => ({
            receiverId: tx.receiverId,
            actions: tx.actions,
          })),
          onApprove: async () => {
            try {
              if (!currentAccount) {
                throw new WebAuthnWalletError(
                  ERROR_CODES.ACCOUNT_NOT_FOUND,
                  "Account signed out during transaction"
                );
              }

              const signedTxs = await signTransactionWithBiometric(params.transactions.map(tx => ({
                signerId: currentAccount!.accountId,
                receiverId: tx.receiverId,
                actions: tx.actions,
              })));

              const results: Array<FinalExecutionOutcome> = [];

              for (let i = 0; i < signedTxs.length; i++) {
                results.push(await provider.sendTransaction(signedTxs[i]));
              }

              resolve(results);
              modal.close();
            } catch (error) {
              reject(error);
              modal.close();
            }
          },
          onReject: () => {
            reject(
              new WebAuthnWalletError(
                ERROR_CODES.USER_CANCELLED,
                "User rejected transactions"
              )
            );
          },
          onClose: () => {
            reject(
              new WebAuthnWalletError(
                ERROR_CODES.USER_CANCELLED,
                "User closed transaction modal"
              )
            );
          },
        });
        modal.show();
      });
    },

    async verifyOwner({ message }) {
      logger.log("WebAuthnWallet:verifyOwner", { message });

      throw new Error("Method not supported by WebAuthn Wallet");
    },

    async signMessage({ message, recipient, nonce }) {
      logger.log("WebAuthnWallet:signMessage", { message, recipient, nonce });

      if (!currentAccount) {
        throw new WebAuthnWalletError(
          ERROR_CODES.ACCOUNT_NOT_FOUND,
          "No account signed in"
        );
      }

      return new Promise((resolve, reject) => {
        const modal = new MessageSigningModal({
          message,
          recipient,
          nonce: nonce instanceof Buffer ? nonce : Buffer.from(nonce as Uint8Array),
          onApprove: async () => {
            try {
              if (!currentAccount) {
                throw new WebAuthnWalletError(
                  ERROR_CODES.ACCOUNT_NOT_FOUND,
                  "Account signed out during signing"
                );
              }

              const keyPair = await getKeyPairForSigning();
              const publicKey = keyPair.getPublicKey();

              const signer = new KeyPairSigner(keyPair);
              const signatureData = await signer.signNep413Message(
                message,
                currentAccount.accountId,
                recipient,
                nonce as any
              );

              const result = {
                accountId: currentAccount.accountId,
                publicKey: publicKey.toString(),
                signature: Buffer.from(signatureData.signature).toString("base64"),
              };

              resolve(result);
              modal.close();
            } catch (error) {
              reject(error);
              modal.close();
            }
          },
          onReject: () => {
            reject(
              new WebAuthnWalletError(
                ERROR_CODES.USER_CANCELLED,
                "User rejected message signing"
              )
            );
          },
          onClose: () => {
            reject(
              new WebAuthnWalletError(
                ERROR_CODES.USER_CANCELLED,
                "User closed message signing modal"
              )
            );
          },
        });
        modal.show();
      });
    },

    async getPublicKey(): Promise<PublicKey> {
      if (!currentAccount) {
        throw new WebAuthnWalletError(
          ERROR_CODES.ACCOUNT_NOT_FOUND,
          "No account signed in"
        );
      }
      return PublicKey.fromString(currentAccount.publicKey);
    },

    async signNep413Message(message, accountId, recipient, nonce, callbackUrl) {
      logger.log("WebAuthnWallet:signNep413Message", {
        message,
        accountId,
        recipient,
        nonce,
        callbackUrl,
      });

      if (!currentAccount) {
        throw new WebAuthnWalletError(
          ERROR_CODES.ACCOUNT_NOT_FOUND,
          "No account signed in"
        );
      }

      return new Promise((resolve, reject) => {
        const modal = new MessageSigningModal({
          message,
          recipient,
          nonce: nonce instanceof Buffer ? nonce : Buffer.from(nonce as Uint8Array),
          callbackUrl,
          onApprove: async () => {
            try {
              if (!currentAccount) {
                throw new WebAuthnWalletError(
                  ERROR_CODES.ACCOUNT_NOT_FOUND,
                  "Account signed out during signing"
                );
              }

              const keyPair = await getKeyPairForSigning();
              const signer = new KeyPairSigner(keyPair);
              const signatureData = await signer.signNep413Message(
                message,
                currentAccount.accountId,
                recipient,
                nonce as any,
                callbackUrl
              );

              resolve(signatureData);
              modal.close();
            } catch (error) {
              reject(error);
              modal.close();
            }
          },
          onReject: () => {
            reject(
              new WebAuthnWalletError(
                ERROR_CODES.USER_CANCELLED,
                "User rejected message signing"
              )
            );
          },
          onClose: () => {
            reject(
              new WebAuthnWalletError(
                ERROR_CODES.USER_CANCELLED,
                "User closed message signing modal"
              )
            );
          },
        });
        modal.show();
      });
    },

    async signTransaction(transaction) {
      logger.log("WebAuthnWallet:signTransaction", { transaction });

      if (!currentAccount) {
        throw new WebAuthnWalletError(
          ERROR_CODES.ACCOUNT_NOT_FOUND,
          "No account signed in"
        );
      }

      return new Promise((resolve, reject) => {
        const modal = new TransactionModal({
          transactions: [{
            receiverId: transaction.receiverId,
            actions: transaction.actions,
          }],
          onApprove: async () => {
            try {
              if (!currentAccount) {
                throw new WebAuthnWalletError(
                  ERROR_CODES.ACCOUNT_NOT_FOUND,
                  "Account signed out during transaction"
                );
              }

              const keyPair = await getKeyPairForSigning();
              const signer = new KeyPairSigner(keyPair);
              const signedTx = await signer.signTransaction(transaction);

              resolve(signedTx);
              modal.close();
            } catch (error) {
              reject(error);
              modal.close();
            }
          },
          onReject: () => {
            reject(
              new WebAuthnWalletError(
                ERROR_CODES.USER_CANCELLED,
                "User rejected transaction"
              )
            );
          },
          onClose: () => {
            reject(
              new WebAuthnWalletError(
                ERROR_CODES.USER_CANCELLED,
                "User closed transaction modal"
              )
            );
          },
        });
        modal.show();
      });
    },

    async signDelegateAction(delegateAction) {
      logger.log("WebAuthnWallet:signDelegateAction", { delegateAction });

      if (!currentAccount) {
        throw new WebAuthnWalletError(
          ERROR_CODES.ACCOUNT_NOT_FOUND,
          "No account signed in"
        );
      }

      return new Promise((resolve, reject) => {
        const modal = new DelegateActionModal({
          delegateAction,
          onApprove: async () => {
            try {
              if (!currentAccount) {
                throw new WebAuthnWalletError(
                  ERROR_CODES.ACCOUNT_NOT_FOUND,
                  "Account signed out during signing"
                );
              }

              const keyPair = await getKeyPairForSigning();
              const signer = new KeyPairSigner(keyPair);
              const signedDelegateAction = await signer.signDelegateAction(delegateAction);

              resolve(signedDelegateAction);
              modal.close();
            } catch (error) {
              reject(error);
              modal.close();
            }
          },
          onReject: () => {
            reject(
              new WebAuthnWalletError(
                ERROR_CODES.USER_CANCELLED,
                "User rejected delegate action"
              )
            );
          },
          onClose: () => {
            reject(
              new WebAuthnWalletError(
                ERROR_CODES.USER_CANCELLED,
                "User closed delegate action modal"
              )
            );
          },
        });
        modal.show();
      });
    },
  };
};

export { WebAuthnWallet };
