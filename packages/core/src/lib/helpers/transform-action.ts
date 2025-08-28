import type { Action } from "../wallet/transactions.types";
import type { Action as NAJAction } from "@near-js/transactions";

// temp fix until we migrate Wallet Selector to use NAJ types
export const najActionToInternal = (action: NAJAction): Action => {
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
        args, // Uint8Array is accepted by wallet-selector
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
    if ("fullAccess" in accessKey.permission) {
      permission = "FullAccess";
    } else if ("functionCall" in accessKey.permission) {
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
