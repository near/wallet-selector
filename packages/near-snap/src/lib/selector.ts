import type {
  InjectedWallet,
  NetworkId,
  WalletBehaviourFactory,
} from "@near-wallet-selector/core";
import { NearSnap, NearSnapAccount } from "@near-snap/sdk";
import { verifyMessageNEP413 } from "@near-wallet-selector/core";

export const initNearSnap: WalletBehaviourFactory<InjectedWallet> = async (
  config
) => {
  const { store, logger, options } = config;
  const network = options.network.networkId as NetworkId;

  const snap = new NearSnap();
  let account = await NearSnapAccount.restore({ network, snap });

  return {
    async isSignedIn() {
      logger.log("NearSnap:isSignedIn");
      return account != null;
    },

    async signIn({ contractId, methodNames }) {
      logger.log("NearSnap:signIn");
      account = await NearSnapAccount.connect({
        contractId: contractId === "" ? undefined : contractId,
        methods: methodNames,
        network,
        snap,
      });

      return [{ accountId: account.accountId }];
    },

    async signOut() {
      logger.log("NearSnap:signOut");
      await account?.disconnect();
    },

    async getAccounts() {
      return account ? [{ accountId: account.accountId }] : [];
    },

    async signAndSendTransaction(data) {
      logger.log("NearSnap:signAndSendTransaction", data);

      if (account == null) {
        throw new Error("Wallet not signed in");
      }

      const { contract } = store.getState();
      const receiverId = data.receiverId ?? contract?.contractId;

      if (receiverId == null) {
        throw new Error("ReceiverId is not defined");
      }

      return await account.executeTransaction({ receiverId, ...data });
    },

    async signMessage({ message, nonce, recipient }) {
      if (account == null) {
        throw new Error("Wallet not signed in");
      }

      return await account.signMessage({ message, nonce, recipient });
    },

    async signInMessage({ message, nonce, recipient }) {
      let snapAccount: NearSnapAccount | null = null;
      if (account == null) {
        snapAccount = await NearSnapAccount.connect({
          contractId: undefined,
          methods: [],
          network,
          snap,
        });
      }

      const currentAccount = account || snapAccount;
      const signedMessage = await currentAccount!.signMessage({
        message,
        nonce,
        recipient,
      });
      const isMessageVerified = await verifyMessageNEP413(
        { message, nonce, recipient },
        signedMessage,
        options.network
      );

      if (!isMessageVerified) {
        throw new Error(`Failed to verify the message`);
      }

      return signedMessage;
    },

    async verifyOwner() {
      throw Error("NearSnap:verifyOwner is not released yet");
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("NearSnap:signAndSendTransactions", { transactions });

      const { contract } = store.getState();

      if (account == null || !contract) {
        throw new Error("Wallet not signed in");
      }

      return await account.executeTransactions(transactions);
    },
  };
};
