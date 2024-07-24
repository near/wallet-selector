import { createAction } from "./wallet-utils";
import { transactions, utils } from "near-api-js";

const TEST_PUBLIC_KEY = "ed25519:Anu5D32fr5YsQGVULF4fz3R2E3pNaeUhj4hsKcE4vDyk";

describe("transformActions", () => {
  it("correctly transforms 'CreateAccount' action", () => {
    const actions = createAction({ type: "CreateAccount" });

    expect(actions).toEqual(transactions.createAccount());
  });

  it("correctly transforms 'DeployContract' action", () => {
    const code = Buffer.from("{}");

    const actions = createAction({
      type: "DeployContract",
      params: {
        code,
      },
    });

    expect(actions).toEqual(transactions.deployContract(code));
  });

  it("correctly transforms 'FunctionCall' action", () => {
    const args = Buffer.from("{}");
    const gas = "1";
    const deposit = "2";
    const methodName = "methodName";

    const actions = createAction({
      type: "FunctionCall",
      params: {
        methodName,
        args,
        gas,
        deposit,
      },
    });

    expect(actions).toEqual(
      transactions.functionCall(methodName, args, BigInt(gas), BigInt(deposit))
    );
  });

  it("correctly transforms 'Transfer' action", () => {
    const deposit = "1";
    const actions = createAction({
      type: "Transfer",
      params: {
        deposit,
      },
    });

    expect(actions).toEqual(transactions.transfer(BigInt(deposit)));
  });

  it("correctly transforms 'Stake' action", () => {
    const stake = "1";
    const publicKey = TEST_PUBLIC_KEY;

    const actions = createAction({
      type: "Stake",
      params: {
        stake,
        publicKey,
      },
    });

    expect(actions).toEqual(
      transactions.stake(BigInt(stake), utils.PublicKey.from(publicKey))
    );
  });

  it("correctly transforms 'AddKey' action with 'FullAccess' permission", () => {
    const publicKey = TEST_PUBLIC_KEY;
    const actions = createAction({
      type: "AddKey",
      params: {
        publicKey,
        accessKey: {
          permission: "FullAccess",
        },
      },
    });

    expect(actions).toEqual(
      transactions.addKey(
        utils.PublicKey.from(publicKey),
        transactions.fullAccessKey()
      )
    );
  });

  it("correctly transforms 'AddKey' action with 'FunctionCall' permission", () => {
    const publicKey = TEST_PUBLIC_KEY;
    const receiverId = "test.testnet";
    const allowance = "1";
    const methodNames = ["methodName"];

    const actions = createAction({
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
    });

    expect(actions).toEqual(
      transactions.addKey(
        utils.PublicKey.from(publicKey),
        transactions.functionCallAccessKey(
          receiverId,
          methodNames,
          BigInt(allowance)
        )
      )
    );
  });

  it("correctly transforms 'DeleteKey' action", () => {
    const publicKey = TEST_PUBLIC_KEY;

    const actions = createAction({
      type: "DeleteKey",
      params: {
        publicKey,
      },
    });

    expect(actions).toEqual(
      transactions.deleteKey(utils.PublicKey.from(publicKey))
    );
  });

  it("correctly transforms 'DeleteAccount' action", () => {
    const beneficiaryId = "test.testnet";

    const actions = createAction({
      type: "DeleteAccount",
      params: {
        beneficiaryId,
      },
    });

    expect(actions).toEqual(transactions.deleteAccount(beneficiaryId));
  });
});
