import {
  WalletModuleFactory,
  WalletBehaviourFactory,
  InjectedWallet,
  FinalExecutionOutcome,
} from "@near-wallet-selector/core";
import { SignedTransaction } from "near-api-js/lib/transaction";
import { GetAccountPayload, GetSnapsResponse } from "./types";

const NearSnapWallet: WalletBehaviourFactory<InjectedWallet> = async ({
  options,
  provider,
  store,
}) => {
  // "npm@chainsafe/near-snap"
  // "local:http://localhost:8081"

  const network = options.network.networkId as "testnet" | "mainnet";

  async function getSnapAccounts(): Promise<Array<GetAccountPayload>> {
    let accounts: Array<GetAccountPayload> = [];
    const snaps: GetSnapsResponse = await window.ethereum.request({
      method: "wallet_getSnaps",
    });
    //if snap is installed return account
    if (snaps["local:http://localhost:8081"]) {
      const account: GetAccountPayload = await window.ethereum.request({
        method: "wallet_snap_local:http://localhost:8081",
        params: [{ method: "near_getAccount", params: { network } }],
      });
      accounts = [account];
    }

    return accounts;
  }

  return {
    async signIn() {
      // Sign in to My Wallet for access to account(s).
      await window.ethereum.request({
        method: "wallet_enable",
        params: [
          {
            [`wallet_snap`]: {
              "local:http://localhost:8081": {},
            },
          },
        ],
      });

      const getAccountPayload = await getSnapAccounts();

      return [{ accountId: getAccountPayload[0].accountId }];
    },

    async signOut() {
      // Sign out from accounts and cleanup (e.g. listeners).
    },

    async getAccounts() {
      // Return list of signed in accounts.
      const getAccountPayload = await getSnapAccounts();
      return [{ accountId: getAccountPayload[0].accountId }];
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async verifyOwner() { },

    async signAndSendTransaction({ receiverId, actions }) {
      const accountPayload = await getSnapAccounts();
      const { accountId, publicKey } = accountPayload[0];

      const accessKey = await provider.viewAccessKey({ accountId, publicKey });

      const { contract } = store.getState();

      if (!contract) {
        throw new Error("Wallet not signed in");
      }

      const result: Array<[Uint8Array, Uint8Array]> =
        await window.ethereum.request({
          method: "wallet_snap_local:http://localhost:8081",
          params: [
            {
              method: "near_signTransactions",
              params: {
                network,
                transactions: [
                  {
                    receiverId: receiverId || contract.contractId,
                    actions,
                    nonce: ++accessKey.nonce,
                    recentBlockHash: accessKey.block_hash,
                  },
                ],
              },
            },
          ],
        });
      const signedTx = SignedTransaction.decode(
        Buffer.from(Object.values(result[0][1]))
      );

      const finalResult: FinalExecutionOutcome = await provider.sendTransaction(
        signedTx
      );

      return finalResult;
    },

    async signAndSendTransactions({ transactions }) {
      //near_signTransactions
      const accountPayload = await getSnapAccounts();
      const { accountId, publicKey } = accountPayload[0];
      const accessKey = await provider.viewAccessKey({ accountId, publicKey });
      let nonce = accessKey.nonce;

      const transactionsWithNoncePromise = async () => {
        return Promise.all(
          transactions.map(async (transaction) => {
            const { receiverId, actions } = transaction;

            return {
              receiverId,
              actions,
              nonce: ++nonce,
              recentBlockHash: accessKey.block_hash,
            };
          })
        );
      };
      const transactionsWithNonce = await transactionsWithNoncePromise();

      const results: Array<[Uint8Array, SignedTransaction]> =
        await window.ethereum.request({
          method: "wallet_snap_local:http://localhost:8081",
          params: [
            {
              method: "near_signTransactions",
              params: {
                network,
                transactions: transactionsWithNonce,
              },
            },
          ],
        });

      const signedTxs = results.map((result) =>
        SignedTransaction.decode(Buffer.from(Object.values(result[1])))
      );

      const finalResults: Array<FinalExecutionOutcome> = [];
      for (let i = 0; i < signedTxs.length; i++) {
        finalResults.push(await provider.sendTransaction(signedTxs[i]));
      }

      return finalResults;
    },
  };
};

export interface NearSnapParams {
  iconUrl?: string;
}

export const setupNearSnap = ({
  //TODO icon
  iconUrl = "./assets/near-snap-icon.png",
}: NearSnapParams = {}): WalletModuleFactory<InjectedWallet> => {
  return async () => {
    // Return null here when wallet is unavailable.

    return {
      id: "near-snap",
      type: "injected",
      metadata: {
        name: "NearSnap",
        description: null,
        iconUrl,
        deprecated: false,
        downloadUrl: "https://www.npmjs.com/package/@chainsafe/near-snap",
        available: true,
      },
      init: NearSnapWallet,
    };
  };
};
