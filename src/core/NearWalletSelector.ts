import Options from "../types/Options";
import WalletController from "../controllers/WalletController";
import modalHelper from "../modal/ModalHelper";
import State from "../state/State";
import INearWalletSelector from "../interfaces/INearWalletSelector";

export default class NearWalletSelector implements INearWalletSelector {
  private walletController: WalletController;

  constructor(options?: Options) {
    if (options) {
      State.options = {
        ...State.options,
        ...options,
      };
    }

    this.walletController = new WalletController();

    modalHelper.createModal();
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

  public async init() {
    return this.walletController.init();
  }
}
