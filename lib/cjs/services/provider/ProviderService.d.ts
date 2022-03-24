import { providers } from "near-api-js";
import { AccessKeyView, AccountView, BlockReference, QueryResponseKind, Finality } from "near-api-js/lib/providers/provider";
import { SignedTransaction } from "near-api-js/lib/transaction";
export declare type QueryParams = {
    [key in string]: unknown;
};
export interface CallFunctionParams {
    accountId: string;
    methodName: string;
    args?: object;
    finality?: Finality;
}
export interface ViewAccessKeyParams {
    accountId: string;
    publicKey: string;
}
export interface ViewAccountParams {
    accountId: string;
}
declare class ProviderService {
    private provider;
    constructor(url: string);
    private parseCodeResult;
    private encodeArgs;
    query<Response extends QueryResponseKind>(params: QueryParams): Promise<Response>;
    callFunction<Response>({ accountId, methodName, args, finality, }: CallFunctionParams): Promise<Response>;
    viewAccessKey({ accountId, publicKey }: ViewAccessKeyParams): Promise<AccessKeyView>;
    viewAccount({ accountId }: ViewAccountParams): Promise<AccountView>;
    block(reference: BlockReference): Promise<import("near-api-js/lib/providers/provider").BlockResult>;
    sendTransaction(signedTransaction: SignedTransaction): Promise<providers.FinalExecutionOutcome>;
}
export default ProviderService;
