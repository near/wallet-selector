import ProviderService, {
  QueryParams,
  CallFunctionParams,
} from "./ProviderService";
import { mock } from "jest-mock-extended";
import { JsonRpcProvider } from "near-api-js/lib/providers";
import { providers } from "near-api-js";

const defaults = {
  url: "https://rpc.testnet.near.org",
};

const createResponseMock = (data: unknown) => ({
  block_height: 0,
  block_hash: "",
  result: JSON.stringify(data)
    .split("")
    .map((x) => x.charCodeAt(0)),
  logs: [],
});

const setup = (url: string) => {
  const provider = mock<JsonRpcProvider>();

  provider.query.mockResolvedValue(createResponseMock([]));

  jest.spyOn(providers, "JsonRpcProvider").mockImplementation(() => provider);

  return {
    provider,
    service: new ProviderService(url),
  };
};

describe("query", () => {
  it("forwards params to the near-api-js JsonRpcProvider", async () => {
    const { service, provider } = setup(defaults.url);
    const params: QueryParams = {
      request_type: "call_function",
      finality: "final",
      account_id: "accountId",
      method_name: "methodName",
      args_base64: "e30=",
    };

    await service.query(params);

    expect(provider.query).toHaveBeenCalledWith(params);
  });

  it("correctly parses the response", async () => {
    const { service, provider } = setup(defaults.url);
    const data: Array<unknown> = [];

    provider.query.mockResolvedValue(createResponseMock(data));

    const response = await service.query({
      request_type: "call_function",
      finality: "final",
      account_id: "accountId",
      method_name: "methodName",
      args_base64: "e30=",
    });

    expect(response).toEqual(data);
  });
});

describe("callFunction", () => {
  it("forwards params to the near-api-js JsonRpcProvider", async () => {
    const { service, provider } = setup(defaults.url);
    const params: CallFunctionParams = {
      accountId: "accountId",
      methodName: "methodName",
      args: {},
    };

    await service.callFunction(params);

    expect(provider.query).toHaveBeenCalledWith({
      request_type: "call_function",
      finality: "final",
      account_id: params.accountId,
      method_name: params.methodName,
      args_base64: Buffer.from(JSON.stringify(params.args)).toString("base64"),
    });
  });

  it("correctly parses the response", async () => {
    const { service, provider } = setup(defaults.url);
    const data: Array<unknown> = [];

    provider.query.mockResolvedValue(createResponseMock(data));

    const response = await service.callFunction({
      accountId: "accountId",
      methodName: "methodName",
      args: {},
    });

    expect(response).toEqual(data);
  });
});
