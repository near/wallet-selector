import Options from "../types/Options";
import WalletController from "../controllers/WalletController";
import modalHelper from "../modal/ModalHelper";
import State from "../state/State";
import INearWalletSelector from "../interfaces/INearWalletSelector";
import EventList from "../types/EventList";
import SmartContract from "../contracts/SmartContract";

export default class NearWalletSelector implements INearWalletSelector {
  private walletController: WalletController;
  private contract: SmartContract;

  constructor(options?: Options) {
    if (options) {
      State.options = {
        ...State.options,
        ...options,
      };
    }

    this.walletController = new WalletController();
    this.contract = new SmartContract(
      State.options.contract.address,
      State.options.contract.viewMethods,
      State.options.contract.changeMethods
    );

    if (State.signedInWalletId !== null) {
      State.walletProviders[State.signedInWalletId].init();
    }
    modalHelper.createModal();
  }

  public getContract() {
    return this.contract;
  }

  public showModal() {
    this.walletController.showModal();
  }

  public hideModal() {
    this.walletController.hideModal();
  }

  public isSignedIn() {
    return this.walletController.isSignedIn();
  }

  public signOut() {
    this.walletController.signOut();
  }

  public getAccount() {
    return this.walletController.getAccount();
  }

  public on(event: EventList, callback: () => void) {
    this.walletController.on(event, callback);
  }
}
