// @ts-nocheck
import type {
  WalletModuleFactory,
  InjectedWallet,
  Action,
  FunctionCallAction,
  WalletBehaviourFactory,
} from "@near-wallet-selector/core";
import detectEthereumProvider from "@metamask/detect-provider";
import { nethIcon } from "../assets/icons";
import {
  getNear,
  signIn,
  signOut,
  verifyOwner,
  isSignedIn,
  signAndSendTransactions,
  initConnection,
  NETH_SITE_URL,
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

export interface NethParams {
  // default NETH icon included
  iconUrl?: string;
  // default 200 Tgas - for each NETH transaction (bundling can include multiple "inner" transactions)
  gas?: string;
  // default false - cover screen with rgba(0, 0, 0, 0.5) mask while signing and awaiting transaction outcome
  useModalCover?: boolean;
  // default true - signAndSendTransactions will be bundled into 1 NETH TX
  bundle?: boolean;
  // default false
  deprecated?: boolean;
}

const isInstalled = async () => {
  await detectEthereumProvider({ timeout: 100 });
  return !!window.ethereum;
};

let bundle = true;
let useCover = false;
let customGas;

const Neth: WalletBehaviourFactory<InjectedWallet> = async ({
  metadata,
  logger,
  store,
  storage,
  options,
  provider,
}) => {
  const cover = initConnection({
    network: options.network,
    gas: customGas,
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
    logger.log("NETH:signAndSendTransactions", { transactions });

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

    let res;
    try {
      res = await signAndSendTransactions({
        transactions: transformedTxs,
        bundle,
      });
    } catch (e) {
      /// "user rejected signing" or near network error
      logger.log("NETH:signAndSendTransactions Error", e);
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
      logger.log("NETH:verifyOwner", { message });
      return verifyOwner({ message, provider, account: null });
    },

    async getAccounts() {
      const near = await getNear();
      if (!near) {
        logger.log("NETH:getAccounts");
        return [];
      }
      const { account, accountId } = near;
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

export function setupNeth({
  iconUrl = nethIcon,
  gas,
  useModalCover = false,
  bundle: _bundle = true,
  deprecated = false,
}: NethParams = {}): WalletModuleFactory<InjectedWallet> {
  return async () => {
    useCover = useModalCover;
    customGas = gas;
    bundle = _bundle;

    const mobile = isMobile();
    if (mobile) {
      return null;
    }

    const installed = await isInstalled();

    return {
      id: "neth",
      type: "injected",
      metadata: {
        name: "NETH Account",
        description: null,
        iconUrl,
        downloadUrl: NETH_SITE_URL,
        deprecated: false,
        available: installed,
      },
      deprecated,
      init: Neth,
    };
  };
}
