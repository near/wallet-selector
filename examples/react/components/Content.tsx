import React, { Fragment, useCallback, useEffect, useState } from "react";
import { utils } from "near-api-js";
import type {
  SignedMessage,
  SignMessageParams,
  Transaction,
} from "@near-wallet-selector/core";
import { verifyFullKeyBelongsToUser } from "@near-wallet-selector/core";
import { verifySignature } from "@near-wallet-selector/core";

import type { Message } from "../interfaces";
import { CONTRACT_ID } from "../constants";
import SignIn from "./SignIn";
import Form from "./Form";
import Messages from "./Messages";
import { useWalletSelector } from "@near-wallet-selector/react-hook";
import { createTransaction, functionCall } from "near-api-js/lib/transaction";
import { base_decode } from "near-api-js/lib/utils/serialize";

type Submitted = SubmitEvent & {
  target: { elements: { [key: string]: HTMLInputElement } };
};

const SUGGESTED_DONATION = "0";
const BOATLOAD_OF_GAS = "30000000000000";

const Content: React.FC = () => {
  const {
    signedAccountId,
    signOut,
    signIn,
    viewFunction,
    callFunction,
    signAndSendTransactions,
    createSignedTransaction,
    wallet,
    signMessage,
    walletSelector,
    signTransaction,
    getPublicKey,
    signNep413Message,
  } = useWalletSelector();

  const [messages, setMessages] = useState<Array<Message>>([]);

  const getMessages = useCallback(async () => {
    const msgs = (await viewFunction({
      contractId: CONTRACT_ID,
      method: "getMessages",
    })) as Array<Message>;

    return msgs.reverse();
  }, [viewFunction]);

  useEffect(() => {
    getMessages().then(setMessages);
  }, [getMessages]);

  const addMessages = useCallback(
    async (message: string, donation: string, multiple: boolean) => {
      if (!multiple) {
        return callFunction({
          contractId: CONTRACT_ID,
          method: "addMessage",
          args: { text: message },
          deposit: utils.format.parseNearAmount(donation)!,
        }).catch((err) => {
          alert("Failed to add message " + err);
          console.log("Failed to add message");

          throw err;
        });
      }

      const transactions: Array<Transaction> = [];

      for (let i = 0; i < 2; i += 1) {
        transactions.push({
          signerId: signedAccountId!,
          receiverId: CONTRACT_ID,
          actions: [
            functionCall(
              "addMessage",
              {
                text: `${message} (${i + 1}/2)`,
              },
              BigInt(BOATLOAD_OF_GAS),
              BigInt(utils.format.parseNearAmount(donation)!)
            ),
          ],
        });
      }

      return signAndSendTransactions({ transactions }).catch((err) => {
        alert("Failed to add messages exception " + err);
        console.log("Failed to add messages");

        throw err;
      });
    },
    [signedAccountId, callFunction, signAndSendTransactions]
  );

  const verifyMessage = async (
    message: SignMessageParams,
    signedMessage: SignedMessage
  ) => {
    const verifiedSignature = verifySignature({
      message: message.message,
      nonce: message.nonce,
      recipient: message.recipient,
      publicKey: signedMessage.publicKey,
      signature: signedMessage.signature,
      callbackUrl: message.callbackUrl,
    });

    const selector = await walletSelector;
    if (!selector) {
      throw new Error("No selector found");
    }
    const verifiedFullKeyBelongsToUser = await verifyFullKeyBelongsToUser({
      publicKey: signedMessage.publicKey,
      accountId: signedMessage.accountId,
      network: selector.options.network,
    });

    const isMessageVerified = verifiedFullKeyBelongsToUser && verifiedSignature;

    const alertMessage = isMessageVerified
      ? "Successfully verified"
      : "Failed to verify";

    alert(
      `${alertMessage} signed message: '${
        message.message
      }': \n ${JSON.stringify(signedMessage)}`
    );
  };

  const handleSubmit = useCallback(
    async (e: Submitted) => {
      e.preventDefault();

      const {
        fieldset,
        message,
        donation,
        multiple,
        signonly,
        createTransactionAndSign,
      } = e.target.elements;

      fieldset.disabled = true;

      if (createTransactionAndSign.checked) {
        if (!signedAccountId) {
          throw new Error("Wallet is not signed in.");
        }

        try {
          const [hash, signedTransaction] = await signTransaction(
            createTransaction(
              signedAccountId,
              await getPublicKey(),
              CONTRACT_ID,
              BigInt(100),
              [
                functionCall(
                  "addMessage",
                  { text: message.value },
                  BigInt(BOATLOAD_OF_GAS),
                  BigInt(utils.format.parseNearAmount(donation.value) || "0")
                ),
              ],
              base_decode("FYYAj2KrFrePke7p2sFmejX73GZwzqxJjRtKHh87Gv9w")
            )
          );

          fieldset.disabled = false;
          alert(
            "Successfully signed transaction. Result is:\n" + signedTransaction
          );
          console.log("signedTx", signedTransaction);
          return signedTransaction;
        } catch (err) {
          alert("Failed to sign transaction " + err);
          console.error("Failed to sign transaction", err);

          fieldset.disabled = false;
        }
        return;
      }

      if (signonly.checked) {
        try {
          const signedTransaction = await createSignedTransaction(CONTRACT_ID, [
            functionCall(
              "addMessage",
              {
                text: message.value,
              },
              BigInt(BOATLOAD_OF_GAS),
              BigInt(utils.format.parseNearAmount(donation.value) || "0")
            ),
          ]);

          fieldset.disabled = false;
          alert(
            "Successfully signed transaction. Signature is:\n" +
              signedTransaction
          );
          console.log("signedTx", signedTransaction);
        } catch (err) {
          alert("Failed to sign transaction " + err);
          console.error("Failed to sign transaction", err);

          fieldset.disabled = false;
        }
        return;
      }

      return addMessages(message.value, donation.value || "0", multiple.checked)
        .then(() => {
          return getMessages()
            .then((nextMessages) => {
              setMessages(nextMessages);
              message.value = "";
              donation.value = SUGGESTED_DONATION;
              fieldset.disabled = false;
              multiple.checked = false;
              signonly.checked = false;
              message.focus();
            })
            .catch((err) => {
              alert("Failed to refresh messages");
              console.log("Failed to refresh messages");

              throw err;
            });
        })
        .catch((err) => {
          console.error(err);

          fieldset.disabled = false;
        });
    },
    [
      addMessages,
      createSignedTransaction,
      getMessages,
      signedAccountId,
      getPublicKey,
      signTransaction,
    ]
  );

  const handleSignMessage = async () => {
    if (!wallet) {
      throw new Error("No wallet connected");
    }

    const message = "test message to sign";
    const nonce = Buffer.from(crypto.getRandomValues(new Uint8Array(32)));
    const recipient = "guest-book.testnet";

    try {
      const signedMessage = await signMessage({
        message,
        nonce,
        recipient,
      });
      if (signedMessage) {
        await verifyMessage({ message, nonce, recipient }, signedMessage);
      }
    } catch (err) {
      const errMsg =
        err instanceof Error ? err.message : "Something went wrong";
      alert(errMsg);
    }
  };

  const handleSignNep413Message = async () => {
    if (!wallet) {
      throw new Error("No wallet connected");
    }

    const message = "test nep413 message to sign";
    const nonce = crypto.getRandomValues(new Uint8Array(32));
    const recipient = "guest-book.testnet";

    try {
      if (!signedAccountId) {
        throw new Error("Wallet not connected");
      }

      const signedMessage = await signNep413Message(
        message,
        signedAccountId,
        recipient,
        nonce
      );
      if (signedMessage) {
        await verifyMessage(
          { message, nonce: Buffer.from(nonce), recipient },
          {
            ...signedMessage,
            publicKey: signedMessage.publicKey.toString(),
            signature: Buffer.from(signedMessage.signature).toString("base64"),
          }
        );
      }
    } catch (err) {
      const errMsg =
        err instanceof Error ? err.message : "Something went wrong";
      alert(errMsg);
    }
  };

  const handleSignDelegateAction = async () => {
    try {
      if (!wallet) {
        throw new Error("No wallet connected");
      }

      if (!signedAccountId) {
        throw new Error("Wallet not connected");
      }

      const [hash, signedDelegate] = await wallet.signDelegateAction({
        actions: [
          functionCall(
            "addMessage",
            {
              text: "delegated message",
            },
            BigInt(BOATLOAD_OF_GAS),
            BigInt(0)
          ),
        ],
        maxBlockHeight: BigInt(100),
        nonce: BigInt(100),
        publicKey: await getPublicKey(),
        receiverId: CONTRACT_ID,
        senderId: signedAccountId,
      });

      alert(
        "Successfully signed delegate action. SignedDelegate:\n" +
          signedDelegate
      );
      console.log("signedDelegate", signedDelegate);
    } catch (err) {
      const errMsg =
        err instanceof Error ? err.message : "Something went wrong";
      alert(errMsg);
    }
  };

  if (!signedAccountId) {
    return (
      <Fragment>
        <div>
          <button onClick={signIn}>Log in</button>
        </div>
        <SignIn />
        <Messages messages={messages} />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div>
        <button onClick={signIn}>Switch Wallet</button>
        <button onClick={handleSignMessage}>Sign Message</button>
        <button onClick={handleSignNep413Message}>Sign NEP413 Message</button>
        <button onClick={handleSignDelegateAction}>Sign Delegate Action</button>
        <button onClick={signOut}>Log out {signedAccountId}</button>
      </div>
      <Form
        signedAccountId={signedAccountId}
        onSubmit={(e) => handleSubmit(e as unknown as Submitted)}
      />
      <Messages messages={messages} />
    </Fragment>
  );
};

export default Content;
