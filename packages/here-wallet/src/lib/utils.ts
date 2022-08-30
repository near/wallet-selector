import { Network, Optional, Transaction } from "@near-wallet-selector/core";
import { createAction } from "@near-wallet-selector/wallet-utils";
import * as BN from "bn.js";
import {
  utils,
  connect,
  keyStores,
  WalletConnection,
  transactions as nearTransactions,
} from "near-api-js";

export interface HereWalletState {
  wallet: WalletConnection;
  keyStore: keyStores.BrowserLocalStorageKeyStore;
}

export interface HereConfiguration {
  hereWallet: string;
  hereContract: string;
}

export const hereConfigurations: Record<string, HereConfiguration> = {
  mainnet: {
    hereWallet: "https://web.herewallet.app",
    hereContract: "storage.herewallet.near",
  },
  testnet: {
    hereWallet: "https://web.testnet.herewallet.app",
    hereContract: "storage.herewallet.testnet",
  },
};

const setupWalletState = async (
  config: HereConfiguration,
  network: Network
): Promise<HereWalletState> => {
  const keyStore = new keyStores.BrowserLocalStorageKeyStore();
  const near = await connect({
    keyStore,
    walletUrl: config.hereWallet,
    headers: {},
    ...network,
  });

  const wallet = new WalletConnection(near, "here_app");

  // Cleanup up any pending keys (cancelled logins).
  if (!wallet.isSignedIn()) {
    await keyStore.clear();
  }

  return { wallet, keyStore };
};

const getHereBalance = async (
  state: HereWalletState,
  config: HereConfiguration
): Promise<BN> => {
  const params = { account_id: state.wallet.getAccountId() };
  const hereCoins = await state.wallet
    .account()
    .viewFunction(config.hereContract, "ft_balance_of", params)
    .catch(() => "0");

  return new BN(hereCoins);
};

const transformTransactions = async (
  state: HereWalletState,
  transactions: Array<Optional<Transaction, "signerId">>
) => {
  const account = state.wallet.account();
  const { networkId, signer, provider } = account.connection;
  const localKey = await signer.getPublicKey(account.accountId, networkId);

  return Promise.all(
    transactions.map(async (transaction, index) => {
      const actions = transaction.actions.map((action) => createAction(action));
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

export { setupWalletState, getHereBalance, transformTransactions };
