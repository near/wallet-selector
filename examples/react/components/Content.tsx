import React, { Fragment, useCallback, useEffect, useState } from "react";
import { providers, utils } from "near-api-js";
import type {
  AccountView,
  CodeResult,
} from "near-api-js/lib/providers/provider";
import type { Transaction } from "@near-wallet-selector/core";

import type { Account, Message } from "../interfaces";
import { useWalletSelector } from "../contexts/WalletSelectorContext";
import { CONTRACT_ID } from "../constants";
import SignIn from "./SignIn";
import Form from "./Form";
import Messages from "./Messages";

const SUGGESTED_DONATION = "0";
const BOATLOAD_OF_GAS = utils.format.parseNearAmount("0.00000000003")!;

const Content: React.FC = () => {
  const { selector, modal, accounts, accountId } = useWalletSelector();
  const [account, setAccount] = useState<Account | null>(null);
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAccount = useCallback(async (): Promise<Account | null> => {
    if (!accountId) {
      return null;
    }

    const { network } = selector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    return provider
      .query<AccountView>({
        request_type: "view_account",
        finality: "final",
        account_id: accountId,
      })
      .then((data) => ({
        ...data,
        account_id: accountId,
      }));
  }, [accountId, selector.options]);

  const getMessages = useCallback(() => {
    const { network } = selector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    return provider
      .query<CodeResult>({
        request_type: "call_function",
        account_id: CONTRACT_ID,
        method_name: "getMessages",
        args_base64: "",
        finality: "optimistic",
      })
      .then((res) => JSON.parse(Buffer.from(res.result).toString()));
  }, [selector]);

  useEffect(() => {
    // TODO: don't just fetch once; subscribe!
    getMessages().then(setMessages);
  }, []);

  useEffect(() => {
    if (!accountId) {
      return setAccount(null);
    }

    setLoading(true);

    getAccount().then((nextAccount) => {
      setAccount(nextAccount);
      setLoading(false);
    });
  }, [accountId, getAccount]);

  const handleSignIn = () => {
    modal.show();
  };

  const handleSignOut = async () => {
    const wallet = await selector.wallet();

    wallet.signOut().catch((err) => {
      console.log("Failed to sign out");
      console.error(err);
    });
  };

  const handleSwitchWallet = () => {
    modal.show();
  };

  const handleSwitchAccount = () => {
    const currentIndex = accounts.findIndex((x) => x.accountId === accountId);
    const nextIndex = currentIndex < accounts.length - 1 ? currentIndex + 1 : 0;

    const nextAccountId = accounts[nextIndex].accountId;

    selector.setActiveAccount(nextAccountId);

    alert("Switched account to " + nextAccountId);
  };

  const addMessages = useCallback(
    async (message: string, donation: string, multiple: boolean) => {
      const { contract } = selector.store.getState();
      const wallet = await selector.wallet();

      if (!multiple) {
        // return wallet
        //   .signAndSendTransaction({
        //     signerId: accountId!,
        //     actions: [
        //       {
        //         type: "FunctionCall",
        //         params: {
        //           methodName: "addMessage",
        //           args: { text: message },
        //           gas: BOATLOAD_OF_GAS,
        //           deposit: utils.format.parseNearAmount(donation)!,
        //         },
        //       },
        //     ],
        //   })
        //   .catch((err) => {
        //     alert("Failed to add message");
        //     console.log("Failed to add message");

        //     throw err;
        //   });
        return wallet
          .signAndSendTransaction({
            signerId: accountId!,
            receiverId: "aurora",
            actions: [
              {
                type: "FunctionCall",
                params: {
                  methodName: "call",
                  args: Buffer.from([
                    0, 38, 236, 42, 251, 223, 223, 185, 114, 241, 6, 16, 10, 61,
                    234, 229, 136, 115, 83, 217, 185, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 4, 1, 0, 0, 56, 237, 23, 57, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 30, 25, 224,
                    201, 186, 178, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 217, 2, 114, 139, 106, 141,
                    6, 49, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 160, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 85, 59, 106, 131, 243, 94, 168,
                    144, 44, 193, 143, 7, 0, 131, 72, 77, 192, 38, 226, 13, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 99, 101, 18, 63, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 228, 151,
                    156, 172, 93, 112, 240, 22, 151, 247, 149, 240, 173, 86,
                    187, 202, 5, 145, 44, 68, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 72, 97, 130, 94, 117, 171, 20, 85, 62, 90, 247, 17, 235,
                    190, 104, 115, 211, 105, 209, 70,
                  ]),
                  gas: BOATLOAD_OF_GAS,
                  deposit: utils.format.parseNearAmount(donation)!,
                },
              },
            ],
          })
          .catch((err) => {
            alert("Failed to add message");
            console.log("Failed to add message");

            throw err;
          });
      }

      const transactions: Array<Transaction> = [];

      for (let i = 0; i < 2; i += 1) {
        transactions.push({
          signerId: accountId!,
          receiverId: contract!.contractId,
          actions: [
            {
              type: "FunctionCall",
              params: {
                methodName: "addMessage",
                args: {
                  text: `${message} (${i + 1}/2)`,
                },
                gas: BOATLOAD_OF_GAS,
                deposit: utils.format.parseNearAmount(donation)!,
              },
            },
          ],
        });
      }

      return wallet.signAndSendTransactions({ transactions }).catch((err) => {
        alert("Failed to add messages exception " + err);
        console.log("Failed to add messages");

        throw err;
      });
    },
    [selector, accountId]
  );

  const handleVerifyOwner = async () => {
    const wallet = await selector.wallet();
    try {
      const owner = await wallet.verifyOwner({
        message: "test message for verification",
      });

      if (owner) {
        alert(`Signature for verification: ${JSON.stringify(owner)}`);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      alert(message);
    }
  };

  const handleSubmit = useCallback(
    async (e: SubmitEvent) => {
      e.preventDefault();

      // TODO: Fix the typing so that target.elements exists..
      // @ts-ignore.
      const { fieldset, message, donation, multiple } = e.target.elements;

      fieldset.disabled = true;

      return addMessages(message.value, donation.value || "0", multiple.checked)
        .then(() => {
          return getMessages()
            .then((nextMessages) => {
              setMessages(nextMessages);
              message.value = "";
              donation.value = SUGGESTED_DONATION;
              fieldset.disabled = false;
              multiple.checked = false;
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
    [addMessages, getMessages]
  );

  if (loading) {
    return null;
  }

  if (!account) {
    return (
      <Fragment>
        <div>
          <button onClick={handleSignIn}>Log in</button>
        </div>
        <SignIn />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div>
        <button onClick={handleSignOut}>Log out</button>
        <button onClick={handleSwitchWallet}>Switch Wallet</button>
        <button onClick={handleVerifyOwner}>Verify Owner</button>
        {accounts.length > 1 && (
          <button onClick={handleSwitchAccount}>Switch Account</button>
        )}
      </div>
      <Form
        account={account}
        onSubmit={(e) => handleSubmit(e as unknown as SubmitEvent)}
      />
      <Messages messages={messages} />
    </Fragment>
  );
};

export default Content;
