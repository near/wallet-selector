import "regenerator-runtime/runtime";
import React, { useState, useEffect, FormEventHandler } from "react";
import { utils } from "near-api-js";
import NearWalletSelector from "near-wallet-selector";
import { AccountInfo } from "near-wallet-selector/lib/esm/wallets/Wallet";

import Form from "./components/Form";
import SignIn from "./components/SignIn";
import Messages from "./components/Messages";
import { Message } from "./interfaces";

const { parseNearAmount } = utils.format;

const SUGGESTED_DONATION = "0";
const BOATLOAD_OF_GAS = parseNearAmount("0.00000000003")!;

interface AppProps {
  selector: NearWalletSelector;
  initialAccount: AccountInfo | null;
}

const App: React.FC<AppProps> = ({ selector, initialAccount }) => {
  const [account, setAccount] = useState(initialAccount);
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    // TODO: don't just fetch once; subscribe!
    selector.contract.view({ methodName: "getMessages" }).then(setMessages);

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

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

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
            deposit: parseNearAmount(donation.value || "0")
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
          .then((nextMessages: Array<Message>) => {
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

  const signIn = () => {
    selector.show();
  };

  const signOut = () => {
    selector.signOut().catch((err) => {
      console.log("Failed to sign out");
      console.error(err);
    });
  };

  function switchProviderHandler() {
    selector.show();
  }

  return (
    <main>
      <header>
        <h1>NEAR Guest Book</h1>
        {account ? (
          <div>
            <button onClick={signOut}>Log out</button>
            <button onClick={switchProviderHandler}>Switch Provider</button>
          </div>
        ) : (
          <button onClick={signIn}>Log in</button>
        )}
      </header>
      {account ? <Form account={account} onSubmit={onSubmit} /> : <SignIn />}
      {!!account && !!messages.length && <Messages messages={messages} />}
    </main>
  );
};

export default App;
