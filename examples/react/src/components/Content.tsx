import React, { Fragment, useEffect, useState } from "react";
import { utils } from "near-api-js";
import NearWalletSelector, { AccountInfo } from "near-wallet-selector";

import { Message } from "../interfaces";
import SignIn from "./SignIn";
import Form from "./Form";
import Messages from "./Messages";

const SUGGESTED_DONATION = "0";
const BOATLOAD_OF_GAS = utils.format.parseNearAmount("0.00000000003")!;

interface ContentProps {
  selector: NearWalletSelector;
}

const Content: React.FC<ContentProps> = ({ selector }) => {
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    // TODO: don't just fetch once; subscribe!
    Promise.all([
      selector.contract.view({ methodName: "getMessages" }),
      selector.getAccount(),
    ]).then(([ nextMessages, nextAccount ]) => {
      setMessages(nextMessages);
      setAccount(nextAccount);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const subscription = selector.on("signIn", () => {
      console.log("'signIn' event triggered!");

      selector
        .getAccount()
        .then((data) => {
          console.log("Account", data);
          setAccount(data);
        })
        .catch((err) => {
          console.log("Failed to retrieve account info");
          console.error(err);
        });
    });

    return () => subscription.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const subscription = selector.on("signOut", () => {
      console.log("'signOut' event triggered!");
      setAccount(null);
    });

    return () => subscription.remove();
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
  }

  const handleSubmit = (e: SubmitEvent) => {
    // TODO: Fix the typing so that target.elements exists..
    // @ts-ignore.
    const { fieldset, message, donation } = e.target.elements;

    fieldset.disabled = true;

    // TODO: optimistically update page with new message,
    // update blockchain data in background
    // add uuid to each message, so we know which one is already known
    selector.contract.signAndSendTransaction({
      actions: [{
        type: "FunctionCall",
        params: {
          methodName: "addMessage",
          args: { text: message.value },
          gas: BOATLOAD_OF_GAS,
          deposit: utils.format.parseNearAmount(donation.value || "0")!
        }
      }]
    })
      .catch((err) => {
        alert("Failed to add message");
        console.log("Failed to add message");

        throw err;
      })
      .then(() => {
        return selector.contract
          .view({ methodName: "getMessages" })
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
      <Form account={account} onSubmit={handleSubmit} />
      <Messages messages={messages} />
    </Fragment>
  );
}

export default Content;