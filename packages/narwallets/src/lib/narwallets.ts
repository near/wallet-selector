import { isMobile } from "is-mobile";
import {
  WalletModuleFactory,
  WalletBehaviourFactory,
  InjectedWallet,
  Action,
  Transaction,
  FunctionCallAction,
  Optional,
  Account,
  VerifiedOwner,
} from "@near-wallet-selector/core";
//import { waitFor } from "@near-wallet-selector/core";
import type {
  InjectedNarwallets,
  SignAndSendTransactionResponse,
} from "./injected-narwallets";
import { fileURLToPath } from "url";
import { resolve } from "path";
import { providers, utils } from "near-api-js";
import { CLIENT_RENEG_LIMIT } from "tls";
import { SignAndSendTransactionParams } from "packages/core/src/lib/wallet";

// declare global {
//   interface Window {
//     narwallets: InjectedNarwallets | undefined;
//   }
// }

export interface NarwalletsParams {
  iconUrl?: string;
}

interface NarwalletsState {
  wallet: InjectedNarwallets;
}

interface PendingPromises {
  id: number;
  code: string;
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
    console.log(ex)
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
  // return waitFor(() => window.narwallets !== undefined).catch(() => false);
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

  console.log("setupNarwalletsState: Setting message listener to window")

  // receive response from the extension content_script
  window.addEventListener("message", (event) => {
    if (event.source != window) {
      return;
    }
    const { data } = event
    // msg shoudl be directed to the page (response from the extension, relayed from the content script)
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
        // result : {err, data}
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
  // let wallet = window.narwallets!;

  // return {
  //   wallet,
  // };
};

const Narwallets: WalletBehaviourFactory<InjectedWallet> = async ({
  options,
  metadata,
  store,
  provider,
  emitter,
  logger,
}) => {
  // const _state = setupNarwalletsState();

  const cleanup = () => {
    // for (const key in _state.wallet.callbacks) {
    //   _state.wallet.remove(key);
    // }
  };

  const signOut = async () => {
    if (!(await isSignedIn())) {
      return;
    }

    cleanup();

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

  const setupEvents = () => {
    // _state.wallet.on("accountChanged", async (newAccountId) => {
    //   logger.log("onAccountChange", newAccountId);
    //   emitter.emit("signedOut", null);
    // });
    // _state.wallet.on("rpcChanged", async (rpc) => {
    //   logger.log("onNetworkChange", rpc);
    //   if (options.network.networkId !== rpc.networkId) {
    //     await signOut();
    //     emitter.emit("signedOut", null);
    //     emitter.emit("networkChanged", { networkId: rpc.networkId });
    //   }
    // });
  };

  // const getAccountId = () => {
  //   const accountId = _state.wallet.getAccountId();

  //   if (!accountId) {
  //     return [];
  //   }

  //   return [{ accountId }];
  // };

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
        code = "sign-in";
      } else {
        code = "get-account-id";
      }
      const response = await sendToNarwallets(code);
      console.log("Account id", response);
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
      return {
        accountId: "",
        message: "",
        blockId: "",
        publicKey: "",
        signature: "",
        keyType: 0 as utils.key_pair.KeyType,
      }
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
