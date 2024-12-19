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

const createSignMessageMock = () => {
  /**
   * This is a hex encoded payload that is sent to the Ledger device.
   * message: "Makes it possible to authenticate users without having to add new access keys. This will improve UX, save money and will not increase the on-chain storage of the users' accounts./Makes it possible to authenticate users without having to add new access keys. This will improve UX, save money and will not increase the on-chain storage of the users' accounts./Makes it possible to authenticate users without having to add new access keys. This will improve UX, save money and will not increase the on-chain storage of the users' accounts.",
   * nonce: new Array(32).fill(42),
   * recipient: "alice.near",
   * callbackUrl: "myapp.com/callback",
   */
  const hexEncodedPayload =
    "180200004d616b657320697420706f737369626c6520746f2061757468656e74696361746520757365727320776974686f757420686176696e6720746f20616464206e657720616363657373206b6579732e20546869732077696c6c20696d70726f76652055582c2073617665206d6f6e657920616e642077696c6c206e6f7420696e63726561736520746865206f6e2d636861696e2073746f72616765206f662074686520757365727327206163636f756e74732e2f4d616b657320697420706f737369626c6520746f2061757468656e74696361746520757365727320776974686f757420686176696e6720746f20616464206e657720616363657373206b6579732e20546869732077696c6c20696d70726f76652055582c2073617665206d6f6e657920616e642077696c6c206e6f7420696e63726561736520746865206f6e2d636861696e2073746f72616765206f662074686520757365727327206163636f756e74732e2f4d616b657320697420706f737369626c6520746f2061757468656e74696361746520757365727320776974686f757420686176696e6720746f20616464206e657720616363657373206b6579732e20546869732077696c6c20696d70726f76652055582c2073617665206d6f6e657920616e642077696c6c206e6f7420696e63726561736520746865206f6e2d636861696e2073746f72616765206f662074686520757365727327206163636f756e74732e2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a0a000000616c6963652e6e65617201120000006d796170702e636f6d2f63616c6c6261636b";
  return Buffer.from(hexEncodedPayload, "hex");
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
    NEAR_INS,
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
      INS_SIGN_TRANSACTION: NEAR_INS.SIGN_TRANSACTION,
      INS_GET_APP_VERSION: NEAR_INS.GET_VERSION,
      INS_GET_PUBLIC_KEY: NEAR_INS.GET_PUBLIC_KEY,
      INS_NEP413_SIGN_MESSAGE: NEAR_INS.NEP413_SIGN_MESSAGE,
      INS_NEP366_SIGN_DELEGATE_ACTION: NEAR_INS.NEP366_SIGN_DELEGATE_ACTION,
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
      data: Buffer.from(data),
      derivationPath: "44'/397'/0'/0'/1'",
    });

    //Get version call
    expect(transport.send).toHaveBeenNthCalledWith(
      1,
      constants.CLA,
      constants.INS_GET_APP_VERSION,
      constants.P1_IGNORE,
      constants.P2_IGNORE
    );

    //Sign call
    expect(transport.send).toHaveBeenNthCalledWith(
      2,
      constants.CLA,
      constants.INS_SIGN_TRANSACTION,
      constants.P1_LAST,
      constants.P2_IGNORE,
      expect.any(Buffer)
    );

    expect(transport.send).toHaveBeenCalledTimes(2);
    expect(result).toEqual(Buffer.from([1]));
  });
});

describe("signMessage", () => {
  it("returns the signature", async () => {
    const { client, transport, constants } = createLedgerClient({
      transport: {
        send: jest.fn().mockResolvedValue(Buffer.from([1, 2, 3])),
      },
    });

    const data = createSignMessageMock();

    await client.connect();

    const result = await client.signMessage({
      data,
      derivationPath: "44'/397'/0'/0'/1'",
    });

    //Get version call
    expect(transport.send).toHaveBeenNthCalledWith(
      1,
      constants.CLA,
      constants.INS_GET_APP_VERSION,
      constants.P1_IGNORE,
      constants.P2_IGNORE
    );

    //Sign call 1
    expect(transport.send).toHaveBeenNthCalledWith(
      2,
      constants.CLA,
      constants.INS_NEP413_SIGN_MESSAGE,
      constants.P1_IGNORE,
      constants.P2_IGNORE,
      expect.any(Buffer)
    );

    //Sign call 2
    expect(transport.send).toHaveBeenNthCalledWith(
      3,
      constants.CLA,
      constants.INS_NEP413_SIGN_MESSAGE,
      constants.P1_IGNORE,
      constants.P2_IGNORE,
      expect.any(Buffer)
    );

    //Sign call 3
    expect(transport.send).toHaveBeenNthCalledWith(
      4,
      constants.CLA,
      constants.INS_NEP413_SIGN_MESSAGE,
      constants.P1_LAST,
      constants.P2_IGNORE,
      expect.any(Buffer)
    );

    expect(transport.send).toHaveBeenCalledTimes(4);
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
