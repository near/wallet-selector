import { Options } from "./Options";
import { logger, storage, Provider, Emitter } from "./services";
import { Wallet, WalletEvents } from "./wallet";
import { NetworkConfiguration } from "./network";
import { getState, updateState } from "./state";
import { LOCAL_STORAGE_SELECTED_WALLET_ID } from "./constants";

export interface SignInParams {
  walletId: Wallet["id"];
  accountId?: string;
  derivationPath?: string;
}

class WalletController {
  private options: Options;
  private network: NetworkConfiguration;
  private provider: Provider;
  private emitter: Emitter<WalletEvents>;

  private wallets: Array<Wallet>;

  constructor(
    options: Options,
    network: NetworkConfiguration,
    emitter: Emitter<WalletEvents>
  ) {
    this.options = options;
    this.network = network;
    this.provider = new Provider(network.nodeUrl);
    this.emitter = emitter;

    this.wallets = [];
  }

  private decorateWallets(wallets: Array<Wallet>): Array<Wallet> {
    return wallets.map((wallet) => {
      return {
        ...wallet,
        signIn: async (params: never) => {
          const selectedWallet = this.getSelectedWallet();

          if (selectedWallet) {
            if (wallet.id === selectedWallet.id) {
              return;
            }

            await selectedWallet.signOut();
          }

          return wallet.signIn(params);
        },
      };
    });
  }

  private setupWalletModules(): Array<Wallet> {
    return this.options.wallets.map((module) => {
      return module({
        options: this.options,
        network: this.network,
        provider: this.provider,
        emitter: this.emitter,
        logger,
        storage,
        updateState,
      });
    });
  }

  async init() {
    this.wallets = this.decorateWallets(this.setupWalletModules());

    const selectedWalletId = storage.getItem<string>(
      LOCAL_STORAGE_SELECTED_WALLET_ID
    );

    const wallet = this.getWallet(selectedWalletId);

    if (wallet) {
      await wallet.init();
      const signedIn = await wallet.isSignedIn();

      if (signedIn) {
        updateState((prevState) => ({
          ...prevState,
          selectedWalletId,
        }));

        return;
      }
    }

    if (selectedWalletId) {
      storage.removeItem(LOCAL_STORAGE_SELECTED_WALLET_ID);
    }
  }

  getSelectedWallet() {
    const state = getState();
    const walletId = state.selectedWalletId;

    return this.getWallet(walletId);
  }

  private getWallet(walletId: string | null) {
    if (!walletId) {
      return null;
    }

    return this.wallets.find((x) => x.id === walletId) || null;
  }

  getWallets() {
    return this.wallets;
  }

  async signIn({ walletId, accountId, derivationPath }: SignInParams) {
    const wallet = this.getWallet(walletId);

    if (!wallet) {
      throw new Error(`Invalid wallet '${walletId}'`);
    }

    if (wallet.type === "hardware") {
      if (!accountId) {
        throw new Error("Invalid account id");
      }

      if (!derivationPath) {
        throw new Error("Invalid derivation path");
      }

      return wallet.signIn({ accountId, derivationPath });
    }

    return wallet.signIn();
  }

  async signOut() {
    const wallet = this.getSelectedWallet();

    if (!wallet) {
      return;
    }

    return wallet.signOut();
  }

  isSignedIn() {
    const wallet = this.getSelectedWallet();

    if (!wallet) {
      return false;
    }

    return wallet.isSignedIn();
  }

  async getAccounts() {
    const wallet = this.getSelectedWallet();

    if (!wallet) {
      return [];
    }

    return wallet.getAccounts();
  }
}

export default WalletController;
