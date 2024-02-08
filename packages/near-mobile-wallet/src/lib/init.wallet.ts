import { NearMobileWallet } from "@peersyst/near-mobile-signer/dist/src/wallet/NearMobileWallet";
import type { NearMobileWalletInit } from "./near-mobile-wallet.types";
import type { Network } from "@peersyst/near-mobile-signer/dist/src/common/models";
import type { Account } from "@near-wallet-selector/core";
import { verifyMessageNEP413 } from "@near-wallet-selector/core";

export const initNearMobileWallet: NearMobileWalletInit = async (config) => {
  const { store, options, logger, dAppMetadata } = config;

  const nearMobileWallet = new NearMobileWallet({
    network: options.network.networkId as Network,
    nodeUrl: options.network.nodeUrl,
    metadata: dAppMetadata,
  });

  async function getAccounts() {
    logger.log("[NearMobileWallet]:getAccounts");
    const accountIds = await nearMobileWallet.getAccounts();
    const accounts: Array<Account> = [];
    const { signedInMessageAccount } = store.getState();

    if (accountIds.length > 0) {
      for (let i = 0; i < accountIds.length; i++) {
        accounts.push({
          accountId: accountIds[i],
          publicKey: (
            await nearMobileWallet.signer.getPublicKey(
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
    get network() {
      return "mainnet";
    },

    async signIn(data) {
      logger.log("[NearMobileWallet]: signIn");

      const contractId = data.contractId !== "" ? data.contractId : undefined;
      await nearMobileWallet.signIn({ ...data, contractId: contractId });
      return await getAccounts();
    },

    async signOut() {
      logger.log("[NearMobileWallet]: signOut");
      const { signedInMessageAccount } = store.getState();

      if (!signedInMessageAccount) {
        await nearMobileWallet.signOut();
      }
    },

    async getAccounts() {
      return getAccounts();
    },

    async signAndSendTransaction(data) {
      logger.log("[NearMobileWallet]: signAndSendTransaction", data);

      const { contract } = store.getState();
      if (!contract) {
        throw new Error("Wallet not signed in");
      }

      return await nearMobileWallet.signAndSendTransaction({
        receiverId: contract.contractId,
        ...data,
      });
    },

    async verifyOwner() {
      throw Error(
        "[NearMobileWallet]: verifyOwner is deprecated, use signMessage method with implementation NEP0413 Standard"
      );
    },

    async signMessage(data) {
      const { recipient, nonce, ...rest } = data;
      logger.log("[NearMobileWallet]: signMessage", data);
      const result = await nearMobileWallet.signMessage({
        ...rest,
        receiver: recipient,
        nonce: Array.from(nonce),
      });
      return {
        accountId: result.accountId,
        signature: result.signature.toString(),
        publicKey: result.publicKey.toString(),
      };
    },

    async signInMessage(data) {
      logger.log("[NearMobileWallet]: signInMessage", data);
      const { recipient, nonce, ...rest } = data;
      const signedMessage = await nearMobileWallet.signMessage({
        ...rest,
        receiver: recipient,
        nonce: Array.from(nonce),
      });

      const message = { message: data.message, nonce, recipient };
      const isMessageVerified = await verifyMessageNEP413(
        message,
        signedMessage,
        options.network
      );

      if (!isMessageVerified) {
        throw new Error("Failed to verify the message");
      }

      return signedMessage;
    },

    async signAndSendTransactions(data) {
      logger.log("[NearMobileWallet]: signAndSendTransactions", data);

      const { contract } = store.getState();
      if (!contract) {
        throw new Error("Wallet not signed in");
      }

      return await nearMobileWallet.signAndSendTransactions(data);
    },
  };
};
