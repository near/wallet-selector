import CustomWallet from "../wallets/CustomWallet";
import State from "../state/State";
import { LOCALSTORAGE_SIGNED_IN_WALLET_KEY } from "../constants";
import modalHelper from "../modal/ModalHelper";
import NearWallet from "../wallets/browser/NearWallet";
import SenderWallet from "../wallets/injected/SenderWallet";
import LedgerWallet from "../wallets/hardware/LedgerWallet";
import EventHandler from "../utils/EventHandler";
import EventList from "../types/EventList";

class WalletController {
  constructor() {
    this.generateDefaultWallets();
    this.generateCustomWallets();
  }

  private generateDefaultWallets() {
    State.options.wallets.forEach((wallet) => {
      switch (wallet) {
        case "nearwallet":
          State.walletProviders.nearwallet = new NearWallet();
          break;
        case "senderwallet":
          State.walletProviders.senderwallet = new SenderWallet();
          break;
        case "ledgerwallet":
          State.walletProviders.ledgerwallet = new LedgerWallet();
          break;
        default:
          break;
      }
    });
  }

  private generateCustomWallets() {
    for (const name in State.options.customWallets) {
      State.walletProviders[name] = new CustomWallet(
        name,
        State.options.customWallets[name].name,
        State.options.customWallets[name].description,
        State.options.customWallets[name].icon,
        State.options.customWallets[name].onConnectFunction,
        State.options.customWallets[name].onDisconnectFunction,
        State.options.customWallets[name].isConnectedFunction
      );
    }
  }

  public showModal() {
    modalHelper.showModal();
  }

  public hideModal() {
    modalHelper.hideModal();
  }

  public isSignedIn() {
    return State.isSignedIn;
  }

  public signOut() {
    if (State.signedInWalletId !== null) {
      State.walletProviders[State.signedInWalletId].disconnect();
    }
    localStorage.removeItem(LOCALSTORAGE_SIGNED_IN_WALLET_KEY);
    State.isSignedIn = false;
    State.signedInWalletId = null;
  }

  on(event: EventList, callback: () => void) {
    EventHandler.addEventHandler(event, callback);
  }
}

export default WalletController;
