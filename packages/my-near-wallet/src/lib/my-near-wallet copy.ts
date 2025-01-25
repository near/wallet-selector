import * as nearAPI from "near-api-js";
import type {
  WalletModuleFactory,
  WalletBehaviourFactory,
  BrowserWallet,
  Transaction,
  Optional,
  Network,
  Account,
} from "@near-wallet-selector/core";
import { createAction } from "@near-wallet-selector/wallet-utils";
import icon from "./icon";
import { PublicKey } from "near-api-js/lib/utils";

export interface MyNearWalletParams {
  walletUrl?: string;
  iconUrl?: string;
  deprecated?: boolean;
  successUrl?: string;
  failureUrl?: string;
}

interface MyNearWalletState {
  wallet: nearAPI.WalletConnection;
  keyStore: nearAPI.keyStores.BrowserLocalStorageKeyStore;
}

interface MyNearWalletExtraOptions {
  walletUrl: string;
}

const resolveWalletUrl = (network: Network, walletUrl?: string) => {
  if (walletUrl) {
    return walletUrl;
  }

  switch (network.networkId) {
    case "mainnet":
      return "https://app.mynearwallet.com";
    case "testnet":
      return "https://testnet.mynearwallet.com";
    default:
      throw new Error("Invalid wallet url");
  }
};

const setupWalletState = async (
  params: MyNearWalletExtraOptions,
  network: Network
): Promise<MyNearWalletState> => {
  const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();

  const near = await nearAPI.connect({
    keyStore,
    walletUrl: params.walletUrl,
    ...network,
    headers: {},
  });

  const wallet = new nearAPI.WalletConnection(near, "near_app");

  return {
    wallet,
    keyStore,
  };
};

const MyNearWallet: WalletBehaviourFactory<
  BrowserWallet,
  { params: MyNearWalletExtraOptions }
