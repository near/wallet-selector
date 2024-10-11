import type { AccessKeyView, BlockReference, BlockResult, QueryResponseKind, FinalExecutionOutcome } from "@near-js/types";
import type { SignedTransaction } from "@near-js/transactions";
export type QueryParams = {
    [key in string]: unknown;
};
export interface ViewAccessKeyParams {
    accountId: string;
    publicKey: string;
}
export interface ProviderService {
    query<Response extends QueryResponseKind>(params: QueryParams): Promise<Response>;
    viewAccessKey(params: ViewAccessKeyParams): Promise<AccessKeyView>;
    block(reference: BlockReference): Promise<BlockResult>;
    sendTransaction(signedTransaction: SignedTransaction): Promise<FinalExecutionOutcome>;
}
//# sourceMappingURL=provider.service.types.d.ts.map