import type { WalletModulesParams } from "./wallet-modules.service.types";
import type {
  SignInParams,
  Wallet,
  WalletEvents,
  WalletModule,
  WalletModuleFactory,
  WalletModuleFactoryV2,
  Account,
  InstantLinkWallet,
  SignMessageParams,
  Action,
} from "../../wallet";
import type { StorageService } from "../storage/storage.service.types";
import type { Options } from "../../options.types";
import type { ContractState, ModuleState, Store } from "../../store.types";
import { EventEmitter } from "../event-emitter/event-emitter.service";
import type { WalletSelectorEvents } from "../../wallet-selector.types";
import { Logger, logger } from "../logger/logger.service";
import {
  RECENTLY_SIGNED_IN_WALLETS,
  PACKAGE_NAME,
  PENDING_CONTRACT,
  PENDING_SELECTED_WALLET_ID,
  REMEMBER_RECENT_WALLETS,
  REMEMBER_RECENT_WALLETS_STATE,
} from "../../constants";
import { JsonStorage } from "../storage/json-storage.service";
import type { SignMessageMethod } from "../../wallet";
import type { ProviderService } from "../provider/provider.service.types";
import { IframeWalletAdapter } from "../iframe/iframe-adapter";

export class WalletModules {
  private factories: Array<WalletModuleFactory>;
  private storage: StorageService;
  private options: Options;
  private store: Store;
  private emitter: EventEmitter<WalletSelectorEvents>;
  private provider: ProviderService;

  private modules: Array<ModuleState>;
  private instances: Record<string, Wallet>;

  constructor({
    factories,
    storage,
    options,
    store,
    emitter,
    provider,
  }: WalletModulesParams) {
    this.factories = factories;
    this.storage = storage;
    this.options = options;
    this.store = store;
    this.emitter = emitter;
    this.provider = provider;

    this.modules = [];
    this.instances = {};
  }

  private async validateWallet(id: string | null) {
    let accounts: Array<Account> = [];
    const wallet = await this.getWallet(id);

    if (wallet) {
      // Ensure our persistent state aligns with the selected wallet.
      // For example a wallet is selected, but it returns no accounts (not signed in).
      accounts = await wallet.getAccounts().catch((err) => {
        logger.log(`Failed to validate ${wallet.id} during setup`);
        logger.error(err);

        return [];
      });
    }

    return accounts;
  }

  private async resolveStorageState() {
    const jsonStorage = new JsonStorage(this.storage, PACKAGE_NAME);
    const pendingSelectedWalletId = await jsonStorage.getItem<string>(
      PENDING_SELECTED_WALLET_ID
    );
    const pendingContract = await jsonStorage.getItem<ContractState>(
      PENDING_CONTRACT
    );
    const rememberRecentWallets = await jsonStorage.getItem<string>(
      REMEMBER_RECENT_WALLETS
    );

    if (pendingSelectedWalletId && pendingContract) {
      const accounts = await this.validateWallet(pendingSelectedWalletId);

      await jsonStorage.removeItem(PENDING_SELECTED_WALLET_ID);
      await jsonStorage.removeItem(PENDING_CONTRACT);

      if (accounts.length) {
        const { selectedWalletId } = this.store.getState();
        const selectedWallet = await this.getWallet(selectedWalletId);

        if (selectedWallet && pendingSelectedWalletId !== selectedWalletId) {
          await selectedWallet.signOut().catch((err) => {
            logger.log("Failed to sign out existing wallet");
            logger.error(err);
          });
        }

        let recentlySignedInWalletsFromPending: Array<string> = [];
        if (rememberRecentWallets === REMEMBER_RECENT_WALLETS_STATE.ENABLED) {
          recentlySignedInWalletsFromPending =
            await this.setWalletAsRecentlySignedIn(pendingSelectedWalletId);
        }
        return {
          accounts,
          contract: pendingContract,
          selectedWalletId: pendingSelectedWalletId,
          recentlySignedInWallets: recentlySignedInWalletsFromPending,
          rememberRecentWallets:
            rememberRecentWallets || REMEMBER_RECENT_WALLETS_STATE.ENABLED,
        };
      }
    }

    const { contract, selectedWalletId } = this.store.getState();
    const accounts = await this.validateWallet(selectedWalletId);

    const recentlySignedInWallets = await jsonStorage.getItem<Array<string>>(
      RECENTLY_SIGNED_IN_WALLETS
    );

    if (!accounts.length) {
      return {
        accounts: [],
        contract: null,
        selectedWalletId: null,
        recentlySignedInWallets: recentlySignedInWallets || [],
        rememberRecentWallets:
          rememberRecentWallets || REMEMBER_RECENT_WALLETS_STATE.ENABLED,
      };
    }

    return {
      accounts,
      contract,
      selectedWalletId,
      recentlySignedInWallets: recentlySignedInWallets || [],
      rememberRecentWallets:
        rememberRecentWallets || REMEMBER_RECENT_WALLETS_STATE.ENABLED,
    };
  }

