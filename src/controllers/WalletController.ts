import CustomWallet from "../wallets/CustomWallet";
import { getState, updateState } from "../state/State";
import NearWallet from "../wallets/browser/NearWallet";
import SenderWallet from "../wallets/injected/SenderWallet";
// import LedgerWallet from "../wallets/hardware/LedgerWallet";
import { Emitter } from "../utils/EventsHandler";
import { LOCALSTORAGE_SIGNED_IN_WALLET_KEY } from "../constants";
import EventList from "../types/EventList";
import State from "../types/State";
import ProviderService from "../services/provider/ProviderService";
import LedgerWalletV2 from "../wallets/hardware/LedgerWalletV2";

class WalletController {
  private emitter: Emitter;
  private provider: ProviderService;

  constructor(emitter: Emitter, provider: ProviderService) {
    this.emitter = emitter;
    this.provider = provider;

    this.generateDefaultWallets();
    this.generateCustomWallets();
  }

  private generateDefaultWallets() {
    const state = getState();

    const walletProviders = state.options.wallets.reduce<
      State["walletProviders"]
    >((result, wallet) => {
      switch (wallet) {
        case "nearwallet":
          result.nearwallet = new NearWallet(this.emitter, this.provider);
          break;
        case "senderwallet":
          result.senderwallet = new SenderWallet(this.emitter, this.provider);
          break;
        case "ledgerwallet":
          result.ledgerwallet = new LedgerWalletV2(this.emitter, this.provider);
          break;
        default:
          break;
      }
      return result;
    }, {});

    updateState((prevState) => ({
      ...prevState,
      walletProviders: {
        ...prevState.walletProviders,
        ...walletProviders,
      },
    }));
  }

  private generateCustomWallets() {
    const state = getState();

    for (const id in state.options.customWallets) {
      if (state.walletProviders[id]) {
        throw new Error(
          `Failed to add custom wallet. A wallet with the id '${id}' already exists`
        );
      }

      const options = state.options.customWallets[id];

      state.walletProviders[id] = new CustomWallet(
        this.emitter,
        this.provider,
        options
      );
    }
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
      await state.walletProviders[state.signedInWalletId].disconnect();
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

    if (state.signedInWalletId !== null) {
      return state.walletProviders[state.signedInWalletId].getAccount();
    }
    return null;
  }

  on(event: EventList, callback: () => void) {
    this.emitter.on(event, callback);
  }
}

export default WalletController;
