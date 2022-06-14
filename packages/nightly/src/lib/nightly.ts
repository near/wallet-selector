import type {
  InjectedWallet,
  WalletBehaviourFactory,
  WalletModuleFactory,
  WalletSelectorStore,
} from "@near-wallet-selector/core";
import { Account, waitFor } from "@near-wallet-selector/core";
import { createAction } from "@near-wallet-selector/wallet-utils";
import { isMobile } from "is-mobile";
import { utils } from "near-api-js";
import { AccessKeyView } from "near-api-js/lib/providers/provider";
import { createTransaction } from "near-api-js/lib/transaction";
import { PublicKey } from "near-api-js/lib/utils";
import type { NearNightly, InjectedNightly } from "./injected-nightly";

declare global {
  interface Window {
    nightly: InjectedNightly | undefined;
  }
}

interface NightlyState {
  wallet: NearNightly;
}

const setupNightlyState = async (
  store: WalletSelectorStore
): Promise<NightlyState> => {
  const { selectedWalletId } = store.getState();
  const wallet = window.nightly!.near!;
  // Attempt to reconnect wallet if previously selected.
  if (selectedWalletId === "nightly") {
    await wallet.connect(undefined, true).catch(() => null);
  }
  return {
    wallet,
  };
};
const isInstalled = () => {
  return waitFor(() => !!window.nightly!.near!).catch(() => false);
};
const Nightly: WalletBehaviourFactory<InjectedWallet> = async ({
  store,
  logger,
  provider,
}) => {
  const _state = await setupNightlyState(store);

  const getAccounts = async () => {
    if (!_state || _state.wallet.account.accountId === "") {
      return [];
    }
    const nearAccount: Account = {
      accountId: _state.wallet.account.accountId,
    };
    return [nearAccount];
  };
  return {
    // nightly does not support delegating signing right now
    async signIn() {
      const existingAccount = _state.wallet.account.accountId;

      if (existingAccount) {
        return await getAccounts();
      }

      await _state.wallet.connect();

      return await getAccounts();
    },

    async signOut() {
      await _state.wallet.disconnect();
    },

    async getAccounts() {
      return await getAccounts();
    },

    async signAndSendTransaction({ signerId, receiverId, actions }) {
      logger.log("signAndSendTransaction", { signerId, receiverId, actions });
      const { contract } = store.getState();

      if (!receiverId && !contract) {
        throw new Error("Recipient not found");
      }

      const blockInfo = await provider.query<AccessKeyView>({
        account_id: _state.wallet.account.accountId,
        public_key: _state.wallet.account.publicKey.toString(),
        request_type: "view_access_key",
        finality: "final",
      });
      const blockHash = utils.serialize.base_decode(blockInfo.block_hash);
      const tx = createTransaction(
        signerId || _state.wallet.account.accountId,
        new PublicKey(_state.wallet.account.publicKey),
        receiverId || contract!.contractId,
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
      const blockInfo = await provider.query<AccessKeyView>({
        account_id: _state.wallet.account.accountId,
        public_key: _state.wallet.account.publicKey.toString(),
        request_type: "view_access_key",
        finality: "final",
      });

      const blockHash = utils.serialize.base_decode(blockInfo.block_hash);
      const txs = transactions.map((txData) => {
        if (!contract && txData.receiverId) {
          throw new Error("Recipient not found");
        }
        const tx = createTransaction(
          txData.signerId || _state.wallet.account.accountId,
          new PublicKey(_state.wallet.account.publicKey),
          txData.receiverId || contract!.contractId,
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
    const installed = await isInstalled();

    if (mobile || !installed) {
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
