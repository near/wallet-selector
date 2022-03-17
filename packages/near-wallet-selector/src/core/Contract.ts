import ProviderService, {
  CallFunctionParams,
} from "../services/provider/ProviderService";
import WalletController from "../controllers/WalletController";
import { Options } from "../interfaces/Options";
import { SignAndSendTransactionParams } from "../wallets/Wallet";

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

  getContractId() {
    return this.options.contract.contractId;
  }

  view<Response>({
    methodName,
    args,
    finality,
  }: Omit<CallFunctionParams, "accountId">) {
    return this.provider.callFunction<Response>({
      accountId: this.options.contract.contractId,
      methodName,
      args,
      finality,
    });
  }

  async signAndSendTransaction({
    actions,
  }: Omit<SignAndSendTransactionParams, "receiverId">) {
    const wallet = this.controller.getSelectedWallet();

    if (!wallet) {
      throw new Error("Wallet not selected!");
    }

    return wallet.signAndSendTransaction({
      receiverId: this.options.contract.contractId,
      actions,
    });
  }
}

export default Contract;