  private async setWalletAsRecentlySignedIn(walletId: string) {
    const jsonStorage = new JsonStorage(this.storage, PACKAGE_NAME);

    let recentlySignedInWallets = await jsonStorage.getItem<Array<string>>(
      RECENTLY_SIGNED_IN_WALLETS
    );

    if (!recentlySignedInWallets) {
      recentlySignedInWallets = [];
    }

    if (!recentlySignedInWallets.includes(walletId)) {
      recentlySignedInWallets.unshift(walletId);
      recentlySignedInWallets = recentlySignedInWallets.slice(0, 5);
      await jsonStorage.setItem(
        RECENTLY_SIGNED_IN_WALLETS,
        recentlySignedInWallets
      );
    }

    return recentlySignedInWallets;
  }

  private async signOutWallet(walletId: string) {
    const wallet = (await this.getWallet(walletId))!;

    await wallet.signOut().catch((err) => {
      logger.log(`Failed to sign out ${wallet.id}`);
      logger.error(err);

      // At least clean up state on our side.
      this.onWalletSignedOut(wallet.id);
    });
  }

  private async onWalletSignedIn(
    walletId: string,
    { accounts, contractId, methodNames }: WalletEvents["signedIn"]
  ) {
    contractId = contractId || "";
    const { selectedWalletId, rememberRecentWallets } = this.store.getState();
    const jsonStorage = new JsonStorage(this.storage, PACKAGE_NAME);
    const contract = { contractId, methodNames };

    if (!accounts.length) {
      const module = this.getModule(walletId)!;
      // We can't guarantee the user will actually sign in with browser wallets.
      // Best we can do is set in storage and validate on init.
      if (module.type === "browser") {
        await jsonStorage.setItem(PENDING_SELECTED_WALLET_ID, walletId);
        await jsonStorage.setItem<ContractState>(PENDING_CONTRACT, contract);
      }

      return;
    }

    if (selectedWalletId && selectedWalletId !== walletId) {
      await this.signOutWallet(selectedWalletId);
    }

    let recentlySignedInWallets: Array<string> = [];
    if (rememberRecentWallets === REMEMBER_RECENT_WALLETS_STATE.ENABLED) {
      recentlySignedInWallets = await this.setWalletAsRecentlySignedIn(
        walletId
      );
    }

    this.store.dispatch({
      type: "WALLET_CONNECTED",
      payload: {
        walletId,
        contract,
        accounts,
        recentlySignedInWallets,
        rememberRecentWallets,
      },
    });

    this.emitter.emit("signedIn", {
      walletId,
      contractId,
      methodNames,
      accounts,
    });
  }

  private onWalletSignedOut(walletId: string) {
    this.store.dispatch({
      type: "WALLET_DISCONNECTED",
      payload: { walletId },
    });

    this.emitter.emit("signedOut", { walletId });
  }

