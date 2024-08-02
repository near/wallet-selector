import { HereWallet, waitInjectedHereWallet } from "@here-wallet/core";
import type { SelectorInit } from "./types";

export const initHereWallet: SelectorInit = async (config) => {
  const { store, logger, emitter, options, walletOptions } = config;
  const here = await HereWallet.connect(walletOptions);

  async function getAccounts() {
    logger.log("HereWallet:getAccounts");
    const accountIds = await here.getAccounts();
    const accounts = [];

    for (let i = 0; i < accountIds.length; i++) {
      const pub = await here.signer.getPublicKey(
        accountIds[i],
        options.network.networkId
      );
      accounts.push({ accountId: accountIds[i], publicKey: pub.toString() });
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

    async account(id: string) {
      logger.log("HereWallet:account");
      return await here.account(id);
    },

    async switchAccount(id: string) {
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

      const isInjected = await waitInjectedHereWallet;
      if (!isInjected) {
        const contractId = data.contractId !== "" ? data.contractId : undefined;
        await here.signIn({ ...data, contractId: contractId });
      }

      emitter.emit("signedIn", {
        contractId: data.contractId,
        methodNames: data.methodNames ?? [],
        accounts: await getAccounts(),
      });

      return await getAccounts();
    },

    async signOut() {
      logger.log("HereWallet:signOut");
      await here.signOut();
    },

    async getAccounts() {
      return getAccounts();
    },

    async signAndSendTransaction(data) {
      logger.log("HereWallet:signAndSendTransaction", data);

      const { contract } = store.getState();
      return await here.signAndSendTransaction({
        receiverId: contract?.contractId,
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

    async signAndSendTransactions(data) {
      logger.log("HereWallet:signAndSendTransactions", data);
      return await here.signAndSendTransactions(data);
    },
  };
};
