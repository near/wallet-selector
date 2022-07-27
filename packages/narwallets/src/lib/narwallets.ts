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
} from "@near-wallet-selector/core";
import { waitFor } from "@near-wallet-selector/core";
import type { InjectedNarwallets, SignAndSendTransactionParams, SignAndSendTransactionResponse } from "./injected-narwallets";
import { fileURLToPath } from "url";
import { resolve } from "path";

declare global {
  interface Window {
    narwallets: InjectedNarwallets | undefined;
  }
}

export interface NarwalletsParams {
  iconUrl?: string;
}

interface NarwalletsState {
  wallet: InjectedNarwallets;
}

interface PendingPromises {
  id: number
  code: string
  resolve: (value: any) => void
  reject: (reason?: any) => void
  timeout?: NodeJS.Timeout
}

let id: number = 0
let pendingPromises: PendingPromises[] = []

const isInstalled = (): Promise<boolean> => {
  const code = "is-installed";
  return sendToNarwallets(code, true)
};

const isSignedIn = (): Promise<boolean> => {
  const code = "is-signed-in";
  return sendToNarwallets(code, true)
};

const getAccountId = (): Promise<string> => {
  const code = "get-account-id";
  return sendToNarwallets(code, true)
};

const callSignAndSendTransaction = (params: SignAndSendTransactionParams): Promise<SignAndSendTransactionResponse> => {
  const code = "sign-and-send-transaction";
  return sendToNarwallets(code, true, params)
};

const sendToNarwallets = (code: string, withTimeout: boolean = false, params?: any): Promise<any> => {
  const promise = new Promise<any>((resolve, reject) => {
    id++
    let promiseTimeout
    if(withTimeout) {
      promiseTimeout = setTimeout(() => {
          return reject(Error("timeout"));
      }, 1000);
    }
    pendingPromises.push({id, code, resolve, reject, timeout: promiseTimeout });
    
    window.postMessage({
      id,
      src: "ws",
      type: "nw",
      code,
      dest: "ext",
      params
    });
  })
  return promise
  // return waitFor(() => window.narwallets !== undefined).catch(() => false);
};

function findPendingPromiseById(id: number): PendingPromises|undefined {
  return pendingPromises.filter(c => c.id == id)[0]
}

function removePendingPromise(callback: PendingPromises) {
  const index = pendingPromises.indexOf(callback);
  if (index > -1) { // only splice array when item is found
      pendingPromises.splice(index, 1); // 2nd parameter means remove one item only
  }
}

window.addEventListener("message", (event) => {
  if (event.source != window) {
    return;
  }
  if (event.data.type && (event.data.type == "nw") && event.data.dest && event.data.dest == "page" && event.data.result && event.data.result.id) {
    const pendingPromise = findPendingPromiseById(event.data.result.id)
    if(pendingPromise) {
      removePendingPromise(pendingPromise)
      if(pendingPromise.timeout) clearTimeout(pendingPromise.timeout)
      if(event.data.error) {
        pendingPromise.reject(event.data.error)
      } else {
        pendingPromise.resolve(event.data.result.data)
      }
    }
  }
})

const setupNarwalletsState = (): NarwalletsState => {
  let wallet = window.narwallets!;

  return {
    wallet,
  };
};

const Narwallets: WalletBehaviourFactory<InjectedWallet> = async ({
  options,
  metadata,
  store,
  emitter,
  logger,
}) => {
  const _state = setupNarwalletsState();

  const cleanup = () => {
    for (const key in _state.wallet.callbacks) {
      _state.wallet.remove(key);
    }
  };

  const signOut = async () => {
    if (!await isSignedIn()) {
      return;
    }

    cleanup();

    const res = await _state.wallet.signOut();

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

  const isValidActions = (
    actions: Array<Action>
  ): actions is Array<FunctionCallAction> => {
    return actions.every((x) => x.type === "FunctionCall");
  };

  const transformActions = (actions: Array<Action>) => {
    const validActions = isValidActions(actions);

    if (!validActions) {
      throw new Error(
        `Only 'FunctionCall' actions types are supported by ${metadata.name}`
      );
    }

    return actions.map((x) => x.params);
  };

  const transformTransactions = (
    transactions: Array<Optional<Transaction, "signerId">>
  ) => {
    return transactions.map((transaction) => {
      return {
        receiverId: transaction.receiverId,
        actions: transformActions(transaction.actions),
      };
    });
  };

  if (await isSignedIn()) {
    setupEvents();
  }

  return {
    // async signIn({ contractId, methodNames }) {
    async signIn() {
      
      const isUserSignedIn = await isSignedIn()
      let code
      if(!isUserSignedIn) {
        code = "sign-in";
      } else {
        code = "get-account-id";
      }
      const response = await sendToNarwallets(code)
      console.log("Account id", response)
      return [{ accountId: response }]
      
    },

    signOut,

    async getAccounts(): Promise<Account[]> {
      const accountId = await getAccountId()
      return [{ accountId }];
    },

    async signAndSendTransaction({ signerId, receiverId, actions }) {
      logger.log("signAndSendTransaction", { signerId, receiverId, actions });

      const { contract } = store.getState();

      if (!await isSignedIn() || !contract) {
        throw new Error("Wallet not signed in");
      }
      return callSignAndSendTransaction({
        receiverId: receiverId || contract.contractId,
        actions: transformActions(actions),
      }).then((res) => {
        if (res.error) {
          throw new Error(res.error);
        }

        // Shouldn't happen but avoids inconsistent responses.
        if (!res.response?.length) {
          throw new Error("Invalid response");
        }

        return res.response[0];
      });

      // return _state.wallet
      //   .signAndSendTransaction({
      //     receiverId: receiverId || contract.contractId,
      //     actions: transformActions(actions),
      //   })
      //   .then((res) => {
      //     if (res.error) {
      //       throw new Error(res.error);
      //     }

      //     // Shouldn't happen but avoids inconsistent responses.
      //     if (!res.response?.length) {
      //       throw new Error("Invalid response");
      //     }

      //     return res.response[0];
      //   });
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("signAndSendTransactions", { transactions });

      if (!await isSignedIn()) {
        throw new Error("Wallet not signed in");
      }

      return _state.wallet
        .requestSignTransactions({
          transactions: transformTransactions(transactions),
        })
        .then((res) => {
          if (res.error) {
            throw new Error(res.error);
          }

          // Shouldn't happen but avoids inconsistent responses.
          if (!res.response?.length) {
            throw new Error("Invalid response");
          }

          return res.response;
        });
    },
  };
};

export function setupNarwallets({
  iconUrl = "./assets/narwallets-logo.png",
}: NarwalletsParams = {}): WalletModuleFactory<InjectedWallet> {
  return async () => {
    const mobile = isMobile();
    const installed = await isInstalled();
    console.log(installed)
    if (mobile) {
      return null;
    }

    // Add extra wait to ensure Narwallets's sign in status is read from the
    // browser extension background env.
    // await waitFor(() => !!window.near?.isSignedIn(), { timeout: 300 }).catch(
    //   () => false
    // );

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
