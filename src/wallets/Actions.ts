export interface CreateAccountAction {
  type: "CreateAccount";
}

export interface DeployContractAction {
  type: "DeployContract";
  action: {
    code: Uint8Array;
  };
}

export interface FunctionCallAction {
  type: "FunctionCall";
  action: {
    methodName: string;
    args: object;
    gas: string;
    deposit: string;
  };
}

export interface TransferAction {
  type: "Transfer";
  action: {
    deposit: string;
  };
}

export interface StakeAction {
  type: "Stake";
  action: {
    stake: string;
    publicKey: string;
  };
}

export interface AddKeyAction {
  type: "AddKey";
  action: {
    publicKey: string;
    // TODO: Determine the serializable version of `AccessKey`.
    accessKey: unknown;
  };
}

export interface DeleteKeyAction {
  type: "DeleteKey";
  action: {
    publicKey: string;
  };
}

export interface DeleteAccountAction {
  type: "DeleteAccount";
  action: {
    beneficiaryId: string;
  };
}

export type Action =
  | CreateAccountAction
  | DeployContractAction
  | FunctionCallAction
  | TransferAction
  | StakeAction
  | AddKeyAction
  | DeleteKeyAction
  | DeleteAccountAction;
