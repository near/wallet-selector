import { getNetworkPreset, resolveOptions } from "./options";
import { createStore } from "./store";
import type {
  WalletSelector,
  WalletSelectorEvents,
  WalletSelectorParams,
} from "./wallet-selector.types";
import { EventEmitter, Logger, WalletModules, Provider } from "./services";
import type { Wallet } from "./wallet";
import type { Store, WalletSelectorState } from "./store.types";
import type { NetworkId, Options } from "./options.types";
import type {
  AccountView,
  FinalExecutionOutcome,
  RpcQueryRequest,
} from "near-api-js/lib/providers/provider";
import { providers } from "near-api-js";

let walletSelectorInstance: WalletSelector | null = null;

const createSelector = (
  options: Options,
  store: Store,
  walletModules: WalletModules,
  emitter: EventEmitter<WalletSelectorEvents>,
  provider: Provider
): WalletSelector => {
  return {
    options,
    store: store.toReadOnly(),
    wallet: async <Variation extends Wallet = Wallet>(id?: string) => {
      const { selectedWalletId } = store.getState();
      const wallet = await walletModules.getWallet<Variation>(
        id || selectedWalletId
      );

      if (!wallet) {
        if (id) {
          throw new Error("Invalid wallet id");
        }

        throw new Error("No wallet selected");
      }

      return wallet;
    },
    setActiveAccount: (accountId: string) => {
      const { accounts } = store.getState();

      if (!accounts.some((account) => account.accountId === accountId)) {
        throw new Error("Invalid account id");
      }

      store.dispatch({
        type: "SET_ACTIVE_ACCOUNT",
        payload: { accountId },
      });
    },
    setRememberRecentWallets: () => {
      const { rememberRecentWallets } = store.getState();

      store.dispatch({
        type: "SET_REMEMBER_RECENT_WALLETS",
        payload: { rememberRecentWallets },
      });
    },
    isSignedIn() {
      const { accounts } = store.getState();

      return Boolean(accounts.length);
    },
    on: (eventName, callback) => {
      return emitter.on(eventName, callback);
    },
    off: (eventName, callback) => {
      emitter.off(eventName, callback);
    },
    async getSignedAccountBalance() {
      const { accounts } = store.getState();
      if (!accounts.length) {
        return undefined;
      }

      const { accountId } = accounts.at(0)!;

      if (!accountId) {
        throw new Error(`Not signed in`);
      }

      const request: RpcQueryRequest = {
        request_type: "view_account",
        account_id: accountId,
        finality: "final",
      };
      const account = await provider.query<AccountView>(request);

      return account.amount || "0";
    },
    subscribeOnAccountChange(onAccountChangeFn) {
      this.store.observable.subscribe(async (state: WalletSelectorState) => {
        const signedAccount = state?.accounts.find(
          (account) => account.active
        )?.accountId;

        onAccountChangeFn(signedAccount || "");
      });
    },
    async signOut<Variation extends Wallet = Wallet>() {
      const { selectedWalletId } = store.getState();
      const wallet = await walletModules.getWallet<Variation>(selectedWalletId);
      if (wallet) {
        wallet.signOut();
      }
    },
    async viewMethod({
      contractId,
      method,
      args = {},
    }: {
      contractId: string;
      method: string;
      args?: Record<string, unknown>;
    }) {
      const request: RpcQueryRequest = {
        request_type: "call_function",
        account_id: contractId,
        method_name: method,
        args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
        finality: "optimistic",
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await provider.query<any>(request);

      return JSON.parse(Buffer.from(response.result).toString());
    },
    async callMethod({
      contractId,
      method,
      args = {},
      gas = "30000000000000",
      deposit = "0",
    }: {
      contractId: string;
      method: string;
      args?: Record<string, unknown>;
      gas?: string | number | bigint;
      deposit?: string | bigint;
    }) {
      const { selectedWalletId } = store.getState();
      const wallet = await walletModules.getWallet(selectedWalletId);

      if (!wallet) {
        throw new Error("No wallet selected");
      }

      const outcome = await wallet.signAndSendTransaction({
        receiverId: contractId,
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: method,
              args,
              gas: gas.toString(),
              deposit: deposit.toString(),
            },
          },
        ],
      });

      return providers.getTransactionLastResult(
        outcome as FinalExecutionOutcome
      );
    },
    async signAndSendTransactions({ transactions }) {
      const { selectedWalletId } = store.getState();
      const wallet = await walletModules.getWallet(selectedWalletId);

      if (!wallet) {
        throw new Error("No wallet selected");
      }

      return wallet.signAndSendTransactions({ transactions });
    },
  };
};

/**
 * Initiates a wallet selector instance
 * @param {WalletSelectorParams} params Selector parameters (network, modules...)
 * @returns {Promise<WalletSelector>} Returns a WalletSelector object
 */
export const setupWalletSelector = async (
  params: WalletSelectorParams
): Promise<WalletSelector> => {
  const { options, storage } = resolveOptions(params);
  Logger.debug = options.debug;

  const emitter = new EventEmitter<WalletSelectorEvents>();
  const store = await createStore(storage);
  const network = await getNetworkPreset(
    options.network.networkId as NetworkId,
    params.fallbackRpcUrls
  );

  const rpcProviderUrls =
    params.fallbackRpcUrls && params.fallbackRpcUrls.length > 0
      ? params.fallbackRpcUrls
      : [network.nodeUrl];

  const provider = new Provider(rpcProviderUrls);
  const walletModules = new WalletModules({
    factories: params.modules,
    storage,
    options,
    store,
    emitter,
    provider,
  });

  await walletModules.setup();

  if (params.allowMultipleSelectors) {
    return createSelector(options, store, walletModules, emitter, provider);
  }

  if (!walletSelectorInstance) {
    walletSelectorInstance = createSelector(
      options,
      store,
      walletModules,
      emitter,
      provider
    );
  }

  return walletSelectorInstance;
};
