import State from "../state/State";

export default class SmartContract {
  private contractAddress: string;
  private viewMethods: string[];
  private changeMethods: string[];

  constructor(contractAddress: string, viewMethods: string[], changeMethods: string[]) {
    this.contractAddress = contractAddress;
    this.viewMethods = viewMethods;
    this.changeMethods = changeMethods;
  }

  getContractAddress() {
    return this.contractAddress;
  }

  getViewMethods() {
    return this.viewMethods;
  }

  getChangeMethods() {
    return this.changeMethods;
  }

  async callContract(method: string, args?: any, gas?: string, deposit?: string): Promise<any> {
    if (!State.signedInWalletId) {
      return State.walletProviders["nearwallet"].callContract(method, args, gas, deposit);
    }
    return State.walletProviders[State.signedInWalletId].callContract(method, args, gas, deposit);
  }
}
