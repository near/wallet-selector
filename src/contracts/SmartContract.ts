import { Contract, providers, transactions, utils, connect, keyStores } from "near-api-js";
import State from "../state/State";
import LedgerWallet from "../wallets/hardware/LedgerWallet";
import BN from "bn.js";

async function createFullAccessKey(accountId: string, publicKey: string) {
  const config = {
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
    headers: {},
  };

  const near = await connect(config);
  const account = await near.account(accountId);
  const res = await account.addKey(publicKey);
  return res;
}

async function LedgerContract(
  sender: string,
  contractAddress: string,
  contractMethod: string,
  methodArgs: any[],
  gas: string = "10000000000000",
  deposit: string = "0"
) {
  if (!State.signedInWalletId) return;
  const walletProvider = State.walletProviders[State.signedInWalletId] as LedgerWallet;

  const publicKey = walletProvider.getPublicKey();

  const bnGas = new BN(gas.toString());
  const bnDeposit = new BN(deposit.toString());

  const publicKeyString = "ed25519:" + walletProvider.encodePublicKey(publicKey);

  const provider = new providers.JsonRpcProvider(`https://rpc.${State.options.networkId}.near.org`);

  // Tries to create a full access key for the account, if it fails, it means the account already has a full access key
  await createFullAccessKey(sender, publicKeyString).catch((err) => {
    console.log(err);
  });

  const response: any = await provider
    .query({
      request_type: "view_access_key",
      finality: "optimistic",
      account_id: sender,
      public_key: publicKeyString,
    })
    .catch((err) => {
      console.log(err);
    });

  if (!response) return;

  const blockHash = response.block_hash;
  const recentBlockHash = utils.serialize.base_decode(blockHash);
  const nonce = response.nonce + 1;

  const keyPair = utils.key_pair.KeyPairEd25519.fromRandom();

  const pk = keyPair.getPublicKey();
  pk.data = publicKey;

  const actions = [transactions.functionCall(contractMethod, methodArgs, bnGas, bnDeposit)];

  const transaction = transactions.createTransaction(sender, pk, contractAddress, nonce, actions, recentBlockHash);

  const serializedTx = utils.serialize.serialize(transactions.SCHEMA, transaction);

  const signature = await walletProvider.sign(serializedTx);

  const signedTransaction = new transactions.SignedTransaction({
    transaction,
    signature: new transactions.Signature({
      keyType: transaction.publicKey.keyType,
      data: signature,
    }),
  });

  const signedSerializedTx = signedTransaction.encode();

  const base64Response: any = await provider.sendJsonRpc("broadcast_tx_commit", [
    Buffer.from(signedSerializedTx).toString("base64"),
  ]);

  const res = JSON.parse(Buffer.from(base64Response.status.SuccessValue, "base64").toString());

  return res;
}

const NearContract = (account: any, contractId: any, views: any, changes: any) => {
  return new Contract(account, contractId, {
    viewMethods: views,
    changeMethods: changes,
  });
};

export default NearContract;
