import {
  WalletModuleFactory,
  WalletBehaviourFactory,
  InjectedWallet,
  FinalExecutionOutcome
} from "@near-wallet-selector/core";
import { createTransaction, SignedTransaction } from "near-api-js/lib/transaction";
import { GetAccountPayload, GetSnapsResponse, Transaction } from "./types";



const NearSnapWallet: WalletBehaviourFactory<InjectedWallet> = async ({ emitter, id, logger, metadata, options, provider, storage, store, type }) => {
  // { emitter, id, logger, metadata, options, provider, storage, store, type }

  // "npm@chainsafe/near-snap"
  // "local:http://localhost:8081"

  const network = options.network.networkId as "testnet" | "mainnet";

  async function getSnapAccounts(): Promise<GetAccountPayload[]> {
      let accounts: GetAccountPayload[] = []
        const snaps: GetSnapsResponse = await window.ethereum.request({
          method: "wallet_getSnaps",
        });
        console.log("snaps")
        console.log(snaps)
        //if snap is installed return account
        if(snaps["local:http://localhost:8081"]) {
          const account: GetAccountPayload = await window.ethereum.request({
            method: "wallet_snap_local:http://localhost:8081",
            params: [{ method: "near_getAccount", params: {network} }],
          });
          accounts = [account]
        }
      
      return accounts
  }

  return {
    async signIn({ contractId, methodNames }) {
      // Sign in to My Wallet for access to account(s).
      let result;
      try{
        result = await window.ethereum.request({
          method: "wallet_enable",
          params: [
            {
              [`wallet_snap`]: {
                "local:http://localhost:8081": {},
              },
            },
          ],
        });
      } catch (error) {
          if ((error as any).code === 4001) {
            console.log('The user rejected the request.');
          } else {
            console.log('Unexpected error:', error);
          }
      }
      console.log("result")
      console.log(result)
      if ((result as any).errors) {
        console.log('Snap installation failure :(', (result as any).errors);
      } else {
        console.log('Success!', result);
      }
      const getAccountPayload = await getSnapAccounts();
      console.log("getAccountPayload")
      console.log(getAccountPayload)
      return [{accountId: getAccountPayload[0].accountId}];
    },

    async signOut() {
      // Sign out from accounts and cleanup (e.g. listeners).
    },

    async getAccounts() {
      // Return list of signed in accounts.
      const getAccountPayload = await getSnapAccounts()
      return [{accountId: getAccountPayload[0].accountId}];
    },

    async verifyOwner() {

    },

    async signAndSendTransaction({ signerId, receiverId, actions }) {
      console.log("receiverId")
      console.log(receiverId)
      const accountPayload = await getSnapAccounts();
      const {accountId, publicKey} = accountPayload[0];

      // const publicKey = "ed25519:" + Buffer.from(accountId[0], "hex").toString();
      // const publicKey = utils.PublicKey.from("ed25519:" + Buffer.from(accountId[0], "hex").toString());
      
      console.log("accountId")
      console.log(accountId)
      console.log("publicKey")
      console.log(publicKey)

      const accessKey = await provider.viewAccessKey({accountId, publicKey})

      console.log("accessKey")
      console.log(accessKey)
      const { contract } = store.getState();

      if (!contract) {
        throw new Error("Wallet not signed in");
      }

      console.log("transaction params")
      console.log(receiverId || contract.contractId)
      console.log(actions)
      console.log(++accessKey.nonce)
      console.log(accessKey.block_hash)

      const result: [Uint8Array, Uint8Array][] = await window.ethereum.request({
        method: "wallet_snap_local:http://localhost:8081",
        params: [{ method: "near_signTransactions", params: {
          network,
          transactions: [
            {
              receiverId: receiverId || contract.contractId,
              actions,
              nonce: ++accessKey.nonce,
              recentBlockHash: accessKey.block_hash
            },
          ],
        } }],
      });

      console.log("result")
      console.log(result)
      const signedTx =  SignedTransaction.decode(Buffer.from(Object.values(result[0][1])))
      console.log("signedTxDecoded")
      console.log(signedTx)
      
      const finalResult: FinalExecutionOutcome = await provider.sendTransaction(signedTx);
      console.log("finalResult")
      console.log(finalResult)
      return finalResult;
    },

    async signAndSendTransactions({ transactions }) {
      //near_signTransactions

      const accountPayload = await getSnapAccounts();
      const {accountId, publicKey} = accountPayload[0];

      const transactionsWithNoncePromise = async () => {
        return Promise.all(transactions.map( async (transaction) => {
          const {receiverId, actions, signerId} = transaction
  
          if(signerId) {
            const accessKey = await provider.viewAccessKey({accountId, publicKey})

            const nonce = ++accessKey.nonce;
            return {
              receiverId,
              actions,
              nonce,
              recentBlockHash: accessKey.block_hash
            } 
            //signerId can be undifiend?
          } else return {
            receiverId: receiverId,
            actions: actions,
            nonce: 0,
            recentBlockHash: "0",
          }
        }))
      } 
      const transactionsWithNonce = await transactionsWithNoncePromise();


      const result: [Uint8Array, SignedTransaction][] = await window.ethereum.request({
        method: "wallet_snap_local:http://localhost:8081",
        params: [{ method: "near_signTransactions", params: {
          network,
          transactions, //transactions missing: nonce, recentBlockhash
        } }],
      });
      const signedTxs = result.map((result) => result[1])

      const finalResults: Array<FinalExecutionOutcome> = [];
      for (let i = 0; i < signedTxs.length; i++) {
        finalResults.push(await provider.sendTransaction(signedTxs[i]));
      }

      return finalResults;
    }
  }
}

export interface NearSnapParams {
  iconUrl?: string;
}

export const setupNearSnap = ({
  //TODO icon
  iconUrl = "./assets/near-snap-icon.png",
}: NearSnapParams = {}): WalletModuleFactory<InjectedWallet>  => {
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
  }
}