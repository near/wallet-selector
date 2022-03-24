import ProviderService, { CallFunctionParams } from "../services/provider/ProviderService";
import WalletController from "../controllers/WalletController";
import { Options } from "../interfaces/Options";
import { SignAndSendTransactionParams } from "../wallets/Wallet";
declare class Contract {
    private readonly options;
    private readonly provider;
    private readonly controller;
    constructor(options: Options, provider: ProviderService, controller: WalletController);
    getContractId(): string;
    view<Response>({ methodName, args, finality, }: Omit<CallFunctionParams, "accountId">): Promise<Response>;
    signAndSendTransaction({ actions, }: Omit<SignAndSendTransactionParams, "receiverId">): Promise<import("near-api-js/lib/providers").FinalExecutionOutcome>;
}
export default Contract;
