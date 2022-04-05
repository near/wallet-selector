import { Action } from "./actions";

export interface Transaction {
  signerId: string;
  receiverId: string;
  actions: Array<Action>;
}
