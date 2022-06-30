// To run ts-node ./nightly-connect-client.ts
import { sha256 } from 'js-sha256'
import { transactions } from 'near-api-js'
import { KeyPairEd25519 } from 'near-api-js/lib/utils'
import { ClientNear } from '@nightlylabs/connect/lib/sdk/src/near/clientNear'
import type { SignTransactionsRequest } from '@nightlylabs/connect'

// To run test you need to have running instance of the server
const CLIENT_ADDRESS = 'wss://ncproxy.nightly.app/client'
const SESSION_ID = 'nightlyconnect:f92e0d2e-6e4e-435c-bcd2-28fb55266270?network=Near'.split(':')[1].split("?")[0]

const alice_ed25519 = new KeyPairEd25519(
  '3zR44QTFXYHPErMnFYZYizFRFmyYajpfH9jLJnm4BQ67ndoQ5PpKsJDcG1BHBhKrat92ospVNfs4SRQ6Z8uXUGiM'
)

const main = async () => {
  const accountId = Buffer.from(alice_ed25519.publicKey.data).toString('hex')
  try {
    const { client, data } = await ClientNear.build({
      sessionId: SESSION_ID,
      url: CLIENT_ADDRESS
    })
    // Data about app we want to connect
    console.log(data)
    await client.connect({
      publicKey: alice_ed25519.publicKey,
      accountId: accountId,
      sessionId: SESSION_ID
    })
    client.on('newRequest', async (request) => {
      const signRequest = request as SignTransactionsRequest
      const txToSign = transactions.Transaction.decode(
        Buffer.from(signRequest.transactions[0], 'hex')
      )
      const signature = alice_ed25519.sign(Uint8Array.from(sha256.array(txToSign.encode())))
      const signedTx = new transactions.SignedTransaction({
        transaction: txToSign,
        signature: new transactions.Signature({
          keyType: txToSign.publicKey.keyType,
          data: signature.signature
        })
      })
      // Send signed transaction
      await client.resolveSignTransaction({
        requestId: signRequest.id,
        signedTransactions: [signedTx]
      })
    })
  } catch (error) {
    console.log(error)
  }
}
main()
