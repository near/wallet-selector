import { getState } from "../state/State";
import { CallParams } from "../interfaces/IWallet";
import ProviderService, {
  CallFunctionParams,
} from "../services/provider/ProviderService";
import WalletController from "../controllers/WalletController";
import { Options } from "./NearWalletSelector";

class Contract {
  private readonly options: Options;
  private readonly provider: ProviderService;
  private readonly controller: WalletController;

  constructor(
    options: Options,
    provider: ProviderService,
    controller: WalletController
  ) {
    this.options = options;
    this.provider = provider;
    this.controller = controller;
  }

  getAccountId() {
    return this.options.accountId;
  }

  view({ methodName, args, finality }: Omit<CallFunctionParams, "accountId">) {
    return this.provider.callFunction({
      accountId: this.options.accountId,
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
      receiverId: this.options.accountId,
      actions,
    });
  }
}

export default Contract;
