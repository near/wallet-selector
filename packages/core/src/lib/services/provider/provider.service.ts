import * as nearAPI from "near-api-js";
import type {
  AccessKeyView,
  BlockReference,
  QueryResponseKind,
} from "near-api-js/lib/providers/provider";
import type { SignedTransaction } from "near-api-js/lib/transaction";
import type {
  ProviderService,
  QueryParams,
  ViewAccessKeyParams,
} from "./provider.service.types";

export class Provider implements ProviderService {
  private provider: nearAPI.providers.JsonRpcProvider;

  constructor(url: string) {
    this.provider = new nearAPI.providers.JsonRpcProvider({ url });
  }

  query<Response extends QueryResponseKind>(params: QueryParams) {
    return this.provider.query<Response>(params);
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
}
