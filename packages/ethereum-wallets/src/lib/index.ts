import * as nearAPI from "near-api-js";
import type {
  AccessKeyViewRaw,
  ExecutionStatus,
  FinalExecutionOutcome,
  FunctionCallPermissionView,
} from "near-api-js/lib/providers/provider";
import { JsonRpcProvider } from "near-api-js/lib/providers";
import { stringifyJsonOrBytes } from "near-api-js/lib/transaction";
import { parseRpcError } from "near-api-js/lib/utils/rpc_errors";
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
  type WriteContractParameters,
  type GetAccountReturnType,
  type Config,
} from "@wagmi/core";
import { bytesToHex, keccak256, toHex } from "viem";
import bs58 from "bs58";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
type WagmiCoreActionsType = typeof import("@wagmi/core");
let wagmiCore: WagmiCoreActionsType | null = null;
const importWagmiCore = async () => {
  // Commonjs support NA with @wagmi/core:
  // https://wagmi.sh/core/guides/migrate-from-v1-to-v2#dropped-commonjs-support
  return import("@wagmi/core").then((module) => {
    wagmiCore = module;
  });
};

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
  wagmiCore?: WagmiCoreActionsType;
  chainId?: number;
  alwaysOnboardDuringSignIn?: boolean;
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
    alwaysOnboardDuringSignIn = false,
    devMode,
    devModeAccount = "eth-wallet.testnet",
  },
}) => {
  if (!wagmiCore) {
    throw new Error("@wagmi/core not imported.");
  }
  const _state = await setupEthereumWalletsState(id);
  const expectedChainId =
    chainId ?? (options.network.networkId === "mainnet" ? 397 : 398);
  const nearRpc = wagmiConfig.chains.find(
    (chain) => chain.id === expectedChainId
  )?.rpcUrls.default.http[0];
  if (!nearRpc) {
    throw new Error("Failed to parse NEAR rpc url from wagmiConfig.");
  }
  const nearExplorer = wagmiConfig.chains.find(
    (chain) => chain.id === expectedChainId
  )?.blockExplorers?.default.url;
  if (!nearExplorer) {
    throw new Error("Failed to parse NEAR explorer url from wagmiConfig.");
  }

  const getAccounts = async (): Promise<Array<Account>> => {
    const address = wagmiCore!.getAccount(wagmiConfig).address?.toLowerCase();
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
    let ethTx: WriteContractParameters;
    switch (tx.actions[0].type) {
      case "AddKey": {
        const publicKey = bytesToHex(
          bs58.decode(tx.actions[0].params.publicKey.split(":")[1])
        );
        if (tx.actions[0].params.accessKey.permission === "FullAccess") {
          const args = [
            0, // 0 stands for ed25519
            publicKey,
            BigInt(tx.actions[0].params.accessKey.nonce ?? 0),
            true,
            false, // Not used with is_full_access
            BigInt(0), // Not used with is_full_access
            "", // Not used with is_full_access
            [], // Not used with is_full_access
          ];
          ethTx = {
            abi: ETHEREUM_ACCOUNT_ABI,
            address: to,
            functionName: "addKey",
            args,
            chainId: expectedChainId,
            type: "legacy",
          };
          throw new Error("Requesting a FullAccess key is not allowed.");
        } else {
          const allowance = BigInt(
            tx.actions[0].params.accessKey.permission.allowance ??
              DEFAULT_ACCESS_KEY_ALLOWANCE
          );
          const args = [
            0, // 0 stands for ed25519
            publicKey,
            BigInt(tx.actions[0].params.accessKey.nonce ?? 0),
            false,
            allowance > 0 ? true : false,
            allowance,
            tx.actions[0].params.accessKey.permission.receiverId,
            tx.actions[0].params.accessKey.permission.methodNames ?? [],
          ];
          ethTx = {
            abi: ETHEREUM_ACCOUNT_ABI,
            address: to,
            functionName: "addKey",
            args,
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
          };
        }
        break;
      }
      case "DeleteKey": {
        const publicKey = bytesToHex(
          bs58.decode(tx.actions[0].params.publicKey.split(":")[1])
        );
        const args = [
          0, // 0 stands for ed25519
          publicKey,
        ];
        ethTx = {
          abi: ETHEREUM_ACCOUNT_ABI,
          address: to,
          functionName: "deleteKey",
          args,
          chainId: expectedChainId,
          type: "legacy",
        };
        break;
      }
      case "FunctionCall": {
        const yoctoNear = BigInt(tx.actions[0].params.deposit) % BigInt(1e6);
        const value = BigInt(tx.actions[0].params.deposit) / BigInt(1e6);
        const requestedGas = BigInt(tx.actions[0].params.gas);
        const nearGas = requestedGas <= MAX_TGAS ? requestedGas : MAX_TGAS;
        const args = [
          tx.receiverId,
          tx.actions[0].params.methodName,
          bytesToHex(stringifyJsonOrBytes(tx.actions[0].params.args)),
          nearGas,
          +yoctoNear.toString(),
        ];
        ethTx = {
          abi: ETHEREUM_ACCOUNT_ABI,
          address: to,
          functionName: "functionCall",
          args,
          value,
          chainId: expectedChainId,
          type: "legacy",
        };
        break;
      }
      case "Transfer": {
        const yoctoNear = BigInt(tx.actions[0].params.deposit) % BigInt(1e6);
        const value = BigInt(tx.actions[0].params.deposit) / BigInt(1e6);
        const args = [tx.receiverId, +yoctoNear.toString()];
        ethTx = {
          abi: ETHEREUM_ACCOUNT_ABI,
          address: to,
          functionName: "transfer",
          args,
          value,
          chainId: expectedChainId,
          type: "legacy",
        };
        break;
      }
      default: {
        throw new Error("Invalid action type");
      }
    }
    const gas = await wagmiCore!.estimateGas(wagmiConfig, ethTx);
    const result = await wagmiCore!.writeContract(wagmiConfig, {
      ...ethTx,
      gas,
    });
    return result;
  };

  // Watch Ethereum wallet changes.
  const setupEvents = async () => {
    const unwatchAccount = wagmiCore!.watchAccount(wagmiConfig, {
      onChange: async (data) => {
        // Ethereum wallet disconnected: also disconnect NEAR account.
        if (!data.address && data.status === "disconnected") {
          emitter.emit("signedOut", null);
          return;
        }
        // Ethereum wallet switched connected account: also switch NEAR account if already signed in or disconnect.
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

  // Check if accessKey is usable to execute all transaction.
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

  // Get the relayer public key and onboarding transaction if needed.
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
    const nearTxs = await transformTransactions(transactions);
    const [accountLogIn] = await getAccounts();
    // If transactions can be executed with FunctionCall access key do it, otherwise execute 1 by 1 with Ethereum wallet.
    if (accountLogIn.publicKey) {
      let accessKeyUsable;
      try {
        const accessKey = await provider.query<AccessKeyViewRaw>({
          request_type: "view_access_key",
          finality: "final",
          account_id: accountLogIn.accountId,
          public_key: accountLogIn.publicKey,
        });
        accessKeyUsable = validateAccessKey({
          transactions: nearTxs,
          accessKey,
        });
      } catch (error) {
        logger.error(error);
        accessKeyUsable = false;
      }
      if (accessKeyUsable) {
        const signer = new nearAPI.InMemorySigner(_state.keystore);
        const signedTransactions = await signTransactions(
          nearTxs,
          signer,
          options.network
        );
        const results: Array<FinalExecutionOutcome> = [];
        for (let i = 0; i < signedTransactions.length; i += 1) {
          const nearTx = await provider.sendTransaction(signedTransactions[i]);
          logger.log("NEAR transaction:", nearTx);
          if (
            typeof nearTx.status === "object" &&
            typeof nearTx.status.Failure === "object" &&
            nearTx.status.Failure !== null
          ) {
            logger.error("Transaction execution error.");
            throw parseRpcError(nearTx.status.Failure);
          }
          results.push(nearTx);
        }
        return results;
      }
    }
    const { relayerPublicKey, onboardingTransaction } =
      await getRelayerOnboardingInfo({
        accountId: accountLogIn.accountId,
      });
    let txs = transformEthereumTransactions(nearTxs);
    if (onboardingTransaction) {
      // Onboard the relayer before executing other transactions.
      txs = [onboardingTransaction, ...txs];
    }
    const { selectedNetworkId } = web3Modal.getState();
    if (selectedNetworkId !== expectedChainId) {
      await wagmiCore!.switchChain(wagmiConfig, {
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
          explorerUrl: nearExplorer,
        });
        showModal();
        (async () => {
          try {
            const ethTxHashes: Array<string> = [];
            for (const [index, tx] of txs.entries()) {
              renderTxs({
                selectedIndex: index,
                ethTxHashes,
              });
              const txHash = await executeTransaction({ tx, relayerPublicKey });
              logger.log(`Sent transaction: ${txHash}`);
              ethTxHashes.push(txHash);
              renderTxs({
                selectedIndex: index,
                ethTxHashes,
              });
              let receipt;
              try {
                receipt = await wagmiCore!.waitForTransactionReceipt(
                  wagmiConfig,
                  {
                    hash: txHash,
                    chainId: expectedChainId,
                  }
                );
              } catch (error) {
                logger.error(error);
                receipt = await wagmiCore!.getTransactionReceipt(wagmiConfig, {
                  hash: txHash,
                  chainId: expectedChainId,
                });
              }
              logger.log("Receipt:", receipt);
              const nearProvider = new JsonRpcProvider(
                // @ts-expect-error
                provider.provider.connection
              );
              const nearTx = await nearProvider.txStatus(
                // @ts-expect-error
                receipt.nearTransactionHash,
                accountLogIn.accountId
              );
              logger.log("NEAR transaction:", nearTx);
              if (receipt.status !== "success") {
                const failedOutcome = nearTx.receipts_outcome.find(
                  ({ outcome }) =>
                    typeof outcome.status === "object" &&
                    typeof outcome.status.Failure === "object" &&
                    outcome.status.Failure !== null &&
                    outcome.executor_id === tx.receiverId
                );
                if (failedOutcome) {
                  reject(
                    parseRpcError(
                      (failedOutcome.outcome.status as ExecutionStatus).Failure!
                    )
                  );
                } else {
                  reject(
                    "Transaction execution error, failed to parse failure reason."
                  );
                }
              }
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
        // If there is a connection problem with the wallet, the user can cancel from the modal to skip the disconnect transaction.
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
      wagmiCore!.disconnect(wagmiConfig);
    }
  };

  return {
    async signIn({ contractId, methodNames = [] }) {
      logger.log("EthereumWallets:signIn", { contractId, methodNames });

      let unwatchAccountConnected: (() => void) | undefined;
      let unsubscribeCloseModal: (() => void) | undefined;
      const account = wagmiCore!.getAccount(wagmiConfig);
      let address = account.address?.toLowerCase();
      // Open web3Modal and wait for a wallet to be connected or for the web3Modal to be closed.
      if (!address) {
        try {
          web3Modal.open();
          const newData: GetAccountReturnType = await (() => {
            return new Promise((resolve, reject) => {
              try {
                unwatchAccountConnected = wagmiCore!.watchAccount(wagmiConfig, {
                  onChange: (data: GetAccountReturnType) => {
                    if (!data.address) {
                      return;
                    }
                    resolve(data);
                  },
                });
                unsubscribeCloseModal = web3Modal.subscribeEvents(
                  (event: { data: { event: string } }) => {
                    const newAccount = wagmiCore!.getAccount(wagmiConfig);
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
        try {
          await wagmiCore!.switchChain(wagmiConfig, {
            chainId: expectedChainId,
          });
        } catch (error) {
          wagmiCore!.disconnect(wagmiConfig);
          logger.error(error);
          // TODO: add the link to onboarding page when available.
          throw new Error(
            "Wallet does not support NEAR Protocol network, try adding the network manually inside wallet settings."
          );
        }
      }

      // Login with FunctionCall access key, reuse keypair or create a new one.
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
      } else if (alwaysOnboardDuringSignIn) {
        // Check onboarding status and onboard the relayer if needed.
        await signAndSendTransactions([]);
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
    if (!wagmiCore) {
      if (params.wagmiCore) {
        wagmiCore = params.wagmiCore;
      } else {
        await importWagmiCore();
      }
    }
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
