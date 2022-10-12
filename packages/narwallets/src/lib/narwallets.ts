import { isMobile } from "is-mobile";
import {
  WalletModuleFactory,
  WalletBehaviourFactory,
  InjectedWallet,
  Account,
  Action,
} from "@near-wallet-selector/core";
import { providers, utils } from "near-api-js";

export interface SignAndSendTransactionParams {
  signerId?: string;
  receiverId?: string;
  actions: Array<Action>;
}
export interface NarwalletsParams {
  iconUrl?: string;
}

interface PendingPromises {
  id: number;
  code: string;
  // Note: the result from different action may give different results, like boolean or FinalExecutionOutcome. Since the response may be many things, we're leaving any here
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  timeout?: NodeJS.Timeout;
}

let id = 0;
const pendingPromises: Array<PendingPromises> = [];

const isInstalled = async (): Promise<boolean> => {
  const code = "is-installed";
  // Note: sendToNarwallets throws if not installed
  try {
    await sendToNarwallets(code, true);
  }
  catch (ex) {
    return false
  }
  return true;
};

const isSignedIn = (): Promise<boolean> => {
  const code = "is-signed-in";
  return sendToNarwallets(code, true);
};

const getAccountId = (): Promise<string> => {
  const code = "get-account-id";
  return sendToNarwallets(code, true);
};

interface SignAndSendResponseError {
  error: string;
}

const callSignAndSendTransaction = (
  params: SignAndSendTransactionParams
): Promise<providers.FinalExecutionOutcome> => {
  const code = "sign-and-send-transaction";
  return sendToNarwallets(code, false, params);
};

const callSignAndSendTransactions = (
  params: Array<SignAndSendTransactionParams>
): Promise<
  Array<providers.FinalExecutionOutcome>
> => {
  const code = "sign-and-send-transactions";
  return sendToNarwallets(code, false, params);
};

const sendToNarwallets = (
  code: string,
  withTimeout = false,
  params?: any
): Promise<any> => {
  const promise = new Promise<any>((resolve, reject) => {
    id++;
    let promiseTimeout;
    if (withTimeout) {
      promiseTimeout = setTimeout(() => {
        return reject(Error("timeout"));
      }, 2000);
    }
    pendingPromises.push({
      id,
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

function findPendingPromiseById(id: number): PendingPromises | undefined {
  return pendingPromises.filter((c) => c.id == id)[0];
}

function removePendingPromise(callback: PendingPromises) {
  const index = pendingPromises.indexOf(callback);
  if (index > -1) {
    // only splice array when item is found
    pendingPromises.splice(index, 1); // 2nd parameter means remove one item only
  }
}

const setupNarwalletsState = (): void => {

  // receive response from the extension content_script
  window.addEventListener("message", (event) => {
    if (event.source != window) {
      return;
    }
    const { data } = event
    // msg should be directed to the page (response from the extension, relayed from the content script)
    if (!data || data.dest !== "page") {
      return
    }

    if (data.id && data.type == "nw") {
      const pendingPromise = findPendingPromiseById(data.id);
      if (pendingPromise) {
        removePendingPromise(pendingPromise);
        if (pendingPromise.timeout) {
          clearTimeout(pendingPromise.timeout);
        }
        if (!data.result) {
          pendingPromise.reject("result is empty");
        }
        else if (data.result.err) {
          pendingPromise.reject(data.result.err);
        } else {
          pendingPromise.resolve(data.result.data);
        }
      }
    }
  });
};

const Narwallets: WalletBehaviourFactory<InjectedWallet> = async ({
  options,
  metadata,
  store,
  provider,
  emitter,
  logger,
}) => {

  const signOut = async () => {
    if (!(await isSignedIn())) {
      return;
    }

    const res = await sendToNarwallets("sign-out");
    // const res = await _state.wallet.signOut();
    if (res === true) {
      return;
    }

    const error = new Error(
      typeof res.error === "string" ? res.error : res.error.type
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
        code = "sign-in";
      } else {
        code = "get-account-id";
      }
      const response = await sendToNarwallets(code);
      return [{ accountId: response }];
    },

    signOut,

    async getAccounts(): Promise<Array<Account>> {
      const accountId = await getAccountId();
      return [{ accountId }];
    },

    async verifyOwner({ message }) {
      logger.log("Narwallets:verifyOwner", { message });
      throw new Error(`Method not supported by ${metadata.name}`);
    },

    async signAndSendTransaction({ signerId, receiverId, actions }) {
      logger.log("signAndSendTransaction", { signerId, receiverId, actions });

      const { contract, accounts } = store.getState();

      if (!accounts || accounts.length == 0 || !contract) {
        throw new Error("Wallet not signed in");
      }

      return callSignAndSendTransaction({
        signerId,
        receiverId: receiverId || contract.contractId,
        actions: actions
      })
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("signAndSendTransactions", { transactions });

      const { contract, accounts } = store.getState();
      
      // test: avoid a call to isSignedIn
      if (!accounts || accounts.length == 0 || !contract) {
        throw new Error("Wallet not signed in");
      }

      return callSignAndSendTransactions(  
        transactions
      )
    },
  };
};

export function setupNarwallets({
  iconUrl = "./assets/narwallets-logo.png",
}: NarwalletsParams = {}): WalletModuleFactory<InjectedWallet> {
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
          "https://chrome.google.com/webstore/detail/narwallets-v3/ipbomjpcpbebobdnkoogngmknkohncjd",
        deprecated: false,
        available: installed,
      },
      init: Narwallets,
    };
  };
}
