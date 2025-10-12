import {
  najActionToInternal,
  type Account,
  type FinalExecutionOutcome,
  type InstantLinkWallet,
  type SignedMessage,
  type WalletBehaviourFactory,
  type WalletModuleFactory,
} from "@near-wallet-selector/core";
import icon from "./icon";
import {
  SCHEMA,
  SignedTransaction,
  type encodeSignedDelegate,
} from "@near-js/transactions";
import { PublicKey } from "@near-js/crypto";
import { deserialize, serialize } from "borsh";

type SignedDelegate = Parameters<typeof encodeSignedDelegate>[0];

enum EMethod {
  sign_in = "sign_in",
  sign_out = "sign_out",
  sign_and_send_transaction = "sign_and_send_transaction",
  sign_and_send_transactions = "sign_and_send_transactions",
  sign_transaction = "sign_transaction",
  sign_delegate_action = "sign_delegate_action",
  create_signed_transaction = "create_signed_transaction",
  get_public_key = "get_public_key",
  sign_message = "sign_message",
  ping = "ping",
}

type Result =
  | FinalExecutionOutcome
  | Array<FinalExecutionOutcome>
  | Array<Account>
  | [Uint8Array, Uint8Array]
  | Uint8Array
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
  // @ts-ignore
  if (window?.ReactNativeWebView?.postMessage) {
    // @ts-ignore
    return window?.ReactNativeWebView?.postMessage(data);
  } else {
    if (window.top) {
      if (window !== window.top) {
        // in an iframe
        if (window.top.location) {
          return window.top.postMessage(data, "*");
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
    JSON.stringify(
      {
        ...action,
        nonce,
        source: "meteor-wallet-app-selector",
        href: window.location.href,
      },
      (_, v) => {
        if (typeof v === "bigint") {
          v.toString();
        }

        return v;
      }
    )
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
      const _params = {
        ...params,
        // Meteor Wallet App expects the actions to be in the internal action format so we need to convert them
        actions: params.actions.map((action) => najActionToInternal(action)),
      };
      const receiverId = params.receiverId ?? metadata.contractId;
      if (!receiverId) {
        throw new Error("No receiver found to send the transaction to");
      }

      const data = await tryPostOrFail<FinalExecutionOutcome>({
        method: EMethod.sign_and_send_transaction,
        args: {
          ..._params,
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
          transactions: params.transactions.map((transaction) => ({
            ...transaction,
            // Meteor Wallet App expects the actions to be in the internal action format so we need to convert them
            actions: transaction.actions.map((action) =>
              najActionToInternal(action)
            ),
          })),
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
        // we inject this window variable in app
        // and give a bit more time for respond
        // @ts-ignore
        window.__is_running_in_meteor_wallet_app__ ? 3000 : 1000
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
    async createSignedTransaction(receiverId, actions) {
      const data = await tryPostOrFail<Uint8Array>({
        method: EMethod.create_signed_transaction,
        args: {
          receiverId,
          actions,
        },
      });

      const signedTransaction = SignedTransaction.decode(data);

      return signedTransaction;
    },
    async signTransaction(transaction) {
      // first element is the hashed message
      // second is the signed transaction
      const [hash, signedTxUint8Array] = await tryPostOrFail<
        [Uint8Array, Uint8Array]
      >({
        method: EMethod.sign_transaction,
        args: {
          transactionUint8Array: [...transaction.encode()],
        },
      });
      return [hash, SignedTransaction.decode(signedTxUint8Array)];
    },

    async getPublicKey() {
      if (signedInAccounts.length === 0) {
        throw new Error("Wallet is not signed in yet");
      }

      if (!signedInAccounts[0].publicKey) {
        throw new Error("Public key is not available for the selected account");
      }

      return PublicKey.fromString(signedInAccounts[0].publicKey);
    },

    async signNep413Message(message, accountId, recipient, nonce, callbackUrl) {
      const data = await tryPostOrFail<SignedMessage>({
        method: EMethod.sign_message,
        args: {
          message,
          recipient,
          nonce: [...nonce],
          callbackUrl,
        },
      });

      return {
        publicKey: PublicKey.from(data.publicKey),
        accountId: accountId,
        signature: new Uint8Array(Buffer.from(data.signature, "base64")),
      };
    },

    async signDelegateAction(delegateAction) {
      const [hash, signedDelegateActionUint8Array] = await tryPostOrFail<
        [Uint8Array, Uint8Array]
      >({
        method: EMethod.sign_delegate_action,
        args: {
          delegateActionUint8Array: [
            ...serialize(SCHEMA.DelegateAction, delegateAction),
          ],
        },
      });

      return [
        hash,
        <SignedDelegate>(
          deserialize(SCHEMA.SignedDelegate, signedDelegateActionUint8Array)
        ),
      ];
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