  private setupWalletEmitter(walletId: string): EventEmitter<WalletEvents> {
    const emitter = new EventEmitter<WalletEvents>();

    emitter.on("signedOut", () => {
      this.onWalletSignedOut(walletId);
    });

    emitter.on("signedIn", (event) => {
      this.onWalletSignedIn(walletId, event);
    });

    emitter.on("accountsChanged", async ({ accounts }) => {
      this.emitter.emit("accountsChanged", { walletId: walletId, accounts });

      if (!accounts.length) {
        return this.signOutWallet(walletId);
      }

      this.store.dispatch({
        type: "ACCOUNTS_CHANGED",
        payload: { walletId: walletId, accounts },
      });
    });

    emitter.on("networkChanged", ({ networkId }) => {
      this.emitter.emit("networkChanged", { walletId: walletId, networkId });
    });

    emitter.on("uriChanged", ({ uri }) => {
      this.emitter.emit("uriChanged", { walletId: walletId, uri });
    });

    return emitter;
  }

  private validateSignMessageParams({
    message,
    nonce,
    recipient,
  }: SignMessageParams) {
    if (!message || message.trim() === "") {
      throw new Error("Invalid message. It must be a non-empty string.");
    }

    if (!Buffer.isBuffer(nonce) || nonce.length !== 32) {
      throw new Error(
        "Invalid nonce. It must be a Buffer with a length of 32 bytes."
      );
    }

    if (!recipient || recipient.trim() === "") {
      throw new Error("Invalid recipient. It must be a non-empty string.");
    }
  }

  private decorateWallet(wallet: Wallet): Wallet {
    const _signIn = wallet.signIn;
    const _signOut = wallet.signOut;
    const _signMessage = wallet.signMessage;
    const _createSignedTransaction = wallet.createSignedTransaction;

    wallet.signIn = async (params: never) => {
      const accounts = await _signIn(params);

      const { contractId, methodNames = [] } = params as SignInParams;
      await this.onWalletSignedIn(wallet.id, {
        accounts,
        contractId: contractId || "",
        methodNames,
      });

      return accounts;
    };

    wallet.signOut = async () => {
      await _signOut();
      this.onWalletSignedOut(wallet.id);
    };

    wallet.signMessage = async (params: never) => {
      if (_signMessage === undefined) {
        throw Error(
          `The signMessage method is not supported by ${wallet.metadata.name}`
        );
      }

      this.validateSignMessageParams(params);

      return await _signMessage(params);
    };

    wallet.createSignedTransaction = async (
      receiverId: string,
      actions: Array<Action>
    ) => {
      if (_createSignedTransaction === undefined) {
        throw Error(
          `The createSignedTransaction method is not supported by ${wallet.metadata.name}`
        );
      }

      return await _createSignedTransaction(receiverId, actions);
    };

    return wallet;
  }

  private async setupInstance(module: WalletModule): Promise<Wallet> {
    if (!module.metadata.available) {
      const message =
        module.type === "injected" ? "not installed" : "not available";
      throw Error(`${module.metadata.name} is ${message}`);
    }

    const wallet = {
      id: module.id,
      type: module.type,
      metadata: module.metadata,
      ...(await module.init({
        id: module.id,
        type: module.type,
        metadata: module.metadata,
        options: this.options,
        store: this.store.toReadOnly(),
        provider: this.provider,
        emitter: this.setupWalletEmitter(module.id),
        logger: new Logger(module.id),
        storage: new JsonStorage(this.storage, [PACKAGE_NAME, module.id]),
      })),
    } as Wallet;

    return this.decorateWallet(wallet) as Wallet & SignMessageMethod;
  }

