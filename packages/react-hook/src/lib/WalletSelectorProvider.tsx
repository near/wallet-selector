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
  walletSelector: Promise<WalletSelector>;
  signedAccountId: string | null;
  wallet: Wallet | null;
  signIn: () => Promise<void>;
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
  const walletSelector = setupWalletSelector(config);
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);
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
    const initWalletSelector = async () => {
      const ws = await walletSelector;
      const modalInstance = setupModal(ws, {
        contractId: config.createAccessKeyFor || "",
      });

      ws.store.observable.subscribe(async (state) => {
        const signedAccount = state?.accounts.find(
          (account) => account.active
        )?.accountId;

        setSignedAccountId(signedAccount || null);

        if (signedAccount) {
          const walletInstance = await ws.wallet();
          setWallet(walletInstance);
        } else {
          setWallet(null);
        }
      });

      setModal(modalInstance);
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

  const getBalance = async (accountId: string): Promise<bigint> => {
    if (!walletSelector) {
      throw new WalletError("Wallet selector not initialized");
    }

    const account = (await provider.query({
      request_type: "view_account",
      account_id: accountId,
      finality: "final",
    })) as QueryResponseKindWithAmount;

    return account.amount ? BigInt(account.amount) : BigInt(0);
  };

  const getAccessKeys = async (accountId: string): Promise<Array<unknown>> => {
    // Retrieve account state from the network
    const keys = await provider.query({
      request_type: "view_access_key_list",
      account_id: accountId,
      finality: "final",
    });

    return (keys as unknown as { keys: Array<unknown> }).keys;
  };

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

  const signAndSendTransactions = useCallback(
    ({ transactions }: { transactions: Array<Transaction> }) => {
      if (!wallet) {
        throw new WalletError("No wallet connected");
      }

      return wallet.signAndSendTransactions({ transactions });
    },
    [wallet]
  );

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
    walletSelector,
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
