import CustomWallet from "../wallets/CustomWallet";
import { getState, updateState } from "../state/State";
import NearWallet from "../wallets/browser/NearWallet";
import SenderWallet from "../wallets/injected/SenderWallet";
import LedgerWallet from "../wallets/hardware/LedgerWallet";
import { LOCALSTORAGE_SIGNED_IN_WALLET_KEY } from "../constants";
import ProviderService from "../services/provider/ProviderService";
import IWallet from "../interfaces/IWallet";
import { Options } from "../core/NearWalletSelector";

class WalletController {
  private options: Options;
  private provider: ProviderService;

  private instances: Array<IWallet>;

  constructor(options: Options, provider: ProviderService) {
    this.options = options;
    this.provider = provider;

    this.instances = [];
  }

  private getBuiltInWallets() {
    return this.options.wallets.map((walletId) => {
      switch (walletId) {
        case "nearwallet":
          return new NearWallet(this.provider, this.options);
        case "senderwallet":
          return new SenderWallet(this.provider, this.options);
        case "ledgerwallet":
          return new LedgerWallet(this.provider, this.options);
        default:
          throw new Error(`Invalid wallet id '${walletId}'`);
      }
    });
  }

  private getCustomWallets() {
    const wallets = [];

    for (const id in this.options.customWallets) {
      wallets.push(
        new CustomWallet(
          this.provider,
          this.options,
          this.options.customWallets[id]
        )
      );
    }

    return wallets;
  }

  async init() {
    this.instances = [...this.getBuiltInWallets(), ...this.getCustomWallets()];

    const state = getState();
    const walletId = state.signedInWalletId;

    if (walletId) {
      const instance = this.getInstance(walletId)!;

      await instance.init();
    }
  }

  getInstance(walletId: string) {
    return this.instances.find((wallet) => {
      const { id } = wallet.getInfo();

      return id === walletId;
    });
  }

  getInstances() {
    return this.instances;
  }

  showModal() {
    updateState((prevState) => ({
      ...prevState,
      showModal: true,
      showWalletOptions: true,
      showLedgerDerivationPath: false,
      showSenderWalletNotInstalled: false,
      showSwitchNetwork: false,
    }));
  }

  hideModal() {
    updateState((prevState) => ({
      ...prevState,
      showModal: false,
    }));
  }

  isSignedIn() {
    const state = getState();

    return state.isSignedIn;
  }

  async signIn(walletId: string) {
    const instance = this.getInstance(walletId);

    if (!instance) {
      throw new Error(`Invalid walletId '${walletId}'`);
    }

    await instance.signIn();

    localStorage.setItem(LOCALSTORAGE_SIGNED_IN_WALLET_KEY, walletId);

    updateState((prevState) => ({
      ...prevState,
      showModal: false,
      isSignedIn: true,
      signedInWalletId: walletId,
    }));
  }

  async signOut() {
    const state = getState();

    if (!state.signedInWalletId) {
      return;
    }

    const instance = this.getInstance(state.signedInWalletId)!;

    await instance.disconnect();

    window.localStorage.removeItem(LOCALSTORAGE_SIGNED_IN_WALLET_KEY);

    updateState((prevState) => ({
      ...prevState,
      signedInWalletId: null,
      isSignedIn: false,
    }));
  }

  async getAccount() {
    const state = getState();

    if (!state.signedInWalletId) {
      return null;
    }

    const instance = this.getInstance(state.signedInWalletId)!;

    return instance.getAccount();
  }
}

export default WalletController;
