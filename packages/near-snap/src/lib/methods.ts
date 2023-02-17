import { getSnapOrigin } from "./utils";
import type { GetAccountPayload, Transaction } from "./types";
import { SignedTransaction } from "near-api-js/lib/transaction";

export async function enable(isDev: boolean): Promise<void> {
  await window.ethereum.request({
    method: "wallet_requestSnaps",
    params: {
      [getSnapOrigin(isDev)]: {},
    },
  });
}

export async function getSnapAccounts(
  isDev: boolean,
  network: string
): Promise<Array<GetAccountPayload>> {
  const account: GetAccountPayload = await window.ethereum.request({
    method: "wallet_invokeSnap",
    params: {
      snapId: getSnapOrigin(isDev),
      request: {
        method: "near_getAccount",
        params: { network },
      },
    },
  });
  return [account];
}

export async function signTransactions(
  isDev: boolean,
  network: string,
  transactions: Array<Transaction>
): Promise<Array<SignedTransaction>> {
  const signedTransactions: Array<[string, string]> =
    await window.ethereum.request({
      method: "wallet_invokeSnap",
      params: {
        snapId: getSnapOrigin(isDev),
        request: {
          method: "near_signTransactions",
          params: {
            network,
            transactions,
          },
        },
      },
    });

  return signedTransactions.map(([, signature]) =>
    SignedTransaction.decode(
      Buffer.from(Object.values(Uint8Array.from(Buffer.from(signature, "hex"))))
    )
  );
}
