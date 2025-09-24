import { createAction } from "./wallet-utils";
import { actionCreators } from "@near-js/transactions";
import { PublicKey } from "@near-js/crypto";

const { transfer: transferAction, stake: stakeAction, addKey, functionCall, deleteKey, createAccount, deployContract, deleteAccount } = actionCreators;

const TEST_PUBLIC_KEY = "ed25519:Anu5D32fr5YsQGVULF4fz3R2E3pNaeUhj4hsKcE4vDyk";

describe("transformActions", () => {
  it("correctly transforms 'CreateAccount' action", () => {
    const actions = createAction({ type: "CreateAccount" });

    expect(actions).toEqual(createAccount());
  });

  it("correctly transforms 'DeployContract' action", () => {
    const code = new Uint8Array(Buffer.from("{}"));

    const actions = createAction({
      type: "DeployContract",
      params: {
        code,
      },
    });

    expect(actions).toEqual(deployContract(code));
  });

  it("correctly transforms 'FunctionCall' action", () => {
    const args = new Uint8Array(Buffer.from("{}"));
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
      functionCall(methodName, args, BigInt(gas), BigInt(deposit))
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

    expect(actions).toEqual(transferAction(BigInt(deposit)));
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
      stakeAction(BigInt(stake), PublicKey.from(publicKey))
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
      addKey(
        PublicKey.from(publicKey),
        actionCreators.fullAccessKey()
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
      addKey(
        PublicKey.from(publicKey),
        actionCreators.functionCallAccessKey(
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
      deleteKey(PublicKey.from(publicKey))
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

    expect(actions).toEqual(deleteAccount(beneficiaryId));
  });
});
