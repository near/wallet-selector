interface SerializableFunctionCallAction {
  type: "functionCall";
  payload: {
    methodName: string;
    args: object;
    gas: string;
    deposit: string;
  }
}

interface SerializableTransferAction {
  type: "transfer";
  payload: {
    deposit: string;
  }
}

export type SerializableAction =
  | SerializableFunctionCallAction
  | SerializableTransferAction;