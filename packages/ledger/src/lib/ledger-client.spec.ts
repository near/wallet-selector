import type { DeepPartial } from "ts-essentials";
import { mock } from "jest-mock-extended";
import type Transport from "@ledgerhq/hw-transport";
import type TransportWebHID from "@ledgerhq/hw-transport-webhid";
import * as nearAPI from "near-api-js";

interface CreateLedgerClientParams {
  client?: DeepPartial<TransportWebHID>;
  transport?: DeepPartial<Transport>;
}

const createGetVersionResponseMock = () => {
  return Buffer.from([1, 1, 6, 144, 0]);
};

const createGetPublicKeyResponseMock = () => {
  return Buffer.from([
    226, 125, 56, 106, 199, 195, 73, 246, 10, 249, 57, 121, 249, 233, 201, 22,
    102, 15, 131, 165, 129, 76, 109, 40, 170, 241, 102, 140, 43, 133, 200, 31,
    144, 0,
  ]);
};

const createTransactionMock = () => {
  const actions = [
    nearAPI.transactions.functionCall(
      "addMessage",
      { text: "test" },
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      BigInt(nearAPI.utils.format.parseNearAmount("0.00000000003")!),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      BigInt(nearAPI.utils.format.parseNearAmount("0")!)
    ),
  ];

  return nearAPI.transactions.createTransaction(
    "test.testnet",
    nearAPI.utils.PublicKey.from(
      "GF7tLvSzcxX4EtrMFtGvGTb2yUj2DhL8hWzc97BwUkyC"
    ),
    "guest-book.testnet",
    76068360000003,
    actions,
    nearAPI.utils.serialize.base_decode(
      "DMgHVMag7MAmtEC17Dpvso5DgvqqYcHzrTpTrA86FG7t"
    )
  );
};

const createLedgerClient = (params: CreateLedgerClientParams = {}) => {
  const client = mock<TransportWebHID>(params.client);
  const transport = mock<Transport>(params.transport);

  jest.mock("@ledgerhq/hw-transport-webhid", () => {
    return {
      ...client,
      default: {
        create: () => transport,
      },
    };
  });

  const {
    LedgerClient,
    CLA,
    INS_SIGN,
    INS_GET_APP_VERSION,
    INS_GET_PUBLIC_KEY,
    P1_LAST,
    P1_IGNORE,
    P2_IGNORE,
    networkId,
    parseDerivationPath,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
  } = require("./ledger-client");

  return {
    client: new LedgerClient(),
    transport,
    parseDerivationPath,
    constants: {
      CLA,
      INS_SIGN,
      INS_GET_APP_VERSION,
      INS_GET_PUBLIC_KEY,
      P1_LAST,
      P1_IGNORE,
      P2_IGNORE,
      networkId,
    },
  };
};

afterEach(() => {
  jest.resetModules();
});

describe("getVersion", () => {
  it("returns the current version", async () => {
    const { client, transport, constants } = createLedgerClient({
      transport: {
        send: jest.fn().mockResolvedValue(createGetVersionResponseMock()),
      },
    });
    await client.connect();
    const result = await client.getVersion();

    expect(transport.send).toHaveBeenCalledWith(
      constants.CLA,
      constants.INS_GET_APP_VERSION,
      constants.P1_IGNORE,
      constants.P2_IGNORE
    );
    expect(result).toEqual("1.1.6");
  });
});

describe("getPublicKey", () => {
  it("returns the public key", async () => {
    const { client, transport, constants, parseDerivationPath } =
      createLedgerClient({
        transport: {
          send: jest.fn().mockResolvedValue(createGetPublicKeyResponseMock()),
        },
      });

    const derivationPath = "44'/397'/0'/0'/1'";

    await client.connect();
    const result = await client.getPublicKey({
      derivationPath,
    });

    expect(transport.send).toHaveBeenCalledWith(
      constants.CLA,
      constants.INS_GET_PUBLIC_KEY,
      constants.P1_IGNORE,
      constants.networkId,
      parseDerivationPath(derivationPath)
    );
    expect(result).toEqual("GF7tLvSzcxX4EtrMFtGvGTb2yUj2DhL8hWzc97BwUkyC");
  });
});

describe("sign", () => {
  it("returns the signature", async () => {
    const { client, transport, constants } = createLedgerClient({
      transport: {
        send: jest.fn().mockResolvedValue(Buffer.from([1, 2, 3])),
      },
    });

    const transaction = createTransactionMock();
    const data = nearAPI.transactions.encodeTransaction(transaction);

    await client.connect();
    const result = await client.sign({
      data,
      derivationPath: "44'/397'/0'/0'/1'",
    });

    expect(transport.send).toHaveBeenCalledWith(
      constants.CLA,
      constants.INS_GET_APP_VERSION,
      constants.P1_IGNORE,
      constants.P2_IGNORE
    );
    expect(transport.send).toHaveBeenCalledWith(
      constants.CLA,
      constants.INS_SIGN,
      constants.P1_IGNORE,
      constants.P2_IGNORE,
      expect.any(Buffer)
    );
    expect(transport.send).toHaveBeenCalledWith(
      constants.CLA,
      constants.INS_SIGN,
      constants.P1_LAST,
      constants.P2_IGNORE,
      expect.any(Buffer)
    );
    expect(transport.send).toHaveBeenCalledTimes(3);
    expect(result).toEqual(Buffer.from([1]));
  });
});

describe("on", () => {
  it("add event to transport", async () => {
    const { client, transport } = createLedgerClient();

    const event = "connect";
    const listener = jest.fn();

    await client.connect();
    await client.on(event, listener);

    expect(transport.on).toHaveBeenCalledWith(event, listener);
  });
});

describe("off", () => {
  it("remove event from transport", async () => {
    const { client, transport } = createLedgerClient();

    const event = "connect";
    const listener = jest.fn();

    await client.connect();
    await client.off(event, listener);

    expect(transport.off).toHaveBeenCalledWith(event, listener);
  });
});

describe("setScrambleKey", () => {
  it("run setScrambleKey function", async () => {
    const { client, transport } = createLedgerClient({
      transport: {
        setScrambleKey: jest.fn(),
      },
    });

    const scrambleKey = "NEAR";

    await client.connect();
    await client.setScrambleKey(scrambleKey);

    expect(transport.setScrambleKey).toHaveBeenCalledWith(scrambleKey);
  });
});
