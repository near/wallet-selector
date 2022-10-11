import { isMobile } from "is-mobile";
import {
  WalletModuleFactory,
  WalletBehaviourFactory,
  InjectedWallet,
  Account,
} from "@near-wallet-selector/core";
import { providers } from "near-api-js";
import { SignAndSendTransactionParams } from "packages/core/src/lib/wallet/";
import { logger } from "packages/core/src/lib/services";

export interface NarwalletsParams {
  iconUrl?: string;
}

interface PendingPromises {
  id: number;
  code: string;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  timeout?: NodeJS.Timeout;
}

const NARWALLETS_CODES = {
  SIGN_IN: "sign-in",
  IS_INSTALLED: "is-installed",
  IS_SIGNED_IN: "is-signed-in",
  SIGN_OUT: "sign-out",
  GET_ACCOUNT_ID: "get-account-id",
  SIGN_AND_SEND_TRANSACTION: "sign-and-send-transaction",
  SIGN_AND_SEND_TRANSACTIONS: "sign-and-send-transactions" 
}

let id = 0;
const pendingPromises: Array<PendingPromises> = [];

const isInstalled = async (): Promise<boolean> => {
  // Note: sendToNarwallets throws if not installed
  try {
    await sendToNarwallets(NARWALLETS_CODES.IS_INSTALLED, true);
  }
  catch (ex) {
    logger.log(ex)
    return false
  }
  return true;
};

const isSignedIn = (): Promise<boolean> => {
  return sendToNarwallets(NARWALLETS_CODES.IS_SIGNED_IN, true);
};

const getAccountId = (): Promise<string> => {
  return sendToNarwallets(NARWALLETS_CODES.GET_ACCOUNT_ID, true);
};

const callSignAndSendTransaction = (
  params: SignAndSendTransactionParams
): Promise<providers.FinalExecutionOutcome> => {
  return sendToNarwallets(NARWALLETS_CODES.SIGN_AND_SEND_TRANSACTION, false, params);
};

const callSignAndSendTransactions = (
  params: Array<SignAndSendTransactionParams>
): Promise<
  Array<providers.FinalExecutionOutcome>
> => {
  return sendToNarwallets(NARWALLETS_CODES.SIGN_AND_SEND_TRANSACTIONS, false, params);
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
  window.addEventListener("message", (event) => {
    if (event.source != window) {
      return;
    }
    const { data } = event
    // msg should be directed to the page (response from the extension, relayed from the content script)
    if (!data || data.dest !== "page") {
      return
    }

    console.log("Message received");
    console.log("Event data:", data)
    if (data.id && data.type == "nw") {
      const pendingPromise = findPendingPromiseById(data.id);
      if (!pendingPromise) {
        console.log("Pending promise not found with id ", data.id);
      }
      if (pendingPromise) {
        console.log("Peding promise found. Code:", pendingPromise.code)
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

  const cleanup = () => {};

  const signOut = async () => {
    if (!(await isSignedIn())) {
      return;
    }

    cleanup();

    const res = await sendToNarwallets(NARWALLETS_CODES.SIGN_OUT);
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

  const setupEvents = () => {};

  // const isValidActions = (
  //   actions: Array<Action>
  // ): actions is Array<FunctionCallAction> => {
  //   return actions.every((x) => x.type === "FunctionCall");
  // };

  // const transformActions = (actions: Array<Action>) => {
  //   const validActions = isValidActions(actions);

  //   if (!validActions) {
  //     throw new Error(
  //       `Only 'FunctionCall' actions types are supported by ${metadata.name}`
  //     );
  //   }

  //   return actions.map((x) => x.params);
  // };

  // const transformTransactions = (
  //   transactions: Array<Optional<Transaction, "signerId">>
  // ): Array<SignAndSendTransactionParams> => {
  //   return transactions.map((transaction) => {
  //     return {
  //       signerId: transaction.signerId,
  //       receiverId: transaction.receiverId,
  //       actions: transformActions(transaction.actions),
  //     };
  //   });
  // };

  if (await isSignedIn()) {
    setupEvents();
  }

  return {
    // async signIn({ contractId, methodNames }) {
    async signIn() {
      const isUserSignedIn = await isSignedIn();
      let code;
      if (!isUserSignedIn) {
        code = NARWALLETS_CODES.SIGN_IN;
      } else {
        code = NARWALLETS_CODES.GET_ACCOUNT_ID;
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
      throw Error("TODO")
      // check Sender implementation
      // const account = getActiveAccount(store.getState());
      // if (!account) {
      //   throw new Error("No active account");
      // }
      // const accountId = account.accountId;
      // const pubKey = await _state.wallet.signer.getPublicKey(accountId);

      // return {
      //   accountId,
      //   message,
      //   blockId: "",
      //   publicKey: "",
      //   signature: "",
      //   keyType: 0 as utils.key_pair.KeyType,
      // }
    },

    async signAndSendTransaction({ signerId, receiverId, actions }) {
      logger.log("signAndSendTransaction", { signerId, receiverId, actions });

      const { contract, accounts } = store.getState();

      // if (!(await isSignedIn()) || !contract) {
      //   throw new Error("Wallet not signed in");
      // }
      // test: avoid a call to isSignedIn
      if (!accounts || accounts.length == 0 || !contract) {
        throw new Error("Wallet not signed in");
      }

      return callSignAndSendTransaction({
        signerId,
        receiverId: receiverId || contract.contractId,
        //actions: transformActions(actions)
        actions: actions
      })// .then((res) => {
      //   console.log("DResponse", res, typeof res);
      //   if (typeof res === 'object' && "error" in res) {
      //     throw new Error(res.error);
      //   }

      //   return res;
      // });
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("signAndSendTransactions", { transactions });

      const { contract, accounts } = store.getState();
      // if (!(await isSignedIn()) || !contract) {
      //   throw new Error("Wallet not signed in");
      // }
      // test: avoid a call to isSignedIn
      if (!accounts || accounts.length == 0 || !contract) {
        throw new Error("Wallet not signed in");
      }

      return callSignAndSendTransactions(
        //transformTransactions(transactions)
        transactions
      )
      // ).then((res) => {
      //   console.log("DSignAndSendTransactions", res);
      //   if ("error" in res) {
      //     throw new Error(res.error);
      //   }
      //   // Shouldn't happen but avoids inconsistent responses.
      //   if (!res.length) {
      //     throw new Error("Invalid response");
      //   }

      //   return res;
      // });
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
