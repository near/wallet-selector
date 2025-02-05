import { createContext, useState, useEffect, useCallback } from "react";
import type {
  FinalExecutionOutcome,
  SignedMessage,
  Transaction,
  Wallet,
  WalletSelector,
  WalletSelectorParams,
} from "@near-wallet-selector/core";
import { setupWalletSelector } from "@near-wallet-selector/core";
import type { WalletSelectorModal } from "@near-wallet-selector/modal-ui";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { providers, utils } from "near-api-js";
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
  walletSelector: WalletSelector | null;
  modal: WalletSelectorModal | null;
  signedAccountId: string | null;
  wallet: Wallet | null;
  isConnected: boolean;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  viewMethod: (params: ViewMethodParams) => Promise<unknown>;
  callMethod: (params: CallMethodParams) => Promise<unknown>;
  getBalance: (accountId: string) => Promise<number>;
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
  const [walletSelector, setSelector] = useState<WalletSelector | null>(null);
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);
  const [signedAccountId, setSignedAccountId] = useState<string | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const initWalletSelector = async () => {
      const ws = await setupWalletSelector(config);
      const modalInstance = setupModal(ws, {
        contractId: config.createAccessKeyFor || "",
      });

      ws.store.observable.subscribe(async (state) => {
        const signedAccount = state?.accounts.find(
          (account) => account.active
        )?.accountId;

        setSignedAccountId(signedAccount || null);
        setIsConnected(!!signedAccount);

        if (signedAccount) {
          const walletInstance = await ws.wallet();
          setWallet(walletInstance);
        } else {
          setWallet(null);
        }
      });

      setSelector(ws);
      setModal(modalInstance);

      setIsLoading(false);
    };

    initWalletSelector();
  }, [config]);

  const signIn = useCallback(async () => {
    if (!modal) {
      throw new WalletError("Wallet modal not initialized");
    }
    modal.show();
  }, [modal]);

  const signOut = useCallback(async () => {
    if (!wallet) {
      throw new WalletError("No wallet connected");
    }
    await wallet.signOut();
  }, [wallet]);

  const viewMethod = useCallback(
    async ({ contractId, method, args = {} }: ViewMethodParams) => {
      if (!walletSelector) {
        throw new WalletError("Wallet selector not initialized");
      }

      const { network } = walletSelector.options;
      const provider = new providers.JsonRpcProvider({
        url: `https://rpc.${network.networkId}.near.org`,
      });

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res = await provider.query<any>({
          request_type: "call_function",
          account_id: contractId,
          method_name: method,
          args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
          finality: "optimistic",
        });

        return JSON.parse(Buffer.from(res.result).toString());
      } catch (error) {
        console.error(`Failed to call view method ${method}:`, error);
        throw new WalletError(`Failed to call view method ${method}`);
      }
    },
    [walletSelector]
  );

  const callMethod = useCallback(
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

      try {
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

        return await providers.getTransactionLastResult(
          outcome as FinalExecutionOutcome
        );
      } catch (error) {
        console.error(`Failed to call method ${method}:`, error);
        throw new WalletError(`Failed to call method ${method}`);
      }
    },
    [wallet]
  );

  const getBalance = useCallback(
    async (accountId: string) => {
      if (!walletSelector) {
        throw new WalletError("Wallet selector not initialized");
      }

      try {
        const { network } = walletSelector.options;
        const provider = new providers.JsonRpcProvider({
          url: network.nodeUrl,
        });

        const account = (await provider.query({
          request_type: "view_account",
          account_id: accountId,
          finality: "final",
        })) as QueryResponseKindWithAmount;

        return account.amount
          ? Number(utils.format.formatNearAmount(account.amount))
          : 0;
      } catch (error) {
        console.error("Failed to get balance:", error);
        throw new WalletError("Failed to get balance");
      }
    },
    [walletSelector]
  );

  const signAndSendTransactions = useCallback(
    async ({ transactions }: { transactions: Array<Transaction> }) => {
      if (!wallet) {
        throw new WalletError("No wallet connected");
      }

      try {
        return await wallet.signAndSendTransactions({ transactions });
      } catch (error) {
        console.error("Failed to sign and send transactions:", error);
        throw new WalletError("Failed to sign and send transactions");
      }
    },
    [wallet]
  );

  const signMessage = useCallback(
    async ({ message, recipient, nonce }: SignMessageParams) => {
      if (!wallet) {
        throw new WalletError("No wallet connected");
      }

      if (!wallet.signMessage) {
        throw new WalletError("Wallet does not support message signing");
      }

      try {
        return await wallet.signMessage({ message, recipient, nonce });
      } catch (error) {
        console.error("Failed to sign message:", error);
        throw new WalletError("Failed to sign message");
      }
    },
    [wallet]
  );

  const contextValue: WalletSelectorProviderValue = {
    walletSelector,
    modal,
    signedAccountId,
    wallet,
    isConnected,
    isLoading,
    signIn,
    signOut,
    viewMethod,
    callMethod,
    getBalance,
    signAndSendTransactions,
    signMessage,
  };

  return (
    <WalletSelectorContext.Provider value={contextValue}>
      {children}
    </WalletSelectorContext.Provider>
  );
}
