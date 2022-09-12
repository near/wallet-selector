import {
  connect,
  keyStores,
  transactions as nearTransactions,
  utils,
} from "near-api-js";
import {
  InjectedWallet,
  Network,
  Optional,
  Transaction,
  WalletBehaviourFactory,
  WalletModuleFactory,
} from "@near-wallet-selector/core";
import {
  EMeteorWalletSignInType,
  MeteorWallet as MeteorWalletSdk,
} from "@meteorwallet/sdk";
import {
  MeteorWalletParams_Injected,
  MeteorWalletState,
} from "./meteor-wallet-types";
import { createAction } from "@near-wallet-selector/wallet-utils";
import icon from "./icon";

const setupWalletState = async (
  params: MeteorWalletParams_Injected,
  network: Network
): Promise<MeteorWalletState> => {
  const keyStore = new keyStores.BrowserLocalStorageKeyStore(
    window.localStorage,
    "_meteor_wallet"
  );

  const near = await connect({
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

  const cleanup = () => {
    _state.keyStore.clear();
  };

  const getAccounts = () => {
    const accountId = _state.wallet.getAccountId();

    if (!accountId) {
      return [];
    }

    return [{ accountId }];
  };

  const transformTransactions = async (
    transactions: Array<Optional<Transaction, "signerId">>
  ) => {
    const account = _state.wallet.account()!;
    const { networkId, signer, provider } = account.connection;

    const localKey = await signer.getPublicKey(account.accountId, networkId);

    for (const trx of transactions) {
      if (trx.signerId !== account.accountId) {
        throw new Error(
          `Transaction had a signerId which didn't match the currently logged in account`
        );
      }
    }

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

        return nearTransactions.createTransaction(
          account.accountId,
          utils.PublicKey.from(accessKey.public_key),
          transaction.receiverId,
          accessKey.access_key.nonce + index + 1,
          actions,
          utils.serialize.base_decode(block.header.hash)
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

      cleanup();
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
