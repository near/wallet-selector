import { providers } from "near-api-js";
import {
  CodeResult,
  AccessKeyView,
  AccountView,
  BlockReference,
  QueryResponseKind,
} from "near-api-js/lib/providers/provider";
import { SignedTransaction } from "near-api-js/lib/transaction";

export type QueryParams = { [key in string]: unknown };

export interface CallFunctionParams {
  accountId: string;
  methodName: string;
  args?: object;
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

  private parseCodeResult<Response>(res: CodeResult): Response {
    return JSON.parse(Buffer.from(res.result).toString());
  }

  private encodeArgs(args: object) {
    return Buffer.from(JSON.stringify(args)).toString("base64");
  }

  query<Response extends QueryResponseKind>(params: QueryParams) {
    return this.provider.query<Response>(params);
  }

  callFunction<Response>({
    accountId,
    methodName,
    args = {},
  }: CallFunctionParams) {
    return this.query<CodeResult>({
      request_type: "call_function",
      finality: "final",
      account_id: accountId,
      method_name: methodName,
      args_base64: this.encodeArgs(args),
    }).then((res) => this.parseCodeResult<Response>(res));
  }

  viewAccessKey({ accountId, publicKey }: ViewAccessKeyParams) {
    return this.query<AccessKeyView>({
      request_type: "view_access_key",
      finality: "final",
      account_id: accountId,
      public_key: publicKey,
    });
  }

  viewAccount({ accountId }: ViewAccountParams) {
    return this.query<AccountView>({
      request_type: "view_account",
      finality: "final",
      account_id: accountId,
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
