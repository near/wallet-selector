import type { AccountView } from "near-api-js/lib/providers/provider";

export type Account = AccountView & {
  account_id: string | null;
};
