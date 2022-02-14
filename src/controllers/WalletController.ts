import { getState, updateState } from "../state/State";
import NearWallet from "../wallets/browser/NearWallet";
import SenderWallet from "../wallets/injected/SenderWallet";
import LedgerWallet from "../wallets/hardware/LedgerWallet";
import { LOCALSTORAGE_SIGNED_IN_WALLET_KEY } from "../constants";
import ProviderService from "../services/provider/ProviderService";
import { Wallet } from "../wallets/Wallet";
import { Options } from "../core/NearWalletSelector";
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
        connect: () => {
          return wallet.connect().then(() => {
            localStorage.setItem(LOCALSTORAGE_SIGNED_IN_WALLET_KEY, wallet.id);

            updateState((prevState) => ({
              ...prevState,
              showModal: false,
              isSignedIn: true,
              signedInWalletId: wallet.id,
            }));

            this.emitter.emit("connect");
          });
        },
        disconnect: () => {
          return wallet.disconnect().then(() => {
            window.localStorage.removeItem(LOCALSTORAGE_SIGNED_IN_WALLET_KEY);

            updateState((prevState) => ({
              ...prevState,
              signedInWalletId: null,
              isSignedIn: false,
            }));

            this.emitter.emit("disconnect");
          });
        },
      };
    });
  }

  private getBuiltInWallets() {
    return this.options.wallets.map((walletId) => {
      switch (walletId) {
        case "near-wallet":
          return new NearWallet({
            options: this.options,
            provider: this.provider,
          });
        case "sender-wallet":
          return new SenderWallet({
            options: this.options,
            provider: this.provider,
          });
        case "ledger-wallet":
          return new LedgerWallet({
            options: this.options,
            provider: this.provider,
          });
        default:
          throw new Error(`Invalid wallet id '${walletId}'`);
      }
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

  isSignedIn() {
    const state = getState();

    return state.isSignedIn;
  }

  async disconnect() {
    const wallet = this.getSelectedWallet();

    if (!wallet) {
      return;
    }

    await wallet.disconnect();
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
