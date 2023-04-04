import type {
  WalletModuleFactory,
  InjectedWallet,
  Action,
  FunctionCallAction,
  WalletBehaviourFactory,
} from "@near-wallet-selector/core";
import detectEthereumProvider from "@metamask/detect-provider";
import { FastAuthMetaMaskIcon } from "../assets/icons";
import {
  getNear,
  signIn,
  signOut,
  verifyOwner,
  isSignedIn,
  signAndSendTransactions,
  initConnection,
  METAMASK_URL,
} from "./neth-lib";
import isMobile from "is-mobile";
export { initConnection } from "./neth-lib";

declare global {
  interface Window {
    contractPath: string | null;
    ethereum: {
      chainId: string;
      // eslint-disable-next-line
      request: any;
    };
  }
}

export interface FastAuthMetaMaskParams {
  // default FastAuthMetaMask icon included
  iconUrl?: string;
  // default false
  deprecated?: boolean;
}

const isInstalled = async () => {
  await detectEthereumProvider({ timeout: 100 });
  return !!window.ethereum;
};

const FastAuthMetaMask: WalletBehaviourFactory<InjectedWallet> = async ({
  metadata,
  logger,
  store,
  options,
  provider,
}) => {

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

  const signTransactions = async (transactions) => {
    logger.log("FastAuthMetaMask:signAndSendTransactions", { transactions });

    const { contract } = store.getState();

    if (!(await isSignedIn()) || !contract) {
      throw new Error("Wallet not signed in");
    }

    const transformedTxs = transactions.map(({ receiverId, actions }) => ({
      receiverId: receiverId || contract.contractId,
      actions: transformActions(actions),
    }));

    let res;
    try {
      res = await signAndSendTransactions({
        transactions: transformedTxs,
      });
    } catch (e) {
      /// "user rejected signing" or near network error
      logger.log("FastAuthMetaMask:signAndSendTransactions Error", e);
      throw e;
    }

    return res;
  };

  // return the wallet interface for wallet-selector
  return {
    async signIn() {
      let account;
      try {
        account = await signIn();
        if (!account) {
          return [];
        }
      } catch (e) {
        if (!/not connected/.test((e as object).toString())) {
          throw e;
        }
        // console.log(e);
      }
      return [account];
    },

    async signOut() {
      await signOut();
    },

    async verifyOwner({ message }) {
      logger.log("FastAuthMetaMask:verifyOwner", { message });
      return verifyOwner({ message, provider, account: null });
    },

    async getAccounts() {
      const { accountId, account } = await getNear();
      return [
        {
          accountId,
          publicKey: (
            await account.connection.signer.getPublicKey(
              account.accountId,
              options.network.networkId
            )
          ).toString(),
        },
      ];
    },

    signAndSendTransaction: async ({ receiverId, actions }) =>
      signTransactions([{ receiverId, actions }]),

    signAndSendTransactions: async ({ transactions }) =>
      signTransactions(transactions),
  };
};

export function setupFastAuthMetaMask({
  iconUrl = FastAuthMetaMaskIcon,
  deprecated = false,
}: FastAuthMetaMaskParams = {}): WalletModuleFactory<InjectedWallet> {
  return async () => {

    const mobile = isMobile();
    if (mobile) {
      return null;
    }

    const installed = await isInstalled();

    return {
      id: "fastauth-metamask",
      type: "injected",
      metadata: {
        name: "MetaMask",
        description: null,
        iconUrl,
        downloadUrl: METAMASK_URL,
        deprecated: false,
        available: installed,
      },
      deprecated,
      init: FastAuthMetaMask,
    };
  };
}
