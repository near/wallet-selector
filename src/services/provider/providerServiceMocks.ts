import { QueryResponseKind } from "near-api-js/lib/providers/provider";

export const createQueryResponseMock = (): QueryResponseKind => ({
  block_height: 0,
  block_hash: "",
});

export const createFunctionCallResponseMock = (data: unknown) => ({
  ...createQueryResponseMock(),
  result: JSON.stringify(data)
    .split("")
    .map((x) => x.charCodeAt(0)),
  logs: [],
});

export const createViewAccessKeyResponseMock = () => ({
  ...createQueryResponseMock(),
  nonce: 0,
  permission: "FullAccess",
});

export const createViewAccountResponseMock = () => ({
  ...createQueryResponseMock(),
  amount: "0",
  code_hash: "11111111111111111111111111111111",
  locked: "0",
  storage_paid_at: 0,
  storage_usage: 0,
});
