import * as nearAPI from "near-api-js";
import type {
  AccessKeyViewRaw,
  FinalExecutionOutcome,
  FunctionCallPermissionView,
} from "near-api-js/lib/providers/provider";
import { JsonRpcProvider } from "near-api-js/lib/providers";
import { stringifyJsonOrBytes } from "near-api-js/lib/transaction";
import {
  type WalletModuleFactory,
  type WalletBehaviourFactory,
  type Subscription,
  type Transaction,
  type Account,
  type InjectedWallet,
  type Optional,
} from "@near-wallet-selector/core";
import { signTransactions } from "@near-wallet-selector/wallet-utils";
import {
  watchAccount,
  getAccount,
  switchChain,
  writeContract,
  waitForTransactionReceipt,
  disconnect,
  type GetAccountReturnType,
  type Config,
} from "@wagmi/core";
import { bytesToHex, keccak256, toHex } from "viem";
import bs58 from "bs58";

import icon from "./icon";
import { createModal } from "./modal";
import {
  ETHEREUM_ACCOUNT_ABI,
  DEFAULT_ACCESS_KEY_ALLOWANCE,
  RLP_EXECUTE,
  MAX_TGAS,
} from "./utils";

export interface EthereumWalletsParams {
  wagmiConfig: Config;
  web3Modal: {
    open: () => void;
    subscribeEvents: (
      f: (event: { data: { event: string } }) => void
    ) => () => void;
    getState: () => { open: boolean; selectedNetworkId?: number };
  };
  chainId?: number;
  rpcUrl?: string;
  iconUrl?: string;
  devMode?: boolean;
  devModeAccount?: string;
  deprecated?: boolean;
}

interface EthereumWalletsState {
  keystore: nearAPI.keyStores.KeyStore;
  subscriptions: Array<Subscription>;
}

const setupEthereumWalletsState = async (
  id: string
): Promise<EthereumWalletsState> => {
  const keystore = new nearAPI.keyStores.BrowserLocalStorageKeyStore(
    window.localStorage,
    `near-wallet-selector:${id}:keystore:`
  );
  return {
    keystore,
    subscriptions: [],
  };
};

const EthereumWallets: WalletBehaviourFactory<
  InjectedWallet,
  { params: EthereumWalletsParams }
