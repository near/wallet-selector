import CustomWallet from "../wallets/CustomWallet";
import { getState, updateState } from "../state/State";
import NearWallet from "../wallets/browser/NearWallet";
import SenderWallet from "../wallets/injected/SenderWallet";
import LedgerWallet from "../wallets/hardware/LedgerWallet";
import { Emitter, EventList } from "../utils/EventsHandler";
import { LOCALSTORAGE_SIGNED_IN_WALLET_KEY } from "../constants";
import ProviderService from "../services/provider/ProviderService";
import IWallet from "../interfaces/IWallet";
import { Options } from "../core/NearWalletSelector";

class WalletController {
  private options: Options;
  private emitter: Emitter;
  private provider: ProviderService;

  private instances: Array<IWallet>;

  constructor(options: Options, emitter: Emitter, provider: ProviderService) {
    this.options = options;
    this.emitter = emitter;
    this.provider = provider;

    this.instances = [...this.getBuiltInWallets(), ...this.getCustomWallets()];
  }

  private getBuiltInWallets() {
    return this.options.wallets.map((walletId) => {
      switch (walletId) {
        case "nearwallet":
          return new NearWallet(this.emitter, this.provider, this.options);
        case "senderwallet":
          return new SenderWallet(this.emitter, this.provider, this.options);
        case "ledgerwallet":
          return new LedgerWallet(this.emitter, this.provider, this.options);
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
          this.emitter,
          this.provider,
          this.options,
          this.options.customWallets[id]
        )
      );
    }

    return wallets;
  }

  private getInstance(walletId: string) {
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

  async signOut() {
    const state = getState();

    if (state.signedInWalletId) {
      const instance = this.getInstance(state.signedInWalletId);

      if (instance) {
        await instance.disconnect();
      }
    }

    window.localStorage.removeItem(LOCALSTORAGE_SIGNED_IN_WALLET_KEY);

    updateState((prevState) => ({
      ...prevState,
      signedInWalletId: null,
      isSignedIn: false,
    }));

    this.emitter.emit("disconnect");
  }

  async getAccount() {
    const state = getState();

    if (state.signedInWalletId) {
      const instance = this.getInstance(state.signedInWalletId);

      if (instance) {
        return instance.getAccount();
      }
    }

    return null;
  }

  on(event: EventList, callback: () => void) {
    this.emitter.on(event, callback);
  }
}

export default WalletController;
