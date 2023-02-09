import type { providers } from "near-api-js";

export interface GetAccountBalanceProps {
  provider: providers.Provider;
  accountId: string;
}