  private bindWalletMethods(adapter: IframeWalletAdapter) {
    return {
      signIn: adapter.signIn.bind(adapter),
      signOut: adapter.signOut.bind(adapter),
      getAccounts: adapter.getAccounts.bind(adapter),
      verifyOwner: adapter.verifyOwner.bind(adapter),
      signAndSendTransaction: adapter.signAndSendTransaction.bind(adapter),
      signAndSendTransactions: adapter.signAndSendTransactions.bind(adapter),
      signTransaction: adapter.signTransaction.bind(adapter),
      signMessage: adapter.signMessage.bind(adapter),
      createSignedTransaction: adapter.createSignedTransaction.bind(adapter),
    };
  }

  private getModule(id: string | null) {
    return this.modules.find((x) => x.id === id);
  }

  async getWallet<Variation extends Wallet = Wallet>(id: string | null) {
    const module = this.getModule(id);

    if (!module) {
      return null;
    }

    const { selectedWalletId } = this.store.getState();

    // If user uninstalled/removed a wallet which was previously signed in with
    // best we can do is clean up state on our side.
    if (!module.metadata.available && selectedWalletId) {
      this.onWalletSignedOut(selectedWalletId);

      return null;
    }

    return (await module.wallet()) as Variation;
  }

  async setup() {
    await Promise.all(
      this.factories.map((factory, i) =>
        factory({ options: this.options })
          .then(async (module) => {
            // Filter out wallets that aren't available.
            if (!module) {
              return;
            }

            const moduleState = {
              id: module.id,
              type: module.type,
              metadata: module.metadata,
              listIndex: i,
              wallet: async () => {
                let instance = this.instances[module.id];

                if (instance) {
                  return instance;
                }

                instance = await this.setupInstance(module);

                this.instances[module.id] = instance;

                return instance;
              },
            };

            this.modules.push(moduleState);

            this.store.dispatch({
              type: "ADD_WALLET_MODULE",
              payload: {
                module: moduleState,
              },
            });

            if (moduleState.type !== "instant-link") {
              return;
            }

            const wallet = (await moduleState.wallet()) as InstantLinkWallet;
            if (!wallet.metadata.runOnStartup) {
              return;
            }

            try {
              await wallet.signIn({ contractId: wallet.getContractId() });
            } catch (err) {
              logger.error(
                "Failed to sign in to wallet. " + wallet.metadata.name + err
              );
            }
          })
          .catch((err) => {
            logger.log("Failed to setup module");
            logger.error(err);
          })
      )
    );
  }

  async setupV2(modules: Array<WalletModuleFactoryV2>) {
    const listIndex = this.modules.length;
    modules.forEach((module, idx) => {
      const wallet = {
        id: module.id,
        type: module.type,
        metadata: module.metadata,
        ...this.bindWalletMethods(
          new IframeWalletAdapter({
            options: {
              id: module.id,
              type: module.type,
              metadata: module.metadata,
              options: this.options,
              store: this.store.toReadOnly(),
              provider: this.provider,
              emitter: this.setupWalletEmitter(module.id),
              logger: new Logger(module.id),
              storage: new JsonStorage(this.storage, [PACKAGE_NAME, module.id]),
            },
            config: {
              source: module.source,
              permissions: module.permissions || [],
            },
          })
        ),
      } as unknown as Wallet;
      const moduleState: ModuleState = {
        id: module.id,
        type: module.type,
        metadata: module.metadata,
        listIndex: listIndex + idx,
        wallet: async () => this.decorateWallet(wallet),
      };

      this.modules.push(moduleState);
      this.store.dispatch({
        type: "ADD_WALLET_MODULE",
        payload: {
          module: moduleState,
        },
      });
      return;
    });
  }

  async resolveState() {
    const {
      accounts,
      contract,
      selectedWalletId,
      recentlySignedInWallets,
      rememberRecentWallets,
    } = await this.resolveStorageState();

    this.store.dispatch({
      type: "SETUP",
      payload: {
        accounts,
        contract,
        selectedWalletId,
        recentlySignedInWallets,
        rememberRecentWallets,
      },
    });
  }
}
