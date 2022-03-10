import { transformActions } from "./actions";
import { transactions } from "near-api-js";
import BN from "bn.js";

describe("actions", () => {
  it("correctly transforms 'CreateAccount' action", () => {
    const actions = transformActions([{ type: "CreateAccount" }]);
    expect(actions).toEqual([transactions.createAccount()]);
  });

  it("correctly transforms 'DeployContract' action", () => {
    const code = Buffer.from("{}");
    const actions = transformActions([
      {
        type: "DeployContract",
        params: {
          code,
        },
      },
    ]);

    expect(actions).toEqual([transactions.deployContract(code)]);
  });

  it("correctly transforms 'FunctionCall' action", () => {
    const serializedArgs = Buffer.from("{}");
    const gas = "01";
    const deposit = "02";
    const methodName = "methodName";

    const actions = transformActions([
      {
        type: "FunctionCall",
        params: {
          methodName,
          args: serializedArgs,
          gas,
          deposit,
        },
      },
    ]);

    expect(actions).toEqual([
      transactions.functionCall(
        methodName,
        serializedArgs,
        new BN(gas),
        new BN(deposit)
      ),
    ]);
  });

  it("correctly transforms 'Transfer' action", () => {
    const deposit = "01";
    const actions = transformActions([
      {
        type: "Transfer",
        params: {
          deposit,
        },
      },
    ]);

    expect(actions).toEqual([transactions.transfer(new BN(deposit))]);
  });
});
