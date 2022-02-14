import { getState, updateState } from "../state/State";
import NearWallet from "../wallets/browser/NearWallet";
import SenderWallet from "../wallets/injected/SenderWallet";
import LedgerWallet from "../wallets/hardware/LedgerWallet";
import { LOCALSTORAGE_SIGNED_IN_WALLET_KEY } from "../constants";
import ProviderService from "../services/provider/ProviderService";
import { Wallet } from "../wallets/Wallet";
import { Options } from "../core/NearWalletSelector";

class WalletController {
  private options: Options;
  private provider: ProviderService;

  private wallets: Array<Wallet>;

  constructor(options: Options, provider: ProviderService) {
    this.options = options;
    this.provider = provider;

    this.wallets = [];
  }

  private getBuiltInWallets() {
    return this.options.wallets.map((walletId) => {
      switch (walletId) {
        case "near-wallet":
          return new NearWallet({
            provider: this.provider,
            options: this.options,
          });
        case "sender-wallet":
          return new SenderWallet({
            provider: this.provider,
            options: this.options,
          });
        case "ledger-wallet":
          return new LedgerWallet({
            provider: this.provider,
            options: this.options,
          });
        default:
          throw new Error(`Invalid wallet id '${walletId}'`);
      }
    });
  }

  async init() {
    this.wallets = this.getBuiltInWallets();

    const state = getState();
    const walletId = state.signedInWalletId;

    if (walletId) {
      const wallet = this.getWallet(walletId)!;

      await wallet.connect();
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

  getWallet(walletId: string) {
    return this.wallets.find((x) => x.id === walletId) || null;
  }

  getWallets() {
    return this.wallets;
  }

  isSignedIn() {
    const state = getState();

    return state.isSignedIn;
  }

  async connect(walletId: string) {
    const wallet = this.getWallet(walletId);

    if (!wallet) {
      throw new Error(`Invalid walletId '${walletId}'`);
    }

    await wallet.connect();

    localStorage.setItem(LOCALSTORAGE_SIGNED_IN_WALLET_KEY, walletId);

    updateState((prevState) => ({
      ...prevState,
      showModal: false,
      isSignedIn: true,
      signedInWalletId: walletId,
    }));
  }

  async disconnect() {
    const wallet = this.getSelectedWallet();

    if (!wallet) {
      return;
    }

    await wallet.disconnect();

    window.localStorage.removeItem(LOCALSTORAGE_SIGNED_IN_WALLET_KEY);

    updateState((prevState) => ({
      ...prevState,
      signedInWalletId: null,
      isSignedIn: false,
    }));
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
