import { getState } from "../state/State";
import ProviderService, {
  CallFunctionParams,
} from "../services/provider/ProviderService";
import WalletController from "../controllers/WalletController";
import { Options } from "./NearWalletSelector";
import { SignAndSendTransactionParams } from "../wallets/Wallet";

type CallParams = Omit<SignAndSendTransactionParams, "receiverId">;

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
    return this.options.contractId;
  }

  view({ methodName, args, finality }: Omit<CallFunctionParams, "accountId">) {
    return this.provider.callFunction({
      accountId: this.options.contractId,
      methodName,
      args,
      finality,
    });
  }

  async call({ actions }: CallParams) {
    const state = getState();
    const walletId = state.signedInWalletId;

    if (!walletId) {
      throw new Error("Wallet not selected!");
    }

    const instance = this.controller.getInstance(walletId)!;

    return instance.signAndSendTransaction({
      receiverId: this.options.contractId,
      actions,
    });
  }
}

export default Contract;
