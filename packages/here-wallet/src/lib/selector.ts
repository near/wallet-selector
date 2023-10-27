import type { Account, NetworkId } from "@near-wallet-selector/core";
import {
  verifyFullKeyBelongsToUser,
  verifySignature,
} from "@near-wallet-selector/core";
import { HereWallet } from "@here-wallet/core";
import type BN from "bn.js";

import type { SelectorInit } from "./types";

export const initHereWallet: SelectorInit = async (config) => {
  const { store, logger, emitter, options, defaultProvider, defaultStrategy } =
    config;

  const here = new HereWallet({
    networkId: options.network.networkId as NetworkId,
    nodeUrl: options.network.nodeUrl,
    defaultProvider,
    defaultStrategy,
  });

  async function getAccounts() {
    logger.log("HereWallet:getAccounts");
    const accountIds = await here.getAccounts();
    const accounts: Array<Account> = [];
    const { signedInMessageAccount } = store.getState();

    if (accountIds.length > 0) {
      for (let i = 0; i < accountIds.length; i++) {
        accounts.push({
          accountId: accountIds[i],
          publicKey: (
            await here.signer.getPublicKey(
              accountIds[i],
              options.network.networkId
            )
          ).toString(),
        });
      }
      return accounts;
    }

    if (signedInMessageAccount) {
      return [{ ...signedInMessageAccount }];
    }

    return accounts;
  }

  return {
    get networkId() {
      return here.networkId;
    },

    buildImportAccountsUrl() {
      return `https://my.herewallet.app/import?network=${options.network.networkId}`;
    },

    async account(id) {
      logger.log("HereWallet:account");
      return await here.account(id);
    },

    async switchAccount(id) {
      logger.log("HereWallet:switchAccount");
      await here.switchAccount(id);
    },

    async getAccountId() {
      logger.log("HereWallet:getAccountId");
      return await here.getAccountId();
    },

    async isSignedIn() {
      logger.log("HereWallet:isSignedIn");
      return await here.isSignedIn();
    },

    async signIn(data) {
      logger.log("HereWallet:signIn");

      const contractId = data.contractId !== "" ? data.contractId : undefined;
      await here.signIn({ ...data, contractId: contractId });

      emitter.emit("signedIn", {
        contractId: data.contractId,
        methodNames: data.methodNames ?? [],
        accounts: await getAccounts(),
      });

      return await getAccounts();
    },

    async getHereBalance() {
      logger.log("HereWallet:getHereBalance");
      return await here.getHereBalance();
    },

    async getAvailableBalance(): Promise<BN> {
      logger.log("HereWallet:getAvailableBalance");
      return await here.getAvailableBalance();
    },

    async signOut() {
      if (await here.isSignedIn()) {
        logger.log("HereWallet:signOut");
        await here.signOut();
      }
    },

    async getAccounts() {
      return getAccounts();
    },

    async signAndSendTransaction(data) {
      logger.log("HereWallet:signAndSendTransaction", data);

      const { contract } = store.getState();
      if (!here.isSignedIn || !contract) {
        throw new Error("Wallet not signed in");
      }

      return await here.signAndSendTransaction({
        receiverId: contract.contractId,
        ...data,
      });
    },

    async verifyOwner() {
      throw Error(
        "HereWallet:verifyOwner is deprecated, use signMessage method with implementation NEP0413 Standard"
      );
    },

    async signMessage(data) {
      logger.log("HereWallet:signMessage", data);
      return await here.signMessage(data);
    },

    async signInMessage(data) {
      logger.log("HereWallet:signInMessage", data);

      const response = await here.signMessage(data);

      const verifiedSignature = verifySignature({
        message: data.message,
        nonce: data.nonce,
        recipient: data.recipient,
        publicKey: response.publicKey,
        signature: response.signature,
      });
      const verifiedFullKeyBelongsToUser = await verifyFullKeyBelongsToUser({
        publicKey: response.publicKey,
        accountId: response.accountId,
        network: options.network,
      });

      if (verifiedSignature && verifiedFullKeyBelongsToUser) {
        return response;
      } else {
        throw new Error(`Failed to verify the message`);
      }
    },

    async signAndSendTransactions(data) {
      logger.log("HereWallet:signAndSendTransactions", data);
      const { contract } = store.getState();
      if (!here.isSignedIn || !contract) {
        throw new Error("Wallet not signed in");
      }

      return await here.signAndSendTransactions(data);
    },
  };
};
