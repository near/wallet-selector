import { isMobile } from "is-mobile";
import type {
  WalletModuleFactory,
  WalletBehaviourFactory,
  InjectedWallet,
  Account,
  Action,
  FinalExecutionOutcome,
} from "@near-wallet-selector/core";
import icon from "./icon";
import { waitFor } from "@near-wallet-selector/core";

declare global {
  interface Window {
    narwallets: InjectedWallet | undefined;
  }
}

export interface SignAndSendTransactionParams {
  signerId?: string;
  receiverId?: string;
  actions: Array<Action>;
}
export interface NarwalletsParams {
  iconUrl?: string;
  deprecated?: boolean;
}

interface NarwalletsError {
  error: string | { type: string };
}

type Resolve =
  | string
  | boolean
  | FinalExecutionOutcome
  | Array<FinalExecutionOutcome>
  | NarwalletsError;
type NarwalletsFunctionParams =
  | undefined
  | boolean
  | SignAndSendTransactionParams
  | Array<SignAndSendTransactionParams>;

interface PendingPromises {
  id_wallet_selector: number;
  code: string;
  resolve: (value: Resolve) => void;
  reject: (reason?: string) => void;
  timeout?: NodeJS.Timeout;
}

const NARWALLETS_CODES = {
  SIGN_IN: "sign-in",
  IS_INSTALLED: "is-installed",
  IS_SIGNED_IN: "is-signed-in",
  SIGN_OUT: "sign-out",
  GET_ACCOUNT_ID: "get-account-id",
  SIGN_AND_SEND_TRANSACTION: "sign-and-send-transaction",
  SIGN_AND_SEND_TRANSACTIONS: "sign-and-send-transactions",
};

let id = 0;
const pendingPromises: Array<PendingPromises> = [];

const sendToNarwallets = (
  code: string,
  withTimeout = false,
  params?: NarwalletsFunctionParams
): Promise<Resolve> => {
  const promise = new Promise<Resolve>((resolve, reject) => {
    id++;
    let promiseTimeout;
    if (withTimeout) {
      promiseTimeout = setTimeout(() => {
        return reject(Error("timeout"));
      }, 2000);
    }
    pendingPromises.push({
      id_wallet_selector: id,
      code,
      resolve,
      reject,
      timeout: promiseTimeout,
    });

    window.postMessage({
      id,
      src: "ws",
      type: "nw",
      code,
      dest: "ext",
      params,
    });
  });
  return promise;
};

const isInstalled = async (): Promise<boolean> => {
  // Note: sendToNarwallets throws if not installed
  return waitFor(() => !!window.narwallets).catch(() => false);
};

const isSignedIn = (): Promise<Resolve> => {
  return sendToNarwallets(NARWALLETS_CODES.IS_SIGNED_IN, true);
};

const getAccountId = (): Promise<Resolve> => {
  return sendToNarwallets(NARWALLETS_CODES.GET_ACCOUNT_ID, false);
};

const callSignAndSendTransaction = (
  params: SignAndSendTransactionParams
): Promise<Resolve> => {
  return sendToNarwallets(
    NARWALLETS_CODES.SIGN_AND_SEND_TRANSACTION,
    false,
    params
  );
};

const callSignAndSendTransactions = (
  params: Array<SignAndSendTransactionParams>
): Promise<Resolve> => {
  return sendToNarwallets(
    NARWALLETS_CODES.SIGN_AND_SEND_TRANSACTIONS,
    false,
    params
  );
};

const findPendingPromiseById = (
  promiseId: number
): PendingPromises | undefined => {
  return pendingPromises.filter((c) => c.id_wallet_selector === promiseId)[0];
};

const removePendingPromise = (callback: PendingPromises) => {
  const index = pendingPromises.indexOf(callback);
  if (index > -1) {
    // only splice array when item is found
    pendingPromises.splice(index, 1); // 2nd parameter means remove one item only
  }
};

