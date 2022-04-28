import { Action } from "./actions.types";

export interface Transaction {
  signerId: string;
  receiverId: string;
  actions: Array<Action>;
}
