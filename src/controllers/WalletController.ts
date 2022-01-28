import CustomWallet from "../wallets/CustomWallet";
import { getState, updateState } from "../state/State";
import NearWallet from "../wallets/browser/NearWallet";
import SenderWallet from "../wallets/injected/SenderWallet";
import LedgerWallet from "../wallets/hardware/LedgerWallet";
import EventHandler from "../utils/EventHandler";
import EventList from "../types/EventList";
import { LOCALSTORAGE_SIGNED_IN_WALLET_KEY } from "../constants";
import State from "../types/State";

class WalletController {
  constructor() {
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
          result.nearwallet = new NearWallet();
          break;
        case "senderwallet":
          result.senderwallet = new SenderWallet();
          break;
        case "ledgerwallet":
          result.ledgerwallet = new LedgerWallet();
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
    for (const name in state.options.customWallets) {
      state.walletProviders[name] = new CustomWallet(
        name,
        state.options.customWallets[name].name,
        state.options.customWallets[name].description,
        state.options.customWallets[name].icon,
        state.options.customWallets[name].onConnectFunction,
        state.options.customWallets[name].onDisconnectFunction,
        state.options.customWallets[name].isConnectedFunction
      );
    }
  }

  showModal() {
    updateState((prevState) => ({
      ...prevState,
      visible: true
    }));
  }

  hideModal() {
    updateState((prevState) => ({
      ...prevState,
      visible: false
    }));
  }

  isSignedIn() {
    const state = getState();
    return state.isSignedIn;
  }

  async signOut() {
    EventHandler.callEventHandler("disconnect");
    const state = getState();
    if (state.signedInWalletId !== null) {
      state.walletProviders[state.signedInWalletId].disconnect();
    }
    window.localStorage.removeItem(LOCALSTORAGE_SIGNED_IN_WALLET_KEY);
    updateState((prevState) => ({
      ...prevState,
      signedInWalletId: null,
      isSignedIn: false,
    }));
  }

  async getAccount() {
    const state = getState();
    if (state.signedInWalletId !== null) {
      return state.walletProviders[state.signedInWalletId].getAccount();
    }
    return null;
  }

  on(event: EventList, callback: () => void) {
    EventHandler.addEventHandler(event, callback);
  }
}

export default WalletController;
