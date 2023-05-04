import type {
  WalletModuleFactory,
  InjectedWallet,
  Action,
  FunctionCallAction,
  WalletBehaviourFactory,
} from "@near-wallet-selector/core";
import detectEthereumProvider from "@metamask/detect-provider";
import * as nearAPI from "near-api-js";
const { Account } = nearAPI;
import { FastAuthMetaMaskIcon } from "../assets/icons";
import {
  signIn,
  signOut,
  getConnection,
  getNethAccounts,
  initConnection,
  verifyOwner,
  isSignedIn,
  METAMASK_URL,
} from "./lib";
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
  // customize how much gas to attach to function calls
  gas?: string;
  // should there be a modal cover over the screen while awaiting tx results?
  useModalCover?: boolean;
  // default false
  deprecated?: boolean;
}

let useCover = false;
let customGas;

const isInstalled = async () => {
  await detectEthereumProvider({ timeout: 100 });
  return !!window.ethereum;
};

const FastAuthMetaMask: WalletBehaviourFactory<InjectedWallet> = async ({
  metadata,
  logger,
  store,
  storage,
  options,
  provider,
}) => {
  const cover = initConnection({
    network: options.network,
    logger,
    storage,
  });

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

    if (useCover) {
      cover.style.display = "block";
    }

    const transformedTxs = transactions.map(({ receiverId, actions }) => ({
      receiverId: receiverId || contract.contractId,
      actions: transformActions(actions),
    }));

    const accountInfo = await getNethAccounts();
    const account = new Account(getConnection(), accountInfo[0].accountId);

    let res;
    try {
      res = await (account as any).signAndSendTransactions({
        transactions: transformedTxs,
      });
    } catch (e) {
      /// "user rejected signing" or near network error
      logger.log("FastAuthMetaMask:signAndSendTransactions Error", e);
      throw e;
    }

    if (useCover) {
      cover.style.display = "none";
    }

    return res;
  };

  // return the wallet interface for wallet-selector
  return {
    async signIn() {
      let accounts;
      try {
        accounts = await signIn();
        if (!accounts) {
          return [];
        }
      } catch (e) {
        if (!/not connected/.test((e as object).toString())) {
          throw e;
        }
        // console.log(e);
      }
      return accounts;
    },

    async signOut() {
      await signOut();
    },

    async verifyOwner({ message }) {
      logger.log("FastAuthMetaMask:verifyOwner", { message });
      return verifyOwner({ message, provider });
    },

    async getAccounts() {
      return getNethAccounts();
    },

    async signAndSendTransaction({ receiverId, actions }) {
      return signTransactions([{ receiverId, actions }]);
    },

    async signAndSendTransactions({ transactions }) {
      return signTransactions(transactions);
    },
  };
};

export function setupFastAuthMetaMask({
  iconUrl = FastAuthMetaMaskIcon,
  gas,
  useModalCover = false,
  deprecated = false,
}: FastAuthMetaMaskParams = {}): WalletModuleFactory<InjectedWallet> {
  return async () => {
    useCover = useModalCover;
    customGas = gas;

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
