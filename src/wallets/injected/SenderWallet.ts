import ISenderWallet from "../../interfaces/ISenderWallet";
import InjectedWallet from "../types/InjectedWallet";
import EventHandler from "../../utils/EventHandler";
import State from "../../state/State";
import modalHelper from "../../modal/ModalHelper";

export default class SenderWallet extends InjectedWallet implements ISenderWallet {
  private contract: any;

  constructor() {
    super("senderwallet", "Sender Wallet", "Sender Wallet", "https://senderwallet.io/logo.png", "wallet");
  }

  async walletSelected() {
    if (!window[this.injectedGlobal]) {
      modalHelper.hideSelectWalletOptionModal();
      modalHelper.openSenderWalletNotInstalledMessage();
      return;
    }

    const rpcResponse = await window[this.injectedGlobal].getRpc();

    if (State.options.networkId !== rpcResponse.rpc.networkId) {
      modalHelper.openSwitchNetworkMessage();
      modalHelper.hideSelectWalletOptionModal();
      return;
    }

    // await this.init();
    await this.signIn();
  }

  async signIn() {
    const response = await window[this.injectedGlobal].requestSignIn({
      contractId: State.options.contract.address,
    });
    console.log(response);

    if (response.accessKey) {
      this.setWalletAsSignedIn();
      EventHandler.callEventHandler("signIn");
      modalHelper.hideModal();
    }
  }

  async init() {
    await super.init();
    window[this.injectedGlobal].onAccountChanged((newAccountId: string) => {
      console.log("newAccountId: ", newAccountId);
    });
    window[this.injectedGlobal].init({ contractId: State.options.contract.address }).then((res: any) => {
      console.log(res);
    });
    EventHandler.callEventHandler("init");
  }

  async isConnected(): Promise<boolean> {
    return window[this.injectedGlobal].isSignedIn();
  }

  disconnect() {
    EventHandler.callEventHandler("disconnect");
    return window[this.injectedGlobal].signOut();
  }

  async getAccount() {
    return {
      accountId: window[this.injectedGlobal].getAccountId(),
      balance: "99967523358427624000000000",
    };
  }

  async callContract(method: string, args?: any, gas?: string, deposit?: string): Promise<any> {
    if (!this.contract) {
      if (!State.nearConnection) return;
      this.contract = await State.nearConnection.loadContract(State.options.contract.address, {
        viewMethods: State.options.contract.viewMethods,
        changeMethods: State.options.contract.changeMethods,
        sender: window[this.injectedGlobal].getAccountId(),
      });
    }
    console.log(this.contract, method, args, gas, deposit);
    return this.contract[method](args);
  }
}
