import { createContext, useState, useEffect, useCallback, useRef } from "react";
import type {
  FinalExecutionOutcome,
  SignedMessage,
  Transaction,
  Wallet,
  WalletSelector,
  WalletSelectorParams,
} from "@near-wallet-selector/core";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { providers } from "near-api-js";
import type { QueryResponseKind } from "near-api-js/lib/providers/provider";

class WalletError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WalletError";
  }
}

export interface QueryResponseKindWithAmount extends QueryResponseKind {
  amount: string;
}

export interface ViewMethodParams {
  contractId: string;
  method: string;
  args?: Record<string, unknown>;
}

export interface CallMethodParams extends ViewMethodParams {
  gas?: string | number | bigint;
  deposit?: string | bigint;
}

export interface SignMessageParams {
  message: string;
  recipient: string;
  nonce: Buffer;
}

export type SetupParams = WalletSelectorParams & {
  createAccessKeyFor?: string;
};

export interface WalletSelectorProviderValue {
  walletSelector: Promise<WalletSelector> | null;
  signedAccountId: string | null;
  wallet: Wallet | null;
  signIn: () => void;
  signOut: () => Promise<void>;
  viewFunction: (params: ViewMethodParams) => Promise<unknown>;
  callFunction: (params: CallMethodParams) => Promise<unknown>;
  getBalance: (accountId: string) => Promise<bigint>;
  getAccessKeys: (accountId: string) => Promise<Array<unknown>>;
  signAndSendTransactions: (params: {
    transactions: Array<Transaction>;
  }) => Promise<void | Array<FinalExecutionOutcome>>;
  signMessage: (params: SignMessageParams) => Promise<void | SignedMessage>;
}

const DEFAULT_GAS = "30000000000000";
const DEFAULT_DEPOSIT = "0";

export const WalletSelectorContext = createContext<
  WalletSelectorProviderValue | undefined
>(undefined);

