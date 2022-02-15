import { getState, updateState } from "../state/State";
import NearWallet from "../wallets/browser/NearWallet";
import SenderWallet from "../wallets/injected/SenderWallet";
import LedgerWallet from "../wallets/hardware/LedgerWallet";
import ProviderService from "../services/provider/ProviderService";
import { Wallet } from "../wallets/Wallet";
import { BuiltInWalletId, Options } from "../core/NearWalletSelector";
import { Emitter } from "../utils/EventsHandler";
import { LOCAL_STORAGE_SELECTED_WALLET_ID } from "../constants";

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
        signIn: () => {
          return wallet.signIn().then(() => {
            localStorage.setItem(
              LOCAL_STORAGE_SELECTED_WALLET_ID,
              JSON.stringify(wallet.id)
            );

            updateState((prevState) => ({
              ...prevState,
              showModal: false,
              selectedWalletId: wallet.id,
            }));

            this.emitter.emit("signIn");
          });
        },
        signOut: () => {
          return wallet.signOut().then(() => {
            window.localStorage.removeItem(LOCAL_STORAGE_SELECTED_WALLET_ID);

            updateState((prevState) => ({
              ...prevState,
              selectedWalletId: null,
            }));

            this.emitter.emit("signOut");
          });
        },
      };
    });
  }

  private lookupBuiltInWallet(walletId: BuiltInWalletId) {
    switch (walletId) {
      case "near-wallet":
        return NearWallet;
      case "sender-wallet":
        return SenderWallet;
      case "ledger-wallet":
        return LedgerWallet;
      default:
        throw new Error(`Invalid built-in wallet '${walletId}'`);
    }
  }

  private getBuiltInWallets() {
    return this.options.wallets.map((walletId) => {
      const BuiltInWallet = this.lookupBuiltInWallet(walletId);

      return new BuiltInWallet({
        options: this.options,
        provider: this.provider,
        emitter: this.emitter,
      });
    });
  }

  private getSelectedWalletId() {
    const selectedWalletId = localStorage.getItem(
      LOCAL_STORAGE_SELECTED_WALLET_ID
    );

    return selectedWalletId ? JSON.parse(selectedWalletId) : null;
  }

  async init() {
    this.wallets = this.decorateWallets(this.getBuiltInWallets());

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

  async signIn(walletId: BuiltInWalletId) {
    const wallet = this.getWallet(walletId);

    if (!wallet) {
      throw new Error(`Invalid built-in wallet '${walletId}'`);
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
