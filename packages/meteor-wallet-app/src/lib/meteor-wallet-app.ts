import type {
  Account,
  FinalExecutionOutcome,
  InstantLinkWallet,
  SignedMessage,
  WalletBehaviourFactory,
  WalletModuleFactory,
} from "@near-wallet-selector/core";
import icon from "./icon";

enum EMethod {
  sign_in = "sign_in",
  sign_out = "sign_out",
  sign_and_send_transaction = "sign_and_send_transaction",
  sign_and_send_transactions = "sign_and_send_transactions",
  sign_message = "sign_message",
  ping = "ping",
}

type Result =
  | FinalExecutionOutcome
  | Array<FinalExecutionOutcome>
  | Array<Account>
  | SignedMessage;

interface IMeteorWalletAppAction {
  method: EMethod;
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  nonce: string;
}

const postMessage = function (data: string) {
  // why this?
  // https://github.com/react-native-webview/react-native-webview/issues/323#issuecomment-511824940
  // @ts-expect-error
  if (window?.ReactNativeWebView?.postMessage) {
    // @ts-expect-error
    return window?.ReactNativeWebView?.postMessage(data);
  } else {
    if (window.top) {
      if (window !== window.top) {
        // in an iframe
        if (window.top.location) {
          const parentUrl =
            window.location !== window.parent.location
              ? document.referrer
              : document.location.href;

          const enablePostMessage = window.localStorage.getItem(
            "__meteor_app_enable_post_message"
          );

          if (parentUrl === "https://xxx.com" || enablePostMessage) {
            return window.top.postMessage(data, "*");
          }
        }
      }
    }
  }

  throw new Error("Not supported");
};

const tryPostOrFail = <R extends Result>(
  action: Omit<IMeteorWalletAppAction, "nonce">,
  timeoutInMs?: number
): Promise<R> => {
  const nonce = Buffer.from(
    crypto.getRandomValues(new Uint8Array(10))
  ).toString("base64");

  postMessage(
    JSON.stringify({
      ...action,
      nonce,
    })
  );

  return new Promise<R>((resolve, reject) => {
    const abortController = new AbortController();
    let resolved = false;

    if (timeoutInMs) {
      setTimeout(() => {
        if (!resolved) {
          abortController.abort();
          reject(new Error(`Timeout of ${timeoutInMs}ms`));
        }
      }, timeoutInMs);
    }

    window.addEventListener(
      "message",
      (ev) => {
        if (
          typeof ev.data === "object" &&
          ev.data?.response &&
          ev.data?.nonce === nonce
        ) {
          resolved = true;
          if (ev.data.isError) {
            reject(new Error(ev.data.response));
          } else {
            resolve(ev.data.response);
          }
          abortController.abort();
        }
      },
      {
        signal: abortController.signal,
      }
    );
  });
};

const createMeteorWalletAppInjected: WalletBehaviourFactory<
  InstantLinkWallet,
  {
    contractId?: string;
  }
> = async ({ metadata }) => {
  let signedInAccounts: Array<Account> = [];

  return {
    getContractId() {
      return metadata.contractId;
    },
    async getAccounts() {
      return signedInAccounts;
    },
    async signAndSendTransaction(params) {
      const receiverId = params.receiverId ?? metadata.contractId;
      if (!receiverId) {
        throw new Error("No receiver found to send the transaction to");
      }

      const data = await tryPostOrFail<FinalExecutionOutcome>({
        method: EMethod.sign_and_send_transaction,
        args: {
          ...params,
          receiverId,
        },
      });
      return data;
    },
    async signAndSendTransactions(params) {
      const data = await tryPostOrFail<Array<FinalExecutionOutcome>>({
        method: EMethod.sign_and_send_transactions,
        args: {
          ...params,
        },
      });
      return data;
    },
    async signIn(params) {
      await tryPostOrFail(
        {
          method: EMethod.ping,
          args: {},
        },
        1000
      );
      const data = await tryPostOrFail<Array<Account>>({
        method: EMethod.sign_in,
        args: params,
      });

      signedInAccounts = data;

      return data;
    },
    async signOut() {
      if (signedInAccounts.length > 0) {
        await tryPostOrFail<Array<Account>>({
          method: EMethod.sign_out,
          args: {},
        });

        signedInAccounts = [];
      }
    },
    async verifyOwner() {
      throw Error(
        "MeteorWalletApp:verifyOwner is deprecated, use signMessage method with implementation NEP0413 Standard"
      );
    },
    async signMessage(params) {
      const data = await tryPostOrFail<SignedMessage>({
        method: EMethod.sign_message,
        args: {
          ...params,
          nonce: [...params.nonce],
        },
      });
      return data;
    },
  };
};

export function setupMeteorWalletApp({
  iconUrl = icon,
  deprecated = false,
  contractId,
}: {
  iconUrl?: string;
  deprecated?: boolean;
  contractId: string;
}): WalletModuleFactory<InstantLinkWallet> {
  return async () => {
    return {
      id: "meteor-wallet-app",
      type: "instant-link",
      metadata: {
        available: true,
        name: "Meteor Wallet App",
        description:
          "Securely store and stake your NEAR tokens and compatible assets with Meteor.",
        iconUrl,
        deprecated,
        downloadUrl: "https://wallet.meteorwallet.app",
        contractId,
        runOnStartup: true,
      },
      init: (options) => {
        return createMeteorWalletAppInjected({
          ...options,
        });
      },
    };
  };
}
