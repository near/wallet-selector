import type { AccountView } from "near-api-js/dist/esm/providers/provider";

export type Account = AccountView & {
  account_id: string | null;
};
