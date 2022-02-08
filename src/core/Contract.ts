import { getState } from "../state/State";
import { CallParams } from "../interfaces/IWallet";
import ProviderService, {
  CallFunctionParams,
} from "../services/provider/ProviderService";
import WalletController from "../controllers/WalletController";

class Contract {
  private readonly accountId: string;
  private readonly provider: ProviderService;
  private readonly controller: WalletController;

  constructor(
    accountId: string,
    provider: ProviderService,
    controller: WalletController
  ) {
    this.accountId = accountId;
    this.provider = provider;
    this.controller = controller;
  }

  getAccountId() {
    return this.accountId;
  }

  view({ methodName, args, finality }: Omit<CallFunctionParams, "accountId">) {
    return this.provider.callFunction({
      accountId: this.accountId,
      methodName,
      args,
      finality,
    });
  }

  async call({ actions }: Omit<CallParams, "receiverId">) {
    const state = getState();
    const walletId = state.signedInWalletId;

    if (!walletId) {
      throw new Error("Wallet not selected!");
    }

    const instance = this.controller.getInstance(walletId)!;

    return instance.call({
      receiverId: this.accountId,
      actions,
    });
  }
}

export default Contract;
