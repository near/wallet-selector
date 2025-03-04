/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  type WalletModuleFactory,
  type InjectedWallet,
} from "@near-wallet-selector/core";
import { HOT, verifySignature } from "@hot-wallet/sdk";

export function setupHotWallet(): WalletModuleFactory<InjectedWallet> {
  return async () => {
    return {
      id: "hot-wallet",
      type: "injected",
      metadata: {
        name: "HOT Wallet",
        description: "Multichain wallet under HOT Protocol",
        downloadUrl: "https://hot-labs.org/wallet",
        iconUrl: "https://storage.herewallet.app/logo.png",
        topLevelInjected: HOT.isInjected,
        useUrlAccountImport: false,
        deprecated: false,
        available: true,
      },

      init: async (config) => {
        HOT.subscribe("near:accountsChanged", (e: any) =>
          config.emitter.emit("accountsChanged", e)
        );

        HOT.subscribe("near:signedOut", (e: any) =>
          config.emitter.emit("signedOut", e)
        );

        HOT.subscribe("near:signedIn", (e: any) =>
          config.emitter.emit("signedIn", e)
        );

        return {
          async getAccounts() {
            try {
              if (HOT.isInjected) {
                return [await HOT.request("near:signIn", {})];
              }

              const acc = await config.storage.getItem("hot:near-account");
              return JSON.parse(String(acc));
            } catch {
              return [];
            }
          },

          async signIn(data) {
            const result = await HOT.request("near:signIn", {});
            const accounts = [
              { accountId: result.accountId, publicKey: result.publicKey },
            ];

            config.storage.setItem(
              "hot:near-account",
              JSON.stringify(accounts)
            );

            config.emitter.emit("signedIn", {
              contractId: data.contractId,
              methodNames: data.methodNames ?? [],
              accounts,
            });

            return accounts;
          },

          async signOut() {
            if (HOT.isInjected) {
              HOT.request("near:signOut", {});
            }

            config.emitter.emit("signedOut", null);
            config.storage.setItem("hot:near-account", "[]");
          },

          async signMessage(params) {
            const request = {
              message: params.message,
              nonce: Array.from(new Uint8Array(params.nonce)),
              recipient: params.recipient,
            };

            const result = await HOT.request("near:signMessage", request);
            if (!verifySignature(request, result)) {
              throw "Signature invalid";
            }

            return result;
          },

          async signAndSendTransaction(params) {
            const receiverId =
              params.receiverId || config.store.getState().contract?.contractId;

            const { transactions } = await HOT.request(
              "near:signAndSendTransactions",
              {
                transactions: [
                  {
                    actions: params.actions,
                    signerId: params.signerId,
                    receiverId: receiverId || "",
                  },
                ],
              }
            );

            return transactions[0] as any;
          },

          async signAndSendTransactions(params) {
            const { transactions } = await HOT.request(
              "near:signAndSendTransactions",
              params
            );

            return transactions as Array<any>;
          },

          async verifyOwner() {
            throw Error(
              "HOT:verifyOwner is deprecated, use signMessage method with implementation NEP0413 Standard"
            );
          },
        };
      },
    };
  };
}
