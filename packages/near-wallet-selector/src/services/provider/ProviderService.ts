import { providers } from "near-api-js";
import {
  CodeResult,
  AccessKeyView,
  AccountView,
  BlockReference,
  QueryResponseKind,
  Finality,
} from "near-api-js/lib/providers/provider";
import { SignedTransaction } from "near-api-js/lib/transaction";

export type QueryParams = { [key in string]: unknown };

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

class ProviderService {
  private provider: providers.JsonRpcProvider;

  constructor(url: string) {
    this.provider = new providers.JsonRpcProvider(url);
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
export default ProviderService;
