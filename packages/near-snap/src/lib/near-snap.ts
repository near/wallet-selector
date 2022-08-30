import {
  WalletModuleFactory,
  WalletBehaviourFactory,
  InjectedWallet,
  FinalExecutionOutcome
} from "@near-wallet-selector/core";
import { utils } from "near-api-js";
import { SignedTransaction } from "near-api-js/lib/transaction";
import { GetSnapsResponse } from "./types";



const NearSnapWallet: WalletBehaviourFactory<InjectedWallet> = async ({ emitter, id, logger, metadata, options, provider, storage, store, type }) => {
  // { emitter, id, logger, metadata, options, provider, storage, store, type }
  console.log("provider")
  console.log(provider)
  console.log("options")
  console.log(options)

  const network = options.network.networkId as "testnet" | "mainnet";

  async function getSnapAccounts(): Promise<string[]> {
      let accounts: string[] = []
        const snaps: GetSnapsResponse = await window.ethereum.request({
          method: "wallet_getSnaps",
        });

        //if snap is installed return account
        if(snaps["npm:@chainsafe/near-snap"].id === "npm:@chainsafe/near-snap") {
          const account: string = await window.ethereum.request({
            method: 'wallet_snap_npm:@chainsafe/near-snap',
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
                'npm:@chainsafe/near-snap': {},
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

      if ((result as any).errors) {
        console.log('Snap installation failure :(', (result as any).errors);
      } else {
        console.log('Success!', result);
      }
      const accounts = await getSnapAccounts();

      return [{accountId: accounts[0]}];
    },

    async signOut() {
      // Sign out from accounts and cleanup (e.g. listeners).
    },

    async getAccounts() {
      // Return list of signed in accounts.
      const accounts = await getSnapAccounts()
      return [{accountId: accounts[0]}];
    },

    async verifyOwner() {

    },

    async signAndSendTransaction({ signerId, receiverId, actions }) {

      const accountId = await getSnapAccounts();

      const publicKey = "ed25519:" + Buffer.from(accountId[0], "hex").toString();
      console.log("accountId")
      console.log(accountId[0])
      console.log("publicKey")
      console.log(publicKey)

      const accessKey = await provider.viewAccessKey({accountId: accountId[0], publicKey})

      console.log("accessKey")
      console.log(accessKey)

      const recentBlockHash = utils.serialize.base_decode(
        accessKey.block_hash
      );


      const result: [Uint8Array, SignedTransaction][] = await window.ethereum.request({
        method: 'wallet_snap_npm:@chainsafe/near-snap',
        params: [{ method: "near_signTransactions", params: {
          network,
          transactions: [
            {
              receiverId,
              actions,
              nonce: ++accessKey.nonce,
              recentBlockHash
            },
          ],
        } }],
      });
      const finalResult: FinalExecutionOutcome = await provider.sendTransaction(result[0][1]);

      return finalResult;
    },

    async signAndSendTransactions({ transactions }) {
      //near_signTransactions
      const result: [Uint8Array, SignedTransaction][] = await window.ethereum.request({
        method: 'wallet_snap_npm:@chainsafe/near-snap',
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