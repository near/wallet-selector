import { transformActions } from "./actions";
import { transactions, utils } from "near-api-js";
import { BN } from "bn.js";

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
        params: {
          methodName,
          args,
          gas,
          deposit,
        },
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

  it("correctly transforms 'Stake' action", () => {
    const stake = "1";
    const publicKey = "";

    const actions = transformActions([
      {
        type: "Stake",
        params: {
          stake,
          publicKey,
        },
      },
    ]);

    expect(actions).toEqual([
      transactions.stake(new BN(stake), utils.PublicKey.from(publicKey)),
    ]);
  });

  it("correctly transforms 'AddKey' action with 'FullAccess' permission", () => {
    const publicKey = "";
    const actions = transformActions([
      {
        type: "AddKey",
        params: {
          publicKey,
          accessKey: {
            permission: "FullAccess",
          },
        },
      },
    ]);

    expect(actions).toEqual([
      transactions.addKey(
        utils.PublicKey.from(publicKey),
        transactions.fullAccessKey()
      ),
    ]);
  });

  it("correctly transforms 'AddKey' action with 'FunctionCall' permission", () => {
    const publicKey = "";
    const receiverId = "test.testnet";
    const allowance = "1";
    const methodNames = ["methodName"];

    const actions = transformActions([
      {
        type: "AddKey",
        params: {
          publicKey,
          accessKey: {
            permission: {
              receiverId,
              allowance,
              methodNames,
            },
          },
        },
      },
    ]);

    expect(actions).toEqual([
      transactions.addKey(
        utils.PublicKey.from(publicKey),
        transactions.functionCallAccessKey(
          receiverId,
          methodNames,
          new BN(allowance)
        )
      ),
    ]);
  });

  it("correctly transforms 'DeleteKey' action", () => {
    const publicKey = "";

    const actions = transformActions([
      {
        type: "DeleteKey",
        params: {
          publicKey,
        },
      },
    ]);

    expect(actions).toEqual([
      transactions.deleteKey(utils.PublicKey.from(publicKey)),
    ]);
  });

  it("correctly transforms 'DeleteAccount' action", () => {
    const beneficiaryId = "test.testnet";

    const actions = transformActions([
      {
        type: "DeleteAccount",
        params: {
          beneficiaryId,
        },
      },
    ]);

    expect(actions).toEqual([transactions.deleteAccount(beneficiaryId)]);
  });
});
