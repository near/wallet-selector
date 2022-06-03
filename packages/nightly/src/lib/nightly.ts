import type {
  InjectedWallet,
  InjectedWalletMetadata,
  WalletBehaviourFactory,
  WalletModuleFactory,
} from "@near-wallet-selector/core";
import { createAction } from "@near-wallet-selector/wallet-utils";
import { isMobile } from "is-mobile";
import { utils } from "near-api-js";
import { JsonRpcProvider } from "near-api-js/lib/providers";
import { createTransaction } from "near-api-js/lib/transaction";
import { Account, waitFor } from "@near-wallet-selector/core";
import type { NearNightly, NightlyInjected } from "./injected-nightly";
import { PublicKey } from "near-api-js/lib/utils";

declare global {
  interface Window {
    nightly: NightlyInjected | undefined;
  }
}

interface NightlyState {
  wallet: NearNightly;
}

const setupNightlyState = (meta: InjectedWalletMetadata): NightlyState => {
  const wallet = window.nightly?.near;
  if (!wallet) {
    window.location.href = meta.downloadUrl;
    throw new Error("Redirecting to download");
  }
  return {
    wallet: wallet,
  };
};

const Nightly: WalletBehaviourFactory<InjectedWallet> = async ({
  options,
  store,
  logger,
  metadata,
}) => {
  const _state = setupNightlyState(metadata);
  const provider = new JsonRpcProvider({ url: options.network.nodeUrl });
  const state = store.getState();

  if (state.selectedWalletId === "nightly") {
    await _state.wallet.connect();
  }
  return {
    // nightly does not support delegating signing right now
    async signIn() {
      const existingAccount = _state.wallet.account.accountId;

      if (existingAccount) {
        const nearAccount: Account = {
          accountId: _state.wallet.account.accountId,
        };
        return [nearAccount];
      }

      const { accountId } = await _state.wallet.connect();
      const nearAccount: Account = { accountId };
      return [nearAccount];
    },

    async signOut() {
      await _state.wallet.disconnect();
    },

    async getAccounts() {
      const nearAccount: Account = {
        accountId: _state.wallet.account.accountId,
      };
      return [nearAccount];
    },

    async signAndSendTransaction({ signerId, receiverId, actions }) {
      logger.log("signAndSendTransaction", { signerId, receiverId, actions });
      const { contract } = store.getState();

      if (!receiverId && !contract) {
        throw new Error("Recipient not found");
      }
      const blockInfo = await provider.query(
        `access_key/${_state.wallet.account.accountId}/${
          _state.wallet.account.publicKey.toString().split(":")[1]
        }`,
        ""
      );
      const blockHash = utils.serialize.base_decode(blockInfo.block_hash);
      const tx = createTransaction(
        signerId || _state.wallet.account.accountId,
        new PublicKey(_state.wallet.account.publicKey),
        receiverId || contract!.contractId,
        // @ts-expect-error
        ++blockInfo.nonce,
        actions.map((a) => createAction(a)),
        blockHash
      );
      const signedTransactions = await _state.wallet.signTransaction(tx);
      const result = await provider.sendTransaction(signedTransactions);
      return result;
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("signAndSendTransactions", { transactions });
      const { contract } = store.getState();
      const blockInfo = await provider.query(
        `access_key/${_state.wallet.account.accountId}/${
          _state.wallet.account.publicKey.toString().split(":")[1]
        }`,
        ""
      );

      const blockHash = utils.serialize.base_decode(blockInfo.block_hash);
      const txs = transactions.map((txData) => {
        if (!contract && txData.receiverId) {
          throw new Error("Recipient not found");
        }
        const tx = createTransaction(
          txData.signerId || _state.wallet.account.accountId,
          new PublicKey(_state.wallet.account.publicKey),
          txData.receiverId || contract!.contractId,
          // @ts-expect-error
          ++blockInfo.nonce,
          txData.actions.map((a) => createAction(a)),
          blockHash
        );
        return tx;
      });
      const signedTransactions = await _state.wallet.signAllTransactions(txs);
      logger.log(
        "signAndSendTransactions:signedTransactions",
        signedTransactions
      );
      return Promise.all(
        signedTransactions.map((tx) => provider.sendTransaction(tx))
      );
    },
  };
};

export interface NightlyWalletParams {
  iconUrl?: string;
}
export function setupNightly({
  iconUrl = "./assets/nightly.png",
}: NightlyWalletParams = {}): WalletModuleFactory<InjectedWallet> {
  return async () => {
    const mobile = isMobile();

    if (mobile) {
      return null;
    }

    await waitFor(() => !!window.nightly?.near, {
      timeout: 300,
    }).catch(() => false);

    return {
      id: "nightly",
      type: "injected",
      metadata: {
        name: "Nightly",
        description: null,
        iconUrl,
        // Will replace we open beta with stable version
        downloadUrl: "https://www.nightly.app",
        deprecated: false,
      },
      init: Nightly,
    };
  };
}