> = async ({
  id,
  options,
  store,
  provider,
  emitter,
  logger,
  params: {
    wagmiConfig,
    web3Modal,
    chainId,
    rpcUrl,
    devMode,
    devModeAccount = "eth-wallet.testnet",
  },
}) => {
  const _state = await setupEthereumWalletsState(id);
  const expectedChainId =
    chainId ?? options.network.networkId === "mainnet" ? 397 : 398;
  const nearRpc =
    rpcUrl ?? devMode
      ? "https://near-wallet-relayer.testnet.aurora.dev"
      : options.network.networkId === "mainnet"
      ? "https://near-wallet-relayer.mainnet.aurora.dev"
      : "https://near-wallet-relayer.testnet.aurora.dev";

  const getAccounts = async (): Promise<Array<Account>> => {
    const address = getAccount(wagmiConfig).address?.toLowerCase();
    const account = devMode ? address + "." + devModeAccount : address;
    if (!account || !address) {
      return [];
    }
    const keyPair = await _state.keystore.getKey(
      options.network.networkId,
      account
    );
    const accountLogIn: Account = {
      accountId: account,
      publicKey: keyPair ? keyPair.getPublicKey().toString() : undefined,
    };
    return [accountLogIn];
  };

  const cleanup = async () => {
    _state.subscriptions.forEach((subscription) => subscription.remove());
    _state.subscriptions = [];
  };

  const executeTransaction = async ({
    tx,
    relayerPublicKey,
  }: {
    tx: Transaction;
    relayerPublicKey: string;
  }): Promise<`0x${string}`> => {
    const to = (
      /^0x([A-Fa-f0-9]{40})$/.test(tx.receiverId)
        ? tx.receiverId
        : "0x" + keccak256(toHex(tx.receiverId)).slice(26)
    ) as `0x${string}`;
    let result;
    switch (tx.actions[0].type) {
      case "AddKey": {
        const publicKey = bytesToHex(
          bs58.decode(tx.actions[0].params.publicKey.split(":")[1])
        );
        if (tx.actions[0].params.accessKey.permission === "FullAccess") {
          result = await writeContract(wagmiConfig, {
            abi: ETHEREUM_ACCOUNT_ABI,
            address: to,
            functionName: "addKey",
            args: [
              0, // 0 stands for ed25519
              publicKey,
              BigInt(tx.actions[0].params.accessKey.nonce ?? 0),
              true,
              false, // Not used with is_full_access
              BigInt(0), // Not used with is_full_access
              "", // Not used with is_full_access
              [], // Not used with is_full_access
            ],
            chainId: expectedChainId,
            type: "legacy",
          });
        } else {
          const allowance = BigInt(
            tx.actions[0].params.accessKey.permission.allowance ??
              DEFAULT_ACCESS_KEY_ALLOWANCE
          );
          result = await writeContract(wagmiConfig, {
            abi: ETHEREUM_ACCOUNT_ABI,
            address: to,
            functionName: "addKey",
            args: [
              0, // 0 stands for ed25519
              publicKey,
              BigInt(tx.actions[0].params.accessKey.nonce ?? 0),
              false,
              allowance > 0 ? true : false,
              allowance,
              tx.actions[0].params.accessKey.permission.receiverId,
              tx.actions[0].params.accessKey.permission.methodNames ?? [],
            ],
            gasPrice:
              tx.actions[0].params.publicKey === relayerPublicKey &&
              tx.receiverId ===
                tx.actions[0].params.accessKey.permission.receiverId
                ? // Fix 0 gasPrice to avoid wallet errors when account has 0 NEAR balance.
                  // The onboarding transaction is always free.
                  BigInt(0)
                : undefined,
            chainId: expectedChainId,
            type: "legacy",
          });
        }
        break;
      }
      case "DeleteKey": {
        const publicKey = bytesToHex(
          bs58.decode(tx.actions[0].params.publicKey.split(":")[1])
        );
        result = await writeContract(wagmiConfig, {
          abi: ETHEREUM_ACCOUNT_ABI,
          address: to,
          functionName: "deleteKey",
          args: [
            0, // 0 stands for ed25519
            publicKey,
          ],
          chainId: expectedChainId,
          type: "legacy",
        });
        break;
      }
      case "FunctionCall": {
        const yoctoNear = BigInt(tx.actions[0].params.deposit) % BigInt(1e6);
        const value = BigInt(tx.actions[0].params.deposit) / BigInt(1e6);
        const requestedGas = BigInt(tx.actions[0].params.gas);
        const gas = requestedGas <= MAX_TGAS ? requestedGas : MAX_TGAS;
        result = await writeContract(wagmiConfig, {
          abi: ETHEREUM_ACCOUNT_ABI,
          address: to,
          functionName: "functionCall",
          args: [
            tx.receiverId,
            tx.actions[0].params.methodName,
            bytesToHex(stringifyJsonOrBytes(tx.actions[0].params.args)),
            gas,
            +yoctoNear.toString(),
          ],
          value,
          chainId: expectedChainId,
          type: "legacy",
        });
        break;
      }
      case "Transfer": {
        const yoctoNear = BigInt(tx.actions[0].params.deposit) % BigInt(1e6);
        const value = BigInt(tx.actions[0].params.deposit) / BigInt(1e6);
        result = await writeContract(wagmiConfig, {
          abi: ETHEREUM_ACCOUNT_ABI,
          address: to,
          functionName: "transfer",
          args: [tx.receiverId, +yoctoNear.toString()],
          value,
          chainId: expectedChainId,
          type: "legacy",
        });
        break;
      }
      default: {
        throw new Error("Invalid action type");
      }
    }
    return result;
  };

  const setupEvents = async () => {
    const unwatchAccount = watchAccount(wagmiConfig, {
      onChange: async (data) => {
        if (!data.address && data.status === "disconnected") {
          emitter.emit("signedOut", null);
          return;
        }
        if (data.address && data.status === "connected") {
          if (store.getState().contract?.contractId) {
            const address = data.address.toLowerCase();
            const keyPair = await _state.keystore.getKey(
              options.network.networkId,
              devMode ? address + "." + devModeAccount : address
            );
            if (!keyPair) {
              emitter.emit("signedOut", null);
              return;
            }
          }
          emitter.emit("accountsChanged", { accounts: await getAccounts() });
        }
      },
    });
    _state.subscriptions.push({ remove: () => unwatchAccount() });
  };
  setupEvents();

  // Add signerId and receiverId defaults.
  const transformTransactions = async (
    transactions: Array<Optional<Transaction, "signerId" | "receiverId">>
  ): Promise<Array<Transaction>> => {
    const state = store.getState();
    const { contract } = state;
    const [accountLogIn] = await getAccounts();

    if (!accountLogIn) {
      throw new Error("No active account");
    }

    return transactions.map((transaction) => {
      if (!contract && !transaction.receiverId) {
        throw new Error(`Missing receiverId, got '${transaction.receiverId}'`);
      }

      return {
        ...transaction,
        signerId: transaction.signerId || accountLogIn.accountId!,
        receiverId: transaction.receiverId || contract!.contractId,
      };
    });
  };
  // Separate actions into individual transactions because not available in 0x accounts.
  const transformEthereumTransactions = (
    transactions: Array<Transaction>
  ): Array<Transaction> => {
    return transactions
      .map((transaction) => {
        return transaction.actions.map((action) => {
          return {
            signerId: transaction.signerId,
            receiverId: transaction.receiverId,
            actions: [action],
          };
        });
      })
      .flat();
  };

  const validateAccessKey = ({
    transactions,
    accessKey,
  }: {
    transactions: Array<Transaction>;
    accessKey: AccessKeyViewRaw;
  }) => {
    if (accessKey.permission === "FullAccess") {
      return true;
    }
    return transactions.every((tx) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { receiver_id, method_names } = (
        accessKey.permission as FunctionCallPermissionView
      ).FunctionCall;
      if (receiver_id !== tx.receiverId) {
        return false;
      }
      return tx.actions.every((action) => {
        if (action.type !== "FunctionCall") {
          return false;
        }
        const { methodName, deposit } = action.params;
        if (method_names.length && !method_names.includes(methodName)) {
          return false;
        }
        return BigInt(deposit) <= 0;
      });
    });
  };

  const getRelayerOnboardingInfo = async ({
    accountId,
  }: {
    accountId: string;
  }): Promise<{
    relayerPublicKey: string;
    onboardingTransaction: null | Transaction;
  }> => {
    let relayerPublicKey: string;
    try {
      const response = await fetch(nearRpc, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 3,
          method: "near_getPublicKey",
        }),
      });
      const { result } = await response.json();
      relayerPublicKey =
        "ed25519:" + bs58.encode(Buffer.from(result.public_key, "hex"));
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch the relayer's public key.");
    }
    try {
      const key = await provider.query<AccessKeyViewRaw>({
        request_type: "view_access_key",
        finality: "final",
        account_id: accountId,
        public_key: relayerPublicKey,
      });
      logger.log(
        "User account ready, relayer access key onboarded.",
        relayerPublicKey,
        key
      );
      return { relayerPublicKey, onboardingTransaction: null };
    } catch (error) {
      logger.warn(
        "Need to add the relayer access key.",
        relayerPublicKey,
        error
      );
      // Add the relayer's access key on-chain.
      return {
        relayerPublicKey,
        onboardingTransaction: {
          signerId: accountId,
          receiverId: accountId,
          actions: [
            {
              type: "AddKey",
              params: {
                publicKey: relayerPublicKey,
                accessKey: {
                  nonce: 0,
                  permission: {
                    receiverId: accountId,
                    allowance: "0",
                    methodNames: [RLP_EXECUTE],
                  },
                },
              },
            },
          ],
        },
      };
    }
  };

  const signAndSendTransactions = async (
    transactions: Array<Optional<Transaction, "signerId" | "receiverId">>
  ) => {
    // If transactions can be executed with FunctionCall access key do it, otherwise execute 1 by 1 with Ethereum wallet.
    const nearTxs = await transformTransactions(transactions);
    const [accountLogIn] = await getAccounts();
    if (accountLogIn.publicKey) {
      try {
        const accessKey = await provider.query<AccessKeyViewRaw>({
          request_type: "view_access_key",
          finality: "final",
          account_id: accountLogIn.accountId,
          public_key: accountLogIn.publicKey,
        });
        const accessKeyUsable = validateAccessKey({
          transactions: nearTxs,
          accessKey,
        });
        if (accessKeyUsable) {
          const signer = new nearAPI.InMemorySigner(_state.keystore);
          const signedTransactions = await signTransactions(
            nearTxs,
            signer,
            options.network
          );
          const results: Array<FinalExecutionOutcome> = [];
          for (let i = 0; i < signedTransactions.length; i += 1) {
            results.push(await provider.sendTransaction(signedTransactions[i]));
          }
          return results;
        }
      } catch (error) {
        logger.error(
          "Failed to execute FunctionCall access key transaction, falling back to Ethereum wallet to sign and send transaction.",
          error
        );
      }
    }
    const { relayerPublicKey, onboardingTransaction } =
      await getRelayerOnboardingInfo({
        accountId: accountLogIn.accountId,
      });
    let txs = transformEthereumTransactions(nearTxs);
    if (onboardingTransaction) {
      txs = [onboardingTransaction, ...txs];
    }
    const { selectedNetworkId } = web3Modal.getState();
    if (selectedNetworkId !== expectedChainId) {
      await switchChain(wagmiConfig, {
        chainId: expectedChainId,
      });
    }
    const results: Array<FinalExecutionOutcome> = [];
    await (() => {
      return new Promise<void>((resolve, reject) => {
        const { showModal, hideModal, renderTxs } = createModal({
          onCancel: () => {
            reject("User canceled Ethereum wallet transaction(s).");
          },
          txs,
          relayerPublicKey,
        });
        showModal();
        (async () => {
          try {
            for (const [index, tx] of txs.entries()) {
              renderTxs({ selectedIndex: index });
              const txHash = await executeTransaction({ tx, relayerPublicKey });
              logger.log(`Sent transaction: ${txHash}`);
              const receipt = await waitForTransactionReceipt(wagmiConfig, {
                hash: txHash,
                chainId: expectedChainId,
              });
              logger.log("Receipt:", receipt);
              if (receipt.status !== "success") {
                throw new Error("Transaction execution failed.");
              }
              const nearProvider = new JsonRpcProvider(
                // @ts-expect-error
                provider.provider.connection
              );
              const nearTx = await nearProvider.txStatus(
                // @ts-expect-error
                receipt.nearTransactionHash,
                accountLogIn.accountId
              );
              results.push(nearTx);
            }
            resolve();
          } catch (error) {
            logger.error(error);
            reject(error);
          } finally {
            hideModal();
          }
        })();
      });
    })();
    return results;
  };

  const signOut = async () => {
    const [accountLogIn] = await getAccounts();
    try {
      if (accountLogIn.publicKey) {
        // Check that the key exists before making a transaction.
        await provider.query<AccessKeyViewRaw>({
          request_type: "view_access_key",
          finality: "final",
          account_id: accountLogIn.accountId,
          public_key: accountLogIn.publicKey,
        });
        // NOTE: If connection problem with the wallet, the user can cancel from the modal to skip the disconnect transaction.
        // If not deleted, the access key will be reused during signIn.
        await signAndSendTransactions([
          {
            signerId: accountLogIn.accountId,
            receiverId: accountLogIn.accountId,
            actions: [
              {
                type: "DeleteKey",
                params: {
                  publicKey: accountLogIn.publicKey,
                  /*
                  publicKey:
                    "ed25519:3HDMUBDSSup8jPL7FMLiduSPwir6HhX4zedvZmzy25So",
                  */
                },
              },
            ],
          },
        ]);
        _state.keystore.removeKey(
          options.network.networkId,
          accountLogIn.accountId
        );
      }
      cleanup();
    } catch (error) {
      logger.error(error);
    } finally {
      emitter.emit("signedOut", null);
      disconnect(wagmiConfig);
    }
  };

  return {
    async signIn({ contractId, methodNames = [] }) {
      logger.log("EthereumWallets:signIn", { contractId, methodNames });

      let unwatchAccountConnected: (() => void) | undefined;
      let unsubscribeCloseModal: (() => void) | undefined;
      const account = getAccount(wagmiConfig);
      let address = account.address?.toLowerCase();
      if (!address) {
        // NOTE: open web3Modal and wait for a wallet to be connected or the web3Modal to be closed.
        try {
          web3Modal.open();
          const newData: GetAccountReturnType = await (() => {
            return new Promise((resolve, reject) => {
              try {
                unwatchAccountConnected = watchAccount(wagmiConfig, {
                  onChange: (data: GetAccountReturnType) => {
                    if (!data.address) {
                      return;
                    }
                    resolve(data);
                  },
                });
                unsubscribeCloseModal = web3Modal.subscribeEvents(
                  (event: { data: { event: string } }) => {
                    const newAccount = getAccount(wagmiConfig);
                    if (
                      event.data.event === "MODAL_CLOSE" &&
                      !newAccount.address
                    ) {
                      logger.error(
                        "Web3Modal closed without connecting to an Ethereum wallet."
                      );
                      reject(
                        "Web3Modal closed without connecting to an Ethereum wallet."
                      );
                    }
                  }
                );
              } catch (error) {
                reject("User rejected");
              }
            });
          })();
          address = newData.address?.toLowerCase();
          if (!address) {
            throw new Error("Failed to get Ethereum wallet address");
          }
        } catch (error: unknown) {
          logger.error(error);
          throw new Error("Failed to connect Ethereum wallet.");
        } finally {
          if (unwatchAccountConnected) {
            unwatchAccountConnected();
          }
          if (unsubscribeCloseModal) {
            unsubscribeCloseModal();
          }
        }
      } else {
        logger.log("Wallet already connected");
      }

      const { selectedNetworkId } = web3Modal.getState();
      if (selectedNetworkId !== expectedChainId) {
        await switchChain(wagmiConfig, {
          chainId: expectedChainId,
        });
      }

      const accountId = devMode ? address + "." + devModeAccount : address;
      let publicKey;
      if (contractId) {
        const keyPair = await _state.keystore.getKey(
          options.network.networkId,
          accountId
        );
        let reUseKeyPair = false;
        if (keyPair) {
          try {
            await provider.query<AccessKeyViewRaw>({
              request_type: "view_access_key",
              finality: "final",
              account_id: accountId,
              public_key: keyPair.getPublicKey().toString(),
            });
            reUseKeyPair = true;
          } catch (error) {
            logger.warn("Local access key cannot be reused.");
            _state.keystore.removeKey(options.network.networkId, accountId);
          }
        }
        if (reUseKeyPair) {
          publicKey = keyPair.getPublicKey().toString();
          logger.log("Reusing existing publicKey:", publicKey);
        } else {
          const newAccessKeyPair = nearAPI.utils.KeyPair.fromRandom("ed25519");
          publicKey = newAccessKeyPair.getPublicKey().toString();
          logger.log("Created new publicKey:", publicKey);
          try {
            await signAndSendTransactions([
              {
                signerId: accountId,
                receiverId: accountId,
                actions: [
                  {
                    type: "AddKey",
                    params: {
                      publicKey,
                      accessKey: {
                        nonce: 0,
                        permission: {
                          receiverId: contractId,
                          allowance: DEFAULT_ACCESS_KEY_ALLOWANCE,
                          methodNames,
                        },
                      },
                    },
                  },
                ],
              },
            ]);
            await _state.keystore.setKey(
              options.network.networkId,
              accountId,
              newAccessKeyPair
            );
          } catch (error) {
            await signOut();
            throw error;
          }
        }
      }
      const accountLogIn = {
        accountId,
        publicKey,
      };
      emitter.emit("signedIn", {
        contractId: contractId,
        methodNames: methodNames ?? [],
        accounts: [accountLogIn],
      });
      if (!_state.subscriptions.length) {
        setupEvents();
      }
      return [accountLogIn];
    },

    signOut,

    getAccounts,

    async verifyOwner({ message }) {
      logger.log("EthereumWallets:verifyOwner", { message });
      throw new Error(
        "Not implemented: ed25519 N/A, use eth_sign or eth_signTypedData_v4 instead."
      );
    },

    async signMessage({ message, nonce, recipient }) {
      logger.log("EthereumWallets:signMessage", { message, nonce, recipient });
      throw new Error(
        "Not implemented: ed25519 N/A, use eth_sign or eth_signTypedData_v4 instead."
      );
    },

    async signAndSendTransaction(transaction) {
      logger.log("EthereumWallets:signAndSendTransaction", transaction);
      const outcomes = await signAndSendTransactions([transaction]);
      // Return the last transaction outcome.
      return outcomes[outcomes.length - 1];
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("EthereumWallets:signAndSendTransactions", { transactions });
      return await signAndSendTransactions(transactions);
    },
  };
};

export function setupEthereumWallets(
  params: EthereumWalletsParams
): WalletModuleFactory<InjectedWallet> {
  return async () => {
    return {
      id: "ethereum-wallets",
      type: "injected",
      metadata: {
        name: "Ethereum Wallets",
        description: "Ethereum wallets for NEAR.",
        iconUrl: params.iconUrl ?? icon,
        deprecated: params.deprecated ?? false,
        available: true,
        downloadUrl: "",
      },
      init: (config) => {
        return EthereumWallets({
          ...config,
          params,
        });
      },
    };
  };
}
