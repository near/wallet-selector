import { getState } from "../state/State";
import { CallParams, ViewParams } from "../interfaces/IWallet";
import ProviderService from "../services/ProviderService";

class Contract {
  private readonly accountId: string;
  private readonly provider: ProviderService;

  constructor(accountId: string, providerUrl: string) {
    this.accountId = accountId;
    this.provider = new ProviderService(providerUrl);
  }

  getAccountId() {
    return this.accountId;
  }

  view({ methodName, args }: Omit<ViewParams, "contractId">) {
    return this.provider.callFunction({
      accountId: this.accountId,
      methodName,
      args,
    });
  }

  async call({ actions }: Omit<CallParams, "receiverId">) {
    const state = getState();
    const walletId = state.signedInWalletId;

    if (!walletId) {
      throw new Error("Wallet not selected!");
    }

    return state.walletProviders[walletId].call({
      receiverId: this.accountId,
      actions,
    });
  }
}

export default Contract;
