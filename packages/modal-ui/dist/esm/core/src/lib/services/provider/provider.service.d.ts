import type { AccessKeyView, BlockReference, QueryResponseKind, RpcQueryRequest } from "@near-js/types";
import type { ProviderService, QueryParams, ViewAccessKeyParams } from "./provider.service.types";
import type { SignedTransaction } from "@near-js/transactions";
export declare class Provider implements ProviderService {
    private provider;
    constructor(urls: Array<string>);
    query<Response extends QueryResponseKind>(paramsOrPath: QueryParams | RpcQueryRequest | string, data?: string): Promise<Response>;
    viewAccessKey({ accountId, publicKey }: ViewAccessKeyParams): Promise<AccessKeyView>;
    block(reference: BlockReference): Promise<import("@near-js/types").BlockResult>;
    sendTransaction(signedTransaction: SignedTransaction): Promise<import("@near-js/types").FinalExecutionOutcome>;
    private urlsToProviders;
}
//# sourceMappingURL=provider.service.d.ts.map