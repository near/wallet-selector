import { getState } from "../state/State";
import { CallParams, ViewParams } from "../interfaces/IWallet";

export default class SmartContract {
  private contractAddress: string;
  private viewMethods: string[];
  private changeMethods: string[];

  constructor(
    contractAddress: string,
    viewMethods: string[],
    changeMethods: string[]
  ) {
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

  view({ methodName, args }: Omit<ViewParams, "contractId">) {
    const state = getState();
    const walletId = state.signedInWalletId || "nearwallet";

    // TODO: Use main NEAR Connection and move away from wallets handling view methods.
    return state.walletProviders[walletId].view({
      contractId: this.contractAddress,
      methodName,
      args
    });
  }

  call({ actions }: Omit<CallParams, "receiverId">) {
    const state = getState();
    const walletId = state.signedInWalletId;

    if (!walletId) {
      throw new Error("Wallet not selected!");
    }

    return state.walletProviders[walletId].call({
      receiverId: this.contractAddress,
      actions,
    });
  }
}
