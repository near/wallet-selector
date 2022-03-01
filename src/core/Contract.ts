import ProviderService, {
  CallFunctionParams,
} from "../services/provider/ProviderService";
import WalletController from "../controllers/WalletController";
import { Options } from "./NearWalletSelector";
import {
  SignAndSendTransactionParams,
  SignAndSendTransactionsParams,
} from "../wallets/Wallet";

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
    return this.options.contract.accountId;
  }

  view({ methodName, args, finality }: Omit<CallFunctionParams, "accountId">) {
    return this.provider.callFunction({
      accountId: this.options.contract.accountId,
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
      receiverId: this.options.contract.accountId,
      actions,
    });
  }

  async signAndSendTransactions({
    transactions,
  }: SignAndSendTransactionsParams) {
    const wallet = this.controller.getSelectedWallet();

    if (!wallet) {
      throw new Error("Wallet not selected!");
    }

    return wallet.signAndSendTransactions({ transactions });
  }
}

export default Contract;
