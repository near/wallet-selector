import ProviderService, {
  QueryParams,
  CallFunctionParams,
  ViewAccessKeyParams,
  ViewAccountParams,
} from "./ProviderService";
import { mock } from "jest-mock-extended";
import { JsonRpcProvider } from "near-api-js/lib/providers";
import { providers } from "near-api-js";
import {
  createQueryResponseMock,
  createFunctionCallResponseMock,
  createViewAccessKeyResponseMock,
  createViewAccountResponseMock,
} from "./providerServiceMocks";

const defaults = {
  url: "https://rpc.testnet.near.org",
};

const setup = (url: string) => {
  const provider = mock<JsonRpcProvider>();

  jest.spyOn(providers, "JsonRpcProvider").mockImplementation(() => provider);

  return {
    provider,
    service: new ProviderService(url),
  };
};

afterEach(() => {
  jest.resetAllMocks();
});

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

    provider.query.mockResolvedValue(createQueryResponseMock());

    await service.query(params);

    expect(provider.query).toHaveBeenCalledWith(params);
  });

  it("correctly parses the response", async () => {
    const { service, provider } = setup(defaults.url);
    const data = createQueryResponseMock();

    provider.query.mockResolvedValue(data);

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

    provider.query.mockResolvedValue(createFunctionCallResponseMock([]));

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

    provider.query.mockResolvedValue(createFunctionCallResponseMock(data));

    const response = await service.callFunction({
      accountId: "accountId",
      methodName: "methodName",
      args: {},
    });

    expect(response).toEqual(data);
  });
});

describe("viewAccessKey", () => {
  it("forwards params to the near-api-js JsonRpcProvider", async () => {
    const { service, provider } = setup(defaults.url);
    const params: ViewAccessKeyParams = {
      accountId: "accountId",
      publicKey: "publicKey",
    };

    provider.query.mockResolvedValue(createViewAccessKeyResponseMock());

    await service.viewAccessKey(params);

    expect(provider.query).toHaveBeenCalledWith({
      request_type: "view_access_key",
      finality: "final",
      account_id: params.accountId,
      public_key: params.publicKey,
    });
  });

  it("correctly parses the response", async () => {
    const { service, provider } = setup(defaults.url);
    const data = createViewAccessKeyResponseMock();

    provider.query.mockResolvedValue(data);

    const response = await service.viewAccessKey({
      accountId: "accountId",
      publicKey: "publicKey",
    });

    expect(response).toEqual(data);
  });
});

describe("viewAccount", () => {
  it("forwards params to the near-api-js JsonRpcProvider", async () => {
    const { service, provider } = setup(defaults.url);
    const params: ViewAccountParams = {
      accountId: "accountId",
    };

    provider.query.mockResolvedValue(createViewAccountResponseMock());

    await service.viewAccount(params);

    expect(provider.query).toHaveBeenCalledWith({
      request_type: "view_account",
      finality: "final",
      account_id: params.accountId,
    });
  });

  it("correctly parses the response", async () => {
    const { service, provider } = setup(defaults.url);
    const data = createViewAccountResponseMock();

    provider.query.mockResolvedValue(data);

    const response = await service.viewAccount({ accountId: "accountId" });

    expect(response).toEqual(data);
  });
});

describe("block", () => {
  it("forwards params to the near-api-js JsonRpcProvider", async () => {
    const { service, provider } = setup(defaults.url);
    const reference = {};

    // @ts-ignore
    provider.block.mockResolvedValue({});

    // @ts-ignore
    await service.block(reference);

    expect(provider.block).toHaveBeenCalledWith(reference);
  });

  it("correctly parses the response", async () => {
    const { service, provider } = setup(defaults.url);
    const reference = {};
    const data = {};

    // @ts-ignore
    provider.block.mockResolvedValue(data);

    // @ts-ignore
    const response = await service.block(reference);

    expect(response).toEqual(data);
  });
});

describe("sendTransaction", () => {
  it("forwards params to the near-api-js JsonRpcProvider", async () => {
    const { service, provider } = setup(defaults.url);
    const signedTransaction = {};

    // @ts-ignore
    provider.sendTransaction.mockResolvedValue({});

    // @ts-ignore
    await service.sendTransaction(signedTransaction);

    expect(provider.sendTransaction).toHaveBeenCalledWith(signedTransaction);
  });

  it("correctly parses the response", async () => {
    const { service, provider } = setup(defaults.url);
    const signedTransaction = {};
    const data = {};

    // @ts-ignore
    provider.sendTransaction.mockResolvedValue(data);

    // @ts-ignore
    const response = await service.sendTransaction(signedTransaction);

    expect(response).toEqual(data);
  });
});
