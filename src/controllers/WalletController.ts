import { getState, updateState } from "../state/State";
import NearWallet from "../wallets/browser/NearWallet";
import SenderWallet from "../wallets/injected/SenderWallet";
import LedgerWallet from "../wallets/hardware/LedgerWallet";
import { LOCALSTORAGE_SIGNED_IN_WALLET_KEY } from "../constants";
import ProviderService from "../services/provider/ProviderService";
import { Wallet } from "../wallets/Wallet";
import { BuiltInWalletId, Options } from "../core/NearWalletSelector";
import { Emitter } from "../utils/EventsHandler";

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
            localStorage.setItem(LOCALSTORAGE_SIGNED_IN_WALLET_KEY, wallet.id);

            updateState((prevState) => ({
              ...prevState,
              showModal: false,
              isSignedIn: true,
              signedInWalletId: wallet.id,
            }));

            this.emitter.emit("signIn");
          });
        },
        signOut: () => {
          return wallet.signOut().then(() => {
            window.localStorage.removeItem(LOCALSTORAGE_SIGNED_IN_WALLET_KEY);

            updateState((prevState) => ({
              ...prevState,
              signedInWalletId: null,
              isSignedIn: false,
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
      });
    });
  }

  async init() {
    this.wallets = this.decorateWallets(this.getBuiltInWallets());

    const state = getState();
    const walletId = state.signedInWalletId;

    if (walletId) {
      const wallet = this.getWallet(walletId)!;

      await wallet.init();
    }
  }

  getSelectedWallet() {
    const state = getState();
    const walletId = state.signedInWalletId;

    if (!walletId) {
      return null;
    }

    return this.getWallet(walletId);
  }

  private getWallet(walletId: string) {
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

    await wallet.signIn();
  }

  async signOut() {
    const wallet = this.getSelectedWallet();

    if (!wallet) {
      return;
    }

    await wallet.signOut();
  }

  isSignedIn() {
    const state = getState();

    return state.isSignedIn;
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
