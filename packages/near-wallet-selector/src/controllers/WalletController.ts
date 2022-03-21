import { getState, updateState } from "../state/State";
import ProviderService from "../services/provider/ProviderService";
import { Wallet } from "../wallets/Wallet";
import { BuiltInWalletId, Options } from "../interfaces/Options";
import { Emitter } from "../utils/EventsHandler";
import { LOCAL_STORAGE_SELECTED_WALLET_ID } from "../constants";
import { storage } from "../services/persistent-storage.service";
import { logger } from "../services/logging.service";
import setupNearWallet from "../wallets/browser/NearWallet";
import setupSenderWallet from "../wallets/injected/SenderWallet";
import setupLedgerWallet from "../wallets/hardware/LedgerWallet";
import setupMathWallet from "../wallets/injected/MathWallet";

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
    return this.options.wallets
      .map((walletId) => {
        switch (walletId) {
          case "near-wallet":
            return setupNearWallet();
          case "sender-wallet":
            return setupSenderWallet();
          case "ledger-wallet":
            return setupLedgerWallet();
          case "math-wallet":
            return setupMathWallet();
          default:
            throw new Error("Invalid wallet id");
        }
      })
      .map((module) => {
        return module({
          options: this.options,
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

  async getAccountId() {
    const wallet = this.getSelectedWallet();

    if (!wallet) {
      return null;
    }

    return wallet.getAccountId();
  }

  async setAccountId(accountId: string) {
    const wallet = this.getSelectedWallet();

    if (!wallet) {
      return;
    }

    return wallet.setAccountId(accountId);
  }
}

export default WalletController;