> = async ({ metadata, options, store, params, logger, id, emitter, storage }) => {
  const _state = await setupWalletState(params, options.network);
  const getAccounts = async (): Promise<Array<Account>> => {
    const accountId = _state.wallet.getAccountId();
    const account = _state.wallet.account();
    if (!accountId || !account) {
      return [];
    }

    const publicKey = await account.connection.signer.getPublicKey(
      account.accountId,
      options.network.networkId
    );
    return [
      {
        accountId,
        publicKey: publicKey ? publicKey.toString() : "",
      },
    ];
    // const {accountId,publicKey} =  JSON.parse(localStorage.getItem('my-near-wallet') || "{}");

    // if(!accountId || !publicKey){
    //   return [];
    // }

    // return [{accountId,publicKey}];
  };

  const transformTransactions = async (
    transactions: Array<Optional<Transaction, "signerId">>
  ) => {
    const account = _state.wallet.account();
    const { networkId, signer, provider } = account.connection;

    const localKey = await signer.getPublicKey(account.accountId, networkId);

    return Promise.all(
      transactions.map(async (transaction, index) => {
        const actions = transaction.actions.map((action) =>
          createAction(action)
        );
        const accessKey = await account.accessKeyForTransaction(
          transaction.receiverId,
          actions,
          localKey
        );

        if (!accessKey) {
          throw new Error(
            `Failed to find matching key for transaction sent to ${transaction.receiverId}`
          );
        }

        const block = await provider.block({ finality: "final" });

        const nonce = accessKey.access_key.nonce + BigInt(index + 1);

        return nearAPI.transactions.createTransaction(
          account.accountId,
          nearAPI.utils.PublicKey.from(accessKey.public_key),
          transaction.receiverId,
          nonce,
          actions,
          nearAPI.utils.serialize.base_decode(block.header.hash)
        );
      })
    );
  };

  return {
    async signIn({ contractId, methodNames, successUrl, failureUrl }) {
      const existingAccounts = await getAccounts();

      if (existingAccounts.length) {
        return existingAccounts;
      }

      await _state.wallet.requestSignIn({
        contractId,
        methodNames,
        successUrl,
        failureUrl,
      });

      return getAccounts();


      const url = await _state.wallet.requestSignInUrl({
        contractId,
        methodNames,
        successUrl,
        failureUrl,
      });
  
      // contractId && publishUrl.searchParams.set('contractId', contractId );
      // methodNames && publishUrl.searchParams.set('methodNames', methodNames.join(",") );

      console.log("Url requestSignInUrl 23",url);
      
      // @ts-ignore
      const childWindow = window.open(url,"My Near Wallet", "width=480,height=640");
      
      return await new Promise((resolve, reject) => {
        const checkWindowClosed = setInterval(() => {
          if (childWindow?.closed) {
            clearInterval(checkWindowClosed);
            reject(new Error('La ventana se cerró antes de completar la transacción.'));
          }
        }, 500);
        window.addEventListener('message', async(event) => {
          if (event.data?.status === 'success') {
      
            console.log("check",event.data);
            
            const { public_key:publicKey, all_keys:allKeys, account_id:accountId } = event.data;
            console.log({publicKey, allKeys, accountId});

            // _state.keyStore.setKey(options.network.networkId, account_id,public_key);
            // const keyPair = await this._keyStore.getKey(this._networkId, PENDING_ACCESS_KEY_PREFIX + publicKey);
            // await this._keyStore.setKey(this._networkId, accountId, keyPair);
            // await this._keyStore.removeKey(this._networkId, PENDING_ACCESS_KEY_PREFIX + publicKey);

            localStorage.setItem('near_app_wallet_auth_key', JSON.stringify({ accountId, allKeys }));
            if (publicKey) {
              _state.keyStore.setKey(options.network.networkId, accountId,publicKey);
            }
      //  ?account_id=maguila.testnet&all_keys=ed25519%3AAtH7GEjv2qmBVoT8qoRhWXizXM5CC12DC6tiqY9iNoRm
            childWindow?.close();
            window.removeEventListener('message', () => { });
            // emitter.emit("signedIn", {
            //   contractId: contractId,
            //   methodNames: methodNames ?? [],
            //   accounts: await getAccounts(),
            // });
      
            // return await getAccounts();
            // window.location.assign(parsedUrl.toString());
            _state.wallet.isSignedIn = () => true;
            return resolve([{accountId,publicKey}]);
          }
        });
      }) 
      // return getAccounts();
    },

    async signOut() {
      if (_state.wallet.isSignedIn()) {
        // _state.wallet.isSignedIn = () => false;
        _state.wallet.signOut();
      }
    },

    async getAccounts() {
      return getAccounts();
    },

    async verifyOwner() {
      throw new Error(`Method not supported by ${metadata.name}`);
    },

    async signMessage({ message, nonce, recipient, callbackUrl, state }) {
      logger.log("sign message", { message });

      if (id !== "my-near-wallet") {
        throw Error(
          `The signMessage method is not supported by ${metadata.name}`
        );
      }

      const locationUrl =
        typeof window !== "undefined" ? window.location.href : "";

      const url = callbackUrl || locationUrl;

      if (!url) {
        throw new Error(`The callbackUrl is missing for ${metadata.name}`);
      }

      const href = new URL(params.walletUrl);
      href.pathname = "sign-message";
      href.searchParams.append("message", message);
      href.searchParams.append("nonce", nonce.toString("base64"));
      href.searchParams.append("recipient", recipient);
      href.searchParams.append("callbackUrl", url);
      if (state) {
        href.searchParams.append("state", state);
      }

      window.location.replace(href.toString());

      return;
    },
    
    async signAndSendTransaction({
      signerId,
      receiverId,
      actions,
      callbackUrl,
    }) {
      logger.log("signAndSendTransaction", {
        signerId,
        receiverId,
        actions,
        callbackUrl,
      });

      const { contract } = store.getState();

      if (!_state.wallet.isSignedIn() || !contract) {
        throw new Error("Wallet not signed in");
      }
      // const account = _state.wallet.account();
      // console.log( "pepe",account["signAndSendTransaction"])
      const account = _state.wallet.account();
      // const { networkId, signer, provider } = account.connection;
      return account["signAndSendTransaction"]({
        receiverId: receiverId || contract.contractId,
        actions: actions.map((action) => createAction(action)),
        walletCallbackUrl: callbackUrl,
      });
      // const account = _state.wallet.account();
      // const { networkId, signer, provider } = account.connection;

      // const block = await provider.block({ finality: "final" });


      // const transactions = await nearAPI.transactions.createTransaction(
      //   signerId || account.accountId,
      //   PublicKey.fromString("ed25519:AtH7GEjv2qmBVoT8qoRhWXizXM5CC12DC6tiqY9iNoRm"),
      //   receiverId || contract.contractId,
      //   0,
      //   actions.map((action) => createAction(action)),
      //   new Uint8Array(32)
      // );
      // // @ts-ignore
      // // console.log({transactions,test:atob(transactions.encode())});
      // // console.log("orginal",atob("DwAAAG1hZ3VpbGEudGVzdG5ldACS3ARWu0sYjX63OYbDojizriWL55RnrStWodM6c%2BbIrMrc%2F3zXjAAAGwAAAGhlbGxvLm5lYXItZXhhbXBsZXMudGVzdG5ldF6mKSLVD4Nu%2ByY53uE0fD4CCaELfzNdK18eVlDURC4QAQAAAAIMAAAAc2V0X2dyZWV0aW5nEQAAAHsiZ3JlZXRpbmciOiJoaSJ9AOBX60gbAAAAAAAAAAAAAAAAAAAAAAAA"));
      // console.log({signerId,
      //   receiverId,
      //   actions,
      //   callbackUrl});
      

    
      // const publishUrl = new URL('sign', `https://localhost:1234`);
      // publishUrl.searchParams.set('transactions', Buffer.from(transactions.encode()).toString("base64"));
      // publishUrl.searchParams.set('callbackUrl', "http://localhost:3000/hello-near");
      // // @ts-ignore
      // const childWindow = window.open(publishUrl.toString(),"My Near Wallet", "width=480,height=640");

      // const childWindow = window.open("https://localhost:1234/sign?transactions=DwAAAG1hZ3VpbGEudGVzdG5ldACS3ARWu0sYjX63OYbDojizriWL55RnrStWodM6c%2BbIrMrc%2F3zXjAAAGwAAAGhlbGxvLm5lYXItZXhhbXBsZXMudGVzdG5ldF6mKSLVD4Nu%2ByY53uE0fD4CCaELfzNdK18eVlDURC4QAQAAAAIMAAAAc2V0X2dyZWV0aW5nEQAAAHsiZ3JlZXRpbmciOiJoaSJ9AOBX60gbAAAAAAAAAAAAAAAAAAAAAAAA&callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fhello-near", "Ventana Secundaria", "width=400,height=400");
        
      
      // return new Promise((resolve, reject) => {
      //   const checkWindowClosed = setInterval(() => {
      //     if (childWindow?.closed) {
      //       clearInterval(checkWindowClosed);
      //       reject(new Error('La ventana se cerró antes de completar la transacción.'));
      //     }
      //   }, 500);
      //   window.addEventListener('message', async(event) => {
      //     if (event.data?.status === 'success') {
      //       console.log('Transacción exitosa');
      //       childWindow?.close();
      //       window.removeEventListener('message', () => { });

            
      //       const result = await provider.txStatus(event.data?.transactionHashes, 'unused',"NONE");
            
      //       resolve(result);
      //     }
      //   });
      // }) 
    },

    async signAndSendTransactions({ transactions, callbackUrl }) {
      logger.log("signAndSendTransactions", { transactions, callbackUrl });

      if (!_state.wallet.isSignedIn()) {
        throw new Error("Wallet not signed in");
      }

      return _state.wallet.requestSignTransactions({
        transactions: await transformTransactions(transactions),
        callbackUrl,
      });
    },

    buildImportAccountsUrl() {
      return `${params.walletUrl}/batch-import`;
    },
  };
};

