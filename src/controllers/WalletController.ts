import { getState, updateState } from "../state/State";
import ProviderService from "../services/provider/ProviderService";
import { Wallet } from "../wallets/Wallet";
import { BuiltInWalletId, Options } from "../interfaces/Options";
import { Emitter } from "../utils/EventsHandler";
import { LOCAL_STORAGE_SELECTED_WALLET_ID } from "../constants";

export interface SignInParams {
  walletId: BuiltInWalletId;
  accountId?: string;
  derivationPath?: string;
}

class WalletController {
  private options: Options;
  private provider: ProviderService;
  private emitter: Emitter;

  private wallets: Array<Wallet>;

  constructor(options: Options, provider: ProviderService, emitter: Emitter) {
    this.options = options;
    this.provider = provider;
    this.emitter = emitter;

    this.wallets = [];
  }

  private decorateWallets(wallets: Array<Wallet>) {
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

  private setupWalletModules() {
    return this.options.wallets.map((module) => {
      return module({
        options: this.options,
        provider: this.provider,
        emitter: this.emitter,
      });
    });
  }

  // TODO: Migrate to storage service (with JSON support).
  private getSelectedWalletId() {
    const selectedWalletId = localStorage.getItem(
      LOCAL_STORAGE_SELECTED_WALLET_ID
    );

    return selectedWalletId ? JSON.parse(selectedWalletId) : null;
  }

  async init() {
    this.wallets = this.decorateWallets(this.setupWalletModules());

    const selectedWalletId = this.getSelectedWalletId();
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
      window.localStorage.removeItem(LOCAL_STORAGE_SELECTED_WALLET_ID);
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

  async getAccount() {
    const wallet = this.getSelectedWallet();

    if (!wallet) {
      return null;
    }

    return wallet.getAccount();
  }
}

export default WalletController;
