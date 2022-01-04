import Options from "../types/Options";
import WalletController from "../controllers/WalletController";
import modalHelper from "../modal/ModalHelper";
import State from "../state/State";
import INearWalletSelector from "../interfaces/INearWalletSelector";
import EventList from "../types/EventList";

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

    if (State.signedInWalletId !== null) {
      State.walletProviders[State.signedInWalletId].init();
    }
  }

  public showModal() {
    this.walletController.showModal();
  }


  public async getContract(){
    if (State.signedInWalletId !== null) {
      return await State.walletProviders[State.signedInWalletId].getContract();
    }
    return null
  }
  public async setContract(viewMethods: any, changeMethods: any){
    
    if (State.signedInWalletId !== null) {
      await State.walletProviders[State.signedInWalletId].setContract(viewMethods, changeMethods);
      return true
    }
    return false
  }

  public async getWallet(){
    if (State.signedInWalletId !== null)
      return  State.walletProviders[State.signedInWalletId].getWallet()
    return null
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
  
  public connected() {
    if (State.signedInWalletId !== null)
      window["walletConnection"] = State.walletProviders[State.signedInWalletId].getWallet()
  }


  public on(event: EventList, callback: () => void) {
    this.walletController.on(event, callback);
  }
}
