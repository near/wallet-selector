import React, { Fragment, useEffect, useState } from "react";
import { providers, utils } from "near-api-js";
import { CodeResult } from "near-api-js/lib/providers/provider";

import { Message } from "../interfaces";
import { useWalletSelector } from "../contexts/WalletSelectorContext";
import SignIn from "./SignIn";
import Form from "./Form";
import Messages from "./Messages";

const SUGGESTED_DONATION = "0";
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const BOATLOAD_OF_GAS = utils.format.parseNearAmount("0.00000000003")!;

const Content: React.FC = () => {
  const { selector, account } = useWalletSelector();
  const [messages, setMessages] = useState<Array<Message>>([]);

  const getMessages = () => {
    const provider = new providers.JsonRpcProvider({
      url: selector.network.nodeUrl
    });

    return provider.query<CodeResult>({
      request_type: "call_function",
      account_id: selector.getContractId(),
      method_name: "getMessages",
      args_base64: "",
      finality: "optimistic",
    })
      .then((res) => JSON.parse(Buffer.from(res.result).toString()));
  };

  useEffect(() => {
    // TODO: don't just fetch once; subscribe!
    getMessages().then(setMessages);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignIn = () => {
    selector.show();
  };

  const handleSignOut = () => {
    selector.signOut().catch((err) => {
      console.log("Failed to sign out");
      console.error(err);
    });
  };

  const handleSwitchProvider = () => {
    selector.show();
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    // TODO: Fix the typing so that target.elements exists..
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore.
    const { fieldset, message, donation } = e.target.elements;

    fieldset.disabled = true;

    // TODO: optimistically update page with new message,
    // update blockchain data in background
    // add uuid to each message, so we know which one is already known
    selector.signAndSendTransaction({
      signerId: account!.account_id,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: "addMessage",
            args: { text: message.value },
            gas: BOATLOAD_OF_GAS,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            deposit: utils.format.parseNearAmount(donation.value || "0")!,
          },
        },
      ],
    })
      .catch((err) => {
        alert("Failed to add message");
        console.log("Failed to add message");

        throw err;
      })
      .then(() => {
        return getMessages()
          .then((nextMessages) => {
            setMessages(nextMessages);
            message.value = "";
            donation.value = SUGGESTED_DONATION;
            fieldset.disabled = false;
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
  };

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
        <button onClick={handleSwitchProvider}>Switch Provider</button>
      </div>
      <Form onSubmit={e => handleSubmit(e as unknown as SubmitEvent)} />
      <Messages messages={messages} />
    </Fragment>
  );
};

export default Content;
