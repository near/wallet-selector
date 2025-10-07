import { PublicKey } from "@near-js/crypto";
import type { InternalAction } from "../wallet/transactions.types";
import {
  AccessKey,
  AccessKeyPermission,
  FullAccessPermission,
  FunctionCallPermission,
  type Action as NAJAction,
  actionCreators,
} from "@near-js/transactions";

// temp fix until we migrate Wallet Selector to use NAJ types
export const najActionToInternal = (action: NAJAction): InternalAction => {
  if (action.createAccount) {
    return { type: "CreateAccount" };
  }

  if (action.deployContract) {
    return {
      type: "DeployContract",
      params: { code: action.deployContract.code },
    };
  }

  if (action.functionCall) {
    const { methodName, args, gas, deposit } = action.functionCall;
    return {
      type: "FunctionCall",
      params: {
        methodName,
        args: JSON.parse(Buffer.from(args).toString()), // Convert Uint8Array to object
        gas: gas.toString(),
        deposit: deposit.toString(),
      },
    };
  }

  if (action.transfer) {
    return {
      type: "Transfer",
      params: { deposit: action.transfer.deposit.toString() },
    };
  }

  if (action.addKey) {
    const { publicKey, accessKey } = action.addKey;

    let permission:
      | "FullAccess"
      | { receiverId: string; methodNames: Array<string>; allowance?: string };
    if (
      "fullAccess" in accessKey.permission &&
      accessKey.permission.fullAccess
    ) {
      permission = "FullAccess";
    } else if (
      "functionCall" in accessKey.permission &&
      accessKey.permission.functionCall
    ) {
      const fc = accessKey.permission.functionCall;
      permission = {
        receiverId: fc!.receiverId,
        methodNames: fc!.methodNames || [],
        allowance: fc!.allowance ? fc!.allowance.toString() : undefined,
      };
    } else {
      throw new Error("Unsupported access key permission");
    }

    return {
      type: "AddKey",
      params: {
        publicKey: publicKey.toString(),
        accessKey: {
          nonce: Number(accessKey.nonce),
          permission,
        },
      },
    };
  }

  if (action.deleteKey) {
    return {
      type: "DeleteKey",
      params: { publicKey: action.deleteKey.publicKey.toString() },
    };
  }

  if (action.deleteAccount) {
    return {
      type: "DeleteAccount",
      params: { beneficiaryId: action.deleteAccount.beneficiaryId },
    };
  }

  throw new Error("Unsupported NAJ action");
};

export const internalActionToNaj = (action: InternalAction): NAJAction => {
  if (action.type === "CreateAccount") {
    return actionCreators.createAccount();
  }

  if (action.type === "DeployContract") {
    return actionCreators.deployContract(action.params.code);
  }

  if (action.type === "FunctionCall") {
    return actionCreators.functionCall(
      action.params.methodName,
      action.params.args,
      BigInt(action.params.gas),
      BigInt(action.params.deposit)
    );
  }

  if (action.type === "Transfer") {
    return actionCreators.transfer(BigInt(action.params.deposit));
  }

  if (action.type === "Stake") {
    return actionCreators.stake(
      BigInt(action.params.stake),
      PublicKey.from(action.params.publicKey)
    );
  }

  if (action.type === "AddKey") {
    return actionCreators.addKey(
      PublicKey.from(action.params.publicKey),
      new AccessKey({
        nonce: BigInt(action.params.accessKey.nonce ?? 0),
        permission: new AccessKeyPermission({
          ...(action.params.accessKey.permission === "FullAccess"
            ? { fullAccess: new FullAccessPermission() }
            : {
                functionCall: new FunctionCallPermission({
                  receiverId: action.params.accessKey.permission.receiverId!,
                  methodNames:
                    action.params.accessKey.permission.methodNames ?? [],
                  allowance: BigInt(
                    action.params.accessKey.permission.allowance ?? 0
                  ),
                }),
              }),
        }),
      })
    );
  }

  if (action.type === "DeleteKey") {
    return actionCreators.deleteKey(PublicKey.from(action.params.publicKey));
  }

  if (action.type === "DeleteAccount") {
    return actionCreators.deleteAccount(action.params.beneficiaryId);
  }

  throw new Error("Unsupported action type");
};
