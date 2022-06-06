import type {
  InjectedWallet,
  WalletBehaviourFactory,
  WalletModuleFactory,
} from "@near-wallet-selector/core";
import { Account, waitFor } from "@near-wallet-selector/core";
import { createAction } from "@near-wallet-selector/wallet-utils";
import { isMobile } from "is-mobile";
import { utils } from "near-api-js";
import { AccessKeyView } from "near-api-js/lib/providers/provider";
import { createTransaction } from "near-api-js/lib/transaction";
import { PublicKey } from "near-api-js/lib/utils";
import type { NearNightly, NightlyInjected } from "./injected-nightly";

declare global {
  interface Window {
    nightly: NightlyInjected | undefined;
  }
}

const setupNightlyState = (): NearNightly | undefined => {
  return window.nightly?.near;
};

const Nightly: WalletBehaviourFactory<InjectedWallet> = async ({
  metadata,
  store,
  logger,
  provider,
}) => {
  const _state = setupNightlyState();
  const currentState = store.getState();
  if (currentState.selectedWalletId === "nightly") {
    try {
      // eager connect to the wallet
      await _state?.connect(undefined, true);
    } catch {
      // ignore
    }
  }
  const getAccounts = async () => {
    if (!_state || _state.account.accountId === "") {
      return [];
    }
    const nearAccount: Account = {
      accountId: _state.account.accountId,
    };
    return [nearAccount];
  };
  return {
    // nightly does not support delegating signing right now
    async signIn() {
      // If wallet does not exist user will be redirected to download page
      if (!_state) {
        window.location.href = metadata.downloadUrl;
        throw new Error("Redirecting to download");
      }
      const existingAccount = _state.account.accountId;

      if (existingAccount) {
        const nearAccount: Account = {
          accountId: _state.account.accountId,
        };
        return [nearAccount];
      }
      await _state.connect();

      return await getAccounts();
    },

    async signOut() {
      await _state!.disconnect();
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
        account_id: _state!.account.accountId,
        public_key: _state!.account.publicKey.toString(),
        request_type: "view_access_key",
        finality: "final",
      });
      const blockHash = utils.serialize.base_decode(blockInfo.block_hash);
      const tx = createTransaction(
        signerId || _state!.account.accountId,
        new PublicKey(_state!.account.publicKey),
        receiverId || contract!.contractId,
        ++blockInfo.nonce,
        actions.map((a) => createAction(a)),
        blockHash
      );
      const signedTransactions = await _state!.signTransaction(tx);
      const result = await provider.sendTransaction(signedTransactions);
      return result;
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("signAndSendTransactions", { transactions });
      const { contract } = store.getState();
      const blockInfo = await provider.query<AccessKeyView>({
        account_id: _state!.account.accountId,
        public_key: _state!.account.publicKey.toString(),
        request_type: "view_access_key",
        finality: "final",
      });

      const blockHash = utils.serialize.base_decode(blockInfo.block_hash);
      const txs = transactions.map((txData) => {
        if (!contract && txData.receiverId) {
          throw new Error("Recipient not found");
        }
        const tx = createTransaction(
          txData.signerId || _state!.account.accountId,
          new PublicKey(_state!.account.publicKey),
          txData.receiverId || contract!.contractId,
          ++blockInfo.nonce,
          txData.actions.map((a) => createAction(a)),
          blockHash
        );
        return tx;
      });
      const signedTransactions = await _state!.signAllTransactions(txs);
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
