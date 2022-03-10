import BN from "bn.js";
import { transformActions } from "./actions";

describe("actions", () => {
  it("correctly transforms 'CreateAccount' action", () => {
    const actions = transformActions([
      {
        type: "CreateAccount",
        params: {
          account: {},
        },
      },
    ]);
    expect(actions).toEqual([
      {
        enum: "createAccount",
        createAccount: {},
      },
    ]);
  });

  it("correctly transforms 'DeployContract' action", () => {
    const actions = transformActions([
      {
        type: "DeployContract",
        params: {
          code: Buffer.from("{}"),
        },
      },
    ]);

    expect(actions).toEqual([
      {
        enum: "deployContract",
        deployContract: { code: Buffer.from("{}") },
      },
    ]);
  });

  it("correctly transforms 'FunctionCall' action", () => {
    const serializedArgs = Buffer.from("{}");
    const gas = new BN(1);
    const deposit = new BN(2);
    const actions = transformActions([
      {
        type: "FunctionCall",
        params: {
          methodName: "methodName",
          args: serializedArgs,
          gas,
          deposit,
        },
      },
    ]);

    expect(actions).toEqual([
      {
        enum: "functionCall",
        functionCall: {
          methodName: "methodName",
          args: serializedArgs,
          gas,
          deposit,
        },
      },
    ]);
  });

  it("correctly transforms 'Transfer' action", () => {
    const deposit = new BN("1");
    const actions = transformActions([
      {
        type: "Transfer",
        params: {
          deposit,
        },
      },
    ]);

    expect(actions).toEqual([
      {
        enum: "transfer",
        transfer: {
          deposit,
        },
      },
    ]);
  });
});
