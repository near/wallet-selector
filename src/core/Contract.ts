import { getState } from "../state/State";
import { CallParams } from "../interfaces/IWallet";
import ProviderService from "../services/provider/ProviderService";

interface ViewParams {
  methodName: string;
  args?: object;
}

class Contract {
  private readonly accountId: string;
  private readonly provider: ProviderService;

  constructor(accountId: string, provider: ProviderService) {
    this.accountId = accountId;
    this.provider = provider;
  }

  getAccountId() {
    return this.accountId;
  }

  view({ methodName, args }: ViewParams) {
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
