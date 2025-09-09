import { FailoverRpcProvider, JsonRpcProvider } from "@near-js/providers";
import type {
  AccessKeyView,
  BlockReference,
  QueryResponseKind,
  RpcQueryRequest,
} from "@near-js/types";
import type {
  ProviderService,
  QueryParams,
  ViewAccessKeyParams,
} from "./provider.service.types";
import type { SignedTransaction } from "@near-js/transactions";

export class Provider implements ProviderService {
  private provider: FailoverRpcProvider;

  constructor(urls: Array<string>) {
    this.provider = new FailoverRpcProvider(this.urlsToProviders(urls));
  }

  query<Response extends QueryResponseKind>(
    paramsOrPath: QueryParams | RpcQueryRequest | string,
    data?: string
  ): Promise<Response> {
    if (typeof paramsOrPath === "string" && data !== undefined) {
      return this.provider.query<Response>(paramsOrPath, data);
    } else {
      return this.provider.query<Response>(paramsOrPath as RpcQueryRequest);
    }
  }

  viewAccessKey({ accountId, publicKey }: ViewAccessKeyParams) {
    return this.query<AccessKeyView>({
      request_type: "view_access_key",
      finality: "final",
      account_id: accountId,
      public_key: publicKey,
    });
  }

  block(reference: BlockReference) {
    return this.provider.block(reference);
  }

  sendTransaction(signedTransaction: SignedTransaction) {
    return this.provider.sendTransaction(signedTransaction);
  }

  private urlsToProviders(urls: Array<string>) {
    return urls && urls.length > 0
      ? urls.map((url) => new JsonRpcProvider({ url }))
      : [];
  }
}
