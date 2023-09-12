import type {
  Account,
  InjectedWallet,
  Network,
  Optional,
  Transaction,
  WalletBehaviourFactory,
  WalletModuleFactory,
} from "@near-wallet-selector/core";
import type {
  MeteorWalletParams_Injected,
  MeteorWalletState,
} from "./meteor-wallet-types";
import * as nearAPI from "near-api-js";
import {
  EMeteorWalletSignInType,
  MeteorWallet as MeteorWalletSdk,
} from "@meteorwallet/sdk";
import { createAction } from "@near-wallet-selector/wallet-utils";
import icon from "./icon";
import {
  verifyFullKeyBelongsToUser,
  verifySignature,
} from "@near-wallet-selector/core";

const setupWalletState = async (
  params: MeteorWalletParams_Injected,
  network: Network
): Promise<MeteorWalletState> => {
  const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore(
    window.localStorage,
    "_meteor_wallet"
  );

  const near = await nearAPI.connect({
    keyStore,
    ...network,
    headers: {},
  });

  const wallet = new MeteorWalletSdk({ near, appKeyPrefix: "near_app" });

  return {
    wallet,
    keyStore,
  };
};

const createMeteorWalletInjected: WalletBehaviourFactory<
  InjectedWallet,
  { params: MeteorWalletParams_Injected }
> = async ({ options, logger, store, params }) => {
  const _state = await setupWalletState(params, options.network);

  const getAccounts = async (): Promise<Array<Account>> => {
    const accountId = _state.wallet.getAccountId();
    const account = _state.wallet.account();
    const { signedInMessage } = store.getState();

    if (accountId && account) {
      const publicKey = await account.connection.signer.getPublicKey(
        account.accountId,
        options.network.networkId
      );
      return [
        {
          accountId,
          publicKey: publicKey ? publicKey.toString() : "",
        },
      ];
    }

    if (signedInMessage) {
      return [
        {
          accountId: signedInMessage.accountId,
          publicKey: signedInMessage.publicKey,
        },
      ];
    }

    return [];
  };

  const transformTransactions = async (
    transactions: Array<Optional<Transaction, "signerId">>
  ) => {
    const account = _state.wallet.account()!;
    const { networkId, signer, provider } = account.connection;

    const localKey = await signer.getPublicKey(account.accountId, networkId);

    return Promise.all(
      transactions.map(async (transaction, index) => {
        const actions = transaction.actions.map((action) =>
          createAction(action)
        );
        const accessKey = await account.accessKeyForTransaction(
          transaction.receiverId,
          actions,
          localKey
        );

        if (!accessKey) {
          throw new Error(
            `Failed to find matching key for transaction sent to ${transaction.receiverId}`
          );
        }

        const block = await provider.block({ finality: "final" });

        return nearAPI.transactions.createTransaction(
          account.accountId,
          nearAPI.utils.PublicKey.from(accessKey.public_key),
          transaction.receiverId,
          accessKey.access_key.nonce + index + 1,
          actions,
          nearAPI.utils.serialize.base_decode(block.header.hash)
        );
      })
    );
  };

  return {
    async signIn({ contractId, methodNames = [] }) {
      logger.log("MeteorWallet:signIn", {
        contractId,
        methodNames,
      });

      if (methodNames.length) {
        await _state.wallet.requestSignIn({
          methods: methodNames,
          type: EMeteorWalletSignInType.SELECTED_METHODS,
          contract_id: contractId,
        });
      } else {
        await _state.wallet.requestSignIn({
          type: EMeteorWalletSignInType.ALL_METHODS,
          contract_id: contractId,
        });
      }

      return getAccounts();
    },

    async signOut() {
      if (_state.wallet.isSignedIn()) {
        await _state.wallet.signOut();
      }
    },

    async isSignedIn() {
      if (!_state.wallet) {
        return false;
      }

      return _state.wallet.isSignedIn();
    },

    async getAccounts() {
      return getAccounts();
    },

    async verifyOwner({ message }) {
      logger.log("MeteorWallet:verifyOwner", { message });

      const response = await _state.wallet.verifyOwner({
        message,
      });

      if (response.success) {
        return response.payload;
      } else {
        throw new Error(`Couldn't verify owner: ${response.message}`);
      }
    },

    async signMessage({ message, nonce, recipient, state }) {
      logger.log("MeteorWallet:signMessage", {
        message,
        nonce,
        recipient,
        state,
      });
      const accountId = _state.wallet.getAccountId();
      const response = await _state.wallet.signMessage({
        message,
        nonce,
        recipient,
        accountId,
        state,
      });
      if (response.success) {
        return response.payload;
      } else {
        throw new Error(`Couldn't sign message owner: ${response.message}`);
      }
    },

    // This function is added here just for testing, it will be removed after PR is approved.
    async signInMessage({ message, nonce, recipient, state }) {
      logger.log("MeteorWallet:signInMessage", {
        message,
        nonce,
        recipient,
        state,
      });
      const accountId = _state.wallet.getAccountId();
      const response = await _state.wallet.signMessage({
        message,
        nonce,
        recipient,
        accountId,
        state,
      });
      if (response.success) {
        const verifiedSignature = verifySignature({
          message,
          nonce,
          recipient,
          publicKey: response.payload.publicKey,
          signature: response.payload.signature,
        });
        const verifiedFullKeyBelongsToUser = await verifyFullKeyBelongsToUser({
          publicKey: response.payload.publicKey,
          accountId: response.payload.accountId,
          network: options.network,
        });

        if (verifiedSignature && verifiedFullKeyBelongsToUser) {
          return response.payload;
        } else {
          throw new Error(`Failed to verify the message`);
        }
      } else {
        throw new Error(`Couldn't sign message owner: ${response.message}`);
      }
    },

    async signAndSendTransaction({ signerId, receiverId, actions }) {
      logger.log("MeteorWallet:signAndSendTransaction", {
        signerId,
        receiverId,
        actions,
      });

      const { contract } = store.getState();

      if (!_state.wallet.isSignedIn()) {
        throw new Error("Wallet not signed in");
      }

      if (!receiverId && !contract) {
        throw new Error("No receiver found to send the transaction to");
      }

      const account = _state.wallet.account()!;

      return account["signAndSendTransaction_direct"]({
        receiverId: receiverId ?? contract!.contractId,
        actions: actions.map((action) => createAction(action)),
      });
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("MeteorWallet:signAndSendTransactions", {
        transactions,
      });

      if (!_state.wallet.isSignedIn()) {
        throw new Error("Wallet not signed in");
      }

      return _state.wallet.requestSignTransactions({
        transactions: await transformTransactions(transactions),
      });
    },

    buildImportAccountsUrl() {
      return `https://wallet.meteorwallet.app/batch-import?network=${_state.wallet._networkId}`;
    },
  };
};

export function setupMeteorWallet({
  iconUrl = icon,
  deprecated = false,
}: MeteorWalletParams_Injected = {}): WalletModuleFactory<InjectedWallet> {
  return async () => {
    return {
      id: "meteor-wallet",
      type: "injected",
      metadata: {
        available: true,
        name: "Meteor Wallet",
        description:
          "Securely store and stake your NEAR tokens and compatible assets with Meteor.",
        iconUrl,
        deprecated,
        downloadUrl: "https://wallet.meteorwallet.app",
        useUrlAccountImport: true,
      },
      init: (options) => {
        return createMeteorWalletInjected({
          ...options,
          params: {
            iconUrl,
          },
        });
      },
    };
  };
}
