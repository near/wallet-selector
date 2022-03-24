import { transactions } from "near-api-js";
export interface CreateAccountAction {
    type: "CreateAccount";
}
export interface DeployContractAction {
    type: "DeployContract";
    params: {
        code: Uint8Array;
    };
}
export interface FunctionCallAction {
    type: "FunctionCall";
    params: {
        methodName: string;
        args: object;
        gas: string;
        deposit: string;
    };
}
export interface TransferAction {
    type: "Transfer";
    params: {
        deposit: string;
    };
}
export interface StakeAction {
    type: "Stake";
    params: {
        stake: string;
        publicKey: string;
    };
}
export declare type AddKeyPermission = "FullAccess" | {
    receiverId: string;
    allowance?: string;
    methodNames?: Array<string>;
};
export interface AddKeyAction {
    type: "AddKey";
    params: {
        publicKey: string;
        accessKey: {
            nonce?: number;
            permission: AddKeyPermission;
        };
    };
}
export interface DeleteKeyAction {
    type: "DeleteKey";
    params: {
        publicKey: string;
    };
}
export interface DeleteAccountAction {
    type: "DeleteAccount";
    params: {
        beneficiaryId: string;
    };
}
export declare type Action = CreateAccountAction | DeployContractAction | FunctionCallAction | TransferAction | StakeAction | AddKeyAction | DeleteKeyAction | DeleteAccountAction;
export declare type ActionType = Action["type"];
export declare const transformActions: (actions: Array<Action>) => transactions.Action[];
