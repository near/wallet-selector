import * as nearAPI from "near-api-js";
import type {
  AccessKeyView,
  BlockReference,
  QueryResponseKind,
  RpcQueryRequest,
} from "near-api-js/lib/providers/provider";
import type {
  ProviderService,
  QueryParams,
  ViewAccessKeyParams,
} from "./provider.service.types";
import { JsonRpcProvider } from "near-api-js/lib/providers";
import type { SignedTransaction } from "near-api-js/lib/transaction";

export class Provider implements ProviderService {
  private provider: nearAPI.providers.FailoverRpcProvider;

  constructor(urls: Array<string>) {
    this.provider = new nearAPI.providers.FailoverRpcProvider(
      this.urlsToProviders(urls)
    );
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
