import { providers } from "near-api-js";
import {
  RpcQueryRequest,
  CodeResult,
  AccessKeyView,
  AccountView,
} from "near-api-js/lib/providers/provider";

interface CallFunctionParams {
  accountId: string;
  methodName: string;
  args?: object;
}

interface ViewAccessKeyParams {
  accountId: string;
  publicKey: string;
}

interface ViewAccountParams {
  accountId: string;
}

class ProviderService {
  private provider: providers.JsonRpcProvider;

  constructor(url: string) {
    this.provider = new providers.JsonRpcProvider(url);
  }

  private parseResponse<Response>(res: CodeResult): Response {
    return JSON.parse(Buffer.from(res.result).toString());
  }

  private encodeArgs(args: object) {
    return Buffer.from(JSON.stringify(args)).toString("base64");
  }

  query<Response>(params: RpcQueryRequest) {
    return this.provider
      .query<CodeResult>(params)
      .then((res) => this.parseResponse<Response>(res));
  }

  callFunction<Response>({
    accountId,
    methodName,
    args = {},
  }: CallFunctionParams) {
    return this.query<Response>({
      request_type: "call_function",
      finality: "final",
      account_id: accountId,
      method_name: methodName,
      args_base64: this.encodeArgs(args),
    });
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
}

export default ProviderService;