export function WalletSelectorProvider({
  children,
  config,
}: {
  children: React.ReactNode;
  config: SetupParams;
}) {
  const walletSelectorRef = useRef<Promise<WalletSelector> | null>(null);
  const [signedAccountId, setSignedAccountId] = useState<string | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);

  const rpcProviderUrls =
    config.fallbackRpcUrls && config.fallbackRpcUrls.length > 0
      ? config.fallbackRpcUrls
      : [`https://rpc.${config.network}.near.org`];

  const provider = new providers.FailoverRpcProvider(
    rpcProviderUrls.map((url) => new providers.JsonRpcProvider({ url }))
  );

  useEffect(() => {
    const walletSelector = setupWalletSelector(config);
    walletSelectorRef.current = walletSelector;

    walletSelector.then(async (selector) => {
      selector.store.observable.subscribe(async (state) => {
        const signedAccount = state?.accounts.find(
          (account) => account.active
        )?.accountId;

        setSignedAccountId(signedAccount || null);

        if (signedAccount) {
          const walletInstance = await selector.wallet();
          setWallet(walletInstance);
        } else {
          setWallet(null);
        }
      });
    });
  }, [config]);

  /**
   * Displays a modal for the user to sign in
   * @returns {Promise<void>} - a promise that resolves when the modal is opened
   */
  const signIn = async () => {
    const ws = await walletSelectorRef.current;
    const modalInstance = setupModal(ws!, {
      contractId: config.createAccessKeyFor || "",
    });
    modalInstance.show();
  };

  /**
   * Logs out the wallet
   */
  const signOut = useCallback(async () => {
    if (!wallet) {
      throw new WalletError("No wallet connected");
    }
    await wallet.signOut();
  }, [wallet]);

  /**
   * Makes a read-only call to a contract
   * @param {Object} options - the options for the call
   * @param {string} options.contractId - the contract's account id
   * @param {string} options.method - the method to call
   * @param {Object} options.args - the arguments to pass to the method
   * @returns {Promise<JSON.value>} - the result of the method call
   */
  const viewFunction = async ({
    contractId,
    method,
    args = {},
  }: ViewMethodParams) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await provider.query<any>({
      request_type: "call_function",
      account_id: contractId,
      method_name: method,
      args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
      finality: "optimistic",
    });

    return JSON.parse(Buffer.from(res.result).toString());
  };

  /**
   * Makes a call to a contract
   * @param {Object} options - the options for the call
   * @param {string} options.contractId - the contract's account id
   * @param {string} options.method - the method to call
   * @param {Object} options.args - the arguments to pass to the method
   * @param {string} options.gas - the amount of gas to use
   * @param {string} options.deposit - the amount of yoctoNEAR to deposit
   * @returns {Promise<Transaction>} - the resulting transaction
   */
  const callFunction = useCallback(
    async ({
      contractId,
      method,
      args = {},
      gas = DEFAULT_GAS,
      deposit = DEFAULT_DEPOSIT,
    }: CallMethodParams) => {
      if (!wallet) {
        throw new WalletError("No wallet connected");
      }

      const outcome = await wallet.signAndSendTransaction({
        receiverId: contractId,
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: method,
              args,
              gas: gas.toString(),
              deposit: deposit.toString(),
            },
          },
        ],
      });

      return providers.getTransactionLastResult(
        outcome as FinalExecutionOutcome
      );
    },
    [wallet]
  );

  /**
   * Gets the balance of an account in yoctoNEAR
   * @param {string} accountId - the account id to get the balance of
   * @returns {Promise<number>} - the balance of the account
   */
  const getBalance = async (accountId: string): Promise<bigint> => {
    const account = (await provider.query({
      request_type: "view_account",
      account_id: accountId,
      finality: "final",
    })) as QueryResponseKindWithAmount;

    return account.amount ? BigInt(account.amount) : BigInt(0);
  };

  /**
   * Gets the access keys for an account
   * @param {string} accountId - the account id to get the access keys for
   * @returns {Promise<Object[]>} - the access keys for the
   */
  const getAccessKeys = async (accountId: string): Promise<Array<unknown>> => {
    // Retrieve account state from the network
    const keys = await provider.query({
      request_type: "view_access_key_list",
      account_id: accountId,
      finality: "final",
    });

    return (keys as unknown as { keys: Array<unknown> }).keys;
  };

  /**
   * Signs transactions and broadcasts them to the network
   * @param {Object[]} transactions - the transactions to sign and send
   * @returns {Promise<Transaction[]>} - the resulting transactions
   */
  const signAndSendTransactions = useCallback(
    async ({ transactions }: { transactions: Array<Transaction> }) => {
      if (!wallet) {
        throw new WalletError("No wallet connected");
      }

      const sentTxs = (await wallet.signAndSendTransactions({
        transactions,
      })) as Array<FinalExecutionOutcome>;

      return sentTxs.map((tx: FinalExecutionOutcome) =>
        providers.getTransactionLastResult(tx)
      );
    },
    [wallet]
  );

  /**
   * Signs a message off-chain
   * @param {Object} options - the options for the message
   * @param {string} options.message - the message to sign
   * @param {string} options.recipient - the recipient of the message
   * @param {Buffer} options.nonce - the nonce of the message
   * @returns {Promise<SignedMessage>} - the signed message
   */
  const signMessage = useCallback(
    ({ message, recipient, nonce }: SignMessageParams) => {
      if (!wallet) {
        throw new WalletError("No wallet connected");
      }

      if (!wallet.signMessage) {
        throw new WalletError("Wallet does not support message signing");
      }

      return wallet.signMessage({ message, recipient, nonce });
    },
    [wallet]
  );

  const contextValue: WalletSelectorProviderValue = {
    walletSelector: walletSelectorRef.current,
    signedAccountId,
    wallet,
    signIn,
    signOut,
    viewFunction,
    callFunction,
    getBalance,
    getAccessKeys,
    signAndSendTransactions,
    signMessage,
  };

  return (
    <WalletSelectorContext.Provider value={contextValue}>
      {children}
    </WalletSelectorContext.Provider>
  );
}
