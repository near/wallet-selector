import type { AccountView } from "near-api-js/lib/providers/provider";

export interface Message {
  premium: boolean;
  sender: string;
  text: string;
}

export type Account = AccountView & {
  account_id: string;
};
