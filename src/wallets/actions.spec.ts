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
    const args = Buffer.from("{}");
    const gas = "1";
    const deposit = "2";
    const methodName = "methodName";

    const actions = transformActions([
      {
        type: "FunctionCall",
        params: { methodName, args, gas, deposit },
      },
    ]);

    expect(actions).toEqual([
      transactions.functionCall(methodName, args, new BN(gas), new BN(deposit)),
    ]);
  });

  it("correctly transforms 'Transfer' action", () => {
    const deposit = "1";
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
