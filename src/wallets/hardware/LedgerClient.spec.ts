import { DeepPartial } from "ts-essentials";
import { mock } from "jest-mock-extended";
import Transport from "@ledgerhq/hw-transport";
import TransportWebHID from "@ledgerhq/hw-transport-webhid";

interface CreateLedgerClientParams {
  client?: DeepPartial<TransportWebHID>;
  transport?: DeepPartial<Transport>;
}

const createLedgerClient = (params: CreateLedgerClientParams = {}) => {
  const client = mock<TransportWebHID>(params.client);
  const transport = mock<Transport>(params.transport);

  jest.mock("@ledgerhq/hw-transport-webhid", () => {
    return {
      ...client,
      create: () => transport,
    };
  });

  const LedgerClient = require("./LedgerClient").default;

  return {
    client: new LedgerClient(),
    transport,
  };
};

afterEach(() => {
  jest.resetModules();
});

describe("getVersion", () => {
  it("returns the current version", async () => {
    const { client, transport } = createLedgerClient({
      transport: {
        // TODO: Examine real response so this mock is reliable.
        send: jest.fn().mockResolvedValue(Buffer.from([1, 2, 3])),
      },
    });

    await client.connect();
    const result = await client.getVersion();

    expect(transport.send).toHaveBeenCalledWith(128, 6, 0, 0);
    expect(result).toEqual("1.2.3");
  });
});

describe("getPublicKey", () => {
  it("returns the public key", async () => {
    const { client, transport } = createLedgerClient({
      transport: {
        // TODO: Examine real response so this mock is reliable.
        send: jest.fn().mockResolvedValue(Buffer.from([1, 2, 3])),
      },
    });

    await client.connect();
    const result = await client.getPublicKey({
      derivationPath: "44'/397'/0'/0'/1'",
    });

    expect(transport.send).toHaveBeenCalledWith(
      128,
      4,
      0,
      87,
      // TODO: We should really expect a correctly formatted buffer.
      //  basically we'll be testing that 'parseDerivationPath' works as expected.
      expect.any(Buffer)
    );

    expect(result).toEqual("2");
  });
});

describe("sign", () => {
  it("returns the signature", async () => {
    const { client, transport } = createLedgerClient({
      transport: {
        send: jest.fn().mockResolvedValue(Buffer.from([1, 2, 3])),
      },
    });

    await client.connect();
    const result = await client.sign({
      data: Buffer.from([
        17, 0, 0, 0, 97, 109, 105, 114, 115, 97, 114, 97, 110, 46, 116, 101,
        115, 116, 110, 101, 116, 0, 226, 125, 56, 106, 199, 195, 73, 246, 10,
        249, 57, 121, 249, 233, 201, 22, 102, 15, 131, 165, 129, 76, 109, 40,
        170, 241, 102, 140, 43, 133, 200, 31, 2, 146, 147, 11, 47, 69, 0, 0, 18,
        0, 0, 0, 103, 117, 101, 115, 116, 45, 98, 111, 111, 107, 46, 116, 101,
        115, 116, 110, 101, 116, 211, 174, 138, 47, 84, 199, 21, 141, 240, 194,
        235, 66, 156, 178, 230, 10, 240, 60, 202, 182, 118, 176, 120, 45, 97,
        184, 167, 79, 177, 64, 149, 228, 1, 0, 0, 0, 2, 10, 0, 0, 0, 97, 100,
        100, 77, 101, 115, 115, 97, 103, 101, 14, 0, 0, 0, 123, 34, 116, 101,
        120, 116, 34, 58, 34, 97, 115, 100, 34, 125, 0, 224, 87, 235, 72, 27, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]),
      derivationPath: "44'/397'/0'/0'/1'",
    });
    expect(transport.send).toHaveBeenCalledWith(128, 6, 0, 0);
    expect(transport.send).toHaveBeenCalledWith(
      128,
      2,
      0,
      0,
      expect.any(Buffer)
    );
    expect(transport.send).toHaveBeenCalledWith(
      128,
      2,
      128,
      0,
      expect.any(Buffer)
    );
    expect(transport.send).toHaveBeenCalledTimes(3);
    expect(result).toEqual(Buffer.from([1]));
  });
});

describe("on", () => {
  it("add event to transport", async () => {
    const { client, transport } = createLedgerClient({
      transport: {
        off: jest.fn().mockResolvedValue({ remove: jest.fn() }),
      },
    });

    await client.connect();
    await client.on("connect", jest.fn());
    expect(transport.on).toHaveBeenCalledWith("connect", expect.any(Function));
    expect(transport.on).toHaveBeenCalledTimes(1);
  });
});

describe("off", () => {
  it("remove event from transport", async () => {
    const { client, transport } = createLedgerClient({
      transport: {
        off: jest.fn(),
      },
    });

    await client.connect();
    await client.off("connect", jest.fn());
    expect(transport.off).toHaveBeenCalledWith("connect", expect.any(Function));
    expect(transport.off).toHaveBeenCalledTimes(1);
  });
});

describe("setScrambleKey", () => {
  it("run setScrambleKey function", async () => {
    const { client, transport } = createLedgerClient({
      transport: {
        setScrambleKey: jest.fn(),
      },
    });

    await client.connect();
    await client.setScrambleKey("NEAR");
    expect(transport.setScrambleKey).toHaveBeenCalledWith("NEAR");
    expect(transport.setScrambleKey).toHaveBeenCalledTimes(1);
  });
});