export function setupMyNearWallet({
  walletUrl,
  iconUrl = icon,
  deprecated = false,
  successUrl = "",
  failureUrl = "",
}: MyNearWalletParams = {}): WalletModuleFactory<BrowserWallet> {
  return async (moduleOptions) => {
    return {
      id: "my-near-wallet",
      type: "browser",
      metadata: {
        name: "MyNearWallet",
        description:
          "NEAR wallet to store, buy, send and stake assets for DeFi.",
        iconUrl,
        deprecated,
        available: true,
        successUrl,
        failureUrl,
        walletUrl: resolveWalletUrl(moduleOptions.options.network, walletUrl),
      },
      init: (options) => {
        return MyNearWallet({
          ...options,
          params: {
            walletUrl: resolveWalletUrl(options.options.network, walletUrl),
          },
        });
      },
    };
  };
}

// signAndSendTransaction({receiverId, actions, walletMeta, walletCallbackUrl=window.location.href}) {
//   const _super = Object.create(null, {
//       signAndSendTransaction: {
//           get: ()=>super.signAndSendTransaction
//       }
//   });
//   return __awaiter(this, void 0, void 0, function*() {
//       const localKey = yield this.connection.signer.getPublicKey(this.accountId, this.connection.networkId);
//       let accessKey = yield this.accessKeyForTransaction(receiverId, actions, localKey);
//       if (!accessKey) {
//           throw new Error(`Cannot find matching key for transaction sent to ${receiverId}`);
//       }
//       if (localKey && localKey.toString() === accessKey.public_key) {
//           try {
//               return yield _super.signAndSendTransaction.call(this, {
//                   receiverId,
//                   actions
//               });
//           } catch (e) {
//               if (e.type === 'NotEnoughAllowance') {
//                   accessKey = yield this.accessKeyForTransaction(receiverId, actions);
//               } else {
//                   throw e;
//               }
//           }
//       }
//       const block = yield this.connection.provider.block({
//           finality: 'final'
//       });
//       const blockHash = (0,
//       utils_1.baseDecode)(block.header.hash);
//       const publicKey = crypto_1.PublicKey.from(accessKey.public_key);
//       // TODO: Cache & listen for nonce updates for given access key
//       const nonce = accessKey.access_key.nonce + BigInt(1);
//       const transaction = (0,
//       transactions_1.createTransaction)(this.accountId, publicKey, receiverId, nonce, actions, blockHash);
//       yield this.walletConnection.requestSignTransactions({
//           transactions: [transaction],
//           meta: walletMeta,
//           callbackUrl: walletCallbackUrl
//       });
//       return new Promise((resolve,reject)=>{
//           setTimeout(()=>{
//               reject(new Error('Failed to redirect to sign transaction'));
//           }
//           , 1000);
//       }
//       );
//       // TODO: Aggregate multiple transaction request with "debounce".
//       // TODO: Introduce TransactionQueue which also can be used to watch for status?
//   });
// }