const setupNarwalletsState = (): void => {
  // receive response from the extension content_script
  window.addEventListener("message", (event) => {
    if (event.source !== window) {
      return;
    }
    const { data } = event;
    // msg should be directed to the page (response from the extension, relayed from the content script)
    if (!data || data.dest !== "page") {
      return;
    }

    if (data.id && data.type === "nw") {
      const pendingPromise = findPendingPromiseById(data.id);
      if (pendingPromise) {
        removePendingPromise(pendingPromise);
        if (pendingPromise.timeout) {
          clearTimeout(pendingPromise.timeout);
        }
        if (!data.result) {
          pendingPromise.reject("result is empty");
        } else if (data.result.err) {
          pendingPromise.reject(data.result.err);
        } else {
          pendingPromise.resolve(data.result.data);
        }
      }
    }
  });
};

const Narwallets: WalletBehaviourFactory<InjectedWallet> = async ({
  metadata,
  store,
  logger,
}) => {
  const signOut = async () => {
    if (!(await isSignedIn())) {
      return;
    }

    const res: Resolve = await sendToNarwallets("sign-out");
    // const res = await _state.wallet.signOut();
    if (res === true) {
      return;
    }

    const errorObject: NarwalletsError = res as NarwalletsError;

    const error = new Error(
      typeof errorObject.error === "string"
        ? errorObject.error
        : errorObject.error.type
    );

    // Prevent signing out by throwing.
    if (error.message === "User reject") {
      throw error;
    }

    // Continue signing out but log the issue.
    logger.log("Failed to sign out");
    logger.error(error);
  };

  return {
    async signIn() {
      const isUserSignedIn = await isSignedIn();
      let code;
      if (!isUserSignedIn) {
        code = NARWALLETS_CODES.SIGN_IN;
      } else {
        code = NARWALLETS_CODES.GET_ACCOUNT_ID;
      }
      const response = (await sendToNarwallets(code)) as string;
      return [{ accountId: response }];
    },

    signOut,

    async getAccounts(): Promise<Array<Account>> {
      const accountId: string = (await getAccountId()) as string;
      return [{ accountId }];
    },

    async verifyOwner({ message }) {
      logger.log("Narwallets:verifyOwner", { message });
      throw new Error(`Method not supported by ${metadata.name}`);
    },

    async signAndSendTransaction({ signerId, receiverId, actions }) {
      logger.log("signAndSendTransaction", { signerId, receiverId, actions });

      const { contract, accounts } = store.getState();

      if (!accounts || accounts.length === 0 || !contract) {
        throw new Error("Wallet not signed in");
      }

      return callSignAndSendTransaction({
        signerId,
        receiverId: receiverId || contract.contractId,
        actions: actions,
      }) as Promise<FinalExecutionOutcome>;
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("signAndSendTransactions", { transactions });

      const { contract, accounts } = store.getState();

      // test: avoid a call to isSignedIn
      if (!accounts || accounts.length === 0 || !contract) {
        throw new Error("Wallet not signed in");
      }

      return callSignAndSendTransactions(transactions) as Promise<
        Array<FinalExecutionOutcome>
      >;
    },
  };
};

export const setupNarwallets = ({
  iconUrl = icon,
  deprecated = false,
}: NarwalletsParams = {}): WalletModuleFactory<InjectedWallet> => {
  return async () => {
    const mobile = isMobile();
    if (mobile) {
      return null;
    }

    setupNarwalletsState();

    const installed = await isInstalled();

    return {
      id: "narwallets",
      type: "injected",
      metadata: {
        name: "Narwallets",
        description: null,
        iconUrl,
        downloadUrl:
          "https://chrome.google.com/webstore/detail/narwallets-v4/lkpeokpdkmcdaiadpmnnpimlgmdobkdj",
        deprecated,
        available: installed,
      },
      init: Narwallets,
    };
  };
};
