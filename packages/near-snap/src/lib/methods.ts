import { getSnapId, getSnapOrigin } from "./utils";
import { GetAccountPayload, Transaction } from "./types";
import { SignedTransaction } from "near-api-js/lib/transaction";

export async function enable(isDev: boolean): Promise<void> {
  await window.ethereum.request({
    method: "wallet_enable",
    params: [
      {
        [`wallet_snap`]: {
          [getSnapOrigin(isDev)]: {},
        },
      },
    ],
  });
}

export async function getSnapAccounts(
  isDev: boolean,
  network: string
): Promise<Array<GetAccountPayload>> {
  const account: GetAccountPayload = await window.ethereum.request({
    method: getSnapId(isDev),
    params: [{ method: "near_getAccount", params: { network } }],
  });
  return [account];
}

export async function signTransactions(
  isDev: boolean,
  network: string,
  transactions: Array<Transaction>
): Promise<Array<SignedTransaction>> {
  const signedTransactions: Array<[Uint8Array, Uint8Array]> =
    await window.ethereum.request({
      method: getSnapId(isDev),
      params: [
        {
          method: "near_signTransactions",
          params: {
            network,
            transactions,
          },
        },
      ],
    });

  return signedTransactions.map(([, signature]) =>
    SignedTransaction.decode(Buffer.from(Object.values(signature)))
  );
}
